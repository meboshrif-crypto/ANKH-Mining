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
  try{
    const { userId, username, action, amount } = await req.json();
    if(!userId) return NextResponse.json({ok:false});
    
    await connectDB();
    let user = await User.findOne({ telegramId: String(userId) });
    if(!user){
      user = await User.create({ telegramId: String(userId), username, balance: 0 });
    }
    
    if(action === "claim" && amount > 0 && amount < 1000){
      user.balance += amount;
      await user.save();
    }
    
    return NextResponse.json({ok:true, balance: user.balance});
  } catch(e){ return NextResponse.json({ok:false}); }
}
