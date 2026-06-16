export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export type ReviewRecord = {
  id: string;
  name: string;
  project_type: string;
  project_id: number | null;
  project_title: string | null;
  rating: number;
  comment: string;
  status: ReviewStatus;
  created_at: string;
  reviewed_at: string | null;
};

export type CreateReviewInput = {
  name: string;
  projectType: string;
  projectId?: number | null;
  projectTitle?: string | null;
  rating: number;
  comment: string;
};

const REVIEWS_TABLE = process.env.SUPABASE_REVIEWS_TABLE || 'reviews';

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ''),
    serviceRoleKey,
  };
}

export function isReviewsStorageConfigured() {
  return Boolean(getSupabaseConfig());
}

function supabaseHeaders(prefer?: string) {
  const config = getSupabaseConfig();

  if (!config) {
    throw new Error('Supabase reviews storage is not configured.');
  }

  return {
    apikey: config.serviceRoleKey,
    Authorization: `Bearer ${config.serviceRoleKey}`,
    'Content-Type': 'application/json',
    ...(prefer ? { Prefer: prefer } : {}),
  };
}

async function supabaseRequest<T>(path: string, init?: RequestInit) {
  const config = getSupabaseConfig();

  if (!config) {
    throw new Error('Supabase reviews storage is not configured.');
  }

  const response = await fetch(`${config.url}/rest/v1/${REVIEWS_TABLE}${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      ...supabaseHeaders(),
      ...(init?.headers as Record<string, string> | undefined),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Supabase request failed with status ${response.status}.`);
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
}

function cleanText(value: string, maxLength: number) {
  return value.trim().replace(/\s+/g, ' ').slice(0, maxLength);
}

export function formatReviewDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export async function createReview(input: CreateReviewInput) {
  const rating = Math.max(1, Math.min(5, Math.round(input.rating)));
  const name = cleanText(input.name, 80);
  const projectType = cleanText(input.projectType, 80);
  const projectTitle = input.projectTitle ? cleanText(input.projectTitle, 120) : null;
  const comment = cleanText(input.comment, 1200);

  if (!name || !projectType || !comment) {
    throw new Error('Missing required review fields.');
  }

  const [review] = await supabaseRequest<ReviewRecord[]>('?select=*', {
    method: 'POST',
    headers: supabaseHeaders('return=representation'),
    body: JSON.stringify({
      name,
      project_type: projectType,
      project_id: input.projectId || null,
      project_title: projectTitle,
      rating,
      comment,
      status: 'pending',
    }),
  });

  return review;
}

export async function listReviews(status: ReviewStatus = 'pending') {
  const params = new URLSearchParams({
    select: '*',
    status: `eq.${status}`,
    order: 'created_at.desc',
  });

  return supabaseRequest<ReviewRecord[]>(`?${params.toString()}`);
}

export async function getApprovedGeneralReviews(limit = 5) {
  const params = new URLSearchParams({
    select: '*',
    status: 'eq.approved',
    project_id: 'is.null',
    order: 'created_at.desc',
    limit: String(limit),
  });

  try {
    return await supabaseRequest<ReviewRecord[]>(`?${params.toString()}`);
  } catch {
    return [];
  }
}

export async function getApprovedProjectReviews() {
  const params = new URLSearchParams({
    select: '*',
    status: 'eq.approved',
    project_id: 'not.is.null',
    order: 'created_at.desc',
    limit: '100',
  });

  try {
    return await supabaseRequest<ReviewRecord[]>(`?${params.toString()}`);
  } catch {
    return [];
  }
}

export async function updateReviewStatus(id: string, status: Exclude<ReviewStatus, 'pending'>) {
  const now = new Date().toISOString();
  const params = new URLSearchParams({
    id: `eq.${id}`,
    select: '*',
  });

  const [review] = await supabaseRequest<ReviewRecord[]>(`?${params.toString()}`, {
    method: 'PATCH',
    headers: supabaseHeaders('return=representation'),
    body: JSON.stringify({
      status,
      reviewed_at: now,
    }),
  });

  return review;
}
