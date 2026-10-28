import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Tag, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  X,
  User
} from 'lucide-react';
import { blogPosts, blogCategories } from '../data/blogPosts';
import { BlogPost } from '../types';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';
import { generateBreadcrumbSchema } from '../utils/schemaGenerator';

const formatDate = (dateStr: string): string => {
  try {
    const [year, month, day] = dateStr.split('-');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
};

export const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filtered posts based on category and search query
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesTitle = post.title.toLowerCase().includes(query);
      const matchesExcerpt = post.excerpt.toLowerCase().includes(query);
      const matchesTags = post.tags.some((tag) => tag.toLowerCase().includes(query));
      const matchesContent = post.sections.some(
        (sec) =>
          sec.heading.toLowerCase().includes(query) ||
          sec.paragraphs.some((p) => p.toLowerCase().includes(query))
      );

      return matchesCategory && (matchesTitle || matchesExcerpt || matchesTags || matchesContent);
    });
  }, [selectedCategory, searchQuery]);

  // Designated featured post (or first item)
  const featuredPost: BlogPost | undefined = useMemo(() => {
    if (selectedCategory === 'All' && !searchQuery) {
      return blogPosts.find((p) => p.featured) || blogPosts[0];
    }
    return undefined;
  }, [selectedCategory, searchQuery]);

  // Remaining posts when featured is visible
  const regularPosts = useMemo(() => {
    if (featuredPost) {
      return filteredPosts.filter((p) => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost]);

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
  };

  return (
    <div className="pb-24 bg-forest-950 text-earth-100 min-h-screen">
      <SEO
        title="Wilderness Journal & Survival Blog | Field Dispatches"
        description="Explore in-depth survival skill guides, bushcraft fundamentals, map navigation protocols, desert heat management, and Leave No Trace ethics from India Survival Academy."
        canonicalPath="/blog"
        keywords="survival blog India, wilderness skills guide, bushcraft articles, Rajasthan outdoor education, map navigation compass tutorial, desert hydration safety"
        schema={generateBreadcrumbSchema([
          { name: 'Blog', path: '/blog' }
        ])}
      />

      {/* Cinematic Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 border-b border-gold-500/15 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-jungle.jpg"
            alt="Wilderness canopy in morning mist"
            className="w-full h-full object-cover opacity-85 brightness-110"
            onError={(e) => {
              const target = e.currentTarget;
              target.src = 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-black/30" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900/90 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-5 backdrop-blur-sm shadow-lg">
            <BookOpen className="w-4 h-4" />
            <span>Field Notes & Expedition Dispatches</span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Wilderness Journal
          </h1>

          <p className="text-base sm:text-lg text-earth-100 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Field-tested knowledge, terrain safety protocols, traditional bushcraft disciplines, and ecological ethics for serious outdoor practitioners.
          </p>

          {/* Quick Stats Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-earth-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>{blogPosts.length} Educational Dispatches</span>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-gold-400" />
              <span>5 Specialized Focus Themes</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>Zero Keyword Fluff • Verified Safety</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Controls Bar: Search & Category Filter */}
        <div className="space-y-6 mb-12">
          
          {/* Search Input Box */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gold-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, topic, or keyword (e.g. navigation, hydration, shelter)..."
              className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-forest-900/90 border border-gold-500/30 text-earth-100 text-sm focus:ring-2 focus:ring-gold-500 backdrop-blur-md placeholder:text-earth-400 shadow-inner"
              aria-label="Search blog articles"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-earth-400 hover:text-gold-300 p-1"
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {blogCategories.map((cat) => {
              const count = cat === 'All'
                ? blogPosts.length
                : blogPosts.filter((p) => p.category === cat).length;
              const isActive = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gold-500 text-forest-950 font-bold shadow-md shadow-gold-500/20'
                      : 'bg-forest-900/80 text-earth-300 hover:text-white border border-olive-800/60 hover:border-gold-500/30'
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-forest-950/25 text-forest-950 font-bold' : 'bg-forest-950 text-gold-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Filter Status Text */}
          {(selectedCategory !== 'All' || searchQuery) && (
            <div className="flex items-center justify-between text-xs text-earth-400 pt-2 border-t border-olive-800/40">
              <span>
                Showing <strong>{filteredPosts.length}</strong> matching dispatches
                {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
                {searchQuery && ` for "${searchQuery}"`}
              </span>
              <button
                onClick={handleClearFilters}
                className="text-gold-400 hover:text-gold-300 font-semibold underline underline-offset-2"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Featured Article Spotlight (Visible on default listing) */}
        {featuredPost && (
          <div className="mb-14">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500 mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Featured Dispatch</span>
            </div>

            <article className="wilderness-card rounded-2xl border border-gold-500/30 overflow-hidden shadow-2xl hover:border-gold-500/50 transition-all duration-300 group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                
                {/* Featured Image */}
                <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-full min-h-[280px] overflow-hidden">
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.altText}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = featuredPost.fallbackImage || '/images/hero-jungle.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-transparent lg:hidden" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="gold">{featuredPost.category}</Badge>
                  </div>
                </div>

                {/* Featured Details */}
                <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-5 bg-forest-900/60">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-xs text-earth-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gold-400" />
                        <time dateTime={featuredPost.publishedDate}>
                          {formatDate(featuredPost.publishedDate)}
                        </time>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gold-400" />
                        <span>{featuredPost.readTime}</span>
                      </span>
                    </div>

                    <h2 className="font-heading font-bold text-xl sm:text-2xl md:text-3xl text-earth-100 group-hover:text-gold-300 transition-colors leading-tight">
                      <Link to={`/blog/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-earth-300 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {featuredPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-forest-950/70 border border-olive-700/50 text-earth-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-olive-800/60 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-earth-300">
                      <User className="w-3.5 h-3.5 text-gold-400" />
                      <span>{featuredPost.author.name}</span>
                    </div>
                    
                    <Button
                      to={`/blog/${featuredPost.slug}`}
                      variant="primary"
                      size="sm"
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Read Full Article
                    </Button>
                  </div>
                </div>

              </div>
            </article>
          </div>
        )}

        {/* Regular Articles Grid */}
        {regularPosts.length > 0 ? (
          <div>
            {featuredPost && (
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-500 mb-6 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>All Journal Entries</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {regularPosts.map((post) => (
                <article
                  key={post.id}
                  className="wilderness-card rounded-2xl border border-olive-800/60 overflow-hidden flex flex-col group hover:border-gold-500/40 hover:shadow-2xl transition-all duration-300"
                >
                  {/* Card Image */}
                  <Link
                    to={`/blog/${post.slug}`}
                    className="relative h-48 sm:h-52 w-full block overflow-hidden bg-forest-950"
                    aria-label={`Read ${post.title}`}
                  >
                    <img
                      src={post.coverImage}
                      alt={post.altText}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.src = post.fallbackImage || '/images/hero-jungle.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <Badge variant="gold" size="sm">{post.category}</Badge>
                    </div>
                  </Link>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-xs text-earth-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gold-400" />
                          <time dateTime={post.publishedDate}>
                            {formatDate(post.publishedDate)}
                          </time>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gold-400" />
                          <span>{post.readTime}</span>
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-base sm:text-lg text-earth-100 group-hover:text-gold-300 transition-colors line-clamp-2 leading-snug">
                        <Link to={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      <p className="text-xs text-earth-300 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-olive-800/60 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-[11px] text-earth-400">
                        <Tag className="w-3 h-3 text-gold-400" />
                        <span>{post.tags[0]}</span>
                      </div>

                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 font-semibold text-gold-400 hover:text-gold-300 transition-colors group-hover:translate-x-0.5"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 text-center rounded-2xl wilderness-card border border-gold-500/20 max-w-xl mx-auto space-y-4 my-8">
            <div className="w-14 h-14 mx-auto rounded-full bg-forest-900 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-xl text-earth-100">
              No Field Dispatches Found
            </h3>
            <p className="text-xs sm:text-sm text-earth-300 max-w-sm mx-auto">
              We couldn't find any articles matching your search criteria. Try modifying your search keywords or switching category filters.
            </p>
            <div className="pt-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleClearFilters}
              >
                Reset All Filters
              </Button>
            </div>
          </div>
        )}

      </section>

      {/* Field Experience CTA Callout */}
      <section className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl wilderness-card border border-gold-500/30 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none hidden md:block">
            <Compass className="w-full h-full text-gold-400" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-400 block">
              Beyond The Page
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-earth-100 leading-tight">
              Take Your Outdoor Skills From Theory To The Wild
            </h2>
            <p className="text-xs sm:text-sm text-earth-300 leading-relaxed">
              Reading about sheltercraft, celestial orienting, and heat management is step one. Practical execution under disciplined instruction in Rajasthan’s rugged landscapes turns knowledge into instinct.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <Button
                to="/courses"
                variant="primary"
                size="md"
                icon={<Compass className="w-4 h-4" />}
              >
                Explore Challenge Programs
              </Button>
              <Button
                to="/contact"
                variant="secondary"
                size="md"
              >
                Contact Admissions Desk
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
