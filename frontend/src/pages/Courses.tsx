import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Info } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { CourseCard } from '../components/courses/CourseCard';
import { CourseModal } from '../components/courses/CourseModal';
import { coursesData } from '../data/courses';
import { Course } from '../types';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';
import { generateCoursesSchema, generateBreadcrumbSchema } from '../utils/schemaGenerator';

export const Courses: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [filterDuration, setFilterDuration] = useState<number | 'all'>('all');
  const navigate = useNavigate();

  const handleEnquire = (courseId: string) => {
    navigate(`/enroll?course=${courseId}`);
  };

  const filteredCourses = filterDuration === 'all'
    ? coursesData
    : coursesData.filter((c) => c.durationHours === filterDuration);

  return (
    <div className="pb-20 bg-forest-950 text-earth-100">
      <SEO
        title="Wilderness Survival Courses & Challenges"
        description="Explore 24-Hour Foundation, 48-Hour Endurance, and 72-Hour Expedition wilderness survival courses. Practical firecraft, natural navigation, bivouac shelter, and teamwork in Rajasthan."
        canonicalPath="/courses"
        keywords="wilderness survival courses, outdoor survival challenges, 24 hour survival India, 48 hour wilderness course, 72 hour expedition training, Rajasthan bushcraft"
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            ...generateCoursesSchema(),
            generateBreadcrumbSchema([{ name: 'Courses', path: '/courses' }])
          ]
        }}
      />
      
      {/* Banner */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-gold-500/15 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506535772317-9fdb71c959c6?auto=format&fit=crop&w=1800&q=80"
            alt="Wilderness trekking background"
            className="w-full h-full object-cover opacity-85 brightness-115"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-black/25" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900/90 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-4 backdrop-blur-sm">
            <Compass className="w-4 h-4" />
            <span>Structured Wilderness Challenges</span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-white mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Academy Course Curriculum
          </h1>

          <p className="text-base sm:text-lg text-earth-100 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Progression-based challenges designed to test situational awareness, campcraft proficiency, and team endurance across diverse terrains.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-forest-900/50 border-b border-olive-800/40 sticky top-[68px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-earth-300">
            Filter by Duration:
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterDuration('all')}
              className={`px-3.5 py-1.5 rounded text-xs font-semibold transition-all ${
                filterDuration === 'all'
                  ? 'bg-gold-500 text-forest-950 shadow-md font-bold'
                  : 'bg-forest-950/80 text-earth-300 hover:text-white border border-olive-800/60'
              }`}
            >
              All Courses ({coursesData.length})
            </button>
            <button
              onClick={() => setFilterDuration(24)}
              className={`px-3.5 py-1.5 rounded text-xs font-semibold transition-all ${
                filterDuration === 24
                  ? 'bg-gold-500 text-forest-950 shadow-md font-bold'
                  : 'bg-forest-950/80 text-earth-300 hover:text-white border border-olive-800/60'
              }`}
            >
              24 Hours
            </button>
            <button
              onClick={() => setFilterDuration(48)}
              className={`px-3.5 py-1.5 rounded text-xs font-semibold transition-all ${
                filterDuration === 48
                  ? 'bg-gold-500 text-forest-950 shadow-md font-bold'
                  : 'bg-forest-950/80 text-earth-300 hover:text-white border border-olive-800/60'
              }`}
            >
              48 Hours
            </button>
            <button
              onClick={() => setFilterDuration(72)}
              className={`px-3.5 py-1.5 rounded text-xs font-semibold transition-all ${
                filterDuration === 72
                  ? 'bg-gold-500 text-forest-950 shadow-md font-bold'
                  : 'bg-forest-950/80 text-earth-300 hover:text-white border border-olive-800/60'
              }`}
            >
              72 Hours
            </button>
          </div>
        </div>
      </section>

      {/* Course Cards Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onViewDetails={(c) => setSelectedCourse(c)}
              onEnquire={handleEnquire}
            />
          ))}
        </div>

        {/* Provisional Syllabus Notice */}
        <div className="mt-12 p-5 rounded-xl bg-forest-900/80 border border-gold-500/20 max-w-3xl mx-auto text-xs text-earth-300 space-y-2">
          <div className="flex items-center gap-2 text-gold-400 font-semibold">
            <Info className="w-4 h-4 shrink-0" />
            <span>Curriculum Transparency Policy:</span>
          </div>
          <p>
            Descriptions and learning themes represent provisional sample content until the academy confirms its exact syllabus. We do not invent prices, schedules, available seats, or unverified certifications. Detailed equipment checklists and candidate venue authorizations will be issued following administrative approvals.
          </p>
        </div>
      </section>

      {/* Curriculum Comparison Table */}
      <section className="py-16 bg-forest-900/30 border-t border-gold-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading
            kicker="At A Glance"
            title="Challenge Progression Comparison"
            description="Understand the operational scope, expected physical demand, and focus areas across our three core formats."
          />

          <div className="wilderness-card rounded-xl border border-gold-500/20 overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-forest-900/90 border-b border-olive-800/60 text-gold-400 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-4 sm:p-5">Program Title</th>
                  <th className="p-4 sm:p-5">Duration</th>
                  <th className="p-4 sm:p-5">Primary Focus</th>
                  <th className="p-4 sm:p-5">Physical Demand</th>
                  <th className="p-4 sm:p-5">Venue Status</th>
                  <th className="p-4 sm:p-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-olive-900/50">
                {coursesData.map((course) => (
                  <tr key={course.id} className="hover:bg-forest-900/40 transition-colors">
                    <td className="p-4 sm:p-5 font-heading font-semibold text-earth-100">
                      {course.title}
                    </td>
                    <td className="p-4 sm:p-5 text-gold-400 font-mono">
                      {course.duration}
                    </td>
                    <td className="p-4 sm:p-5 text-earth-300 max-w-xs">
                      {course.shortDescription}
                    </td>
                    <td className="p-4 sm:p-5">
                      <Badge variant={course.physicalDemand === 'High Endurance' ? 'danger' : 'olive'}>
                        {course.physicalDemand}
                      </Badge>
                    </td>
                    <td className="p-4 sm:p-5 text-earth-400 text-xs">
                      Rajasthan (Pending clearances)
                    </td>
                    <td className="p-4 sm:p-5 text-right">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleEnquire(course.id)}
                      >
                        Enquire
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* Course Detail Modal */}
      <CourseModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onEnquire={handleEnquire}
      />
    </div>
  );
};
