import { FieldValue } from 'firebase-admin/firestore';
import { NextRequest, NextResponse } from 'next/server';
import { getFirestoreDb } from '@/lib/firebase-admin';
import { getRequestSessionUser } from '@/lib/session';

// Default question count for the standard full-length Matematikprov flow.
const DEFAULT_TOTAL_QUESTIONS = 75;

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const user = await getRequestSessionUser(request);

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json()) as {
    testName?: string;
    category?: string;
    totalQuestions?: number;
    correctAnswers?: number;
  };

  const totalQuestions = Math.max(1, Number(body.totalQuestions ?? DEFAULT_TOTAL_QUESTIONS));
  const correctAnswers = Math.min(Math.max(0, Number(body.correctAnswers ?? 0)), totalQuestions);
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const docRef = await getFirestoreDb().collection('results').add({
    userId: user.uid,
    userEmail: user.email,
    testId: id,
    testName: body.testName ?? `Prov ${id}`,
    category: body.category ?? 'Matematik',
    totalQuestions,
    correctAnswers,
    percentage,
    createdAt: FieldValue.serverTimestamp()
  });

  return NextResponse.json(
    {
      message: `Submitted test ${id}`,
      resultId: docRef.id,
      percentage,
      correctAnswers,
      totalQuestions
    },
    { status: 200 }
  );
}
