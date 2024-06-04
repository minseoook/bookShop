import CategoryList from "../../components/CategoryList/CategoryList";
import HomeSlider from "../../components/Slider/HomeSlider";
import styled from "./home.module.css";
const Home = () => {
  return (
    <div className={styled.container}>
      <HomeSlider />
      <CategoryList />
      <div>하이</div>
    </div>
  );
};

export default Home;
