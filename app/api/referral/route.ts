import { NextResponse } from 'next/server';

export async function POST(req: Request){
  try {
    const { newUserId, newUsername, referrerId } = await req.json();
    
    console.log("NEW REFERRAL:", { newUserId, referrerId });

    // هنا بعدين هنوصله بـ Supabase
    // مؤقتا بنرجع ok عشان نتأكد ان الـ fetch شغال

    return NextResponse.json({ ok: true, message: "Referral received" });
  } catch(e){
    return NextResponse.json({ ok: false, error: String(e) });
  }
}
