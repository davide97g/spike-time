import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ReactNode, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentPage = pathname.slice(1);

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: ReactNode;
  }) => {
    const isActive = currentPage === href.slice(1);
    return (
      <p
        className={`text-foreground hover:text-primary transition-colors cursor-pointer ${
          isActive ? "font-bold" : ""
        }`}
        onClick={() => {
          navigate(href);
          setIsOpen(false);
        }}
      >
        {children}
      </p>
    );
  };

  return (
    <header className="flex justify-between items-center p-4 bg-background border-b">
      <div className="text-2xl font-bold">Spike Time</div>
      <nav className="hidden md:flex space-x-4">
        <NavLink href="/">Book</NavLink>
        <NavLink href="/reservations">Reservations</NavLink>
        <NavLink href="/shop">Shop</NavLink>
        <NavLink href="/me">Personal Area</NavLink>
      </nav>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <nav className="flex flex-col space-y-4 mt-4">
            <NavLink href="/">Book</NavLink>
            <NavLink href="/reservations">Reservations</NavLink>
            <NavLink href="/shop">Shop</NavLink>
            <NavLink href="/me">Personal Area</NavLink>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
