import { NextRequest, NextResponse } from 'next/server';
import { getFirestoreDb } from '@/lib/firebase-admin';
import { getRequestSessionUser } from '@/lib/session';

type UserResult = {
  id: string;
  testId: string;
  testName: string;
  category: string;
  correctAnswers: number;
  totalQuestions: number;
  percentage: number;
  createdAt: string;
};

export async function GET(request: NextRequest) {
  const user = await getRequestSessionUser(request);

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const snapshot = await getFirestoreDb()
    .collection('results')
    .where('userId', '==', user.uid)
    .orderBy('createdAt', 'desc')
    .limit(50)
    .get();

  const results: UserResult[] = snapshot.docs.map((doc) => {
    const data = doc.data() as {
      testId?: string;
      testName?: string;
      category?: string;
      correctAnswers?: number;
      totalQuestions?: number;
      percentage?: number;
      createdAt?: { toDate: () => Date };
    };

    return {
      id: doc.id,
      testId: data.testId ?? '',
      testName: data.testName ?? `Prov ${data.testId ?? ''}`,
      category: data.category ?? 'Matematik',
      correctAnswers: data.correctAnswers ?? 0,
      totalQuestions: data.totalQuestions ?? 0,
      percentage: data.percentage ?? 0,
      createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : new Date().toISOString()
    };
  });

  return NextResponse.json({ results }, { status: 200 });
}
