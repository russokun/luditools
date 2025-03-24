import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'LudiTools - Gamificación y Aprendizaje Lúdico',
  description: 'Plataforma líder en gamificación y aprendizaje lúdico. Descubre nuestros juegos, herramientas y programas de formación.',
  keywords: 'luditools, gamificación, aprendizaje lúdico, juegos educativos, formación docente',
  authors: [{ name: 'LudiTools Team' }],
  openGraph: {
    title: 'LudiTools - Gamificación y Aprendizaje Lúdico',
    description: 'Transforma el aprendizaje a través del juego con LudiTools',
    url: 'https://luditools.com',
    siteName: 'LudiTools',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LudiTools Banner'
      }
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LudiTools - Gamificación y Aprendizaje Lúdico',
    description: 'Transforma el aprendizaje a través del juego con LudiTools',
    images: ['/twitter-image.jpg'],
    creator: '@luditools'
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.className} suppressHydrationWarning>
      <body className="min-h-screen bg-white" suppressHydrationWarning>
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-blue-800"
        >
          Saltar al contenido principal
        </a>
        
        {/* Main content */}
        <div id="main-content">
          {children}
        </div>
      </body>
    </html>
  );
}
