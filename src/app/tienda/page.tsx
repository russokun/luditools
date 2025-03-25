import { Suspense } from 'react';
import { fetchGames } from '@/lib/api';
import GamesGrid from '@/components/GamesGrid';
import Footer from '@/components/Footer';

function LoadingGrid() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-800"></div>
    </div>
  );
}

export default async function TiendaPage() {
  try {
    const games = await fetchGames();
    // Validar que games sea un array antes de pasarlo
    const validGames = Array.isArray(games) ? games : [];
    
    return (
      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-blue-800 text-white py-20 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tienda LudiTools
            </h1>
            <p className="text-xl text-cyan-200 max-w-2xl mx-auto">
              Descubre nuestra colección de juegos y recursos para potenciar el aprendizaje a través de experiencias lúdicas
            </p>
          </div>
        </header>

        {/* Games Grid */}
        <section className="py-16 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<LoadingGrid />}>
              <GamesGrid games={validGames} />
            </Suspense>
          </div>
        </section>

        <Footer
          navigation={[
            { label: "Inicio", href: "/" },
            { label: "Tienda", href: "/tienda" },
            { label: "Programa", href: "/#programa" },
            { label: "Facilitadores", href: "/#facilitadores" },
            { label: "Testimonios", href: "/#testimonios" }
          ]}
          socialLinks={[
            {
              platform: "twitter",
              url: "https://twitter.com/luditools",
              label: "Twitter de LudiTools"
            },
            {
              platform: "instagram",
              url: "https://instagram.com/luditools",
              label: "Instagram de LudiTools"
            },
            {
              platform: "linkedin",
              url: "https://linkedin.com/company/luditools",
              label: "LinkedIn de LudiTools"
            }
          ]}
          contactEmail="hola@luditools.com"
        />
      </main>
    );
  } catch (error) {
    console.error('Error en TiendaPage:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-2xl text-gray-800 mb-4">Error al cargar la tienda</h1>
          <p className="text-gray-600">
            Lo sentimos, ha ocurrido un error al cargar los juegos. Por favor, intenta nuevamente más tarde.
          </p>
        </div>
      </div>
    );
  }
}