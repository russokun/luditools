import Image from 'next/image';
import Link from 'next/link';
import { type FC } from 'react';

interface BannerProps {
  title: string;
  subtitle: string;
  brochureUrl: string;
}

const BANNER_STYLES = {
  container: "relative bg-blue-800 text-white py-20 px-4 md:px-8 lg:px-12",
  wrapper: "max-w-7xl mx-auto",
  grid: "grid grid-cols-1 md:grid-cols-2 gap-12 items-center",
  content: "space-y-6",
  title: "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight",
  subtitle: "text-xl md:text-2xl text-cyan-200",
  button: "inline-block bg-yellow-400 text-blue-900 font-semibold px-8 py-4 rounded-lg hover:bg-yellow-300 transition-colors duration-200",
  imageWrapper: "relative h-64 md:h-96",
  image: "object-contain",
  wavesContainer: "absolute bottom-0 left-0 w-full overflow-hidden",
  waves: "relative block w-full h-20",
  wavePath: "fill-white",
} as const;

const Banner: FC<BannerProps> = ({ title, subtitle, brochureUrl }) => {
  return (
    <section className={BANNER_STYLES.container}>
      <div className={BANNER_STYLES.wrapper}>
        <div className={BANNER_STYLES.grid}>
          <div className={BANNER_STYLES.content}>
            <h1 className={BANNER_STYLES.title}>
              {title}
            </h1>
            <p className={BANNER_STYLES.subtitle}>
              {subtitle}
            </p>
            <a
              href={brochureUrl}
              className={BANNER_STYLES.button}
              target="_blank"
              rel="noopener noreferrer"
            >
              Descargar Brochure
            </a>
          </div>
          <div className={BANNER_STYLES.imageWrapper}>
            <Image
              src="/logo-white.svg"
              alt="LudiTools Logo"
              fill
              className={BANNER_STYLES.image}
              priority
            />
          </div>
        </div>
      </div>
      <div className={BANNER_STYLES.wavesContainer}>
        <svg
          className={BANNER_STYLES.waves}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className={BANNER_STYLES.wavePath}
          />
        </svg>
      </div>
    </section>
  );
};

export default Banner;