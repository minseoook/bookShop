import { cat } from "../../api/auth.api";
import styled from "./home.module.css";
const Home = () => {
  const handleClick = async () => {
    const res = await cat();
    console.log(res);
  };
  return (
    <div className={styled.container}>
      <button onClick={handleClick}>클릭</button>
    </div>
  );
};

export default Home;
