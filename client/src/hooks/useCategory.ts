import { useEffect, useState } from "react";
import { Category } from "../models/category.model";
import { fetchCategory } from "../api/category.api";
import { useLocation } from "react-router-dom";

export const useCategory = () => {
  const location = useLocation(); //location.search   === ?category_id = 1
  const [category, setcategory] = useState<Category[]>([]);

  const setActive = () => {
    const params = new URLSearchParams(location.search);
    if (params.get("category_id")) {
      setcategory((prev) => {
        return prev.map((item) => {
          return {
            ...item,
            isActive: item.category_id === Number(params.get("category_id")),
          };
        });
      });
    } else {
      setcategory((prev) => {
        return prev.map((item) => {
          return {
            ...item,
            isActive: false,
          };
        });
      });
    }
  };
  useEffect(() => {
    fetchCategory().then((category) => {
      if (!category) return;
      const categoryWithAll = [
        {
          category_id: null,
          category_name: "전체",
        },
        ...category,
      ];

      setcategory(categoryWithAll);
      setActive();
    });
  }, []);

  useEffect(() => {
    setActive();
  }, [location.search]);
  return category;
};
