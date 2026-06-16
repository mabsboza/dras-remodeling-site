export function isTurnstileConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY);
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');

  return request.headers.get('cf-connecting-ip') || forwardedFor?.split(',')[0]?.trim();
}

export async function verifyTurnstileToken(request: Request, token: string) {
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
