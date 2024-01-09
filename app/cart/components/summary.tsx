"use client";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Summary() {
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("success")) {
      toast.success("Payment completed");
      removeAll();
    }

    if (searchParams.has("canceled")) {
      toast.error("Order Canceled");
    }
  }, [searchParams, removeAll]);

  const onCheckout = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
      }
    );

    window.location = res.data.url;
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 lg:col-span-5 lg:mt-0 lg:p-8 sm:p-6">
      <h2 className="text-gray-900 text-lg font-medium">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-gray-900 text-base font-medium">Order total</div>
          <Currency
            value={items.reduce((prev, cur) => prev + Number(cur.price), 0)}
          />
        </div>
        <Button
          className="mt-6 w-full"
          onClick={onCheckout}
          disabled={items.length === 0}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
