"use client";

interface SaleSectionProps {
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  ctaText: string;
  ctaLink: string;
  features?: string[];
}

export default function SaleSection({
  title,
  description,
  price,
  discountPrice,
  ctaText,
  ctaLink,
  features
}: SaleSectionProps) {
  const hasDiscount = discountPrice !== undefined && discountPrice < price;
  const displayPrice = hasDiscount ? discountPrice : price;
  const discountPercentage = hasDiscount
    ? Math.round(((price - discountPrice!) / price) * 100)
    : 0;

  return (
    <section className="bg-gradient-to-b from-blue-800 to-blue-900 text-white py-24 px-4 md:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          {title}
        </h2>
        
        <p className="text-xl md:text-2xl text-cyan-200 mb-12 leading-relaxed">
          {description}
        </p>

        {/* Price Display */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            {hasDiscount && (
              <span className="text-2xl text-gray-400 line-through">
                ${price.toLocaleString()}
              </span>
            )}
            <span className="text-4xl md:text-5xl font-bold text-yellow-400">
              ${displayPrice.toLocaleString()}
            </span>
          </div>
          
          {hasDiscount && (
            <div className="mt-4">
              <span className="inline-block bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-semibold">
                ¡{discountPercentage}% de descuento!
              </span>
            </div>
          )}
        </div>

        {/* Features list */}
        {features && features.length > 0 && (
          <div className="mb-12">
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li 
                  key={index}
                  className="flex items-center justify-center gap-2"
                >
                  <svg 
                    className="w-6 h-6 text-yellow-400 flex-shrink-0"
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
                  <span className="text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA Button */}
        <a
          href={ctaLink}
          className="inline-block bg-yellow-400 text-blue-900 text-xl font-bold px-12 py-6 rounded-xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
}