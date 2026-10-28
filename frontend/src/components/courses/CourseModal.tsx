import React, { useEffect, useCallback } from 'react';
import { X, Clock, MapPin, Compass, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { Course } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onEnquire: (courseId: string) => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  onClose,
  onEnquire
}) => {
  const isOpen = course !== null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !course) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-2 sm:p-4 md:p-6 flex items-start sm:items-center justify-center animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-modal-title"
      onClick={(e) => {
        // Close if user clicks the backdrop outside the modal
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="relative w-full max-w-3xl my-auto bg-forest-900 border border-gold-500/30 rounded-2xl shadow-2xl flex flex-col max-h-[94vh] sm:max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Floating Close Button - Always visible, top right */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2 sm:p-2.5 rounded-full bg-forest-950/90 border border-gold-500/40 text-earth-200 hover:text-gold-300 hover:border-gold-400 hover:scale-105 transition-all shadow-lg focus:ring-2 focus:ring-gold-500"
          aria-label="Close Course Details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header with Image & Title */}
        <div className="relative h-44 sm:h-56 md:h-64 w-full shrink-0 overflow-hidden">
          <img
            src={course.image}
            alt={`${course.title} course environment`}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.currentTarget;
              const fallback = course.fallbackImage || 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80';
              if (target.src !== fallback) {
                target.src = fallback;
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/50 to-transparent" />
          
          <div className="absolute bottom-3 left-4 right-14 sm:bottom-4 sm:left-6 sm:right-16">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
              <Badge variant="gold">{course.badge}</Badge>
              <Badge variant="olive">{course.level}</Badge>
            </div>
            <h2 id="course-modal-title" className="font-heading font-bold text-xl sm:text-2xl md:text-3xl text-earth-100 leading-tight">
              {course.title}
            </h2>
          </div>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 flex-1 overflow-y-auto overscroll-contain">
          
          {/* Quick Meta Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 bg-forest-950/70 p-3 sm:p-4 rounded-xl border border-olive-800/40 text-xs">
            <div className="flex items-center gap-2 text-earth-200">
              <Clock className="w-4 h-4 text-gold-400 shrink-0" />
              <span><strong>Duration:</strong> {course.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-earth-200">
              <Shield className="w-4 h-4 text-gold-400 shrink-0" />
              <span><strong>Demand:</strong> {course.physicalDemand}</span>
            </div>
            <div className="flex items-center gap-2 text-earth-200">
              <Compass className="w-4 h-4 text-gold-400 shrink-0" />
              <span className="truncate"><strong>Venues:</strong> Rajasthan Candidate Zones</span>
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <h4 className="font-heading text-xs uppercase tracking-wider text-gold-400 font-bold mb-2">
              Program Overview
            </h4>
            <p className="text-xs sm:text-sm text-earth-200 leading-relaxed">
              {course.fullDescription}
            </p>
          </div>

          {/* Provisional Learning Themes */}
          <div>
            <h4 className="font-heading text-xs uppercase tracking-wider text-gold-400 font-bold mb-2.5">
              Provisional Learning Themes (Sample Syllabus)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {course.learningThemes.map((theme, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-earth-200 bg-forest-950/50 p-2.5 rounded-lg border border-olive-800/30">
                  <CheckCircle className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                  <span>{theme}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Preparation & Gear Advisory */}
          <div>
            <h4 className="font-heading text-xs uppercase tracking-wider text-gold-400 font-bold mb-2">
              Participant Preparation Placeholder
            </h4>
            <ul className="list-disc pl-5 text-xs text-earth-300 space-y-1">
              {course.studentGearPlaceholder.map((gear, idx) => (
                <li key={idx}>{gear}</li>
              ))}
            </ul>
          </div>

          {/* Venue Status & Legal Clearances */}
          <div className="bg-amber-950/20 p-3.5 sm:p-4 rounded-xl border border-gold-500/25 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-gold-400 font-semibold">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Venue Status & Legal Compliance</span>
            </div>
            <p className="text-earth-300 text-xs leading-relaxed">
              {course.venueStatus}
            </p>
            <p className="text-[11px] text-earth-400 italic">
              Note: Outdoor wilderness training and camping inside sanctuaries require formal statutory approvals from forest and local authorities.
            </p>
          </div>
        </div>

        {/* Modal Footer CTA - Pinned at bottom */}
        <div className="p-3.5 sm:p-5 bg-forest-950 border-t border-olive-800/60 shrink-0 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="text-[11px] sm:text-xs text-earth-400 text-center sm:text-left">
            <span>Official schedules & fees announced upon administrative clearances.</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <Button variant="ghost" onClick={onClose} size="sm" className="flex-1 sm:flex-none">
              Close
            </Button>
            <Button
              variant="primary"
              size="md"
              className="flex-1 sm:flex-none"
              onClick={() => {
                onClose();
                onEnquire(course.id);
              }}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Enquire For This Challenge
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
