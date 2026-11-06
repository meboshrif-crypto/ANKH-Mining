import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const { userId, chatId } = await req.json();
    const BOT_TOKEN = process.env.BOT_TOKEN;
    if(!BOT_TOKEN) return NextResponse.json({ok:false});
    const r = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getChatMember?chat_id=${chatId}&user_id=${userId}`);
    const d = await r.json();
    const ok = ["member","administrator","creator"].includes(d?.result?.status);
    return NextResponse.json({ ok });
  } catch { return NextResponse.json({ok:false}); }
}
