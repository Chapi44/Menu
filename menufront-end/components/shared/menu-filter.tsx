"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetMenusQuery } from "@/features/menu/api/menu-api"
import { useState } from "react"

interface MenuFilterProps {
  onFilterChange: (parentId: string | null) => void
}

export const MenuFilter = ({ onFilterChange }: MenuFilterProps) => {
  const { data: menus } = useGetMenusQuery()
  const [selectedParent, setSelectedParent] = useState<string | null>(null)

  const topLevelMenus = menus?.filter(menu => menu.parentId === null) || []

  const handleValueChange = (value: string) => {
    const parentId = value === "all" ? null : value
    setSelectedParent(parentId)
    onFilterChange(parentId)
  }

  return (
    <div className="flex items-center space-x-2">
      <Select
        value={selectedParent || "all"}
        onValueChange={handleValueChange}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Filter by parent menu" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Menus</SelectItem>
          {topLevelMenus.map((menu) => (
            <SelectItem key={menu.id} value={menu.id}>
              {menu.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
