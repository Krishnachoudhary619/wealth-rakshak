import Image from "next/image";
import { Button } from "../ui/button";
import { Instagram, ArrowUpRight } from "lucide-react";

const reels = [
    { id: 1, src: "https://media.licdn.com/dms/image/v2/D4D12AQGlTYeG7Xt2KA/article-cover_image-shrink_720_1280/B4DZbe4WEXGYAI-/0/1747496042804?e=1762387200&v=beta&t=RVKdKbr4gcgU3lO-V9dkDK0ZErqzKkAA5y-CXaMCxuE",redirect:"https://www.linkedin.com/pulse/why-i-prefer-mutual-funds-over-direct-stocks-especially-gowda-kbocf/", alt: "Market insights reel", hint: "market chart" },
    { id: 2, src: "https://i.pinimg.com/736x/07/de/a9/07dea96c25d3d0d0eead5feeafd72218.jpg", redirect:"https://www.linkedin.com/pulse/why-i-prefer-mutual-funds-over-direct-stocks-especially-gowda-kbocf?utm_source=share&utm_medium=member_android&utm_campaign=share_via",alt: "Success story reel", hint: "happy person" },
    { id: 3, src: "https://i.pinimg.com/736x/40/ee/03/40ee03fdbf83446b9bb9078c5ea5cfb6.jpg",redirect:"", alt: "Investment tips reel", hint: "lightbulb idea" },
    { id: 4, src: "https://i.pinimg.com/736x/d3/ec/a1/d3eca1cafcab35a5a130ddd1bd6ed71d.jpg",redirect:"", alt: "Q&A session reel", hint: "question mark" },
]

export function InstagramFeed() {
  return (

    <section id="social" className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-3">
            <div className="inline-block rounded-lg bg-accent/10 px-3 py-1 text-sm text-accent font-medium font-headline">Stay Connected</div>
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl text-primary">Latest Insights & Stories</h2>
            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Follow us on Instagram for daily market updates, investment tips, and success stories from our clients.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {reels.map(reel => (
                <a key={reel.id} href={reel.redirect} target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden rounded-xl shadow-lg">
                    <Image
                        src={reel.src}
                        alt={reel.alt}
                        width={300}
                        height={500}
                        data-ai-hint={reel.hint}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                        <ArrowUpRight className="h-12 w-12 text-white" />
                    </div>
                </a>
            ))}
        </div>
        <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-transform hover:scale-105">
                <a href="https://www.instagram.com/wealth_rakshak/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="mr-2 h-5 w-5" />
                    Follow on Instagram
                </a>
            </Button>
        </div>
      </div>
    </section>
  );
}
