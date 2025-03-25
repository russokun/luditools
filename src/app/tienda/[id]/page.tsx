import Link from 'next/link';
import Image from 'next/image';
import { fetchGameById, calculatePrice } from '@/lib/api';
import type { NormalizedGame } from '@/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function GameDetail({ params }: PageProps) {
  const resolvedParams = await params;
  
  if (!resolvedParams?.id) {
    return <p className="p-8 text-center">ID no válido</p>;
  }
  
  const game = await fetchGameById(resolvedParams.id);

  if (!game) return <p className="p-8 text-center">Juego no encontrado</p>;

  const { original, final, hasDiscount, discountPercentage } = calculatePrice(game.price, game.discount);

  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      <Link href="/tienda" className="text-blue-600 hover:underline mb-8 block">← Volver a tienda</Link>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="relative h-80 bg-gray-100">
          {game.coverImage?.url && (
            <Image
              src={game.coverImage.url}
              alt={typeof game.title === 'string' ? game.title : 'Game cover'}
              fill
              className="object-cover"
            />
          )}
        </div>

        <div className="p-8 space-y-6">
          <h1 className="text-4xl font-bold text-blue-900">
            {typeof game.title === 'string' ? game.title : 'Sin título'}
          </h1>
          <p className="text-gray-700 leading-relaxed">
            {typeof game.description === 'string' ? game.description : ''}
          </p>

          {game.features.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Características</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {game.features?.map((feature, index) => (
                  <li key={`feature-${index}`}>
                    {typeof feature === 'object' && feature.title ? feature.title : ''}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              {hasDiscount && <p className="text-gray-400 line-through">USD {original}</p>}
              <p className="text-3xl font-bold text-blue-500">USD {final}</p>
              {hasDiscount && <p className="text-sm text-red-600">-{discountPercentage}% OFF</p>}
            </div>

            <a
              href={game.videoUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-blue-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-orange-600 transition"
            >
              Comprar ahora
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
