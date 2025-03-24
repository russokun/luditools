"use client";

interface InvitationSectionProps {
  title: string;
  text: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function InvitationSection({
  title,
  text,
  buttonText = "Descubre más",
  buttonHref = "#"
}: InvitationSectionProps) {
  return (
    <section className="relative w-full bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Curva superior */}
      <div className="absolute top-0 left-0 w-full h-50 overflow-hidden">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-full fill-blue-50"
        >
          <path
            d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z"
          />
        </svg>
      </div>

      {/* Contenido principal */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 pt-30 pb-32 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto">
          {text}
        </p>
        <a
          href={buttonHref}
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          {buttonText}
        </a>
      </div>

      {/* Curva inferior */}
      <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden transform rotate-180">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-full fill-blue-50"
        >
          <path
            d="M0.00,49.98 C149.99,150.00 271.49,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z"
          />
        </svg>
      </div>

      {/* Patrón decorativo inferior */}
      <div className="absolute bottom-0 left-0 w-full h-64 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/landing/topimg.png')] bg-repeat-x bg-contain bg-bottom"></div>
      </div>
    </section>
  );
}
