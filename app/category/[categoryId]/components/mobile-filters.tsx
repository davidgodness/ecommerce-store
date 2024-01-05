"use client";

import Button from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import { Color, Size } from "@/types";
import { Dialog } from "@headlessui/react";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import Filter from "./filter";

interface MobileFiltersProps {
  colors: Color[];
  sizes: Size[];
}

export default function MobileFilters({ colors, sizes }: MobileFiltersProps) {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button className="flex items-center gap-x-2 lg:hidden" onClick={onOpen}>
        Filters <Plus size={20} />
      </Button>

      <Dialog
        open={open}
        as="div"
        onClose={onClose}
        className="relative z-40 lg:hidden"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="flex fixed inset-0 z-40">
          <Dialog.Panel className="relative w-full h-full max-w-xs bg-white ml-auto flex flex-col py-4 pb-6 overflow-y-auto shadow-xl">
            <div className="flex items-center justify-end px-4">
              <IconButton icon={<X size={15} />} onClick={onClose} />
            </div>
            <div className="p-4">
              <Filter data={sizes} name="Sizes" valueKey="sizeId" />
              <Filter data={colors} name="Colors" valueKey="colorId" />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
