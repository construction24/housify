"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggleBtn";
import { ShoppingCart, X } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import CartSidebar from "@/components/cart/CartSidebar";

function Navbar({ className = "" }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
          label: "Bricks and Tiles",
          link: "/construction-material/bricks_and_tiles",
        },
        {
          label: "bulk material",
          link: "/construction-material/bulk_material",
        },
      ],
    },
    { label: "Contact Us", link: "/contact", dropdown: false },
  ];

  return (
    <div className={`container mt-6 mb-6 ${className}`}>
      {/* Navbar container */}
      <div className="navbar-container flex justify-between items-center">
        {/* Hamburger Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {/* Conditional rendering of the hamburger menu button */}
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="space-y-2">
              <div className="w-6 h-0.5 bg-secondary-foreground"></div>
              <div className="w-6 h-0.5 bg-secondary-foreground"></div>
              <div className="w-6 h-0.5 bg-secondary-foreground"></div>
            </div>
          )}
        </button>

        {/* Logo (shown on large screens) */}
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

        {/* Navigation items (shown on large screens) */}
        <div className="hidden lg:flex items-center space-x-4">
          {navItems.map((navItem, idx) =>
            !navItem.dropdown ? (
              <Link
                href={navItem.link}
                key={idx}
                className="text-sm font-medium hover:text-primary hover:underline px-4 py-2"
              >
                {navItem.label}
              </Link>
            ) : (
              <Menubar className = "border-none" key={idx}>
                <MenubarMenu>
                  <MenubarTrigger className="px-4 py-2 cursor-pointer">
                    {navItem.label}
                  </MenubarTrigger>
                  <MenubarContent className="flex flex-col">
                    {navItem.children.map((child, idx) => (
                      <Link href={child.link} key={idx}>
                        <MenubarItem className="cursor-pointer hover:underline px-4 py-2">
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

        {/* Right side of the navbar */}
        <div className="flex gap-4  lg:gap-1 items-center lg:space-x-4">
          {/* Shopping cart icon */}
          <ShoppingCart onClick={toggleSidebar} className="cursor-pointer"/>

          {/* Theme toggle button */}
          <ModeToggle className="" />

          {/* Login button */}
          <Link href="/login">
            <Button className="ml-2">Log in</Button>
          </Link>
        </div>
        
        {/* CartSidebar */}
        {isSidebarOpen && <CartSidebar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />}

        {/* Sliding menu */}
        <div
          className={`fixed top-0 left-0 w-64 h-screen border bg-background shadow-md p-4 z-40 transition-transform transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden`}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4"
            onClick={toggleMenu}
            aria-label="Close navigation menu"
          >
            <X size={24} className="text-secondary-foreground" />
          </button>

          {/* Logo (shown in the sliding menu) */}
          <div className="logo mb-4">
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

          {/* Navigation items (shown in the sliding menu) */}
          <div className="navItems flex flex-col gap-4">
            {navItems.map((navItem, idx) =>
              !navItem.dropdown ? (
                <Link href={navItem.link} key={idx} className="p-3 text-sm font-medium hover:text-primary hover:underline">
                  {navItem.label}
                </Link>
              ) : (
                // Wrap MenubarMenu in Menubar
                <Menubar className = "border-none p-0" key={idx}>
                  <MenubarMenu>
                    <MenubarTrigger className = "cursor-pointer">{navItem.label}</MenubarTrigger>
                    <MenubarContent className="flex flex-col gap-2 px-2">
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
        </div>
      </div>
    </div>
  );
}

export default Navbar;
