import { render, screen } from "@testing-library/react";
import Title from "./Title";
import { BookStoreThemeProvider } from "../../context/themeContext";

describe("title 테스트", () => {
  it("렌더 확인", () => {
    //1. 렌더
    render(
      <BookStoreThemeProvider>
        <Title size="large">제목</Title>
      </BookStoreThemeProvider>
    );
    //2. 확인
    expect(screen.getByText("제목")).toBeInTheDocument();
  });

  it("사이즈 확인", () => {
    //1. 렌더
    const { container } = render(
      <BookStoreThemeProvider>
        <Title size="large">제목</Title>
      </BookStoreThemeProvider>
    );
    //2. 확인
    expect(container?.firstChild).toHaveStyle({ fontSize: "2rem" });
  });

  it("컬러 확인", () => {
    //1. 렌더
    const { container } = render(
      <BookStoreThemeProvider>
        <Title size="large" color="primary">
          제목
        </Title>
      </BookStoreThemeProvider>
    );
    //2. 확인
    expect(container?.firstChild).toHaveStyle({ color: "brown" });
  });
});
