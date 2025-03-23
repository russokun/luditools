interface TextBlockProps {
  content: string;
}

interface TextSectionProps {
  blocks: TextBlockProps[];
  backgroundColor?: 'white' | 'blue';
}

export default function TextSection({ 
  blocks, 
  backgroundColor = 'white' 
}: TextSectionProps) {
  const bgClass = backgroundColor === 'blue' 
    ? 'bg-blue-800 text-white' 
    : 'bg-white text-blue-900';

  const textClass = backgroundColor === 'blue'
    ? 'text-cyan-200'
    : 'text-blue-800';

  return (
    <section className={`py-20 px-4 md:px-8 lg:px-12 ${bgClass}`}>
      <div className="max-w-5xl mx-auto">
        <div className="space-y-16">
          {blocks.map((block, index) => (
            <div 
              key={index}
              className={`prose prose-lg md:prose-xl max-w-none ${textClass}`}
            >
              {/* Split paragraphs and preserve line breaks */}
              {block.content.split('\n').map((paragraph, pIndex) => (
                <p 
                  key={pIndex}
                  className="leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="max-w-2xl mx-auto mt-12">
        <div className="flex items-center justify-center space-x-4">
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-20 h-1 bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
        </div>
      </div>
    </section>
  );
}