import { Product } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Cart {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<Cart>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const existingItem = get().items.find((v) => v.id === data.id);

        if (existingItem) {
          toast("Item already in cart");
          return;
        }

        set({ items: [...get().items, data] });
        toast.success("Item added to cart");
      },
      removeItem: (id: string) => {
        set({ items: get().items.filter((v) => v.id !== id) });
        toast.success("Item removed");
      },
      removeAll: () => {
        set({ items: [] });
        toast.success("All items removed");
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
