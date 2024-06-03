import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import styled from "./layout.module.css";

type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <div className={styled.main}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
