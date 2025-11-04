"use client"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const testimonials = [
  {
    quote: "CropTrust transformed how I sell my crops. The platform is transparent and the buyers are serious.",
    author: "Chidi Okafor",
    role: "Tomato Farmer",
    avatar: "👨‍🌾",
  },
  {
    quote: "Finally, a reliable source for fresh produce. The trust score system gives me confidence.",
    author: "Amara Johnson",
    role: "Restaurant Owner",
    avatar: "👩‍💼",
  },
  {
    quote: "The escrow system is genius. No more payment disputes or quality issues.",
    author: "Kofi Mensah",
    role: "Distributor",
    avatar: "👨‍💼",
  },
  {
    quote: "I've grown my farming business significantly through CropTrust's connections.",
    author: "Zainab Hassan",
    role: "Crop Trader",
    avatar: "👩‍🌾",
  },
]

export function TestimonialSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Voices of Trust</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from farmers, buyers, and traders who've transformed their business with CropTrust.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-lg text-foreground mb-4 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{testimonial.avatar}</div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
