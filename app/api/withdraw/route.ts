import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHANNEL = process.env.WITHDRAW_CHANNEL_ID || "@ANKH_withdraws";
  
  console.log("TOKEN:", BOT_TOKEN ? "exists" : "MISSING");
  console.log("CHANNEL:", CHANNEL);

  if (!BOT_TOKEN) return NextResponse.json({ ok: false, error: "BOT_TOKEN missing" });

  const text = `💸 سحب جديد ANKH!\n💰 المبلغ: 15000 ANKH\n👤 المستخدم: @test_mobile\n✅ تمت المعالجة\n#سحب`;

  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHANNEL, text })
  });
  
  const data = await res.json();
  console.log("TG Response:", data);
  return NextResponse.json({ ok: res.ok, tg_response: data, channel_used: CHANNEL });
}

export async function POST(req: NextRequest) {
  const { amount, username, address } = await req.json();
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHANNEL = process.env.WITHDRAW_CHANNEL_ID || "@ANKH_withdraws";
  const text = `💸 *سحب جديد ANKH!*\n💰 ${amount} ANKH\n👤 @${username || 'anon'}\n📬 ${address?.slice(0,6)}...`;
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHANNEL, text, parse_mode: "Markdown" })
  });
  return NextResponse.json({ ok: true });
}
