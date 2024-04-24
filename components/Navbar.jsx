"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggleBtn";
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
    <div className={`container mt-5 ${className}`}>
      <div className="flex justify-between items-center">
        <div className="hidden md:block logo">
          <Link href="/">
            <Image
              src="/logo.ico"
              width={50}
              height={50}
              className="rounded-full"
              alt="website logo"
            />
          </Link>
        </div>
        <div className="md:hidden flex justify-between items-center w-full">
          <div className="logo">
            <Link href="/">
              <Image
                src="/logo.ico"
                width={50}
                height={50}
                className="rounded-full"
                alt="website logo"
              />
            </Link>
          </div>

          <div className=" cursor-pointer" onClick={toggleMenu}>
            {/* Hamburger icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
        </div>
        <div className="hidden md:flex menu-bar justify-between items-center">
          {navItems.map((navItem, idx) =>
            !navItem.dropdown ? (
              <Menubar
                className="text-sm font-medium border-none p-3 hover:text-primary hover:underline"
                key={idx}
              >
                <Link href={navItem.link}>{navItem.label}</Link>
              </Menubar>
            ) : (
              <div className="flex items-center ml-4" key={idx}>
                <Menubar
                  className="border-none hover:text-primary flex items-center"
                  key={idx}
                >
                  <MenubarMenu>
                    <MenubarTrigger className="cursor-pointer hover:underline">
                      {navItem.label}
                    </MenubarTrigger>
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
              </div>
            )
          )}
        </div>
        <div className="hidden md:flex  justify-center items-center">
          <ModeToggle className="mr-2" />
          <Link href="/login">
            <Button className="ml-2">Log in</Button>
          </Link>
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="pt-2 pb-4">
          <div className="flex flex-col items-start space-y-2">
            {navItems.map((navItem, idx) =>
              !navItem.dropdown ? (
                <Menubar
                  className="text-sm font-medium border-none hover:text-primary flex items-center"
                  key={idx}
                >
                  <Link href={navItem.link}>{navItem.label}</Link>
                </Menubar>
              ) : (
                <Menubar
                  className="border-none hover:text-primary flex items-start"
                  key={idx}
                >
                  <MenubarMenu>
                    <MenubarTrigger>{navItem.label}</MenubarTrigger>
                    <MenubarContent>
                      {navItem.children.map((child, idx) => (
                        <Link href={child.link} key={idx}>
                          <MenubarItem>{child.label}</MenubarItem>
                        </Link>
                      ))}
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              )
            )}
          </div>
          {/* Login button and mode switch */}
          <div className="flex justify-start items-center mt-4">
            <ModeToggle className="mr-2" />
            <Link href="/login">
              <Button className="ml-2">Log in</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
