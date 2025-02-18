import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MenuState, MenuItem } from "@/types/menu";

const initialState: MenuState = {
  items: [],
  expandedItems: [],
  selectedItem: null,
  parentItem: null,
  loading: false,
  error: null,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleExpanded: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const isExpanded = state.expandedItems.includes(itemId);

      if (isExpanded) {
        state.expandedItems = state.expandedItems.filter((id) => id !== itemId);
      } else {
        state.expandedItems.push(itemId);
      }
    },
    expandAll: (state) => {
      const getAllIds = (items: MenuItem[]): string[] => {
        return items.reduce((acc: string[], item) => {
          acc.push(item.id);
          if (item.children && item.children.length > 0) {
            acc.push(...getAllIds(item.children));
          }
          return acc;
        }, []);
      };
      state.expandedItems = getAllIds(state.items);
    },
    collapseAll: (state) => {
      state.expandedItems = [];
    },
    setSelectedItem: (state, action: PayloadAction<string | null>) => {
      state.selectedItem = action.payload;
    },
    setParentItem: (state, action: PayloadAction<MenuItem | null>) => {
      state.parentItem = action.payload;
    },
    setItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  toggleExpanded,
  expandAll,
  collapseAll,
  setSelectedItem,
  setParentItem,
  setItems,
} = menuSlice.actions;
export default menuSlice.reducer;
