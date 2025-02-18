export interface MenuItem {
  id: string;
  name: string;
  parentId: string | null;
  depth: number;
  order: number;
  children?: MenuItem[];
}

export type MenuResponse = MenuItem & { parentName: string };

export interface SaveMenuRequest {
  name: string;
  parentId?: string | null;
}

export interface MenuState {
  items: MenuItem[];
  expandedItems: string[];
  selectedItem: string | null;
  parentItem: MenuItem | null;
  loading: boolean;
  error: string | null;
}

export interface SaveMenuRequest {
  name: string;
  parentId?: string | null;
  depth: number;
  order: number;
}
