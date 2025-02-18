import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { MenuResponse, SaveMenuRequest } from "@/types/menu";

export const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://menumangement-production.up.railway.app",
  }),
  tagTypes: ["Menu"],
  endpoints: (builder) => ({
    getTopLevelMenus: builder.query<MenuResponse[], string>({
      query: (id) => `menus/menu/${id}`,
      providesTags: ["Menu"],
    }),
    getMenus: builder.query<MenuResponse[], void>({
      query: () => "menus",
      providesTags: ["Menu"],
    }),
    saveMenu: builder.mutation<MenuResponse, SaveMenuRequest>({
      query: (body) => ({
        url: "menus",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Menu"],
    }),
    updateMenu: builder.mutation<
      MenuResponse,
      { id: string; body: SaveMenuRequest }
    >({
      query: ({ id, body }) => ({
        url: `menus/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Menu"],
    }),
    deleteMenu: builder.mutation<void, string>({
      query: (id) => ({
        url: `menus/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Menu"],
    }),
    getMenuById: builder.query<MenuResponse, string>({
      query: (id) => `menus/menu/${id}`,
      providesTags: ["Menu"],
    }),
  }),
});

export const {
  useGetMenusQuery,
  useGetTopLevelMenusQuery,
  useGetMenuByIdQuery,
  useSaveMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
} = menuApi;
