import { Star } from 'lucide-react';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import ReviewForm from '@/components/ReviewForm';
import { clientReviews, type Review } from '@/lib/site';
import { formatReviewDate, getApprovedGeneralReviews } from '@/lib/reviews';

export default async function Reviews() {
  const approvedReviews = await getApprovedGeneralReviews(10);
  const reviews: Review[] = approvedReviews.length > 0
    ? approvedReviews.map((review) => ({
        rating: review.rating,
        comment: review.comment,
        name: review.name,
        date: formatReviewDate(review.created_at),
      }))
    : clientReviews;

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="kicker">Client Reviews</p>
            <h2 className="section-title mt-3">What Homeowners Say</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-600">
              A few notes from clients after kitchen, bathroom, flooring, and full home remodeling projects.
            </p>
          </div>
          <div className="flex items-center gap-2 text-gold" aria-label="5 out of 5 average rating">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} aria-hidden="true" size={20} className="fill-current" />
            ))}
          </div>
        </div>

        <ReviewsCarousel reviews={reviews} />

        <div className="mt-12 grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div className="pt-2">
            <p className="kicker">Your Experience</p>
            <h3 className="mt-3 font-display text-4xl uppercase text-charcoal">Tell Us How We Did</h3>
            <p className="mt-5 text-sm leading-7 text-neutral-600">
              Submit your review and the team will check it before it appears on the website.
            </p>
          </div>
          <ReviewForm />
        </div>
      </div>
    </section>
  );
}
