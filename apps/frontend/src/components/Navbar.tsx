import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import UserRank from "./user/UserRank";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  LogOut,
  UserCircle,
  BarChartHorizontal,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function Navbar() {
  const { user, logout } = useAuth();
  const [isRankModalOpen, setIsRankModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleOpenRankModal = () => {
    setIsRankModalOpen(true);
  };

  return (
    <>
      <div className="border-b">
        <nav className="max-w-7xl px-4 py-3 container mx-auto flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Link to="/" className="font-bold text-xl">
              Quiz App
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            {user ? (
              <NavigationMenu className="[&_div.absolute]:-left-[8rem]">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="border-1">
                      Profile
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="flex flex-col items-center py-4 w-[200px] space-y-2">
                        <UserCircle className="h-8 w-8" />
                        <div className="mb-6">
                          <p className="text-sm truncate">{user.username}</p>
                        </div>
                        <Button
                          variant="ghost"
                          className="w-full justify-start px-2 py-1.5"
                          onClick={handleOpenRankModal}
                        >
                          <BarChartHorizontal className="mr-2 h-4 w-4" />
                          Ranking
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start px-2 py-1.5 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={logout}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </Button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
      {user && (
        <UserRank
          isOpen={isRankModalOpen}
          onClose={() => setIsRankModalOpen(false)}
        />
      )}
    </>
  );
}
