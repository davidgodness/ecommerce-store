import { Product } from "@/types";
import queryString from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  isFeatured?: boolean;
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
}

export default async function getProducts({
  isFeatured,
  categoryId,
  colorId,
  sizeId,
}: Query): Promise<Product[]> {
  const res = await fetch(
    queryString.stringifyUrl({
      url: URL,
      query: {
        isFeatured,
        categoryId,
        colorId,
        sizeId,
      },
    })
  );

  return res.json();
}
