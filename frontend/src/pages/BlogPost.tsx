import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Check, 
  Compass, 
  ChevronRight, 
  ArrowRight,
  ShieldAlert,
  Lightbulb,
  CheckCircle2,
  User,
  ListOrdered
} from 'lucide-react';
import { getBlogPostBySlug, getRelatedBlogPosts } from '../data/blogPosts';
import { coursesData } from '../data/courses';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';
import { generateArticleSchema, generateBreadcrumbSchema } from '../utils/schemaGenerator';

const formatDate = (dateStr: string): string => {
  try {
    const [year, month, day] = dateStr.split('-');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
};

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!slug) {
    navigate('/blog');
    return null;
  }

  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="pt-36 pb-24 min-h-screen bg-forest-950 text-earth-100 flex items-center justify-center px-4">
        <SEO
          title="Field Dispatch Not Found | India Survival Academy"
          description="The requested wilderness journal article could not be located."
          noIndex={true}
        />
        <div className="max-w-md w-full wilderness-card p-8 sm:p-10 rounded-2xl border border-gold-500/30 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-forest-900 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <Compass className="w-8 h-8" />
          </div>
          <h1 className="font-heading font-bold text-2xl text-white">
            Dispatch Not Found
          </h1>
          <p className="text-xs sm:text-sm text-earth-300">
            This article either moved or is undergoing field review. Explore our full library of wilderness guides.
          </p>
          <div className="pt-2">
            <Button to="/blog" variant="primary" size="md" icon={<ArrowLeft className="w-4 h-4" />}>
              Return to Wilderness Journal
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedBlogPosts(post, 3);
  const relatedCourse = post.relatedCourseId 
    ? coursesData.find((c) => c.id === post.relatedCourseId) 
    : undefined;

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}/blog/${post.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  // Structured schemas: Article JSON-LD + BreadcrumbList JSON-LD
  const schemas = [
    generateArticleSchema(post),
    generateBreadcrumbSchema([
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` }
    ])
  ];

  return (
    <div className="pb-24 bg-forest-950 text-earth-100 min-h-screen">
      <SEO
        title={post.title}
        description={post.excerpt}
        canonicalPath={`/blog/${post.slug}`}
        ogType="article"
        ogImage={post.coverImage}
        keywords={post.tags.join(', ')}
        schema={schemas}
      />

      {/* Top Header & Breadcrumbs */}
      <section className="pt-28 md:pt-36 pb-8 border-b border-olive-800/60 bg-forest-900/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Back link & Breadcrumbs */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-earth-400">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-gold-400 hover:text-gold-300 font-semibold transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Wilderness Journal</span>
            </Link>

            <nav aria-label="Breadcrumbs" className="hidden sm:flex items-center gap-1.5 text-xs">
              <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-earth-500" />
              <Link to="/blog" className="hover:text-gold-400 transition-colors">Blog</Link>
              <ChevronRight className="w-3.5 h-3.5 text-earth-500" />
              <span className="text-earth-300 truncate max-w-[200px]">{post.category}</span>
            </nav>
          </div>

          {/* Meta Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="gold">{post.category}</Badge>
            <span className="text-earth-400 text-xs flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold-400" />
              <span>{post.readTime}</span>
            </span>
            <span className="text-earth-400 text-xs flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gold-400" />
              <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
            </span>
          </div>

          {/* H1 Article Title */}
          <h1 className="font-heading font-black text-2xl sm:text-4xl md:text-5xl text-white leading-tight">
            {post.title}
          </h1>

          {/* Editorial Excerpt Dek */}
          <p className="text-sm sm:text-base md:text-lg text-earth-200 leading-relaxed font-light">
            {post.excerpt}
          </p>

          {/* Author Byline & Share Bar */}
          <div className="pt-4 border-t border-olive-800/60 flex flex-wrap items-center justify-between gap-4 text-xs text-earth-300">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-forest-900 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <User className="w-4 h-4" />
              </div>
              <div>
                <strong className="block text-earth-100 font-semibold">{post.author.name}</strong>
                <span className="text-[11px] text-earth-400">{post.author.role}</span>
              </div>
            </div>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-900 border border-olive-700/60 text-earth-200 hover:text-gold-300 hover:border-gold-500/40 text-xs transition-all shadow-sm"
              aria-label="Copy article link to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-gold-400" />
                  <span>Share Article</span>
                </>
              )}
            </button>
          </div>

        </div>
      </section>

      {/* Hero Cover Image */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="relative rounded-2xl overflow-hidden border border-gold-500/25 shadow-2xl h-64 sm:h-96 md:h-[460px] bg-forest-950">
          <img
            src={post.coverImage}
            alt={post.altText}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.currentTarget;
              target.src = post.fallbackImage || '/images/hero-jungle.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent pointer-events-none" />
        </div>
        <p className="text-[11px] text-earth-400 italic text-center mt-2.5">
          {post.altText}
        </p>
      </section>

      {/* Main Layout: Table of Contents + Article Body */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Sticky Table of Contents (Desktop Sidebar) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 order-2 lg:order-1">
            <div className="wilderness-card p-5 sm:p-6 rounded-xl border border-gold-500/20 space-y-4 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400">
                <ListOrdered className="w-4 h-4" />
                <span>Field Navigation Index</span>
              </div>
              <nav aria-label="Table of Contents">
                <ul className="space-y-2 text-xs text-earth-300">
                  {post.sections.map((section, idx) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="hover:text-gold-300 transition-colors block py-1 border-l-2 border-olive-800/70 hover:border-gold-400 pl-3 leading-snug"
                      >
                        <span className="text-earth-400 mr-1.5 font-mono">0{idx + 1}.</span>
                        {section.heading.replace(/^\d+\.\s*/, '')}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Quick Academy Link */}
              <div className="pt-4 border-t border-olive-800/60 text-xs text-earth-300 space-y-2">
                <strong className="block text-earth-100 font-semibold">Practical Application:</strong>
                <p className="text-[11px] text-earth-400 leading-relaxed">
                  Field training takes place in verified Rajasthan outdoor environments under disciplined safety standards.
                </p>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-1.5 text-gold-400 hover:text-gold-300 font-semibold text-xs pt-1"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Tags Box */}
            <div className="wilderness-card p-5 rounded-xl border border-olive-800/60 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-earth-200">
                Dispatch Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-forest-950 border border-olive-700/50 text-earth-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          {/* Article Main Text Content */}
          <main className="lg:col-span-8 space-y-12 order-1 lg:order-2">
            {post.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 space-y-4"
              >
                {/* H2 Heading */}
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-earth-100 border-b border-olive-800/60 pb-2">
                  {section.heading}
                </h2>

                {section.subheading && (
                  <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gold-400">
                    {section.subheading}
                  </h3>
                )}

                {/* Paragraphs */}
                <div className="space-y-3.5 text-xs sm:text-sm text-earth-200 leading-relaxed">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* Bullet Checklist if present */}
                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <div className="my-4 p-4 rounded-xl bg-forest-900/60 border border-olive-800/60 space-y-2">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-gold-400 flex items-center gap-1.5 mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Key Field Directives:</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-earth-200">
                      {section.bulletPoints.map((pt, ptIdx) => (
                        <li key={ptIdx} className="flex items-start gap-2">
                          <span className="text-gold-400 font-bold shrink-0">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Pro-Tip Box if present */}
                {section.proTip && (
                  <div className="my-4 p-4 rounded-xl bg-amber-950/25 border-l-4 border-gold-500 border-y border-r border-gold-500/20 text-xs text-earth-200 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-gold-400 font-bold uppercase tracking-wider text-[11px]">
                      <Lightbulb className="w-4 h-4 shrink-0" />
                      <span>Instructor Field Pro-Tip</span>
                    </div>
                    <p className="italic leading-relaxed">{section.proTip}</p>
                  </div>
                )}
              </section>
            ))}

            {/* Related Challenge Course Callout Card */}
            {relatedCourse && (
              <div className="p-6 sm:p-8 rounded-2xl wilderness-card border border-gold-500/30 space-y-4 bg-gradient-to-br from-forest-900/90 to-forest-950 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="gold">Hands-On Field Challenge</Badge>
                  <span className="text-xs text-earth-400 font-mono">Duration: {relatedCourse.duration}</span>
                </div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                  Practice These Techniques in our {relatedCourse.title}
                </h3>
                <p className="text-xs sm:text-sm text-earth-300 leading-relaxed">
                  {relatedCourse.shortDescription}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Button
                    to={`/courses#${relatedCourse.id}`}
                    variant="primary"
                    size="sm"
                    icon={<Compass className="w-4 h-4" />}
                  >
                    View Challenge Syllabus
                  </Button>
                  <Button
                    to={`/enroll?course=${relatedCourse.id}`}
                    variant="secondary"
                    size="sm"
                  >
                    Register Interest
                  </Button>
                </div>
              </div>
            )}

            {/* Author Attribution & Disclaimer Note */}
            <div className="p-4 sm:p-5 rounded-xl bg-forest-950 border border-olive-800/60 text-xs text-earth-400 space-y-2">
              <div className="flex items-center gap-2 text-earth-300 font-semibold">
                <ShieldAlert className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Wilderness Safety & Educational Disclaimer</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                The skills described in this article are intended strictly for educational awareness and outdoor preparedness.
                Backcountry activities involve inherent physical hazards. Always check statutory state permissions, carry proper communication equipment,
                and never practice risky survival skills alone without certified supervision.
              </p>
            </div>

            {/* Internal Navigation Links Hub */}
            <div className="pt-6 border-t border-olive-800/60 flex flex-wrap items-center justify-between gap-4 text-xs">
              <span className="text-earth-400">Explore Related Academy Sections:</span>
              <div className="flex flex-wrap items-center gap-3 text-gold-400 font-semibold">
                <Link to="/courses" className="hover:text-gold-300 hover:underline">Courses</Link>
                <span>•</span>
                <Link to="/activities" className="hover:text-gold-300 hover:underline">Field Activities</Link>
                <span>•</span>
                <Link to="/faq" className="hover:text-gold-300 hover:underline">FAQ</Link>
                <span>•</span>
                <Link to="/contact" className="hover:text-gold-300 hover:underline">Contact Helpdesk</Link>
              </div>
            </div>

          </main>
        </div>
      </section>

      {/* Related Articles Section */}
      {relatedPosts.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t border-olive-800/60">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500 block">
                Related Reading
              </span>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
                More From the Wilderness Journal
              </h2>
            </div>
            <Link
              to="/blog"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 font-semibold"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relPost) => (
              <article
                key={relPost.id}
                className="wilderness-card rounded-xl border border-olive-800/60 overflow-hidden flex flex-col group hover:border-gold-500/40 transition-all"
              >
                <Link
                  to={`/blog/${relPost.slug}`}
                  className="h-40 w-full block overflow-hidden relative bg-forest-950"
                  aria-label={`Read ${relPost.title}`}
                >
                  <img
                    src={relPost.coverImage}
                    alt={relPost.altText}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = relPost.fallbackImage || '/images/hero-jungle.jpg';
                    }}
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="gold" size="sm">{relPost.category}</Badge>
                  </div>
                </Link>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <span className="text-[11px] text-earth-400 block font-mono">
                      {relPost.readTime}
                    </span>
                    <h3 className="font-heading font-bold text-sm text-earth-100 group-hover:text-gold-300 transition-colors line-clamp-2 leading-snug">
                      <Link to={`/blog/${relPost.slug}`}>
                        {relPost.title}
                      </Link>
                    </h3>
                  </div>
                  <Link
                    to={`/blog/${relPost.slug}`}
                    className="inline-flex items-center gap-1 text-xs text-gold-400 font-semibold group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
