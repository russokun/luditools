import Image from 'next/image';

interface InvitationSectionProps {
  backgroundUrl: string;
  imageUrl: string;
  text: string;
  bottomTitle: string;
}

export default function InvitationSection({
  backgroundUrl,
  imageUrl,
  text,
  bottomTitle
}: InvitationSectionProps) {
  return (
    <section 
      className="relative min-h-[600px] py-24 px-4 md:px-8 lg:px-12 bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-900/70" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-xl md:text-2xl leading-relaxed">
              {text}
            </p>
          </div>
          
          {/* Featured Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={imageUrl}
              alt="Invitation Featured Image"
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        {/* Bottom Title */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {bottomTitle}
          </h2>
          
          {/* Decorative line */}
          <div className="mt-6 w-24 h-1 bg-yellow-400 mx-auto" />
        </div>
      </div>
    </section>
  );
}