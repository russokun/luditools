"use client";

import { useState, type FC } from 'react';
import ReactPlayer from 'react-player';
import { type NormalizedTestimonial } from '@/types';

const STYLES = {
  section: "bg-blue-800 py-20 px-4 md:px-8 lg:px-12 text-white",
  container: "max-w-6xl mx-auto",
  title: "text-3xl md:text-4xl font-bold text-center mb-16",
  videoWrapper: "aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl mb-8",
  loadingOverlay: "absolute inset-0 bg-blue-900/50 flex items-center justify-center",
  spinner: "w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin",
  testimonialContent: "max-w-3xl mx-auto text-center",
  quote: "text-xl md:text-2xl italic mb-6 text-cyan-200",
  author: "text-lg font-semibold",
  navigationContainer: "flex justify-center gap-4 mt-12",
  navButton: "p-2 rounded-full bg-blue-700 hover:bg-blue-600 transition-colors",
  navIcon: "w-6 h-6",
  dotsContainer: "flex justify-center gap-2 mt-6",
  dot: "w-3 h-3 rounded-full transition-colors",
  activeDot: "bg-yellow-400",
  inactiveDot: "bg-blue-600 hover:bg-blue-500",
} as const;

interface TestimonialsSectionProps {
  title: string;
  testimonials: NormalizedTestimonial[];
}

interface NavigationIconProps {
  direction: 'prev' | 'next';
}

const NavigationIcon: FC<NavigationIconProps> = ({ direction }) => (
  <svg
    className={STYLES.navIcon}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d={direction === 'prev' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
    />
  </svg>
);

interface VideoPlayerProps {
  url: string;
  isLoading: boolean;
  onReady: () => void;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ url, isLoading, onReady }) => (
  <div className={STYLES.videoWrapper}>
    {isLoading && (
      <div className={STYLES.loadingOverlay}>
        <div className={STYLES.spinner} />
      </div>
    )}
    <ReactPlayer
      url={url}
      width="100%"
      height="100%"
      onReady={onReady}
      controls
      playing={false}
    />
  </div>
);

interface TestimonialContentProps {
  text: string;
  author: string;
}

const TestimonialContent: FC<TestimonialContentProps> = ({ text, author }) => (
  <div className={STYLES.testimonialContent}>
    <blockquote className={STYLES.quote}>"{text}"</blockquote>
    <cite className={STYLES.author}>{author}</cite>
  </div>
);

interface NavigationProps {
  total: number;
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}

const Navigation: FC<NavigationProps> = ({
  total,
  currentIndex,
  onPrevious,
  onNext,
  onDotClick,
}) => (
  <>
    {total > 1 && (
      <>
        <div className={STYLES.navigationContainer}>
          <button
            onClick={onPrevious}
            className={STYLES.navButton}
            aria-label="Testimonio anterior"
          >
            <NavigationIcon direction="prev" />
          </button>
          <button
            onClick={onNext}
            className={STYLES.navButton}
            aria-label="Siguiente testimonio"
          >
            <NavigationIcon direction="next" />
          </button>
        </div>
        <div className={STYLES.dotsContainer}>
          {Array.from({ length: total }).map((_, index) => (
            <button
              key={index}
              onClick={() => onDotClick(index)}
              className={`${STYLES.dot} ${
                index === currentIndex ? STYLES.activeDot : STYLES.inactiveDot
              }`}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>
      </>
    )}
  </>
);

const TestimonialsSection: FC<TestimonialsSectionProps> = ({ title, testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  // Ensure we have testimonials before proceeding
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => prev === 0 ? testimonials.length - 1 : prev - 1);
    setIsVideoLoading(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev === testimonials.length - 1 ? 0 : prev + 1);
    setIsVideoLoading(true);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsVideoLoading(true);
  };

  return (
    <section className={STYLES.section}>
      <div className={STYLES.container}>
        <h2 className={STYLES.title}>{title}</h2>
        <div className="relative">
          <VideoPlayer
            url={currentTestimonial.videoUrl}
            isLoading={isVideoLoading}
            onReady={() => setIsVideoLoading(false)}
          />
          <TestimonialContent
            text={currentTestimonial.text}
            author={currentTestimonial.author}
          />
          <Navigation
            total={testimonials.length}
            currentIndex={currentIndex}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onDotClick={handleDotClick}
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;