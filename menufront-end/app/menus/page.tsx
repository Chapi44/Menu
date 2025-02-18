"use client";
import { MenuForm } from "@/components/forms/menu-form";
import { MenuFilter } from "@/components/shared/menu-filter";
import { MenuTree } from "@/components/shared/menu-tree";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import type { RootState } from "@/store/menu-store";
import { useState } from "react";
import Image from "next/image";
import { BiCategoryAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
export default function MenusPage() {
  const selectedItem = useSelector(
    (state: RootState) => state.menu.selectedItem,
  );
  const parentItem = useSelector((state: RootState) => state.menu.parentItem);
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);

  const breadcrumbItems = [
    { title: "", link: "/" },
    { title: "Menus", link: "/menus" },
  ];

  return (
    <div className="space-y-6 p-6 pb-16">
      <div className="space-y-0.5">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-center mt-10">
          <div className="flex items-center bg-[#253bff] text-white rounded-full p-3">
            {/* <BiCategoryAlt className="h-6 w-6" /> */}
            <Image
              width={24}
              height={24}
              src="/svgs/category.svg"
              alt="category"
              className="w-6 h-6 "
            />
          </div>
          <h2 className="text-[32px] font-extrabold tracking-tight ml-2">
            Menus
          </h2>
        </div>
      </div>

      <div className="flex justify-start">
        <MenuFilter
          onFilterChange={(parentId) => setSelectedParentId(parentId)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_400px]">
        <Card className="border-none shadow-none">
          <CardContent>
            <MenuTree selectedParentId={selectedParentId} />
          </CardContent>
        </Card>

        <Card className="border-none shadow-none">
          <CardContent>
            <MenuForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
