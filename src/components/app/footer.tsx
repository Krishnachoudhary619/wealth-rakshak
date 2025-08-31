import { Instagram, Wallet } from "lucide-react";
import { Phone } from "lucide-react";

// A simple SVG for WhatsApp icon
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  shapeRendering="geometricPrecision"
  textRendering="geometricPrecision"
  imageRendering="optimizeQuality"
  fillRule="evenodd"
  clipRule="evenodd"
  viewBox="0 0 24 24.119"
  width="24"
  height="24.119"
  {...props} // this lets you pass extra props like className, onClick, etc.
>
  <path
    fill="#fff"
    d="M20.5 3.505C18.274 1.264 15.241 0 12.082 0h-0.036C5.46 0 0.1 5.361 0.1 11.951l0 0.001a11.953 11.953 0 0 0 1.6 5.973L0 24.119l6.336 -1.663a11.948 11.948 0 0 0 5.708 1.457h0.003C18.647 23.913 24 18.559 24 11.959c0 -3.17 -1.261 -6.211 -3.501 -8.451zM12.05 21.9c-1.78 0 -3.53 -0.482 -5.059 -1.39l-0.364 -0.217 -3.76 0.985 1 -3.665 -0.235 -0.376c-0.997 -1.585 -1.528 -3.422 -1.528 -5.295 0 -5.487 4.45 -9.937 9.937 -9.937 2.641 0 5.175 1.052 7.039 2.922a9.946 9.946 0 0 1 2.911 7.03c0 5.49 -4.451 9.943 -9.942 9.943zm5.45 -7.446c-0.3 -0.151 -1.767 -0.871 -2.039 -0.971s-0.472 -0.151 -0.675 0.151 -0.772 0.971 -0.946 1.172 -0.349 0.227 -0.645 0.076c-0.296 -0.151 -1.263 -0.466 -2.4 -1.484a9.091 9.091 0 0 1 -1.67 -2.068c-0.175 -0.3 -0.019 -0.461 0.133 -0.607s0.3 -0.348 0.447 -0.523a1.961 1.961 0 0 0 0.3 -0.5 0.551 0.551 0 0 0 -0.024 -0.523c-0.081 -0.15 -0.681 -1.62 -0.921 -2.219s-0.489 -0.5 -0.673 -0.514c-0.184 -0.014 -0.373 -0.009 -0.57 -0.009a1.1 1.1 0 0 0 -0.8 0.373c-0.269 0.297 -1.042 1.022 -1.042 2.492s1.069 2.888 1.219 3.09c0.15 0.202 2.106 3.217 5.106 4.51 0.712 0.306 1.268 0.49 1.7 0.632a4.126 4.126 0 0 0 1.189 0.175c0.231 0 0.463 -0.02 0.691 -0.058 0.574 -0.084 1.766 -0.721 2.017 -1.418s0.25 -1.3 0.175 -1.419c-0.075 -0.119 -0.269 -0.206 -0.57 -0.359z"
  />
</svg>
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
  
