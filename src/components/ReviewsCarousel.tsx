'use client';

import { useEffect, useEffectEvent, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import type { Review } from '@/lib/site';

type ReviewsCarouselProps = {
  reviews: Review[];
};

export default function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [reviewIndex, setReviewIndex] = useState(0);

  const showReview = (nextIndex: number) => {
    setReviewIndex((nextIndex + reviews.length) % reviews.length);
  };

  const showPreviousReview = () => {
    if (reviews.length < 2) return;
    showReview(reviewIndex - 1);
  };

  const showNextReview = () => {
    if (reviews.length < 2) return;
    showReview(reviewIndex + 1);
  };

  const advanceReview = useEffectEvent(() => {
    setReviewIndex((current) => (current + 1) % reviews.length);
  });

  useEffect(() => {
    if (reviews.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      advanceReview();
    }, 4500);

    return () => {
      window.clearInterval(interval);
    };
  }, [advanceReview, reviews.length]);

  return (
    <div className="mt-12 md:mx-auto md:max-w-3xl">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
          {reviews.length === 0 ? '0 / 0' : `${reviewIndex + 1} / ${reviews.length}`}
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous review"
            className="flex h-10 w-10 items-center justify-center border border-smoke text-charcoal transition hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
            onClick={showPreviousReview}
            disabled={reviews.length < 2}
          >
            <ChevronLeft aria-hidden="true" size={20} />
          </button>
          <button
            type="button"
            aria-label="Next review"
            className="flex h-10 w-10 items-center justify-center border border-smoke text-charcoal transition hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
            onClick={showNextReview}
            disabled={reviews.length < 2}
          >
            <ChevronRight aria-hidden="true" size={20} />
          </button>
        </div>
      </div>

      <div className="mt-5 overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${reviewIndex * 100}%)` }}
        >
          {reviews.map((review) => (
            <article key={`${review.name}-${review.date}-${review.comment}`} className="card flex min-h-[220px] w-full shrink-0 flex-col p-5 md:min-h-[240px] md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex text-gold" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      aria-hidden="true"
                      size={18}
                      className={starIndex < review.rating ? 'fill-current' : 'text-neutral-300'}
                    />
                  ))}
                </div>
                <p className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-neutral-500">
                  <CalendarDays aria-hidden="true" size={13} />
                  {review.date}
                </p>
              </div>

              <p className="mt-4 flex-1 max-w-3xl text-sm leading-6 text-neutral-700 md:text-[15px]">"{review.comment}"</p>

              <div className="mt-5 border-t border-smoke pt-3">
                <p className="text-xs font-bold uppercase tracking-widest text-charcoal">{review.name}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {reviews.length > 1 ? (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {reviews.map((review, index) => (
            <button
              key={`${review.name}-${review.date}-dot`}
              type="button"
              aria-label={`Show review ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                index === reviewIndex ? 'bg-gold' : 'bg-neutral-300 hover:bg-neutral-400'
              }`}
              onClick={() => showReview(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
