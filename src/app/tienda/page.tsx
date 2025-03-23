import { fetchGames } from '@/lib/api';
import GameCard from '@/components/GameCard';
import Footer from '@/components/Footer';

export const revalidate = 3600; // Revalidate every hour

function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-2xl text-gray-600 mb-4">Error al cargar los juegos</h1>
        <p className="text-gray-500">{message}</p>
      </div>
    </div>
  );
}

export default async function TiendaPage() {
  let games: Awaited<ReturnType<typeof fetchGames>> = [];

  try {
    console.log('TiendaPage: Fetching games...');
    games = await fetchGames();
    
    console.log('TiendaPage: Games fetched:', {
      count: games?.length || 0,
      hasGames: Boolean(games),
      firstGame: games?.[0] ? {
        id: games[0].id,
        title: games[0].title,
        hasImage: Boolean(games[0].coverImage)
      } : null
    });

    if (!games || !Array.isArray(games)) {
      throw new Error('Invalid games data received');
    }
  } catch (error) {
    console.error('TiendaPage: Error fetching games:', error);
    return <ErrorDisplay message="Error al cargar los juegos. Por favor, intenta nuevamente." />;
  }

  if (games.length === 0) {
    return <ErrorDisplay message="No hay juegos disponibles en este momento" />;
  }

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-blue-800 text-white py-20 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tienda LudiTools
            </h1>
            <p className="text-xl text-cyan-200 max-w-2xl mx-auto">
              Descubre nuestra colección de juegos y herramientas para potenciar el aprendizaje a través de experiencias lúdicas
            </p>
          </div>
        </header>

        {/* Games Grid */}
        <section className="py-16 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            {games.length === 0 ? (
              <div className="text-center py-20">
                <h2 className="text-2xl text-gray-600">
                  No hay juegos disponibles en este momento
                </h2>
                <p className="text-gray-500 mt-2">
                  Por favor, vuelve a revisar más tarde
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {games.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Promotional Banner */}
        <section className="bg-blue-900 text-white py-16 px-4 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Quieres crear tus propios juegos?
            </h2>
            <p className="text-xl text-cyan-200 mb-8">
              Únete a nuestro GameCamp y aprende a diseñar experiencias lúdicas transformadoras
            </p>
            <a
              href="/"
              className="inline-block bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              Conoce el GameCamp
            </a>
          </div>
        </section>
      </main>

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
    </>
  );
}