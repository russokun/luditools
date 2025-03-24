"use client";

import { type FC } from 'react';
import { NormalizedGame } from '@/types';
import GameCard from './GameCard';

interface GamesGridProps {
  games: NormalizedGame[];
}

const GamesGrid: FC<GamesGridProps> = ({ games }) => {
  console.log('GamesGrid received games:', JSON.stringify(games, null, 2));
  if (games.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-gray-600">
          No hay juegos disponibles en este momento
        </h2>
        <p className="text-gray-500 mt-2">
          Por favor, vuelve a revisar más tarde
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {games.map((game) => (
        <div key={game.id} className="w-full">
          <GameCard game={game} />
        </div>
      ))}
    </div>
  );
};

export default GamesGrid;