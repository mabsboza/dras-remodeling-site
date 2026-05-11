import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  const form = await request.formData();
  const name = String(form.get('name') || '');
  const email = String(form.get('email') || '');
  const phone = String(form.get('phone') || '');
  const service = String(form.get('service') || '');
  const message = String(form.get('message') || '');

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
    return NextResponse.redirect(new URL('/?contact=missing-env', request.url), 303);
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

  return NextResponse.redirect(new URL('/?contact=sent#contact', request.url), 303);
}
