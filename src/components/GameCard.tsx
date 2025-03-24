'use client';

import { type FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NormalizedGame } from '@/types';
import { calculatePrice } from '@/lib/api';

interface GameCardProps {
  game: NormalizedGame;
}

const GameCard: FC<GameCardProps> = ({ game }) => {
  if (!game) return null;

  const priceInfo = calculatePrice(game.price, game.discount);

  const renderText = (value: unknown): string => {
    if (typeof value === 'string') return value;
    if (
      typeof value === 'object' &&
      value !== null &&
      Array.isArray((value as any).children)
    ) {
      return (value as any).children
        .map((child: any) => (typeof child === 'string' ? child : child.text ?? ''))
        .join('');
    }
    return '';
  };

  return (
    <article className="bg-white rounded-xl shadow-lg p-4 transform hover:scale-105 transition-transform duration-300">
      <Link href={`/tienda/${game.id}`} className="block">
        {/* Imagen */}
        <div className="w-full h-48 relative bg-gray-100 mb-4 rounded-lg overflow-hidden">
          {game.coverImage ? (
            <Image
              src={game.coverImage.url}
              alt={renderText(game.title)}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-400">Sin imagen</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-blue-900 line-clamp-2">
            {renderText(game.title)}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {renderText(game.description)}
          </p>

          {/* Precio */}
          <div className="flex items-center gap-2">
            {priceInfo.hasDiscount && (
              <span className="text-lg text-gray-400 line-through">
                ${priceInfo.original.toLocaleString()}
              </span>
            )}
            <span className="text-2xl font-bold text-blue-800">
              ${priceInfo.final.toLocaleString()}
            </span>
            {priceInfo.hasDiscount && (
              <span className="text-sm text-green-600 font-semibold">
                {priceInfo.discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Botón */}
          <div className="pt-2">
            <span className="block w-full bg-blue-800 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center">
              Ver detalles
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default GameCard;
