"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./modeToggleBtn";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

function Navbar() {

  // Array of navigation items with their children and dropdown status
  const navItems = [
    { label: "Home", link: "/" , dropdown : false},
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
        label: "Construction Material",
        link: "/construction-material",
        dropdown: false,
    },
    { label: "Contact Us", link: "/contact", dropdown : false },
  ];

  return (
    <div className="mw-[1200px] w-[90%] m-auto p-5">
      <div className="flex justify-between items-center">
        <div className="logo">
          <Link href="/">
            <Image src="/logo.ico" width={50} height={50} />
          </Link>
        </div>

        <div className=" menu-bar flex justify-between items-center">
            {
                navItems.map((navItem) => (
                    !navItem.dropdown ? (
                        <Menubar className = "text-sm font-medium border-none p-3 hover:text-primary"><Link href= {navItem.link}>{navItem.label}</Link></Menubar>
                    ) : (<Menubar className = "p-3 border-none hover:text-primary">
                            <MenubarMenu>
                                <MenubarTrigger>{navItem.label}</MenubarTrigger>
                                    <MenubarContent >
                                        {
                                            navItem.children.map(child => (
                                                <Link href={child.link}><MenubarItem>{child.label}</MenubarItem></Link>
                                                
                                            ))
                                        }
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>)
                ))
            }
        </div>

        <div className="flex justify-center items-center">
          <ModeToggle className= "mr-2"/>
          {/* <Link href = "/signup"> <Button variant = "secondary" className="m-2 border border-black">Sign up</Button> </Link> */}
          <Link href = "/login"> <Button className="ml-2"> Log in</Button> </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
