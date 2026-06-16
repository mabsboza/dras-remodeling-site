import Link from 'next/link';
import { CalendarDays, Star } from 'lucide-react';
import { listReviews, type ReviewRecord, type ReviewStatus } from '@/lib/reviews';

export const dynamic = 'force-dynamic';

type AdminReviewsPageProps = {
  searchParams?: Promise<{
    token?: string;
    status?: ReviewStatus;
    message?: string;
  }>;
};

const statuses: ReviewStatus[] = ['pending', 'approved', 'rejected'];

function getMessage(message?: string) {
  if (message === 'approved') return 'Review approved.';
  if (message === 'rejected') return 'Review rejected.';
  if (message === 'invalid') return 'Review action was invalid.';
  if (message === 'error') return 'We could not update that review.';

  return null;
}

function ReviewStars({ rating }: { rating: number }) {
  return (
    <div className="flex text-gold" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} aria-hidden="true" size={17} className={index < rating ? 'fill-current' : 'text-neutral-300'} />
      ))}
    </div>
  );
}

function ReviewCard({ review, token, canModerate }: { review: ReviewRecord; token: string; canModerate: boolean }) {
  return (
    <article className="card p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <ReviewStars rating={review.rating} />
          <h2 className="mt-4 font-display text-2xl uppercase text-charcoal">{review.name}</h2>
          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-neutral-500">{review.project_type}</p>
          {review.project_title ? <p className="mt-2 text-sm text-neutral-600">{review.project_title}</p> : null}
        </div>
        <p className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-neutral-500">
          <CalendarDays aria-hidden="true" size={13} />
          {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(review.created_at))}
        </p>
      </div>

      <p className="mt-5 text-sm leading-7 text-neutral-700">"{review.comment}"</p>

      {canModerate ? (
        <div className="mt-6 flex flex-wrap gap-3 border-t border-smoke pt-5">
          <form action="/api/reviews/moderate" method="POST">
            <input type="hidden" name="token" value={token} />
            <input type="hidden" name="reviewId" value={review.id} />
            <input type="hidden" name="action" value="approved" />
            <button type="submit" className="gold-btn">
              Approve
            </button>
          </form>
          <form action="/api/reviews/moderate" method="POST">
            <input type="hidden" name="token" value={token} />
            <input type="hidden" name="reviewId" value={review.id} />
            <input type="hidden" name="action" value="rejected" />
            <button type="submit" className="inline-flex items-center justify-center border border-smoke px-6 py-3 text-xs font-bold uppercase tracking-wide text-charcoal transition hover:border-red-300 hover:text-red-700">
              Reject
            </button>
          </form>
        </div>
      ) : null}
    </article>
  );
}

export default async function AdminReviewsPage({ searchParams }: AdminReviewsPageProps) {
  const params = await searchParams;
  const token = params?.token || '';
  const activeStatus = statuses.includes(params?.status || 'pending') ? (params?.status || 'pending') : 'pending';
  const message = getMessage(params?.message);
  const isAuthorized = Boolean(process.env.REVIEW_ADMIN_TOKEN && token === process.env.REVIEW_ADMIN_TOKEN);
  let reviews: ReviewRecord[] = [];
  let loadError = '';

  if (isAuthorized) {
    try {
      reviews = await listReviews(activeStatus);
    } catch {
      loadError = 'Reviews could not be loaded. Check the Supabase configuration.';
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f1ea] py-16">
      <div className="mx-auto max-w-5xl px-5">
        <Link href="/" className="text-xs font-bold uppercase tracking-widest text-gold">
          Back to site
        </Link>

        <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">Admin</p>
            <h1 className="section-title mt-3">Review Moderation</h1>
          </div>
          {isAuthorized ? (
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => {
                const url = `/admin/reviews?token=${encodeURIComponent(token)}&status=${status}`;

                return (
                  <Link
                    key={status}
                    href={url}
                    className={`border px-4 py-2 text-xs font-bold uppercase tracking-widest transition ${
                      activeStatus === status ? 'border-gold bg-gold text-white' : 'border-smoke bg-white text-neutral-600 hover:border-gold'
                    }`}
                  >
                    {status}
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>

        {!isAuthorized ? (
          <section className="card mt-10 p-8">
            <h2 className="font-display text-3xl uppercase text-charcoal">Access required</h2>
            <p className="mt-4 text-sm leading-7 text-neutral-600">
              Open this page from the review notification email, or include the admin token in the URL.
            </p>
          </section>
        ) : null}

        {message ? (
          <div className="mt-8 border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800" role="status">
            {message}
          </div>
        ) : null}

        {loadError ? (
          <div className="mt-8 border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800" role="alert">
            {loadError}
          </div>
        ) : null}

        {isAuthorized && !loadError ? (
          <section className="mt-10 grid gap-5">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard key={review.id} review={review} token={token} canModerate={activeStatus === 'pending'} />
              ))
            ) : (
              <div className="card p-8 text-sm font-semibold text-neutral-600">No {activeStatus} reviews found.</div>
            )}
          </section>
        ) : null}
      </div>
    </main>
  );
}
