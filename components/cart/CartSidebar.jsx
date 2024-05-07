"use client";
import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";

const CartSidebar = ({ toggleSidebar, isOpen }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-[65%] sm:w-[50%] md:w-[40%] lg:w-[25%] shadow-lg transition-transform duration-300 ease-in-out bg-background z-40 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="h-[10%] flex justify-between items-center p-6 py-12">
        <p className="text-medium mr-7">No Products Added</p>
        <div>
          <button onClick={toggleSidebar}>
            <div className="flex justify-center items-center gap-1">
              <div>Close</div>
              <div>
                <ArrowRight size={20} />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
