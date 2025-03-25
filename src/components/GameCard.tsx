'use client';

import Image from 'next/image';
import Link from 'next/link';
import { type FC } from 'react';
import { NormalizedGame } from '@/types';
import { calculatePrice } from '@/lib/api';

interface GameCardProps {
  game: NormalizedGame;
}

const GameCard: FC<GameCardProps> = ({ game }) => {
  const { original, final, hasDiscount, discountPercentage } = calculatePrice(game.price, game.discount);

  return (
    <Link href={`/tienda/${game.id}`} className="block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-56 bg-gray-100">
        {game.coverImage ? (
          <Image
            src={game.coverImage.url}
            alt={typeof game.title === 'string' ? game.title : 'Juego'}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">Sin imagen</div>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-blue-900 line-clamp-2">
          {typeof game.title === 'string' ? game.title : 'Sin título'}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {typeof game.description === 'string' ? game.description : ''}
        </p>

        <div className="flex items-baseline gap-2 mt-2">
          {hasDiscount && <span className="text-gray-400 line-through text-sm">USD {original}</span>}
          <span className="text-xl font-bold text-blue-500">USD {final}</span>
          {hasDiscount && (
            <span className="ml-auto bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded">
              -{discountPercentage}% OFF
            </span>
          )}
        </div>

        <button className="mt-4 w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition">
          Ver más
        </button>
      </div>
    </Link>
  );
};

export default GameCard;
