import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function POST(req: Request){
  try {
    const { newUserId, newUsername, referrerId } = await req.json();
    
    if (!newUserId || !referrerId || newUserId === referrerId) {
      return NextResponse.json({ ok: false });
    }

    const client = await clientPromise;
    const db = client.db('ankh');
    const users = db.collection('users');

    // هل الجديد ده اتسجل قبل كده؟
    const existingNew = await users.findOne({ telegramId: newUserId });
    if (existingNew?.referredBy) {
      return NextResponse.json({ ok: true, message: "already referred" });
    }

    // احفظ ان الجديد اتدعى
    await users.updateOne(
      { telegramId: newUserId },
      { $set: { telegramId: newUserId, username: newUsername, referredBy: referrerId, createdAt: new Date() } },
      { upsert: true }
    );

    // زود للقديم 1 دعوة
    const alreadyFriend = await users.findOne({ 
      telegramId: referrerId, 
      "friends.id": newUserId 
    });

    if (!alreadyFriend) {
      await users.updateOne(
        { telegramId: referrerId },
        { 
          $push: { friends: { id: newUserId, name: newUsername || `User ${newUserId}`, level: 1, reward: 100, date: new Date() } },
          $inc: { earnings: 100, friendsCount: 1 },
          $setOnInsert: { createdAt: new Date() }
        },
        { upsert: true }
      );
    }

    return NextResponse.json({ ok: true, counted: true });
  } catch(e){
    console.error(e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
