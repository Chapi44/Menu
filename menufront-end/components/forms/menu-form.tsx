"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetMenuByIdQuery,
  useSaveMenuMutation,
  useUpdateMenuMutation,
} from "@/features/menu/api/menu-api";
import { setParentItem, setSelectedItem } from "@/features/menu/slice";
import { cn } from "@/lib/utils";
import type { RootState } from "@/store/menu-store";
import type { SaveMenuRequest } from "@/types/menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as z from "zod";

export const MenuForm = () => {
  const dispatch = useDispatch();
  const selectedItem = useSelector(
    (state: RootState) => state.menu.selectedItem,
  );
  const parentItem = useSelector((state: RootState) => state.menu.parentItem);
  const [saveMenu, { isLoading: isSaving }] = useSaveMenuMutation();
  const [updateMenu, { isLoading: isUpdating }] = useUpdateMenuMutation();
  const [parentName, setParentName] = useState("");
  const { data: selectedItemData } = useGetMenuByIdQuery(selectedItem || "", {
    skip: !selectedItem,
  });

  const formSchema = z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .regex(
        /^[a-zA-Z0-9\s&-]+$/,
        "Name can only contain letters, numbers, spaces, & and -",
      ),
    depth: z.number().optional(),
    parentId: z.string().nullable().optional(),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SaveMenuRequest>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (selectedItem && selectedItemData) {
      setValue("name", selectedItemData?.name);
      setValue("depth", selectedItemData?.depth);
      setValue("parentId", selectedItemData?.parentId);
      setValue("order", selectedItemData?.order);
      setParentName(selectedItemData?.parentName);
    } else {
      reset({
        depth: parentItem ? parentItem.depth + 1 : 0,
        parentId: parentItem?.id || null,
      });
    }
  }, [selectedItem, selectedItemData, parentItem, setValue, reset]);

  useEffect(() => {
    if (!selectedItem && !parentItem) {
      reset();
    }
  }, [selectedItem, parentItem, reset]);

  const onSubmit = async (data: SaveMenuRequest) => {
    try {
      if (selectedItem) {
        await updateMenu({
          id: selectedItem,
          body: {
            name: data.name,
            parentId: parentItem?.id || null,
            depth: parentItem ? parentItem.depth + 1 : 0,
            order: data.order || 1,
          },
        }).unwrap();
      } else {
        await saveMenu({
          name: data.name,
          parentId: parentItem?.id || null,
          depth: parentItem ? parentItem.depth + 1 : 1,
          order: 1,
        }).unwrap();
      }
      reset();
      dispatch(setParentItem(null));
      dispatch(setSelectedItem(null));
    } catch (error) {
      console.error("Failed to save menu:", error);
    }
  };

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-500">
                Menu ID
              </Label>
              <Input
                value={selectedItem || ""}
                disabled
                className="mt-1 bg-gray-50 font-mono text-sm"
              />
            </div>
            <div className="w-1/2">
              <Label className="text-sm font-medium text-gray-500">Depth</Label>
              <Input
                {...register("depth")}
                disabled
                className="mt-1 bg-gray-50 font-mono text-sm"
              />
            </div>
            <div className="w-1/2">
              <Label className="text-sm font-medium text-gray-500">
                Parent Data
              </Label>
              <Input
                value={parentName || "Root"}
                disabled
                className="mt-1 bg-gray-200 font-mono text-sm"
              />
            </div>
            <div className="w-1/2">
              <Label className="text-sm font-medium text-gray-500">Name</Label>
              <Input
                {...register("name")}
                placeholder="Enter menu name"
                className={cn(
                  "mt-1",
                  errors.name && "border-red-500 focus-visible:ring-red-500",
                )}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="w-1/2 py-6 rounded-3xl bg-[#253bff] text-white hover:bg-[#606bcb]"
            disabled={isSaving || isUpdating}
          >
            {isSaving || isUpdating ? "Saving..." : "Save"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
