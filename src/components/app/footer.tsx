import { Wallet, Instagram, Phone } from "lucide-react";

// A simple SVG for WhatsApp icon
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path><path d="M14.05 2.9A10.36 10.36 0 0 1 21.1 10c0 5.52-4.48 10-10 10a10.83 10.83 0 0 1-6.43-2.29"></path></svg>
  );
  

export function Footer() {
    const year = new Date().getFullYear();
    return (
      <footer id="contact" className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-4">
              <a href="#home" className="flex items-center gap-2 font-bold text-2xl font-headline">
                <Wallet className="h-7 w-7" />
                <span>Wealth Rakshak</span>
              </a>
              <p className="text-sm text-primary-foreground/80 max-w-xs">
                Your shield for financial security. Let us guide you on your journey to long-term wealth and prosperity.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold font-headline text-lg">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#home" className="text-primary-foreground/80 hover:text-white transition-colors">Home</a></li>
                <li><a href="#calculator" className="text-primary-foreground/80 hover:text-white transition-colors">Calculator</a></li>
                <li><a href="#suggestions" className="text-primary-foreground/80 hover:text-white transition-colors">Suggestions</a></li>
                <li><a href="#learn" className="text-primary-foreground/80 hover:text-white transition-colors">Learn</a></li>
              </ul>
            </div>
  
            <div className="space-y-4">
                <h4 className="font-bold font-headline text-lg">Connect With Us</h4>
                <p className="text-sm text-primary-foreground/80">
                    Ready to start your investment journey? Reach out for a personalized consultation.
                </p>
                <div className="flex space-x-4">
                    <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-accent/20 text-white py-2 px-4 rounded-full hover:bg-accent/30 transition-colors">
                        <WhatsAppIcon className="h-5 w-5"/>
                        <span>WhatsApp</span>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-accent/20 text-white py-2 px-4 rounded-full hover:bg-accent/30 transition-colors">
                        <Instagram className="h-5 w-5"/>
                        <span>Instagram</span>
                    </a>
                </div>
            </div>
          </div>
  
          <div className="mt-12 border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/70">
            <p>&copy; {year} Wealth Rakshak. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
  
