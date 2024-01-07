"use client";

import { ShoppingBag } from "lucide-react";
import Button from "./ui/button";
import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

export default function NavbarActions() {
  const [isMounted, setIsMounted] = useState(false);
  const items = useCart((state) => state.items);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        className="flex items-center rounded-full bg-black px-4 py-2 gap-2"
        onClick={() => {
          router.push("/cart");
        }}
      >
        <ShoppingBag size={20} color="white" />
        <span className="font-medium text-sm text-white">{items.length}</span>
      </Button>
    </div>
  );
}
