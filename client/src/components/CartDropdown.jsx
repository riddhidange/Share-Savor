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
import { useSelector, useDispatch } from "react-redux";

import cartLogo from "@/assets/carts.png";
import { clearCart } from "@/features/cartSlice";
import { Link } from "react-router-dom";

const CartDropdown = () => {
  const { restaurant } = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="relative cursor-pointer inline-block">
          <img src={cartLogo} alt={"Cart"} className="w-8 h-8" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {restaurant?.cart?.length}
          </span>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end" forceMount>
        <DropdownMenuLabel className="flex justify-between font-normal">
          <p className="text-sm font-medium leading-none">
            Total Items: {restaurant.cart.length}
          </p>
        </DropdownMenuLabel>
        {restaurant.cart.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to={`/checkout/${restaurant.order._id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  Go To Checkout
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => dispatch(clearCart())}
              className="cursor-pointer"
            >
              Clear Cart
              {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CartDropdown;
