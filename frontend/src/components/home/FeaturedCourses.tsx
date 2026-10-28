import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionHeading } from '../common/SectionHeading';
import { CourseCard } from '../courses/CourseCard';
import { CourseModal } from '../courses/CourseModal';
import { coursesData } from '../../data/courses';
import { Course } from '../../types';
import { Button } from '../common/Button';
import { ArrowRight, Info } from 'lucide-react';

export const FeaturedCourses: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const navigate = useNavigate();

  const handleEnquire = (courseId: string) => {
    navigate(`/enroll?course=${courseId}`);
  };

  return (
    <section id="featured-courses" className="py-20 md:py-28 bg-forest-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          kicker="Core Curriculum"
          title="Field Survival & Wilderness Challenges"
          description="Three structured outdoor challenge formats designed to test preparation, situational awareness, and group endurance."
        />

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {coursesData.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onViewDetails={(c) => setSelectedCourse(c)}
              onEnquire={handleEnquire}
            />
          ))}
        </div>

        {/* Provisional Syllabus Notice */}
        <div className="max-w-3xl mx-auto p-4 rounded-lg bg-forest-900/60 border border-olive-700/40 text-center text-xs text-earth-300 flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-gold-400 shrink-0" />
          <span>
            <strong>Provisional Sample Content:</strong> Activity themes represent illustrative modules. Exact syllabi, equipment briefings, and confirmed venue clearances will be published prior to each batch.
          </span>
        </div>

        {/* Bottom Navigation Link */}
        <div className="text-center mt-10">
          <Button to="/courses" variant="outline" size="md" icon={<ArrowRight className="w-4 h-4" />}>
            View Full Course Comparison & Themes
          </Button>
        </div>

      </div>

      {/* Course Detail Modal */}
      <CourseModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onEnquire={handleEnquire}
      />
    </section>
  );
};
