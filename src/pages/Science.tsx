import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Beaker, Microscope, Dna, Award, BookOpen, Sparkles, Coffee } from 'lucide-react';

const Science = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-luxe-blue/50 to-luxe-offwhite py-32 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-luxe-lavender rounded-full opacity-30 blur-xl"></div>
          <div className="absolute bottom-1/4 right-1/5 w-40 h-40 bg-luxe-mint rounded-full opacity-40 blur-xl"></div>
          
          <div className="container-luxe relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-luxe-gold uppercase tracking-widest text-sm font-medium mb-2 inline-block">Science & Innovation</span>
              <h1 className="heading-xl mb-6">
                The <span className="text-gradient-gold">Technology</span> Behind Our Towels
              </h1>
              <p className="text-luxe-taupe-dark text-lg md:text-xl leading-relaxed mb-8">
                Discover how our dermatologist-led research team combines cutting-edge textile science with skin health expertise to create towels that revolutionize your daily routine.
              </p>
              <div className="w-24 h-1 bg-luxe-gold mx-auto mt-4 mb-10"></div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
        </section>
        
        {/* Technology Pillars */}
        <section className="py-24 bg-white">
          <div className="container-luxe">
            <div className="text-center mb-16">
              <h2 className="heading-lg mb-4">Our Four Technology Pillars</h2>
              <p className="text-luxe-taupe max-w-3xl mx-auto text-lg">
                Each LUXE<span className="text-luxe-gold">SKIN</span> towel is created with our proprietary four-pillar approach to skin-friendly textile innovation.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Microscope className="h-10 w-10" />,
                  title: "Dermatological Testing",
                  description: "Rigorously tested on sensitive skin by board-certified dermatologists to ensure zero irritation."
                },
                {
                  icon: <Coffee className="h-10 w-10" />,
                  title: "Silver Infusion",
                  description: "Our patented silver-ion technology naturally inhibits bacteria growth by up to 99.9%."
                },
                {
                  icon: <Sparkles className="h-10 w-10" />,
                  title: "Hydrophilic Fibers",
                  description: "Enhanced absorption technology that pulls moisture away from skin more efficiently."
                },
                {
                  icon: <Dna className="h-10 w-10" />,
                  title: "Microfiber Structure",
                  description: "Ultra-fine fibers with special weave pattern for a softer touch against skin."
                }
              ].map((pillar, index) => (
                <div key={index} className="elegant-card hover:translate-y-[-5px] transition-transform duration-300">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-luxe-sage to-luxe-mint flex items-center justify-center mx-auto mb-6">
                    <div className="text-luxe-taupe-dark">
                      {pillar.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-medium text-luxe-taupe-dark mb-3 text-center">
                    {pillar.title}
                  </h3>
                  <p className="text-luxe-taupe text-center">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Research Process */}
        <section className="py-24 bg-gradient-to-b from-white to-luxe-offwhite">
          <div className="container-luxe">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-luxe-gold uppercase tracking-widest text-sm font-medium">Our Process</span>
                <h2 className="heading-lg mt-2 mb-6">
                  Five Years of Research & Development
                </h2>
                <div className="w-20 h-1 bg-luxe-gold mb-8"></div>
                <p className="text-luxe-taupe-dark mb-8 text-lg">
                  Our journey to create the perfect skin-friendly towel involved extensive testing, redesigning, and collaboration with dermatologists and textile engineers.
                </p>
                
                <div className="space-y-6">
                  {[
                    {
                      number: "01",
                      title: "Dermatologist Consultation",
                      description: "Initial research with skin specialists to identify key irritants and requirements."
                    },
                    {
                      number: "02",
                      title: "Material Research",
                      description: "Testing over 40 different fiber compositions to find the optimal blend."
                    },
                    {
                      number: "03",
                      title: "Weave Innovation",
                      description: "Development of our proprietary weaving technique for improved absorption."
                    },
                    {
                      number: "04",
                      title: "Consumer Testing",
                      description: "Real-world trials with individuals with sensitive skin conditions."
                    },
                    {
                      number: "05",
                      title: "Final Certification",
                      description: "Obtaining dermatological and environmental certifications."
                    }
                  ].map((step, index) => (
                    <div key={index} className="flex">
                      <div className="mr-4 text-2xl font-playfair text-luxe-gold font-medium">
                        {step.number}
                      </div>
                      <div>
                        <h4 className="font-medium text-luxe-taupe-dark mb-1">{step.title}</h4>
                        <p className="text-luxe-taupe">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-elegant p-8 relative z-10">
                  <img 
                    src="/images/products/research-lab.jpg" 
                    alt="Research and Development Lab" 
                    className="rounded-lg mb-6 w-full h-72 object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://placeholder.pics/svg/800x600/F9F8FD/9A979F/textile%20research';
                    }}
                  />
                  
                  <div className="bg-luxe-sage/20 p-6 rounded-lg">
                    <h4 className="text-xl font-medium text-luxe-taupe-dark mb-3">Lab-Tested Excellence</h4>
                    <p className="text-luxe-taupe mb-4">
                      Every batch of our towels undergoes rigorous testing for:
                    </p>
                    <ul className="space-y-2">
                      {["Absorption Rate", "Bacteria Resistance", "Drying Time", "Softness Retention", "Durability"].map((item, i) => (
                        <li key={i} className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-luxe-gold/20 flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-luxe-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-luxe-taupe-dark">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-8 -right-8 w-32 h-32 bg-luxe-blue/30 rounded-full -z-10"></div>
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-luxe-pink/30 rounded-full -z-10"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Clinical Results */}
        <section className="py-24 bg-luxe-lavender/30">
          <div className="container-luxe">
            <div className="text-center mb-16">
              <span className="text-luxe-gold uppercase tracking-widest text-sm font-medium">Clinical Results</span>
              <h2 className="heading-lg mt-2">
                Proven by Science, Loved by Skin
              </h2>
              <div className="w-20 h-1 bg-luxe-gold mx-auto mt-6 mb-6"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  stat: "97%",
                  description: "of users reported reduced skin irritation after switching to our towels"
                },
                {
                  stat: "99.9%",
                  description: "reduction in bacteria compared to standard cotton towels after 24 hours"
                },
                {
                  stat: "2x",
                  description: "faster drying time, reducing mold and mildew buildup"
                }
              ].map((result, index) => (
                <div key={index} className="bg-white rounded-xl p-8 text-center shadow-elegant hover:shadow-card transition-shadow">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-playfair text-luxe-gold font-medium mb-4">
                    {result.stat}
                  </div>
                  <p className="text-luxe-taupe">
                    {result.description}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Study Results */}
            <div className="mt-24">
              <div className="text-center mb-16">
                <h3 className="heading-md">
                  Independent Clinical Study Results
                </h3>
                <p className="text-luxe-taupe max-w-3xl mx-auto mt-4">
                  In a double-blind study conducted over 90 days with 500 participants with various skin types and sensitivities
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: <Award className="h-6 w-6" />,
                    title: "Irritation Score",
                    description: "93% lower irritation score compared to standard cotton towels"
                  },
                  {
                    icon: <Beaker className="h-6 w-6" />,
                    title: "Moisture Retention",
                    description: "Skin showed 42% higher moisture retention after towel use"
                  },
                  {
                    icon: <BookOpen className="h-6 w-6" />,
                    title: "Microbial Analysis",
                    description: "99.9% lower bacterial count after 7 days of use"
                  },
                  {
                    icon: <Sparkles className="h-6 w-6" />,
                    title: "Skin Barrier Function",
                    description: "28% improvement in skin barrier integrity measurements"
                  }
                ].map((study, index) => (
                  <div key={index} className="bg-white border border-luxe-offwhite rounded-lg p-6">
                    <div className="w-12 h-12 rounded-full bg-luxe-offwhite flex items-center justify-center mb-4">
                      <div className="text-luxe-gold">
                        {study.icon}
                      </div>
                    </div>
                    <h4 className="text-lg font-medium text-luxe-taupe-dark mb-2">
                      {study.title}
                    </h4>
                    <p className="text-luxe-taupe text-sm">
                      {study.description}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <button className="btn-secondary">
                  Download Full Research Paper
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Meet the Scientists */}
        <section className="py-24 bg-white">
          <div className="container-luxe">
            <div className="text-center mb-16">
              <span className="text-luxe-gold uppercase tracking-widest text-sm font-medium">Expert Team</span>
              <h2 className="heading-lg mt-2">
                Meet Our Scientists
              </h2>
              <div className="w-20 h-1 bg-luxe-gold mx-auto mt-6 mb-6"></div>
              <p className="text-luxe-taupe max-w-3xl mx-auto">
                Our team of dermatologists, textile engineers, and microbiologists work together to create the most skin-friendly towels.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Sarah Chen, MD",
                  role: "Lead Dermatologist",
                  bio: "Board-certified dermatologist specializing in sensitive skin conditions and contact dermatitis."
                },
                {
                  name: "Dr. Michael Park, PhD",
                  role: "Textile Engineer",
                  bio: "Expert in innovative fabric development with 15+ years experience in antimicrobial textiles."
                },
                {
                  name: "Dr. Lisa Rodriguez",
                  role: "Microbiologist",
                  bio: "Researcher focused on bacterial growth patterns in different fabric environments and moisture conditions."
                }
              ].map((scientist, index) => (
                <div key={index} className="bg-white border border-luxe-offwhite rounded-xl overflow-hidden shadow-card hover:shadow-elegant transition-all">
                  <div className="h-64 bg-luxe-sage/20 flex items-center justify-center">
                    <img 
                      src={`/images/team/scientist-${index+1}.jpg`}
                      alt={scientist.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = `https://placeholder.pics/svg/400x400/DCEEFF/4E4B54/scientist`;
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-luxe-taupe-dark">
                      {scientist.name}
                    </h3>
                    <div className="text-luxe-gold font-medium text-sm mb-3">
                      {scientist.role}
                    </div>
                    <p className="text-luxe-taupe">
                      {scientist.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Science;
