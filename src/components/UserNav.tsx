import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, Vote, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function UserNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <Button
        className="bg-white text-[#134E4A] hover:bg-white/90 font-semibold px-6 py-2 h-auto"
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative flex items-center gap-3 h-auto py-2 px-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20"
        >
          <Avatar className="h-10 w-10 border-2 border-white/30">
            <AvatarImage
              src={user.profile_image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name || 'User')}&background=134E4A&color=fff&bold=true`}
              alt={user.full_name}
            />
          </Avatar>
          <div className="hidden md:flex flex-col items-start text-white">
            <span className="text-sm font-medium truncate max-w-[120px]">{user.full_name}</span>
            <span className="text-xs text-white/60 capitalize">{user.role?.replace('_', ' ')}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-white/60 hidden md:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.full_name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {['admin', 'super_admin', 'super admin'].includes(user.role) ? (
            <>
              <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                <User className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          ) : (
            <>
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile & Settings</span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem onClick={() => navigate("/my-votes")}>
            <Vote className="mr-2 h-4 w-4" />
            <span>My Votes</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {
          logout();
          navigate("/");
        }}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
