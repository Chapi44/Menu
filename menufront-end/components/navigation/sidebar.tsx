"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { FolderIcon, Grid } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineMenuOpen } from "react-icons/md";
import { RiFolder3Fill, RiMenu3Fill } from "react-icons/ri";

import {
  useGetMenusQuery,
  useGetTopLevelMenusQuery,
} from "@/features/menu/api/menu-api";
import { setParentItem, setSelectedItem } from "@/features/menu/slice";
import { RootState } from "@/store/menu-store";
import type { MenuItem } from "@/types/menu";
import { useDispatch, useSelector } from "react-redux";

const useMenuItems = () => {
  const { data: allMenus, isLoading } = useGetTopLevelMenusQuery("root");

  const buildMenuHierarchy = (
    items: MenuItem[] = [],
    parentId: string | null = null,
  ): MenuItem[] => {
    return items
      .filter((item) => item.parentId === parentId)
      .map((item) => ({
        ...item,
        children: buildMenuHierarchy(items, item.id),
      }));
  };

  const menuItems = buildMenuHierarchy(allMenus);
  return { menuItems, isLoading };
};

interface SidebarProps {
  className?: string;
  isCollapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const Sidebar = ({ className, isCollapsed, onCollapse }: SidebarProps) => {
  const dispatch = useDispatch();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const selectedItem = useSelector(
    (state: RootState) => state.menu.selectedItem,
  );
  const { data: menuItems, isLoading } = useGetMenusQuery();

  const toggleMenu = (menuId: string) => {
    if (!isCollapsed) {
      setOpenMenus((current) =>
        current.includes(menuId)
          ? current.filter((id) => id !== menuId)
          : [...current, menuId],
      );
    }
  };

  const handleItemClick = (item: MenuItem) => {
    dispatch(setSelectedItem(item.id));
    dispatch(setParentItem(item));
  };

  return (
    <aside
      className={cn(
        "flex flex-col bg-[#101828] text-white shadow-lg rounded-2xl transition-all duration-300   min-h-[calc(100%-10px)] m-auto",
        isCollapsed ? "w-16" : "w-[220px]",
        className,
      )}
    >
      <header className="relative flex h-16 items-center border-b border-gray-800/50 px-4">
        {!isCollapsed && (
          <div className="hidden sm:flex items-center gap-3">
            <Image
              src="/svgs/logo.svg"
              alt="logo"
              width={60}
              height={60}
              className="rounded-lg hidden sm:flex "
            />
          </div>
        )}
        {!className?.includes("md:hidden") && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 text-gray-400 hover:text-gray-600"
            onClick={() => onCollapse(!isCollapsed)}
          >
            {isCollapsed ? (
              <RiMenu3Fill className="w-4 h-4" />
            ) : (
              <MdOutlineMenuOpen className="w-4 h-4" />
            )}
          </Button>
        )}
      </header>

      <ScrollArea className="flex-1 px-2 py-2">
        {isLoading ? (
          <div className="flex items-center justify-center h-full space-x-2">
            <div className="w-4 h-4 rounded-full bg-gray-400 animate-pulse"></div>
            <div className="w-4 h-4 rounded-full bg-gray-400 animate-pulse"></div>
            <div className="w-4 h-4 rounded-full bg-gray-400 animate-pulse"></div>
          </div>
        ) : (
          <nav className="space-y-1">
            {menuItems?.map((menu) => (
              <div key={menu.id}>
                <button
                  onClick={() => toggleMenu(menu.id)}
                  className={cn(
                    "group flex w-full items-center text-left justify-start gap-3 rounded-t-lg px-3 py-2 text-sm transition-colors",
                    selectedItem === menu.id
                      ? "bg-[#9ff443] text-black font-medium"
                      : openMenus.includes(menu.id)
                        ? "bg-[#1d2939] rounded-t-lg  text-white"
                        : "text-gray-400 rounded-lg  hover:bg-gray-800/50",
                  )}
                >
                  <div className="flex h-5 w-5 items-center justify-start">
                    {menu.children?.length ? (
                      <>
                        {openMenus.includes(menu.id) ? (
                          <RiFolder3Fill className="h-4 w-4" />
                        ) : (
                          <FolderIcon className="h-4 w-4" />
                        )}
                      </>
                    ) : (
                      <Grid className="h-4 w-4" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "flex-1 transition-all duration-200",
                      isCollapsed && "opacity-0 w-0",
                    )}
                  >
                    {menu.name}
                  </span>
                  {isCollapsed && (
                    <div
                      className={`absolute left-16 z-50 hidden  ${isCollapsed ? "rounded-lg" : "rounded-md"}  bg-gray-900 px-2 py-1 text-sm text-white group-hover:block`}
                    >
                      {menu.name}
                    </div>
                  )}
                </button>

                <AnimatePresence>
                  {menu.children && openMenus.includes(menu.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 bg-[#1d2939] rounded-b-lg  py-2"
                    >
                      {menu.children?.map((submenu) => (
                        <button
                          key={submenu.id}
                          onClick={() => handleItemClick(submenu)}
                          className={cn(
                            "group flex w-full items-center gap-3 rounded-lg mt-1 px-3 py-2 text-sm transition-colors",
                            selectedItem === submenu.id
                              ? "bg-[#9ff443] text-black font-medium"
                              : "text-gray-400 hover:bg-gray-800/70",
                          )}
                        >
                          <div className="flex h-5 w-5 items-center justify-start">
                            <BiCategoryAlt className="h-4 w-4" />
                          </div>
                          <span>{submenu.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
        )}
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
