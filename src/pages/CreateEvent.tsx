import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, Upload, Ticket, Clock, DollarSign, Image as ImageIcon, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function CreateEvent() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    address: "",
    price: "",
    totalTickets: "",
    category: "",
    image: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Event Created!",
      description: "Your event has been submitted for review. Connect your wallet to deploy the smart contract.",
    });

    setIsSubmitting(false);
  };

  const categories = [
    "Music Festival",
    "Conference",
    "Art Exhibition",
    "Workshop",
    "Meetup",
    "Sports",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
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
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Create Your <span className="text-gradient">Event</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Launch your event with NFT tickets on the blockchain. Set your price, capacity, and let attendees mint their unique tickets.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Image Upload */}
            <div className="glass rounded-2xl p-6">
              <Label className="text-lg font-heading font-semibold mb-4 block">Event Image</Label>
              <div 
                className={`relative border-2 border-dashed rounded-xl transition-colors ${
                  imagePreview ? "border-primary" : "border-border hover:border-primary/50"
                }`}
              >
                {imagePreview ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-background/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button type="button" variant="glass" onClick={() => {
                        setImagePreview(null);
                        setFormData(prev => ({ ...prev, image: null }));
                      }}>
                        Change Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center aspect-video cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground mb-2">Click to upload event image</p>
                    <p className="text-muted-foreground text-sm">PNG, JPG up to 10MB</p>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange}
                      className="hidden" 
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="glass rounded-2xl p-6 space-y-6">
              <h2 className="text-lg font-heading font-semibold">Basic Information</h2>
              
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Web3 Music Festival 2025"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="bg-muted/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Tell attendees what makes your event special..."
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="bg-muted/50 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full h-10 rounded-md border border-input bg-muted/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Time */}
            <div className="glass rounded-2xl p-6 space-y-6">
              <h2 className="text-lg font-heading font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Date & Time
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="bg-muted/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="bg-muted/50"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="glass rounded-2xl p-6 space-y-6">
              <h2 className="text-lg font-heading font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Location
              </h2>
              
              <div className="space-y-2">
                <Label htmlFor="location">City</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g., Los Angeles, CA"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="bg-muted/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Venue Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="e.g., 123 Main Street"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="bg-muted/50"
                />
              </div>
            </div>

            {/* Ticket Settings */}
            <div className="glass rounded-2xl p-6 space-y-6">
              <h2 className="text-lg font-heading font-semibold flex items-center gap-2">
                <Ticket className="w-5 h-5 text-primary" />
                Ticket Settings
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Ticket Price (ETH)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.001"
                      min="0"
                      placeholder="0.1"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      className="bg-muted/50 pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalTickets">Total Tickets</Label>
                  <Input
                    id="totalTickets"
                    name="totalTickets"
                    type="number"
                    min="1"
                    placeholder="1000"
                    value={formData.totalTickets}
                    onChange={handleInputChange}
                    required
                    className="bg-muted/50"
                  />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm text-muted-foreground">
                  <span className="text-primary font-medium">Pro tip:</span> NFT tickets can be resold on secondary markets. You can set royalties to earn a percentage of every resale.
                </p>
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                type="submit" 
                variant="hero" 
                size="xl" 
                className="flex-1 gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Creating Event...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Create Event & Deploy Contract
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" size="xl" asChild>
                <Link to="/">Cancel</Link>
              </Button>
            </div>
          </motion.form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
