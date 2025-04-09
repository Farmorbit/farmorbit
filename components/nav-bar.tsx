"use client";

import React from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, Menu, Tractor } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserNav } from "@/components/user-nav";
import { useSupabase } from "@/components/supabase-provider";
import { useState, useEffect } from "react";
import { useMobile } from "@/hooks/use-mobile";

export function NavBar() {
  const isMobile = useMobile();
  const { supabase, user } = useSupabase();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(false);
    };

    checkUser();
  }, [supabase]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Tractor className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">FarmOrbit</span>
          </Link>

          {!isMobile && (
            <NavigationMenu className="ml-6 hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Equipment</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-green-500 to-green-700 p-6 no-underline outline-none focus:shadow-md"
                            href="/equipment"
                          >
                            <div className="mt-4 mb-2 text-lg font-medium text-white">
                              Browse All Equipment
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Explore our full catalog of farming equipment
                              available for rent
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem
                        href="/equipment?type=tractors"
                        title="Tractors"
                      >
                        All types of tractors for various farming needs
                      </ListItem>
                      <ListItem
                        href="/equipment?type=harvesters"
                        title="Harvesters"
                      >
                        Efficient harvesting equipment for all crops
                      </ListItem>
                      <ListItem
                        href="/equipment?type=irrigation"
                        title="Irrigation"
                      >
                        Modern irrigation systems for optimal water usage
                      </ListItem>
                      <ListItem href="/equipment?type=drones" title="Drones">
                        Agricultural drones for monitoring and spraying
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/list-equipment" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      List Your Equipment
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      About Us
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* {!isMobile && (
            <form className="hidden md:flex w-full max-w-sm items-center space-x-2">
              <Input
                type="text"
                placeholder="Search equipment..."
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-green-600 hover:bg-green-700"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </form>
          )} */}

          {!isLoading &&
            (user ? (
              <UserNav user={user} />
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button className="bg-green-600 hover:bg-green-700" asChild>
                  <Link href="/auth/register">Register</Link>
                </Button>
              </div>
            ))}

          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-4 py-4">
                  <Link href="/" className="text-lg font-semibold">
                    Home
                  </Link>
                  <Link href="/equipment" className="text-lg font-semibold">
                    Browse Equipment
                  </Link>
                  <Link
                    href="/list-equipment"
                    className="text-lg font-semibold"
                  >
                    List Your Equipment
                  </Link>
                  <Link href="/about" className="text-lg font-semibold">
                    About Us
                  </Link>
                  <Link href="/contact" className="text-lg font-semibold">
                    Contact
                  </Link>
                  <Link href="/help" className="text-lg font-semibold">
                    Help/FAQs
                  </Link>

                  <div className="mt-4">
                    <form className="flex w-full items-center space-x-2">
                      <Input
                        type="text"
                        placeholder="Search equipment..."
                        className="flex-1"
                      />
                      <Button
                        type="submit"
                        size="icon"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
