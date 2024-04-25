"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggleBtn";
import { ShoppingCart, Menu } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

function Navbar({ className = "" }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { label: "Home", link: "/", dropdown: false },
    {
      label: "Sales",
      dropdown: true,
      children: [
        { label: "Flat", link: "/flat" },
        { label: "House", link: "/house" },
        { label: "Godawan", link: "/godawan" },
      ],
    },
    {
      label: "Rent",
      dropdown: true,
      children: [
        { label: "Flat", link: "/flat" },
        { label: "House", link: "/house" },
        { label: "Godawan", link: "/godawan" },
      ],
    },
    {
      label: "Construction Material & items",
      dropdown: true,
      children: [
        { label: "Cement", link: "/construction-material/cement" },
        {
          label: "Bricks and blocks",
          link: "/construction-material/bricks-and-blocks",
        },
        {
          label: "bulk material",
          link: "/construction-material/bulk-material",
        },
      ],
    },
    { label: "Contact Us", link: "/contact", dropdown: false },
  ];

  return (
    <div className={`container mt-6 ${className}`}>

      {/* navbar container */}
      <div className="navbar-container flex justify-between items-center">

            {/* logo of the website */}
            <div className="logo hidden lg:block">
              <Link href="/">
                <Image
                  src="/logo.ico"
                  alt="logo"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </Link>
            </div>


            {/* navItems */}
            <div className="navItems items-center lg:flex  ">
              {navItems.map((navItem, idx) =>
                !navItem.dropdown ? (
                  <Menubar
                    className="text-sm font-medium border-none p-2 hover:text-primary hover:underline"
                    key={idx}
                  >
                    <Link href={navItem.link}>{navItem.label}</Link>
                  </Menubar>
                ) : (
                  <Menubar
                    key={idx}
                    className="text-sm font-medium border-none p-1 hover:text-primary hover:underline"
                  >
                    <MenubarMenu>
                      <MenubarTrigger>{navItem.label}</MenubarTrigger>
                      <MenubarContent>
                        {navItem.children.map((child, idx) => (
                          <Link href={child.link} key={idx}>
                            <MenubarItem className="cursor-pointer hover:underline">
                              {child.label}
                            </MenubarItem>
                          </Link>
                        ))}
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                )
              )}

            </div>

        {/* theme toggle button, cart and login button */}
        <div className="flex gap-5 items-center">
          {/* theme toggle button */}
          <ModeToggle className="" />

          {/* shopping cart icon */}
          <Link href="/">
            <ShoppingCart />
          </Link>

          {/* login button */}
          <Link href="/login">
            <Button className="ml-2">Log in</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
