// @ts-nocheck
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function POST(req: Request) {
  try {
    const { newUserId, newUsername, referrerId } = await req.json();
    if (!newUserId || !referrerId || newUserId === referrerId) {
      return NextResponse.json({ ok: true });
    }
    const client = await clientPromise;
    const db = client.db('ankh');
    const friendsCol = db.collection('friends');
    const users = db.collection('users');

    const exists = await friendsCol.findOne({ newUserId });
    if (exists) return NextResponse.json({ ok: true });

    await friendsCol.insertOne({
      referrerId,
      newUserId,
      newUsername: newUsername || 'Friend',
      createdAt: new Date(),
    });

    await users.updateOne(
      { userId: referrerId },
      { $inc: { referralEarnings: 50 } },
      { upsert: true }
    );

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
