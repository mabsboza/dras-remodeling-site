import { NextResponse } from 'next/server';
import { Resend } from 'resend';

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

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');

  return request.headers.get('cf-connecting-ip') || forwardedFor?.split(',')[0]?.trim();
}

async function verifyTurnstile(request: Request, token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret || !token) {
    return false;
  }

  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);

  const clientIp = getClientIp(request);
  if (clientIp) {
    body.append('remoteip', clientIp);
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    });

    if (!response.ok) {
      return false;
    }

    const outcome = (await response.json()) as { success?: boolean };

    return outcome.success === true;
  } catch {
    return false;
  }
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

  const turnstilePassed = await verifyTurnstile(request, turnstileToken);

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
