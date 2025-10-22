import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const [openDialog, setOpenDialog] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    console.log("User data from localStorage:", user);
  }, [user]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrolled(latest > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const getUserProfile = async (tokenInfo: { access_token: string }) => {
    try {
      const res = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
          },
        }
      );

      console.log("Google Profile:", res.data);

      // save user in localStorage
      localStorage.setItem("user", JSON.stringify(res.data));

      // close login dialog
      setOpenDialog(false);
      setIsGoogleLoading(false);
      window.location.reload();
      toast.success(`Welcome ${res.data.name}!`);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to fetch user profile");
      setIsGoogleLoading(false);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserProfile(tokenResponse),
    onError: () => {
      toast.error("Google Login Failed");
      setIsGoogleLoading(false);
    },
  });
  function LoadingSpinner() {
    return (
      <span className="inline-block animate-spin rounded-full border-2 border-gray-300 border-t-black h-5 w-5 mr-2" />
    );
  }
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
                {user ? (
                  <div className="flex items-center gap-3">
                    <Button variant="outline">My trips</Button>
                    <Popover>
                      <PopoverTrigger>
                        {" "}
                        <img
                          src={user?.picture}
                          className="rounded-full w-8 h-8"
                        />
                      </PopoverTrigger>
                      <PopoverContent className="bg-white">
                        <h2
                          className="cursor-pointer"
                          onClick={() => {
                            googleLogout();
                            localStorage.clear();
                            window.location.reload();
                          }}
                        >
                          Logout
                        </h2>
                      </PopoverContent>
                    </Popover>
                  </div>
                ) : (
                  <Button onClick={()=>{setOpenDialog(true)}} variant="outline" size="sm">
                    Sign In
                  </Button>
                )}
              </div>
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle />
                    <DialogDescription>
                      <div className="flex justify-start items-center">
                        <img src="logo.png" className="h-12 mr-2" />
                        <span className="text-2xl font-bold ml-2">
                          Smart Trip
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold mt-7 text-gray-800">
                        Sign In Required
                      </h2>
                      <p className="mt-2 text-gray-600">
                        Please sign in with your Google account to generate a
                        trip plan.
                      </p>
                      <Button
                        onClick={() => {
                          setIsGoogleLoading(true);
                          login();
                        }}
                        className="w-full mt-5 bg-black text-white font-semibold hover:bg-gray-800 transition flex items-center justify-center"
                      >
                        {isGoogleLoading ? (
                          <>
                            <LoadingSpinner /> Signing in...
                          </>
                        ) : (
                          <>
                            <FcGoogle className="mr-2 text-xl" /> Sign in with
                            Google
                          </>
                        )}
                      </Button>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </nav>
      </header>

      <div className="h-[72px]" />
    </>
  );
};
