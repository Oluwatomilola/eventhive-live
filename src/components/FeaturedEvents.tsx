import { EventCard } from "./EventCard";
import { motion } from "framer-motion";

const events = [
  {
    title: "Crypto Music Festival 2025",
    date: "Jan 15, 2025",
    location: "Los Angeles, CA",
    price: "0.1 ETH",
    ticketsLeft: 234,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
  },
  {
    title: "Web3 Developer Summit",
    date: "Feb 20, 2025",
    location: "San Francisco, CA",
    price: "0.05 ETH",
    ticketsLeft: 89,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
  },
  {
    title: "NFT Art Exhibition",
    date: "Mar 10, 2025",
    location: "New York, NY",
    price: "0.08 ETH",
    ticketsLeft: 156,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
  },
  {
    title: "DeFi Conference 2025",
    date: "Apr 5, 2025",
    location: "Miami, FL",
    price: "0.12 ETH",
    ticketsLeft: 45,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
  },
];

export function FeaturedEvents() {
  return (
    <section id="events" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Discover</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-2 mb-4">
            Featured <span className="text-gradient">Events</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the hottest upcoming events with NFT tickets. Secure your spot before they sell out.
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <EventCard key={index} {...event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
