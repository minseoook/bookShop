import styled from "./categorylist.module.css";
import { useCategory } from "../../hooks/useCategory";
import { Link } from "react-router-dom";

const icons = [
  "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-fairy-tale-literature-flaticons-lineal-color-flat-icons.png",
  "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-novel-literature-flaticons-lineal-color-flat-icons-3.png",
  "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-society-public-relations-agency-flaticons-lineal-color-flat-icons-2.png",
  "https://img.icons8.com/cute-clipart/64/social-studies.png",
  "https://img.icons8.com/plasticine/100/order-history.png",
  "https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/66/external-Engineering-engineering-and-architecture-smashingstocks-flat-smashing-stocks.png",
  "https://img.icons8.com/officel/16/react.png",
];
const CategoryList = () => {
  const cat = useCategory();

  return (
    <>
      <h1 className={styled.title}>카테고리</h1>
      <div className={styled.container}>
        {cat?.map((category, i) => {
          return (
            <Link
              to={`/books?category_id=${category.category_id}`}
              key={category.category_id}
            >
              <div className={styled.wrapper}>
                <img src={icons[i]} className={styled.img} />
                <span>{category.category_name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default CategoryList;
