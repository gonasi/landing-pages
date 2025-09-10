import { Link } from "react-router";
import { NavbarLink } from "./NavbarLink";
import { ChevronDown, House } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { GetUserReturn } from "~/lib/database/profile";

interface TopNavProps {
  user: GetUserReturn;
}

export function TopNav({ user }: TopNavProps) {
  return (
    <nav className="sticky top-0 z-50 bg-background/90 pt-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Left-side menu items */}
        <div className="flex space-x-4">
          <NavbarLink icon={<House size={20} />} to="/ads" name="Ads" />
        </div>

        {/* Right-side menu items */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center space-x-0 md:space-x-2">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex">{user.user?.email}</div>
              <ChevronDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuItem>
              <Link to="/signout" className="flex items-center space-x-2">
                <span>Sign Out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
