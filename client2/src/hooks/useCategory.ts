import { useEffect, useState } from "react";
import { Category } from "../models/category.model";
import { getCategory } from "../api/category.api";

export const useCategory = () => {
  const [cat, setcat] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await getCategory();
        setcat(res);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategory();
  }, []);

  return cat;
};
