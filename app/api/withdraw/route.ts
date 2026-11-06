import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const { amount, username, address } = await req.json();
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHANNEL = process.env.WITHDRAW_CHANNEL_ID || "@ANKH_withdraws";
    if(!BOT_TOKEN) return NextResponse.json({ok:false});
    const text = `💸 *سحب جديد ANKH!*\n\n💰 المبلغ: ${amount} ANKH\n👤 المستخدم: @${username || 'مجهول'}\n📬 العنوان: \`${(address||'').slice(0,6)}...${(address||'').slice(-6)}\`\n\n✅ تمت المعالجة\n\n#سحب`;
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({chat_id:CHANNEL, text, parse_mode:"Markdown"})
    });
    return NextResponse.json({ok:true});
  } catch { return NextResponse.json({ok:false}); }
}
