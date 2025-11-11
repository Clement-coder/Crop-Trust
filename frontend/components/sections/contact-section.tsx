
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-green-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We&#39;d love to hear from you! Send us a message and we&#39;ll get back to you as soon as possible.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                  <Mail size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground">Email</h3>
                <p className="mt-1 text-muted-foreground">contact@croptrust.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                  <Phone size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground">Phone</h3>
                <p className="mt-1 text-muted-foreground">+1 (123) 456-7890</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                  <MapPin size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground">Address</h3>
                <p className="mt-1 text-muted-foreground">123 Blockchain Street, Ethereum City, 12345</p>
              </div>
            </div>
          </div>
          <form className="grid grid-cols-1 gap-y-6">
            <div>
              <label htmlFor="name" className="sr-only">Full name</label>
              <input type="text" name="name" id="name" autoComplete="name" className="block w-full shadow-sm py-3 px-4 placeholder-muted-foreground focus:ring-primary focus:border-primary border-border rounded-md" placeholder="Full name" />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" className="block w-full shadow-sm py-3 px-4 placeholder-muted-foreground focus:ring-primary focus:border-primary border-border rounded-md" placeholder="Email" />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea id="message" name="message" rows={4} className="block w-full shadow-sm py-3 px-4 placeholder-muted-foreground focus:ring-primary focus:border-primary border-border rounded-md" placeholder="Message"></textarea>
            </div>
            <div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
