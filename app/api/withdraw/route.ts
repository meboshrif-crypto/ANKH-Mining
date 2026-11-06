import { NextRequest, NextResponse } from "next/server";

async function sendToChannel(amount: any, username: any, address: any) {
  const BOT_TOKEN = process.env.BOT_TOKEN;
  if (!BOT_TOKEN) return false;
  const CHANNEL = "@ANKH_withdraws";
  const text = `💸 *سحب جديد ANKH!*\n\n💰 المبلغ: ${amount} ANKH\n👤 المستخدم: @${username || 'مجهول'}\n📬 العنوان: \`${(address||'').slice(0,6)}...${(address||'').slice(-6)}\`\n\n✅ تمت المعالجة\n\n#سحب #ANKH`;
  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHANNEL, text, parse_mode: "Markdown" })
  });
  return res.ok;
}

export async function POST(req: NextRequest) {
  try {
    const { amount, username, address } = await req.json();
    await sendToChannel(amount, username, address);
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ ok: false }); }
}

// ده للتيست من الموبايل - تفتح اللينك بس
export async function GET() {
  await sendToChannel(15000, "test_mobile", "UQTestAddress123456789");
  return NextResponse.json({ ok: true, msg: "check channel" });
}
