
import { Leaf, Users, Target } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            About CropTrust
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We are on a mission to revolutionize the agricultural supply chain through the power of blockchain technology.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground">
              <Leaf size={32} />
            </div>
            <h3 className="mt-6 text-xl font-bold text-foreground">Our Mission</h3>
            <p className="mt-2 text-base text-muted-foreground">
              To empower farmers and consumers by creating a transparent, efficient, and trustworthy agricultural marketplace.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground">
              <Users size={32} />
            </div>
            <h3 className="mt-6 text-xl font-bold text-foreground">Our Team</h3>
            <p className="mt-2 text-base text-muted-foreground">
              We are a passionate team of developers, designers, and agricultural experts dedicated to this cause.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground">
              <Target size={32} />
            </div>
            <h3 className="mt-6 text-xl font-bold text-foreground">Our Vision</h3>
            <p className="mt-2 text-base text-muted-foreground">
              We envision a world where every farmer gets a fair price for their produce and every consumer knows the origin of their food.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
