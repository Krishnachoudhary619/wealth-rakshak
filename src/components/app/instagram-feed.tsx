"use client"

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import { Button } from "../ui/button";
import { Instagram, ArrowUpRight } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const reels = [
    { id: 1, src: "https://media.licdn.com/dms/image/v2/D4D12AQERochHJmd0hA/article-cover_image-shrink_720_1280/B4DZWKPaMkHAAI-/0/1741781052886?e=1762387200&v=beta&t=aGi71G1qlsayeYVtuL4vLctIn7RY54y6bF5WUBivRRQ",redirect:"https://www.linkedin.com/pulse/skill-gap-india-challenge-opportunity-satyam-singh-bwnef/", alt: "Q&A session reel", hint: "question mark" },
    { id: 2, src: "https://media.licdn.com/dms/image/v2/D4D12AQFHAX9p0UNUGA/article-cover_image-shrink_720_1280/B4DZWEHyUEHkAI-/0/1741678390000?e=1762387200&v=beta&t=mSfLhGAw_cepTCn3WaANExl4D4RDxOhprW-L6va7hBk",redirect:"https://www.linkedin.com/pulse/indias-job-crisis-more-education-fewer-jobs-satyam-singh-qpp4f/", alt: "Q&A session reel", hint: "question mark" },
    { id: 3, src: "https://media.licdn.com/dms/image/v2/D4D22AQFB2DRd79HcdA/feedshare-shrink_800/B4DZjN53dBHwAo-/0/1755801159884?e=1759363200&v=beta&t=qIHf8HPDR3sDSI5IF7Ow7stfvZ2c8iHS3VAo8o-8F6w",redirect:"https://www.linkedin.com/posts/wealth-rakshak_mutualfunds-july2025-investing-activity-7364506615233888256-XTFo/?utm_source=share&utm_medium=member_android&rcm=ACoAADFmVMABcJ12bAxO7fc0tm01jgqWPfhEy7s", alt: "Investment tips reel", hint: "lightbulb idea" },
    { id: 4, src: "https://media.licdn.com/dms/image/v2/D4D22AQEs3HglyeE4PA/feedshare-shrink_800/B4DZfwJAr6HMAo-/0/1752080584471?e=1759363200&v=beta&t=429b3pY9JNNTkyi3RpYTbeo0HEkQ9CqO9hDyYPl9mp4",redirect:"https://www.linkedin.com/posts/wealth-rakshak_sip2025-mutualfundssahihai-financialliteracy-activity-7348758608190304257-vf_l/?utm_source=share&utm_medium=member_android&rcm=ACoAADFmVMABcJ12bAxO7fc0tm01jgqWPfhEy7s", alt: "Q&A session reel", hint: "question mark" },
    { id: 5, src: "https://media.licdn.com/dms/image/v2/D4D12AQGlTYeG7Xt2KA/article-cover_image-shrink_720_1280/B4DZbe4WEXGYAI-/0/1747496042804?e=1762387200&v=beta&t=RVKdKbr4gcgU3lO-V9dkDK0ZErqzKkAA5y-CXaMCxuE",redirect:"https://www.linkedin.com/pulse/why-i-prefer-mutual-funds-over-direct-stocks-especially-gowda-kbocf/", alt: "Market insights reel", hint: "market chart" },
    { id: 6, src: "https://media.licdn.com/dms/image/v2/D4D22AQHmMuEddSiMMQ/feedshare-shrink_2048_1536/B4DZj1DxB9G8A0-/0/1756458062800?e=1759363200&v=beta&t=lpLQJJqSKXYkdOC_eC0vEUp0fRHv41Zmi-UsIfgc1qU", redirect:"https://www.linkedin.com/posts/wealth-rakshak_sip-mutualfunds-gst-activity-7367119088440983552-qsfW/?utm_source=share&utm_medium=member_android&rcm=ACoAADFmVMABcJ12bAxO7fc0tm01jgqWPfhEy7s",alt: "Success story reel", hint: "happy person" },
];

export function InstagramFeed() {
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    );

    return (
        <section id="social" className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="space-y-3">
                        <div className="inline-block rounded-lg bg-accent/10 px-3 py-1 text-sm text-accent font-medium font-headline">Stay Connected</div>
                        <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl text-primary">Latest Insights &amp; Stories</h2>
                        <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Follow us on Instagram for daily market updates, investment tips, and success stories from our clients.
                        </p>
                    </div>
                </div>

                <div className="relative">
                    <Carousel
                        plugins={[plugin.current]}
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto"
                    >
                        <CarouselContent>
                            {reels.map((reel) => (
                                <CarouselItem key={reel.id} className="basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                                    <a href={reel.redirect} target="_blank" rel="noopener noreferrer" className="group relative block h-full overflow-hidden rounded-xl shadow-lg m-2">
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
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 transform -translate-x-4 bg-background/80 hover:bg-background text-foreground border-primary" />
                        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 transform translate-x-4 bg-background/80 hover:bg-background text-foreground border-primary" />
                    </Carousel>
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