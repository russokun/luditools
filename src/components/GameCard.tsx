"use client";

import Image from 'next/image';
import { type FC } from 'react';
import { NormalizedGame } from '@/types';
import { calculatePrice } from '@/lib/api';

const STYLES = {
  card: "bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-200 flex flex-col",
  imageContainer: "relative aspect-video w-full",
  image: "object-cover",
  bestSellerBadge: "absolute top-4 left-4",
  bestSellerText: "bg-yellow-400 text-blue-900 px-4 py-2 rounded-full text-sm font-bold",
  content: "p-6 flex flex-col flex-grow",
  title: "text-xl font-bold text-blue-900 mb-2",
  priceContainer: "mb-4",
  priceWrapper: "flex items-center gap-2",
  originalPrice: "text-gray-500 line-through text-sm",
  finalPrice: "text-2xl font-bold text-blue-800",
  discount: "text-sm font-semibold text-green-600",
  featuresList: "space-y-2 mb-6 flex-grow",
  featureItem: "flex items-start gap-2 text-gray-600",
  checkIcon: "w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0",
  facilitatorSection: "flex items-center gap-3 mt-4 pt-4 border-t border-gray-100",
  facilitatorImage: "relative w-10 h-10 rounded-full overflow-hidden",
  facilitatorInfo: "text-sm",
  facilitatorName: "font-semibold text-blue-900",
  facilitatorRole: "text-gray-600",
  actionButton: "w-full mt-6 bg-blue-800 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold",
} as const;

const CheckIcon: FC = () => (
  <svg
    className={STYLES.checkIcon}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

interface GameCardProps {
  game: NormalizedGame;
}

interface PriceDisplayProps {
  priceInfo: ReturnType<typeof calculatePrice>;
}

const PriceDisplay: FC<PriceDisplayProps> = ({ priceInfo }) => (
  <div className={STYLES.priceWrapper}>
    {priceInfo.hasDiscount && (
      <span className={STYLES.originalPrice}>
        ${priceInfo.original.toLocaleString()}
      </span>
    )}
    <span className={STYLES.finalPrice}>
      ${priceInfo.final.toLocaleString()}
    </span>
    {priceInfo.hasDiscount && (
      <span className={STYLES.discount}>
        {priceInfo.discountPercentage}% OFF
      </span>
    )}
  </div>
);

interface FeatureListProps {
  features: Array<{
    title: string;
    description: string;
  }>;
}

const FeatureList: FC<FeatureListProps> = ({ features }) => (
  features && features.length > 0 ? (
    <ul className={STYLES.featuresList}>
      {features.map((feature, index) => (
        <li key={index} className={STYLES.featureItem}>
          <CheckIcon />
          <span>{feature.title}</span>
        </li>
      ))}
    </ul>
  ) : null
);

interface FacilitatorSectionProps {
  facilitator: NonNullable<NormalizedGame['facilitator']>;
}

const FacilitatorSection: FC<FacilitatorSectionProps> = ({ facilitator }) => (
  <div className={STYLES.facilitatorSection}>
    {facilitator.image && (
      <div className={STYLES.facilitatorImage}>
        <Image
          src={facilitator.image.url}
          alt={facilitator.name}
          fill
          className={STYLES.image}
        />
      </div>
    )}
    <div className={STYLES.facilitatorInfo}>
      <p className={STYLES.facilitatorName}>
        {facilitator.name}
      </p>
      <p className={STYLES.facilitatorRole}>
        Facilitador
      </p>
    </div>
  </div>
);

const GameCard: FC<GameCardProps> = ({ game }) => {
  const priceInfo = calculatePrice(game.price, game.discount);

  return (
    <article className={STYLES.card}>
      <div className={STYLES.imageContainer}>
        <Image
          src={game.coverImage.url}
          alt={game.title}
          fill
          className={STYLES.image}
        />
        {game.bestSeller && (
          <div className={STYLES.bestSellerBadge}>
            <span className={STYLES.bestSellerText}>
              Best Seller
            </span>
          </div>
        )}
      </div>

      <div className={STYLES.content}>
        <h3 className={STYLES.title}>{game.title}</h3>
        
        <div className={STYLES.priceContainer}>
          <PriceDisplay priceInfo={priceInfo} />
        </div>

        <FeatureList features={game.features} />

        {game.facilitator && (
          <FacilitatorSection facilitator={game.facilitator} />
        )}

        <button
          className={STYLES.actionButton}
          onClick={() => {/* Add game details navigation here */}}
        >
          Ver detalles
        </button>
      </div>
    </article>
  );
};

export default GameCard;