'use client';

import { FormEvent, useState } from 'react';
import { Send, Star } from 'lucide-react';
import TurnstileWidget from '@/components/TurnstileWidget';

const projectTypes = [
  'Kitchen',
  'Bathroom',
  'Flooring',
  'Full Renovation',
  'Exterior & More',
  'General Remodeling',
];

type ReviewFormProps = {
  title?: string;
  defaultProjectType?: string;
  projectId?: number;
  projectTitle?: string;
  compact?: boolean;
};

export default function ReviewForm({
  title = 'Leave a Review',
  defaultProjectType = 'General Remodeling',
  projectId,
  projectTitle,
  compact = false,
}: ReviewFormProps) {
  const [name, setName] = useState('');
  const [projectType, setProjectType] = useState(defaultProjectType);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setMessage('');

    if (turnstileSiteKey && !turnstileToken) {
      setStatus('error');
      setMessage('Please complete the security check and try again.');
      return;
    }

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          projectType,
          projectId,
          projectTitle,
          rating,
          comment,
          turnstileToken,
        }),
      });

      const result = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(result.error || 'We could not submit your review right now.');
      }

      setStatus('success');
      setMessage(result.message || 'Thank you. Your review was submitted for approval.');
      setName('');
      setProjectType(defaultProjectType);
      setRating(5);
      setComment('');
      setTurnstileToken('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'We could not submit your review right now.');
    } finally {
      if (turnstileSiteKey) {
        setTurnstileResetSignal((current) => current + 1);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`border border-smoke bg-white text-charcoal shadow-soft ${compact ? 'p-4' : 'p-6 md:p-8'}`}>
      <div className="flex flex-col gap-2">
        <p className="kicker">Share Feedback</p>
        <h3 className={`font-display uppercase text-charcoal ${compact ? 'text-2xl' : 'text-3xl'}`}>{title}</h3>
      </div>

      <div className="mt-5 grid gap-4">
        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          name="name"
          placeholder="Your name"
          className="border border-smoke px-4 py-3 text-sm outline-none transition focus:border-gold"
        />

        <select
          required
          value={projectType}
          onChange={(event) => setProjectType(event.target.value)}
          name="projectType"
          className="border border-smoke px-4 py-3 text-sm outline-none transition focus:border-gold"
        >
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Rating</p>
          <div className="mt-2 flex gap-1 text-gold" role="radiogroup" aria-label="Review rating">
            {Array.from({ length: 5 }).map((_, index) => {
              const value = index + 1;

              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={rating === value}
                  aria-label={`${value} star${value === 1 ? '' : 's'}`}
                  className="p-1 transition hover:scale-110"
                  onClick={() => setRating(value)}
                >
                  <Star aria-hidden="true" size={22} className={index < rating ? 'fill-current' : 'text-neutral-300'} />
                </button>
              );
            })}
          </div>
        </div>

        <textarea
          required
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          name="comment"
          placeholder="Write your review"
          rows={compact ? 4 : 5}
          className="border border-smoke px-4 py-3 text-sm outline-none transition focus:border-gold"
        />

        {turnstileSiteKey ? (
          <TurnstileWidget onTokenChange={setTurnstileToken} resetSignal={turnstileResetSignal} />
        ) : null}

        {message ? (
          <div
            role={status === 'error' ? 'alert' : 'status'}
            className={`border px-4 py-3 text-sm font-semibold ${
              status === 'error' ? 'border-red-200 bg-red-50 text-red-800' : 'border-green-200 bg-green-50 text-green-800'
            }`}
          >
            {message}
          </div>
        ) : null}

        <button type="submit" className="gold-btn w-fit gap-2 disabled:cursor-not-allowed disabled:opacity-60" disabled={status === 'submitting'}>
          <Send aria-hidden="true" size={15} />
          {status === 'submitting' ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>
    </form>
  );
}
