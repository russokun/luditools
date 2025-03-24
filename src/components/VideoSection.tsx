"use client";

import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-800 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

interface VideoSectionProps {
  videoUrl: string;
  title?: string;
}

export default function VideoSection({ videoUrl, title }: VideoSectionProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="bg-white py-20 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-12">
            {title}
          </h2>
        )}
        
        <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
          <Suspense fallback={
            <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-blue-800 border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="100%"
              onReady={() => setIsLoading(false)}
              controls
              playing={false}
              config={{
                youtube: {
                  playerVars: {
                    modestbranding: 1,
                    rel: 0
                  }
                }
              }}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}