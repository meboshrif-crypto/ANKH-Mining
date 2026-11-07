import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET(req: Request){
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if(!userId) return NextResponse.json({ ok: false, friends: [] });

    const client = await clientPromise;
    const db = client.db('ankh');
    const user = await db.collection('users').findOne({ telegramId: userId });

    return NextResponse.json({ 
      ok: true, 
      friends: user?.friends || [], 
      totalEarnings: user?.earnings || 0,
      count: user?.friendsCount || 0
    });
  } catch(e){
    return NextResponse.json({ ok: false, friends: [] });
  }
}
