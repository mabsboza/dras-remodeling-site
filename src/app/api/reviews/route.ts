import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createReview, isReviewsStorageConfigured } from '@/lib/reviews';
import { isTurnstileConfigured, verifyTurnstileToken } from '@/lib/turnstile';

type ReviewPayload = {
  name?: string;
  projectType?: string;
  projectId?: number;
  projectTitle?: string;
  rating?: number;
  comment?: string;
  turnstileToken?: string;
};

function getAdminReviewsUrl(request: Request) {
  const token = process.env.REVIEW_ADMIN_TOKEN;

  if (!token) {
    return null;
  }

  const url = new URL('/admin/reviews', request.url);
  url.searchParams.set('token', token);

  return url.toString();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: Request) {
  let payload: ReviewPayload;

  try {
    payload = (await request.json()) as ReviewPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid review payload.' }, { status: 400 });
  }

  const name = String(payload.name || '').trim();
  const projectType = String(payload.projectType || '').trim();
  const projectTitle = payload.projectTitle ? String(payload.projectTitle).trim() : null;
  const rating = Number(payload.rating || 0);
  const comment = String(payload.comment || '').trim();
  const turnstileToken = String(payload.turnstileToken || '').trim();

  if (!name || !projectType || !comment || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Please complete your name, project type, rating, and review.' }, { status: 400 });
  }

  if (!isReviewsStorageConfigured()) {
    return NextResponse.json({ error: 'Reviews storage is not configured yet.' }, { status: 500 });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL || !process.env.REVIEW_ADMIN_TOKEN || !isTurnstileConfigured()) {
    return NextResponse.json({ error: 'Review notification email is not configured yet.' }, { status: 500 });
  }

  const turnstilePassed = await verifyTurnstileToken(request, turnstileToken);

  if (!turnstilePassed) {
    return NextResponse.json({ error: 'Please complete the security check and try again.' }, { status: 400 });
  }

  try {
    const review = await createReview({
      name,
      projectType,
      projectId: typeof payload.projectId === 'number' ? payload.projectId : null,
      projectTitle,
      rating,
      comment,
    });

    const adminUrl = getAdminReviewsUrl(request);

    if (!adminUrl) {
      return NextResponse.json({ error: 'Review admin token is not configured yet.' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const safeName = escapeHtml(review.name);
    const safeProjectType = escapeHtml(review.project_type);
    const safeProjectTitle = escapeHtml(review.project_title || 'General review');
    const safeComment = escapeHtml(review.comment);
    const safeAdminUrl = escapeHtml(adminUrl);

    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "O'Dara Website <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL,
      subject: `New review pending approval from ${review.name}`,
      text: `A new review is pending approval.

Name: ${review.name}
Project Type: ${review.project_type}
Project: ${review.project_title || 'General review'}
Rating: ${review.rating}/5

${review.comment}

Review it here:
${adminUrl}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #2b2b2b; line-height: 1.6;">
          <h2 style="margin: 0 0 12px;">New review pending approval</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Project type:</strong> ${safeProjectType}</p>
          <p><strong>Project:</strong> ${safeProjectTitle}</p>
          <p><strong>Rating:</strong> ${review.rating}/5</p>
          <p style="border-left: 4px solid #c59a4a; padding-left: 12px;">${safeComment}</p>
          <p style="margin-top: 24px;">
            <a href="${safeAdminUrl}" style="display: inline-block; background: #c59a4a; color: #ffffff; padding: 12px 18px; text-decoration: none; font-weight: 700;">
              Review pending submissions
            </a>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ message: 'Thank you. Your review was submitted for approval.' }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'We could not submit your review right now.' }, { status: 500 });
  }
}
