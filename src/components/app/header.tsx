"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#calculator", label: "Calculator" },
  { href: "#suggestions", label: "Suggestions" },
  { href: "#learn", label: "Learn" },
  { href: "#social", label: "Social" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-border/40 bg-background/95 backdrop-blur-sm"
          : "bg-background/0"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <a
          href="#home"
          className="flex items-center gap-2 font-bold text-2xl font-headline"
        >
          <img src="/large-logo-2.png" alt="Wealth Rakshak Logo" className="h-24 w-auto object-contain"/>

        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild className="hidden md:flex bg-accent hover:bg-accent/90 text-accent-foreground rounded-full shadow-sm">
            <a href="#contact">Contact Us</a>
          </Button>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="grid gap-6 p-6">
                <a
                  href="#home"
                  className="flex items-center gap-2 font-bold text-xl font-headline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Wallet className="h-6 w-6" />
                  <span>Wealth Rakshak</span>
                </a>
                <nav className="grid gap-4">
                  {navLinks.map((link) => (
                     <SheetClose key={link.href} asChild>
                        <a
                        href={link.href}
                        className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
                        >
                        {link.label}
                        </a>
                    </SheetClose>
                  ))}
                </nav>
                <SheetClose asChild>
                  <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <a href="#contact">Contact Us</a>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
