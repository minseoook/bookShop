import { useSearchParams } from "react-router-dom";
import { useCategory } from "../../hooks/useCategory";
import styled from "./bookfilter.module.css";

const BookFilter = () => {
  const cat = useCategory();
  const [searchParams, setSearchParams] = useSearchParams();

  let categoryName;

  const categoryId = searchParams.get("category_id");
  const categoryIdNumber = categoryId ? parseInt(categoryId, 10) : null;

  if (categoryIdNumber === null) {
    categoryName = "전체";
  } else {
    categoryName = cat.find(
      (category) => category.category_id === categoryIdNumber
    )?.category_name;
  }
  const handleCategory: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const id = e.target.value;
    const newSearchParams = new URLSearchParams(searchParams);
    if (id === "all") {
      newSearchParams.delete("category_id");
      newSearchParams.delete("q");
    } else {
      newSearchParams.delete("q");
      newSearchParams.set("category_id", id.toString());
    }

    setSearchParams(newSearchParams);
  };

  const handleNews: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newSearchParams = new URLSearchParams(searchParams); //
    const value = e.target.value;
    if (value === "all") {
      newSearchParams.delete("news");
    } else {
      newSearchParams.set("news", "true");
    }
    setSearchParams(newSearchParams);
  };
  return (
    <div className={styled.container}>
      <h1 className={styled.title}>책 목록 : {categoryName}</h1>
      <div className={styled.wrapper}>
        <div className={styled.cat}>
          <label htmlFor="catselect">카테고리 :</label>

          <select id="catselect" onChange={handleCategory}>
            <option value="" selected disabled hidden>
              선택하세요
            </option>

            <option value="all">전체</option>
            {cat?.map((category) => {
              return (
                <option value={category.category_id} key={category.category_id}>
                  {category.category_name}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styled.news}>
          <label htmlFor="news">정렬 :</label>
          <select id="news" onChange={handleNews}>
            <option value="all">기본순</option>
            <option value="news">신간순</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default BookFilter;
