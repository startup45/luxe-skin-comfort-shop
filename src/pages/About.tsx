
import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Calendar, Users, Heart, Award } from 'lucide-react';

const About = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-luxe-sage/30 to-luxe-offwhite py-32 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-36 h-36 bg-luxe-pink rounded-full opacity-20 blur-xl"></div>
          <div className="absolute bottom-1/3 left-1/5 w-32 h-32 bg-luxe-blue rounded-full opacity-30 blur-xl"></div>
          
          <div className="container-luxe relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-luxe-gold uppercase tracking-widest text-sm font-medium mb-2 inline-block">Our Story</span>
              <h1 className="heading-xl mb-6">
                Redefining <span className="text-gradient-gold">Luxury</span> For Your Skin
              </h1>
              <p className="text-luxe-taupe-dark text-lg md:text-xl leading-relaxed mb-8">
                Founded by dermatologists and textile experts, LUXESKIN combines scientific innovation with aesthetic elegance to transform your daily routines.
              </p>
              <div className="w-24 h-1 bg-luxe-gold mx-auto mt-4 mb-10"></div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
        </section>
        
        {/* Our Journey Timeline */}
        <section className="py-24 bg-white">
          <div className="container-luxe">
            <div className="text-center mb-16">
              <h2 className="heading-lg mb-4">Our Journey</h2>
              <p className="text-luxe-taupe max-w-3xl mx-auto text-lg">
                From a small idea to a revolutionary approach to skin-friendly textiles
              </p>
            </div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-luxe-gold/30"></div>
              
              {/* Timeline events */}
              <div className="space-y-20">
                {[
                  {
                    year: "2017",
                    title: "The Initial Idea",
                    description: "Dr. Lisa Chen, a dermatologist treating patients with sensitive skin conditions, observes how standard towels contribute to skin irritation. She begins exploring textile alternatives."
                  },
                  {
                    year: "2018",
                    title: "Research Partnership",
                    description: "Dr. Chen partners with textile engineer Michael Park to research and develop skin-friendly textile compositions, testing over 40 different fiber combinations."
                  },
                  {
                    year: "2019",
                    title: "First Prototype",
                    description: "The first LUXESKIN prototype towel is developed with silver-infused fibers and a proprietary weave pattern designed for sensitive skin."
                  },
                  {
                    year: "2020",
                    title: "Clinical Testing",
                    description: "A major double-blind study with 500 participants begins, comparing LUXESKIN towels to standard luxury and mid-range alternatives."
                  },
                  {
                    year: "2021",
                    title: "Official Launch",
                    description: "After successful clinical trials showing 93% reduction in skin irritation, LUXESKIN launches to the public with its first collection of bath towels."
                  },
                  {
                    year: "2023",
                    title: "Expansion",
                    description: "LUXESKIN expands its product line to include face towels, hand towels, and luxury bundles while earning multiple industry awards for innovation."
                  }
                ].map((event, index) => (
                  <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-6 md:gap-16`}>
                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                      <div className="bg-white rounded-xl p-8 shadow-elegant hover:shadow-card transition-all duration-300">
                        <span className="text-2xl font-playfair font-medium text-luxe-gold">{event.year}</span>
                        <h3 className="text-xl font-medium text-luxe-taupe-dark mt-2 mb-4">{event.title}</h3>
                        <p className="text-luxe-taupe">{event.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center z-10">
                      <div className="w-12 h-12 bg-white border-4 border-luxe-gold/30 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 bg-luxe-gold rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="md:w-1/2 hidden md:block"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-24 bg-luxe-offwhite">
          <div className="container-luxe">
            <div className="text-center mb-16">
              <h2 className="heading-lg mb-4">Our Core Values</h2>
              <p className="text-luxe-taupe max-w-3xl mx-auto text-lg">
                The principles that guide everything we do at LUXESKIN
              </p>
              <div className="w-24 h-1 bg-luxe-gold mx-auto mt-6"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {[
                {
                  icon: <Beaker className="h-12 w-12" />,
                  title: "Scientific Innovation",
                  description: "We continuously research and develop new technologies to improve skin health."
                },
                {
                  icon: <Heart className="h-12 w-12" />,
                  title: "Customer Wellbeing",
                  description: "Our customers' skin health and comfort is at the center of every decision we make."
                },
                {
                  icon: <Award className="h-12 w-12" />,
                  title: "Uncompromising Quality",
                  description: "We source only the finest materials and maintain rigorous quality control standards."
                },
                {
                  icon: <Users className="h-12 w-12" />,
                  title: "Inclusivity",
                  description: "We design products that work for all skin types, especially the most sensitive."
                }
              ].map((value, index) => (
                <div key={index} className="bg-white rounded-xl p-8 text-center shadow-elegant hover:-translate-y-2 transition-all duration-300">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-luxe-cream to-luxe-gold/20 flex items-center justify-center mx-auto mb-6">
                    <div className="text-luxe-gold">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-medium text-luxe-taupe-dark mb-4">
                    {value.title}
                  </h3>
                  <p className="text-luxe-taupe">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-24 bg-white">
          <div className="container-luxe">
            <div className="text-center mb-16">
              <h2 className="heading-lg mb-4">Meet Our Team</h2>
              <p className="text-luxe-taupe max-w-3xl mx-auto text-lg">
                The passionate experts behind LUXESKIN's innovation and quality
              </p>
              <div className="w-24 h-1 bg-luxe-gold mx-auto mt-6"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  name: "Dr. Lisa Chen",
                  role: "Founder & Chief Scientific Officer",
                  bio: "Board-certified dermatologist with 15+ years specializing in sensitive skin conditions and textile-related dermatitis."
                },
                {
                  name: "Michael Park",
                  role: "Co-Founder & Chief Innovation Officer",
                  bio: "Textile engineer with extensive experience in material science and sustainable manufacturing processes."
                },
                {
                  name: "Sarah Johnson",
                  role: "Chief Marketing Officer",
                  bio: "Former luxury brand executive with expertise in building premium consumer brands in the wellness space."
                },
                {
                  name: "David Williams",
                  role: "Head of Operations",
                  bio: "Supply chain expert specializing in ethical sourcing and quality control for premium textile products."
                },
                {
                  name: "Emma Rodriguez",
                  role: "Customer Experience Director",
                  bio: "Dedicated to creating meaningful connections with customers and ensuring their complete satisfaction."
                },
                {
                  name: "Dr. James Lee",
                  role: "Research Lead",
                  bio: "Microbiologist focused on antimicrobial textile innovations and sustainable hygiene solutions."
                }
              ].map((member, index) => (
                <div key={index} className="bg-white border border-luxe-offwhite rounded-xl overflow-hidden shadow-card hover:shadow-elegant transition-all">
                  <div className="h-64 bg-luxe-sage/20 flex items-center justify-center">
                    <img 
                      src={`https://placeholder.pics/svg/400x400/DCEEFF/4E4B54/team-member-${index+1}`}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-luxe-taupe-dark">
                      {member.name}
                    </h3>
                    <div className="text-luxe-gold font-medium text-sm mb-3">
                      {member.role}
                    </div>
                    <p className="text-luxe-taupe">
                      {member.bio}
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

export default About;
