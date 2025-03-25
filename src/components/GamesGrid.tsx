"use client";

import { type FC } from 'react';
import { NormalizedGame } from '@/types';
import GameCard from './GameCard';

interface GamesGridProps {
  games: NormalizedGame[];
}

const GamesGrid: FC<GamesGridProps> = ({ games }) => {
  // Validar que games sea un array antes de operar con él
  const validGames = Array.isArray(games) ? games : [];
  
  if (validGames.length === 0) {
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
      {validGames.map((game) => {
        if (typeof game === 'object' && game !== null && 'id' in game) {
          return (
            <div key={game.id} className="w-full">
              <GameCard game={game} />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default GamesGrid;