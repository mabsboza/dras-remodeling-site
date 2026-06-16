import { NextResponse } from 'next/server';
import { updateReviewStatus } from '@/lib/reviews';

type ModerateAction = 'approved' | 'rejected';

function redirectToAdmin(request: Request, token: string, message: string) {
  const url = new URL('/admin/reviews', request.url);
  url.searchParams.set('token', token);
  url.searchParams.set('message', message);

  return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
  const form = await request.formData();
  const token = String(form.get('token') || '');
  const reviewId = String(form.get('reviewId') || '');
  const action = String(form.get('action') || '') as ModerateAction;

  if (!process.env.REVIEW_ADMIN_TOKEN || token !== process.env.REVIEW_ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  if (!reviewId || (action !== 'approved' && action !== 'rejected')) {
    return redirectToAdmin(request, token, 'invalid');
  }

  try {
    await updateReviewStatus(reviewId, action);
    return redirectToAdmin(request, token, action);
  } catch {
    return redirectToAdmin(request, token, 'error');
  }
}
