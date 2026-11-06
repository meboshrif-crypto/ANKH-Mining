import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
let isConnected = false;
async function connectDB(){
  if(isConnected) return;
  await mongoose.connect(MONGODB_URI);
  isConnected = true;
}

const UserSchema = new mongoose.Schema({
  telegramId: { type: String, unique: true },
  username: String,
  balance: { type: Number, default: 0 },
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export async function POST(req: NextRequest) {
  try {
    const { amount, username, address, userId } = await req.json();
    if(!userId || !amount || amount < 10000) return NextResponse.json({ok:false});

    await connectDB();
    const user = await User.findOne({ telegramId: String(userId) });
    
    if(!user || user.balance < amount){
      return NextResponse.json({ok:false, error:"رصيد غير كافي"});
    }

    user.balance -= amount;
    await user.save();

    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHANNEL = process.env.WITHDRAW_CHANNEL_ID;
    const text = `💸 سحب مؤكد - مونجو\n👤 @${username} ID:${userId}\n💰 ${amount} ANKH\n📮 ${address}\n📊 متبقي: ${user.balance}`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({chat_id:CHANNEL, text})
    });

    return NextResponse.json({ok:true, newBalance: user.balance});
  } catch(e){ return NextResponse.json({ok:false, error:String(e)}); }
}
