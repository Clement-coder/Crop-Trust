import { Twitter, Linkedin, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-muted-foreground hover:text-foreground">
            <span className="sr-only">Twitter</span>
            <Twitter size={24} />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            <span className="sr-only">LinkedIn</span>
            <Linkedin size={24} />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            <span className="sr-only">GitHub</span>
            <Github size={24} />
          </a>
        </div>
        <p className="mt-8 text-center text-base text-muted-foreground">
          &copy; {new Date().getFullYear()} CropTrust. All rights reserved.
        </p>
      </div>
    </footer>
  );
}