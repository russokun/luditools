import Link from 'next/link';
import Image from 'next/image';
import { fetchGameById } from '@/lib/api';
import type { NormalizedGame } from '@/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

function renderText(value: unknown): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value !== null && Array.isArray((value as any).children)) {
    return (value as any).children.map((c: any) => c.text ?? '').join('');
  }
  return '';
}

export default async function GamePage({ params }: PageProps) {
  const { id } = await params;
  const game = await fetchGameById(id);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Juego no encontrado</h1>
          <Link href="/tienda" className="text-blue-600 hover:underline">
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <Link href="/tienda" className="text-blue-600 hover:underline mb-8 block">
        ← Volver a la tienda
      </Link>
      <div className="bg-white rounded-lg shadow-xl max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8">
          <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
            {game.coverImage ? (
              <Image
                src={game.coverImage.url}
                alt={renderText(game.title)}
                fill
                className="object-contain"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-400">Sin imagen</span>
              </div>
            )}
          </div>
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {renderText(game.title)}
            </h1>
            <p className="text-lg text-gray-700">
              {renderText(game.description)}
            </p>

            {game.features?.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Características</h2>
                <ul className="list-disc list-inside space-y-2">
                  {game.features.map((f, i) => (
                    <li key={i} className="text-gray-700">
                      {renderText(f.title)}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="border-t pt-6">
              <p className="text-3xl font-bold text-gray-900">
                ${game.price.toLocaleString()}
              </p>
              {game.discount && (
                <p className="text-sm text-green-600">{game.discount}% de descuento</p>
              )}
              {game.videoUrl && (
                <a
                  href={game.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block px-8 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Comprar ahora
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}