import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { HowItWorks } from "@/components/sections/how-it-works"
import { TestimonialsSection } from "@/components/sections/testimonial-sections"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <HowItWorks />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
