import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectGallery from '@/components/ProjectGallery';
import { featuredProjects, services } from '@/lib/site';
import { formatReviewDate, getApprovedProjectReviews } from '@/lib/reviews';

const categories = Array.from(new Set(featuredProjects.map((project) => project.category)));

export default async function ServicesPage() {
  const approvedReviews = await getApprovedProjectReviews();
  const approvedReviewsByProject = new Map<number, typeof featuredProjects[number]['reviews']>();

  for (const review of approvedReviews) {
    if (!review.project_id) continue;

    const projectReviews = approvedReviewsByProject.get(review.project_id) || [];
    projectReviews.push({
      rating: review.rating,
      comment: review.comment,
      name: review.name,
      date: formatReviewDate(review.created_at),
    });
    approvedReviewsByProject.set(review.project_id, projectReviews);
  }

  const projectsWithApprovedReviews = featuredProjects.map((project) => {
    const projectReviews = approvedReviewsByProject.get(project.id);

    return {
      ...project,
      reviews: projectReviews && projectReviews.length > 0 ? projectReviews : project.reviews,
    };
  });

  return (
    <main>
      <Navbar />
      <section className="pt-32 pb-20 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero.svg')] bg-cover bg-center opacity-25" />
        <div className="relative mx-auto max-w-7xl px-5">
          <p className="kicker">Services</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl uppercase max-w-4xl">Remodeling Services & Featured Projects</h1>
          <p className="mt-6 max-w-2xl text-white/75">Detailed service page with the most important project types divided by kitchens, bathrooms, flooring, full renovations and finishing work.</p>
        </div>
      </section>

      <section className="py-20 bg-[#f5f1ea]">
        <div className="mx-auto max-w-7xl px-5">
          <div className="text-center max-w-3xl mx-auto">
            <p className="kicker">What We Do</p>
            <h2 className="section-title mt-3">Core Services</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {services.map((service) => (
              <article key={service.slug} className="card overflow-hidden group">
                <div className="relative h-48">
                  <Image src={service.image} alt={service.title} fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl uppercase text-charcoal">{service.title}</h3>
                  <p className="mt-3 text-sm text-neutral-600">{service.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-white">
        <div className="mx-auto max-w-[92rem] px-5">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="kicker">Portfolio Details</p>
              <h2 className="section-title mt-3">10 Key Project Types</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => <span key={category} className="text-xs uppercase tracking-widest border border-smoke px-4 py-2 text-neutral-600">{category}</span>)}
            </div>
          </div>

          <ProjectGallery projects={projectsWithApprovedReviews} />
        </div>
      </section>

      <section className="bg-charcoal py-16 text-center text-white">
        <p className="kicker">Need an estimate?</p>
        <h2 className="mt-3 font-display text-4xl uppercase">Start with a free consultation</h2>
        <Link href="/contact" className="gold-btn mt-8">Contact Us</Link>
      </section>
      <Footer />
    </main>
  );
}
