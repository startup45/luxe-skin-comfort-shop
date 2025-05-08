
import React from 'react';

const features = [
  {
    id: 1,
    title: "Dermatologist Approved",
    description: "Tested and validated by leading dermatologists for sensitive skin compatibility and hypoallergenic properties.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Anti-Microbial Technology",
    description: "Advanced silver-infused fibers naturally inhibit bacteria growth, keeping your towels fresher for longer.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Quick-Dry Innovation",
    description: "Our proprietary weave technology ensures 2x faster drying time compared to regular towels, reducing bacteria buildup.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Ultra-Soft Fibers",
    description: "Luxurious 700 GSM density towels made from the finest organic cotton for exceptional softness and durability.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  }
];

const Features = () => {
  return (
    <section className="bg-white py-20">
      <div className="container-luxe">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-luxe-taupe-dark mb-4">
            What Makes Our Towels Smarter
          </h2>
          <p className="text-luxe-taupe text-lg">
            The perfect blend of scientific innovation and luxury comfort for your skin.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            // Rotate through pastel colors for each feature card
            const bgColors = ["bg-luxe-pink bg-opacity-10", "bg-luxe-blue bg-opacity-10", 
                             "bg-luxe-lavender bg-opacity-10", "bg-luxe-peach bg-opacity-10"];
            const bgColor = bgColors[index % bgColors.length];
            
            return (
              <div 
                key={feature.id} 
                className={`${bgColor} border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="text-luxe-gold mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium text-luxe-taupe-dark mb-2">
                  {feature.title}
                </h3>
                <p className="text-luxe-taupe">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <button className="btn-primary">
            Explore Our Technology
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
