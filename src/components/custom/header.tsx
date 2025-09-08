import React from "react";
import { cn } from "@/lib/utils";
import { useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export const Header = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollYProgress } = useScroll();

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrolled(latest > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-20 w-full border-b border-border/40 transition-all duration-300 ease-in-out",
          scrolled
            ? "bg-background/80 backdrop-blur-md shadow-lg"
            : "bg-background/95"
        )}
      >
        <nav className="mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <a
              href="/"
              aria-label="home"
              className="flex items-center space-x-3"
            >
              <img
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-foreground">
                Smart-trip
              </span>
            </a>

            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/Sharkyyyx28/Smart-trip"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent/50"
                aria-label="GitHub repository"
              >
                <Github className="h-5 w-5" />
              </a>

              <div className="flex items-center space-x-3">
                <Button asChild variant="outline" size="sm">
                  <a href="/login">Sign In</a>
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Static spacer equal to header height */}
      <div className="h-[72px]" />
    </>
  );
};
