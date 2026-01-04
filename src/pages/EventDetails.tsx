import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Ticket, Share2, Heart, ArrowLeft, Clock, Shield } from "lucide-react";
import { useState } from "react";

// Mock event data - in production this would come from your backend
const eventsData: Record<string, {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  price: string;
  ticketsLeft: number;
  totalTickets: number;
  image: string;
  description: string;
  organizer: string;
  category: string;
}> = {
  "1": {
    id: "1",
    title: "Crypto Music Festival 2025",
    date: "January 15, 2025",
    time: "6:00 PM - 2:00 AM",
    location: "Los Angeles, CA",
    address: "Staples Center, 1111 S Figueroa St",
    price: "0.1 ETH",
    ticketsLeft: 234,
    totalTickets: 1000,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=600&fit=crop",
    description: "Join us for the biggest crypto music festival of the year! Experience world-class DJs, immersive NFT art installations, and connect with the Web3 community. Your NFT ticket grants you exclusive access to VIP areas, airdrops, and future event discounts.",
    organizer: "CryptoBeats DAO",
    category: "Music Festival",
  },
  "2": {
    id: "2",
    title: "Web3 Developer Summit",
    date: "February 20, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "San Francisco, CA",
    address: "Moscone Center, 747 Howard St",
    price: "0.05 ETH",
    ticketsLeft: 89,
    totalTickets: 500,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop",
    description: "The premier conference for Web3 developers. Learn from industry leaders, participate in hackathons, and network with fellow builders. Your NFT ticket includes workshop access, lunch, and exclusive swag.",
    organizer: "DevDAO",
    category: "Conference",
  },
  "3": {
    id: "3",
    title: "NFT Art Exhibition",
    date: "March 10, 2025",
    time: "10:00 AM - 8:00 PM",
    location: "New York, NY",
    address: "Chelsea Gallery District",
    price: "0.08 ETH",
    ticketsLeft: 156,
    totalTickets: 300,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop",
    description: "Explore cutting-edge digital art from renowned NFT artists. This exclusive exhibition features interactive installations, artist meet-and-greets, and live minting sessions.",
    organizer: "ArtBlocks Collective",
    category: "Art Exhibition",
  },
  "4": {
    id: "4",
    title: "DeFi Conference 2025",
    date: "April 5, 2025",
    time: "8:00 AM - 5:00 PM",
    location: "Miami, FL",
    address: "Miami Beach Convention Center",
    price: "0.12 ETH",
    ticketsLeft: 45,
    totalTickets: 800,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=600&fit=crop",
    description: "The definitive DeFi conference bringing together protocols, investors, and innovators. Deep-dive sessions on yield strategies, governance, and the future of decentralized finance.",
    organizer: "DeFi Alliance",
    category: "Conference",
  },
};

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const [ticketCount, setTicketCount] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const event = id ? eventsData[id] : null;

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-heading font-bold mb-4">Event Not Found</h1>
            <Link to="/">
              <Button variant="hero">Back to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const soldPercentage = ((event.totalTickets - event.ticketsLeft) / event.totalTickets) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Image */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          {/* Back Button */}
          <Link to="/" className="absolute top-6 left-6">
            <Button variant="glass" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>

          {/* Action Buttons */}
          <div className="absolute top-6 right-6 flex gap-2">
            <Button 
              variant="glass" 
              size="icon"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? "text-destructive" : ""}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            </Button>
            <Button variant="glass" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 -mt-20 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Event Details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Category Badge */}
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                {event.category}
              </span>

              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
                {event.title}
              </h1>

              {/* Event Info Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="glass rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Date</p>
                    <p className="font-medium">{event.date}</p>
                  </div>
                </div>

                <div className="glass rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Time</p>
                    <p className="font-medium">{event.time}</p>
                  </div>
                </div>

                <div className="glass rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Location</p>
                    <p className="font-medium">{event.location}</p>
                    <p className="text-muted-foreground text-xs">{event.address}</p>
                  </div>
                </div>

                <div className="glass rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Organizer</p>
                    <p className="font-medium">{event.organizer}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="glass rounded-xl p-6">
                <h2 className="font-heading text-xl font-bold mb-4">About This Event</h2>
                <p className="text-muted-foreground leading-relaxed">{event.description}</p>
              </div>

              {/* NFT Benefits */}
              <div className="glass rounded-xl p-6">
                <h2 className="font-heading text-xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  NFT Ticket Benefits
                </h2>
                <ul className="space-y-3">
                  {[
                    "Verifiable on-chain ownership",
                    "Resellable on secondary markets",
                    "Exclusive holder airdrops",
                    "Community access & perks",
                    "Proof of attendance (POAP)",
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3 text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Purchase Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="glass rounded-2xl p-6 sticky top-24 space-y-6">
                {/* Price */}
                <div className="text-center">
                  <p className="text-muted-foreground text-sm">Price per ticket</p>
                  <p className="font-heading text-4xl font-bold text-gradient">{event.price}</p>
                </div>

                {/* Availability */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Tickets sold</span>
                    <span className="font-medium">{event.totalTickets - event.ticketsLeft} / {event.totalTickets}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${soldPercentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    <span className="text-primary font-medium">{event.ticketsLeft}</span> tickets remaining
                  </p>
                </div>

                {/* Quantity Selector */}
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Quantity</label>
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                      disabled={ticketCount <= 1}
                    >
                      -
                    </Button>
                    <span className="font-heading text-2xl font-bold w-12 text-center">{ticketCount}</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setTicketCount(Math.min(10, ticketCount + 1))}
                      disabled={ticketCount >= 10}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-heading text-2xl font-bold">
                      {(parseFloat(event.price) * ticketCount).toFixed(2)} ETH
                    </span>
                  </div>
                </div>

                {/* Purchase Button */}
                <Button variant="hero" size="xl" className="w-full gap-2">
                  <Ticket className="w-5 h-5" />
                  Mint NFT Ticket
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  By purchasing, you agree to the terms and conditions
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-24" />
      </main>
      <Footer />
    </div>
  );
}
