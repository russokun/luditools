// components/Banner.tsx
import Image from 'next/image';
import { type FC } from 'react';

interface BannerProps {
  title: string;
  subtitle: string;
  brochureUrl: string;
}

const Banner: FC<BannerProps> = ({ title, subtitle, brochureUrl }) => {
  return (
    <section className="relative bg-blue-800 text-white pt-20 pb-32 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{title}</h1>
        <p className="text-xl md:text-2xl text-cyan-200">{subtitle}</p>
        <a
          href={brochureUrl}
          className="inline-block bg-yellow-400 text-blue-900 font-semibold px-8 py-4 rounded-lg hover:bg-yellow-300 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          Descargar Brochure
        </a>
      </div>

      {/* Logo debajo de la wave */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 z-10"
        style={{ bottom: '-3.05rem' }}
      >
        <Image
          src="/img/logo.png"
          alt="LudiTools Logo"
          width={160}
          height={160}
          className="object-contain bg-white rounded-lg shadow-lg p-2"
          priority
        />
      </div>

      {/* Wave SVG encima del logo */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg viewBox="0 0 1200 110" preserveAspectRatio="none" className="block w-full h-24 translate-y-[1px]">
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-white"
          />
        </svg>
      </div>
    </section>
  );
};

export default Banner;