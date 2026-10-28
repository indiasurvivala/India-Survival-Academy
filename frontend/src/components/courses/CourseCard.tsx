import React from 'react';
import { Clock, ArrowRight, Eye } from 'lucide-react';
import { Course } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface CourseCardProps {
  course: Course;
  onViewDetails: (course: Course) => void;
  onEnquire: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onViewDetails,
  onEnquire
}) => {
  return (
    <div className="wilderness-card rounded-2xl overflow-hidden flex flex-col h-full group border border-gold-500/20 hover:border-gold-500/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)]">
      
      {/* Course Image & Badges */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={course.image}
          alt={`${course.title} wilderness skills training`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            const fallback = course.fallbackImage || 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80';
            if (target.src !== fallback) {
              target.src = fallback;
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
          <Badge variant="gold">{course.badge}</Badge>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-forest-950/90 backdrop-blur-md border border-gold-500/40 text-xs text-gold-300 font-bold shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            <Clock className="w-3.5 h-3.5 text-gold-400" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Physical Demand Pill */}
        <div className="absolute bottom-3 left-3.5">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-earth-200 bg-forest-950/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-olive-700/60 shadow-sm">
            <span className={`w-1.5 h-1.5 rounded-full ${
              course.physicalDemand.toLowerCase().includes('high') || course.physicalDemand.toLowerCase().includes('demanding')
                ? 'bg-amber-400'
                : course.physicalDemand.toLowerCase().includes('extreme')
                ? 'bg-red-400'
                : 'bg-emerald-400'
            }`} />
            {course.physicalDemand}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-5">
        <div>
          <h3 className="font-heading font-bold text-xl text-earth-100 group-hover:text-gold-300 transition-colors mb-2.5">
            {course.title}
          </h3>

          <p className="text-xs sm:text-sm text-earth-300 leading-relaxed mb-4 line-clamp-3">
            {course.shortDescription}
          </p>

          {/* Suitable Skill Categories */}
          <div className="space-y-1.5 mb-2 bg-forest-950/40 p-3 rounded-xl border border-olive-800/40">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-gold-400">
              Sample Skill Modules:
            </div>
            <ul className="space-y-1">
              {course.learningThemes.slice(0, 3).map((theme, idx) => (
                <li key={idx} className="text-xs text-earth-200 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shrink-0" />
                  <span className="truncate">{theme}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-olive-800/60 grid grid-cols-2 gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onViewDetails(course)}
            icon={<Eye className="w-3.5 h-3.5" />}
            aria-label={`View curriculum details for ${course.title}`}
          >
            Details
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onEnquire(course.id)}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            aria-label={`Enquire about ${course.title}`}
          >
            Enquire
          </Button>
        </div>
      </div>
    </div>
  );
};
