import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { verifyTurnstileToken } from '@/lib/turnstile';

type ContactStatus = 'sent' | 'missing-env' | 'turnstile';

function contactRedirect(request: Request, status: ContactStatus) {
  const requestUrl = new URL(request.url);
  const redirectUrl = new URL('/', requestUrl);
  const referer = request.headers.get('referer');

  if (referer) {
    try {
      const refererUrl = new URL(referer);

      if (refererUrl.origin === requestUrl.origin) {
        redirectUrl.pathname = refererUrl.pathname;
      }
    } catch {
      redirectUrl.pathname = '/';
    }
  }

  redirectUrl.searchParams.set('contact', status);
  redirectUrl.hash = 'contact';

  return NextResponse.redirect(redirectUrl, 303);
}

export async function POST(request: Request) {
  const form = await request.formData();
  const name = String(form.get('name') || '');
  const email = String(form.get('email') || '');
  const phone = String(form.get('phone') || '');
  const service = String(form.get('service') || '');
  const message = String(form.get('message') || '');
  const turnstileToken = String(form.get('cf-turnstile-response') || '');

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL || !process.env.TURNSTILE_SECRET_KEY) {
    return contactRedirect(request, 'missing-env');
  }

  const turnstilePassed = await verifyTurnstileToken(request, turnstileToken);

  if (!turnstilePassed) {
    return contactRedirect(request, 'turnstile');
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || 'DRAS Website <onboarding@resend.dev>',
    to: process.env.CONTACT_TO_EMAIL,
    subject: `New quote request from ${name}`,
    replyTo: email,
    text: `Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}

${message}`
  });

  return contactRedirect(request, 'sent');
}
