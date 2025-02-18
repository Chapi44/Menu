"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../navigation/sidebar";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { RiMenu3Fill } from "react-icons/ri";
import { Button } from "../ui/button";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);
      if (isMobileView) {
        setIsCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block p-2 m-auto   fixed inset-y-0 left-3 top-2 z-30">
        <Sidebar
          className="h-calc(100vh-30px)"
          isCollapsed={isCollapsed}
          onCollapse={setIsCollapsed}
        />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 px-4 bg-[#101828] border-b border-gray-800/50 flex items-center justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <RiMenu3Fill className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[280px] p-0 bg-[#101828] border-r-0"
          >
            <Sidebar
              className="h-full lg:hidden"
              isCollapsed={false}
              onCollapse={() => { }}
            />
          </SheetContent>
        </Sheet>

      </div>

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen bg-white transition-all duration-300 ease-out",
          "px-4 sm:px-6 lg:px-8 py-4 sm:py-6",
          "lg:pl-8", // Base padding for large screens
          isMobile ? "pt-20" : "", // Extra top padding for mobile
          !isMobile && isCollapsed ? "lg:ml-16" : "lg:ml-64" // Sidebar width adjustment
        )}
      >
        <div className="mx-auto max-w-7xl w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
