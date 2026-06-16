'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CalendarDays, ChevronLeft, ChevronRight, Eye, Images, Star, X } from 'lucide-react';
import type { FeaturedProject } from '@/lib/site';

type ProjectGalleryProps = {
  projects: FeaturedProject[];
};

type SelectedProject = {
  project: FeaturedProject;
  imageIndex: number;
  reviewIndex: number;
};

export default function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<SelectedProject | null>(null);

  const closeModal = () => setSelectedProject(null);

  const showImage = (imageIndex: number) => {
    setSelectedProject((current) => {
      if (!current) return current;
      const imageCount = current.project.images.length;
      return {
        ...current,
        imageIndex: (imageIndex + imageCount) % imageCount
      };
    });
  };

  const showNextImage = () => {
    if (!selectedProject) return;
    showImage(selectedProject.imageIndex + 1);
  };

  const showPreviousImage = () => {
    if (!selectedProject) return;
    showImage(selectedProject.imageIndex - 1);
  };

  const showReview = (reviewIndex: number) => {
    setSelectedProject((current) => {
      if (!current) return current;
      const reviewCount = current.project.reviews.length;
      return {
        ...current,
        reviewIndex: (reviewIndex + reviewCount) % reviewCount
      };
    });
  };

  const showNextReview = () => {
    if (!selectedProject || selectedProject.project.reviews.length < 2) return;
    showReview(selectedProject.reviewIndex + 1);
  };

  const showPreviousReview = () => {
    if (!selectedProject || selectedProject.project.reviews.length < 2) return;
    showReview(selectedProject.reviewIndex - 1);
  };

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
      if (event.key === 'ArrowRight') showImage(selectedProject.imageIndex + 1);
      if (event.key === 'ArrowLeft') showImage(selectedProject.imageIndex - 1);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.id} className="card overflow-hidden">
            <button
              type="button"
              aria-label={`Open ${project.title} project gallery`}
              className="group relative block h-80 w-full overflow-hidden text-left md:h-96"
              onClick={() => setSelectedProject({ project, imageIndex: 0, reviewIndex: 0 })}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                unoptimized
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 bg-charcoal px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white">
                {project.category}
              </span>
              <span className="absolute bottom-4 right-4 inline-flex h-10 w-10 items-center justify-center bg-white/95 text-charcoal shadow-soft transition group-hover:bg-gold group-hover:text-white">
                <Images aria-hidden="true" size={18} />
              </span>
            </button>

            <div className="p-7">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-sm font-bold text-gold">Project #{project.id.toString().padStart(2, '0')}</p>
                  <h3 className="mt-2 font-display text-3xl uppercase text-charcoal">{project.title}</h3>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-600">{project.summary}</p>
                </div>
                <button
                  type="button"
                  className="gold-btn shrink-0 gap-2 self-start"
                  onClick={() => setSelectedProject({ project, imageIndex: 0, reviewIndex: 0 })}
                >
                  <Eye aria-hidden="true" size={16} />
                  View Project
                </button>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {project.images.slice(0, 3).map((image, imageIndex) => (
                  <button
                    key={image}
                    type="button"
                    aria-label={`Open ${project.title} image ${imageIndex + 1}`}
                    className="relative aspect-[4/3] overflow-hidden bg-smoke"
                    onClick={() => setSelectedProject({ project, imageIndex, reviewIndex: 0 })}
                  >
                    <Image
                      src={image}
                      alt={`${project.title} detail ${imageIndex + 1}`}
                      fill
                      unoptimized
                      sizes="(min-width: 768px) 16vw, 33vw"
                      className="object-cover transition duration-300 hover:scale-105"
                    />
                    {imageIndex === 2 && project.images.length > 3 ? (
                      <span className="absolute inset-0 flex items-center justify-center bg-charcoal/60 text-xs font-bold uppercase tracking-widest text-white">
                        +{project.images.length - 3}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {project.highlights.map((highlight) => (
                  <div key={highlight} className="bg-[#f5f1ea] px-4 py-3 text-xs font-bold uppercase tracking-wide text-neutral-700">
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {selectedProject ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 px-4 py-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`${selectedProject.project.title} gallery`}>
          <button className="absolute inset-0 cursor-default" type="button" aria-label="Close project gallery" onClick={closeModal} />

          <div className="relative z-10 grid max-h-[92vh] w-full max-w-6xl overflow-hidden bg-white shadow-soft md:grid-cols-[1fr_320px]">
            <div className="relative flex min-h-[360px] items-center justify-center bg-black md:min-h-[680px]">
              <Image
                src={selectedProject.project.images[selectedProject.imageIndex]}
                alt={`${selectedProject.project.title} slide ${selectedProject.imageIndex + 1}`}
                fill
                unoptimized
                sizes="(min-width: 768px) 70vw, 100vw"
                className="object-contain"
                priority
              />

              <button
                type="button"
                aria-label="Previous image"
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-white/90 text-charcoal transition hover:bg-gold hover:text-white"
                onClick={showPreviousImage}
              >
                <ChevronLeft aria-hidden="true" size={22} />
              </button>
              <button
                type="button"
                aria-label="Next image"
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-white/90 text-charcoal transition hover:bg-gold hover:text-white"
                onClick={showNextImage}
              >
                <ChevronRight aria-hidden="true" size={22} />
              </button>
            </div>

            <aside className="max-h-[92vh] overflow-y-auto p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="kicker">{selectedProject.project.category}</p>
                  <h3 className="mt-3 font-display text-3xl uppercase leading-tight text-charcoal">{selectedProject.project.title}</h3>
                </div>
                <button
                  type="button"
                  aria-label="Close project gallery"
                  className="flex h-10 w-10 shrink-0 items-center justify-center border border-smoke text-charcoal transition hover:border-gold hover:text-gold"
                  onClick={closeModal}
                >
                  <X aria-hidden="true" size={20} />
                </button>
              </div>

              <p className="mt-5 text-sm leading-6 text-neutral-600">{selectedProject.project.summary}</p>
              <p className="mt-5 text-xs font-bold uppercase tracking-widest text-neutral-500">
                Image {selectedProject.imageIndex + 1} of {selectedProject.project.images.length}
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {selectedProject.project.images.map((image, imageIndex) => (
                  <button
                    key={image}
                    type="button"
                    aria-label={`Show image ${imageIndex + 1}`}
                    className={`relative aspect-square overflow-hidden border-2 bg-smoke ${
                      imageIndex === selectedProject.imageIndex ? 'border-gold' : 'border-transparent'
                    }`}
                    onClick={() => showImage(imageIndex)}
                  >
                    <Image
                      src={image}
                      alt={`${selectedProject.project.title} thumbnail ${imageIndex + 1}`}
                      fill
                      unoptimized
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {selectedProject.project.highlights.map((highlight) => (
                  <div key={highlight} className="bg-[#f5f1ea] px-4 py-3 text-xs font-bold uppercase tracking-wide text-neutral-700">
                    {highlight}
                  </div>
                ))}
              </div>

              <section className="mt-8 border-t border-smoke pt-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="kicker">Reviews</p>
                    <h4 className="mt-2 font-display text-2xl uppercase text-charcoal">Client Feedback</h4>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                    {selectedProject.reviewIndex + 1} / {selectedProject.project.reviews.length}
                  </span>
                </div>

                <div className="mt-5">
                  <div className="overflow-hidden">
                    <div
                      className="flex transition-transform duration-300 ease-out"
                      style={{ transform: `translateX(-${selectedProject.reviewIndex * 100}%)` }}
                    >
                      {selectedProject.project.reviews.map((review) => (
                        <article key={`${review.name}-${review.date}`} className="w-full shrink-0 border border-smoke bg-[#f5f1ea] p-4">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex text-gold" aria-label={`${review.rating} out of 5 stars`}>
                              {Array.from({ length: 5 }).map((_, starIndex) => (
                                <Star
                                  key={starIndex}
                                  aria-hidden="true"
                                  size={16}
                                  className={starIndex < review.rating ? 'fill-current' : 'text-neutral-300'}
                                />
                              ))}
                            </div>
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-neutral-500">
                              <CalendarDays aria-hidden="true" size={13} />
                              {review.date}
                            </span>
                          </div>

                          <p className="mt-4 text-sm leading-6 text-neutral-700">"{review.comment}"</p>
                          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-charcoal">{review.name}</p>
                        </article>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      aria-label="Previous review"
                      className="flex h-10 w-10 items-center justify-center border border-smoke text-charcoal transition hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
                      onClick={showPreviousReview}
                      disabled={selectedProject.project.reviews.length < 2}
                    >
                      <ChevronLeft aria-hidden="true" size={20} />
                    </button>

                    <div className="flex items-center gap-2">
                      {selectedProject.project.reviews.map((review, reviewIndex) => (
                        <button
                          key={`${review.name}-${review.date}-dot`}
                          type="button"
                          aria-label={`Show review ${reviewIndex + 1}`}
                          className={`h-2.5 w-2.5 rounded-full transition ${
                            reviewIndex === selectedProject.reviewIndex ? 'bg-gold' : 'bg-neutral-300 hover:bg-neutral-400'
                          }`}
                          onClick={() => showReview(reviewIndex)}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      aria-label="Next review"
                      className="flex h-10 w-10 items-center justify-center border border-smoke text-charcoal transition hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
                      onClick={showNextReview}
                      disabled={selectedProject.project.reviews.length < 2}
                    >
                      <ChevronRight aria-hidden="true" size={20} />
                    </button>
                  </div>
                </div>

              </section>
            </aside>
          </div>
        </div>
      ) : null}
    </>
  );
}
