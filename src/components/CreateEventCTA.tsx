import { Button } from "@/components/ui/button";
import { Plus, Sparkles, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

export function CreateEventCTA() {
  return (
    <section id="create" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-card to-secondary/20" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
          
          {/* Glow Effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/30 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/30 rounded-full blur-[128px]" />

          <div className="relative p-8 md:p-16">
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">For Event Organizers</span>
              </div>

              <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
                Launch Your Event on the{" "}
                <span className="text-gradient">Blockchain</span>
              </h2>

              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                Create NFT tickets for your events in minutes. Set your price, 
                define ticket limits, and let the blockchain handle the rest.
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[
                  { icon: TrendingUp, label: "Earn Royalties", desc: "On every resale" },
                  { icon: Users, label: "Reach Global", desc: "Audience instantly" },
                  { icon: Sparkles, label: "Zero Fraud", desc: "Blockchain verified" },
                ].map((feature, i) => (
                  <div key={i} className="glass rounded-xl p-4 text-center">
                    <feature.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="font-semibold text-foreground">{feature.label}</div>
                    <div className="text-sm text-muted-foreground">{feature.desc}</div>
                  </div>
                ))}
              </div>

              <Button variant="hero" size="xl" className="group">
                <Plus className="w-5 h-5" />
                Create Your Event
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
