"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  useGetMenusQuery,
  useGetTopLevelMenusQuery,
  useDeleteMenuMutation,
} from "@/features/menu/api/menu-api";
import { Trash2 } from "lucide-react";
import {
  collapseAll,
  expandAll,
  setParentItem,
  setSelectedItem,
  setItems,
  toggleExpanded,
} from "@/features/menu/slice";
import { cn } from "@/lib/utils";
import type { RootState } from "@/store/menu-store";
import type { MenuItem } from "@/types/menu";
import { ChevronDown, ChevronRight, File, Folder, Plus } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface MenuTreeItemProps {
  item: MenuItem;
  depth: number;
  isLastItem: boolean;
  parentIsLastItem?: boolean[];
}

const MenuTreeItem = ({
  item,
  depth,
  isLastItem,
  parentIsLastItem = [],
}: MenuTreeItemProps) => {
  const dispatch = useDispatch();
  const expandedItems = useSelector(
    (state: RootState) => state.menu.expandedItems,
  );
  const [deleteMenu, { isLoading: isDeleting }] = useDeleteMenuMutation();
  const selectedItem = useSelector(
    (state: RootState) => state.menu.selectedItem,
  );
  const parentItem = useSelector((state: RootState) => state.menu.parentItem);
  const isExpanded = expandedItems.includes(item.id);
  const isSelected = selectedItem === item.id;
  const [showAddButton, setShowAddButton] = useState(false);
  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch(toggleExpanded(item.id));
    },
    [dispatch, item.id],
  );

  const handleSelect = useCallback(() => {
    dispatch(setSelectedItem(item.id));
  }, [dispatch, item.id]);

  const handleAdd = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      dispatch(
        setParentItem({
          id: item.id,
          name: item.name,
          parentId: item.parentId,
          depth: item.depth,
          order: item.order,
          children: item.children,
        }),
      );
      dispatch(setSelectedItem(null));
    },
    [dispatch, item],
  );

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item || isDeleting) return;
    try {
      await deleteMenu(item.id).unwrap();
    } catch (error) {
      console.error("Failed to delete menu:", error);
    }
  };

  const renderTreeLine = () => {
    return parentIsLastItem.map((isLast, index) => (
      <div
        key={index}
        className={cn(
          "absolute w-px bg-gray-200",
          isLast ? "h-full" : "h-full",
        )}
        style={{ left: `${(index + 1) * 20 - 10}px` }}
      />
    ));
  };

  return (
    <div className="relative">
      {depth > 0 && (
        <>
          {renderTreeLine()}
          <div
            className={cn(
              "absolute w-4 h-px bg-gray-200",
              isLastItem ? "top-[18px]" : "top-[18px]",
            )}
            style={{ left: `${depth * 20 - 10}px`, width: "20px" }}
          />
        </>
      )}
      <div
        onClick={handleSelect}
        onMouseEnter={() => setShowAddButton(true)}
        onMouseLeave={() => setShowAddButton(false)}
        className={cn(
          "group flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors relative",
          isSelected ? " text-black" : "hover:bg-gray-100",
        )}
      >
        <div
          className="flex items-center gap-2"
          style={{ marginLeft: `${depth * 20}px` }}
        >
          {item.children && item.children?.length > 0 && (
            <button
              onClick={handleToggle}
              className={cn(
                "p-1 rounded transition-colors",
                isSelected ? "hover:bg-[#6D28D9]" : "hover:bg-gray-200",
              )}
            >
              {isExpanded ? (
                <ChevronDown
                  className={cn("h-4 w-4", isSelected && "text-black")}
                />
              ) : (
                <ChevronRight
                  className={cn("h-4 w-4", isSelected && "text-black")}
                />
              )}
            </button>
          )}
          {item.children && item.children?.length > 0 ? (
            <Folder
              className={cn(
                "h-4 w-4",
                isSelected ? "text-black" : "text-gray-500",
              )}
            />
          ) : (
            <File
              className={cn(
                "h-4 w-4",
                isSelected ? "text-black" : "text-gray-500",
              )}
            />
          )}
          <span>{item.name}</span>
          {!isSelected && (
            <>
              <Button
                size="icon"
                variant="ghost"
                className={cn(
                  "ml-auto h-6 w-6 rounded-full p-0 transition-all",
                  "opacity-0 group-hover:opacity-100",
                  "text-gray-400 bg-blue-500 hover:bg-blue-600 hover:text-gray-100",
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setParentItem(item));
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className={cn(
                      "ml-2 h-6 w-6 rounded-full p-0 transition-all",
                      "opacity-0 group-hover:opacity-100",
                      "bg-red-500 text-white hover:bg-red-600 hover:text-white",
                    )}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the menu item and all its children.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </div>

      {isExpanded && item.children && (
        <div className="relative">
          {item.children.map((child, index) => (
            <MenuTreeItem
              key={child.id}
              item={child}
              depth={depth + 1}
              // @ts-ignore
              isLastItem={index === item.children && item.children?.length - 1}
              parentIsLastItem={[...parentIsLastItem, isLastItem]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface MenuTreeProps {
  selectedParentId?: string | null;
}

export const MenuTree = ({ selectedParentId }: MenuTreeProps) => {
  const dispatch = useDispatch();
  const { data: items, isLoading: allItemsLoading } = useGetMenusQuery();

  const { data: filteredItems, isLoading: filteredLoading } =
    useGetTopLevelMenusQuery(selectedParentId ?? "", {
      skip: !selectedParentId,
    });

  const isLoading = selectedParentId ? filteredLoading : allItemsLoading;

  // Transform the filtered items if they exist
  const processedFilteredItems =
    filteredItems && !Array.isArray(filteredItems)
      ? [filteredItems].filter(Boolean)
      : filteredItems;

  const menuItems = selectedParentId ? processedFilteredItems : items;

  // Sync menu items with Redux store when they are loaded
  React.useEffect(() => {
    if (menuItems && !isLoading) {
      dispatch(setItems(menuItems));
    }
  }, [dispatch, menuItems, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2 animate-pulse">
        <div className="h-5 w-5 rounded-full bg-gray-400" />
        <div className="h-5 w-5 rounded-full bg-gray-400" />
        <div className="h-5 w-5 rounded-full bg-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant="default"
          onClick={() => dispatch(expandAll())}
          className="bg-[#1d2939] text-white hover:bg-[#1d2939]/70"
        >
          Expand All
        </Button>
        <Button variant="outline" onClick={() => dispatch(collapseAll())}>
          Collapse All
        </Button>
      </div>

      <div className=" bg-white p-4">
        {Array.isArray(menuItems) ? (
          menuItems.map((item, index) => (
            <MenuTreeItem
              key={item.id}
              item={item}
              depth={0}
              isLastItem={index === menuItems.length - 1}
              parentIsLastItem={[]}
            />
          ))
        ) : menuItems ? (
          <MenuTreeItem
            item={menuItems}
            depth={0}
            isLastItem={true}
            parentIsLastItem={[]}
          />
        ) : (
          <div className="text-center py-4 text-gray-500">
            No menu items found
          </div>
        )}
      </div>
    </div>
  );
};
