import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "@/components/ThemeToggle";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/features/userSlice";
import { Link } from "react-router-dom";

export default function ProfileDropdown() {
  const userState = useSelector((state) => state.user);

  const dispatch = useDispatch();

  let userInitials =
    userState?.user?.firstName?.slice(0, 1) +
      userState?.user?.lastName?.slice(0, 1) || "NA";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-12 w-12">
            <AvatarImage src="" alt="@shadcn" />
            <AvatarFallback className="text-lg">{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="flex justify-between font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {`${userState?.user?.firstName} ${userState?.user?.lastName}`}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {userState?.user?.email}
            </p>
          </div>
          <ThemeToggle />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to={"/profile"}>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⌘J</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => dispatch(logout())}>
          Log out
          <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
