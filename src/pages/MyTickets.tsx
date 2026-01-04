import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Ticket, ArrowLeft, ExternalLink, QrCode, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAccount } from "wagmi";

// Mock tickets data
const mockTickets = [
  {
    id: "1",
    tokenId: "#1234",
    eventTitle: "Crypto Music Festival 2025",
    eventDate: "January 15, 2025",
    eventLocation: "Los Angeles, CA",
    eventImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
    purchaseDate: "Dec 20, 2024",
    price: "0.1 ETH",
    status: "upcoming",
    txHash: "0x1234...5678",
  },
  {
    id: "2",
    tokenId: "#0089",
    eventTitle: "Web3 Developer Summit",
    eventDate: "February 20, 2025",
    eventLocation: "San Francisco, CA",
    eventImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    purchaseDate: "Dec 18, 2024",
    price: "0.05 ETH",
    status: "upcoming",
    txHash: "0xabcd...efgh",
  },
  {
    id: "3",
    tokenId: "#0456",
    eventTitle: "NFT Art Exhibition",
    eventDate: "November 10, 2024",
    eventLocation: "New York, NY",
    eventImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    purchaseDate: "Oct 25, 2024",
    price: "0.08 ETH",
    status: "attended",
    txHash: "0x9876...5432",
  },
];

type FilterType = "all" | "upcoming" | "attended";

export default function MyTickets() {
  const { isConnected, address } = useAccount();
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTickets = mockTickets.filter(ticket => {
    if (filter === "all") return true;
    return ticket.status === filter;
  });

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-md mx-auto"
            >
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Ticket className="w-12 h-12 text-muted-foreground" />
              </div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                Connect Your Wallet
              </h1>
              <p className="text-muted-foreground mb-8">
                Connect your wallet to view your NFT tickets and event history.
              </p>
              <appkit-button />
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
                  My <span className="text-gradient">Tickets</span>
                </h1>
                <p className="text-muted-foreground">
                  Your NFT ticket collection • {address?.slice(0, 6)}...{address?.slice(-4)}
                </p>
              </div>
              
              {/* Filter Tabs */}
              <div className="flex gap-2 glass rounded-full p-1">
                {(["all", "upcoming", "attended"] as FilterType[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      filter === f 
                        ? "bg-primary text-primary-foreground" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tickets Grid */}
          {filteredTickets.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Ticket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No tickets found</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTickets.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="glass rounded-2xl overflow-hidden hover:border-primary/50 transition-colors">
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img 
                        src={ticket.eventImage} 
                        alt={ticket.eventTitle}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                      
                      {/* Token ID Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-sm font-medium">
                          {ticket.tokenId}
                        </span>
                      </div>

                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          ticket.status === "upcoming" 
                            ? "bg-primary/80 text-primary-foreground" 
                            : "bg-muted/80 text-muted-foreground"
                        }`}>
                          {ticket.status === "upcoming" ? "Upcoming" : "Attended"}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-heading font-bold text-lg mb-3 line-clamp-1">
                        {ticket.eventTitle}
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {ticket.eventDate}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {ticket.eventLocation}
                        </div>
                      </div>

                      {/* Ticket Info */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground">Purchased</p>
                          <p className="text-sm font-medium">{ticket.purchaseDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Price</p>
                          <p className="text-sm font-medium text-primary">{ticket.price}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-4">
                        {ticket.status === "upcoming" && (
                          <Button variant="hero" size="sm" className="flex-1 gap-2">
                            <QrCode className="w-4 h-4" />
                            Show QR
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="gap-2">
                          <ExternalLink className="w-4 h-4" />
                          View on Chain
                        </Button>
                        <Button variant="outline" size="icon" className="shrink-0">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16"
          >
            <h2 className="font-heading text-xl font-bold mb-6">Collection Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Tickets", value: mockTickets.length },
                { label: "Upcoming Events", value: mockTickets.filter(t => t.status === "upcoming").length },
                { label: "Events Attended", value: mockTickets.filter(t => t.status === "attended").length },
                { label: "Total Spent", value: "0.23 ETH" },
              ].map((stat, index) => (
                <div key={index} className="glass rounded-xl p-4 text-center">
                  <p className="text-2xl md:text-3xl font-heading font-bold text-gradient">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
