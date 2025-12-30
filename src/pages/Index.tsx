import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedEvents } from "@/components/FeaturedEvents";
import { HowItWorks } from "@/components/HowItWorks";
import { CreateEventCTA } from "@/components/CreateEventCTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedEvents />
        <HowItWorks />
        <CreateEventCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
