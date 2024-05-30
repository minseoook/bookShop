import Button from "../components/common/Button";
import InputText from "../components/common/InputText";
import Title from "../components/common/Title";

const Home = () => {
  return (
    <div>
      <Title size="large">제목</Title>
      <Button size="large" scheme="normal">
        버튼
      </Button>
      <InputText placeholder="hi" />
    </div>
  );
};

export default Home;
