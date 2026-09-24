import React from 'react';
import Hero from '../components/sections/Hero';
import TrustIntro from '../components/sections/TrustIntro';
import ClientLogos from '../components/sections/ClientLogos';
import Services from '../components/sections/Services';
import TheSystem from '../components/sections/TheSystem';
import RoiCalculator from '../components/sections/RoiCalculator';
import OurWork from '../components/sections/OurWork';
import Process from '../components/sections/Process';
import WhyUs from '../components/sections/WhyUs';
import FeaturedProject from '../components/sections/FeaturedProject';
import About from '../components/sections/About';
import Testimonials from '../components/sections/Testimonials';
import Pricing from '../components/sections/Pricing';
import FAQ from '../components/sections/FAQ';
import FinalCTA from '../components/sections/FinalCTA';
import Contact from '../components/sections/Contact';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <ClientLogos />
      <TrustIntro />
      <Services />
      <TheSystem />
      <RoiCalculator />
      <OurWork />
      <Process />
      <WhyUs />
      <FeaturedProject />
      <About />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Contact />
    </main>
  );
};

export default Home;
