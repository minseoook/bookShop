import { render, screen } from "@testing-library/react";
import { BookStoreThemeProvider } from "../../context/themeContext";
import Button from "./Button";

describe("button 테스트", () => {
  it("렌더 확인", () => {
    //1. 렌더
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          button
        </Button>
      </BookStoreThemeProvider>
    );
    //2. 확인
    expect(screen.getByText("button")).toBeInTheDocument();
  });

  it("사이즈 확인", () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          button
        </Button>
      </BookStoreThemeProvider>
    );

    expect(screen.getByRole("button")).toHaveStyle({ fontSize: "1.5rem" });
  });

  // it("컬러 확인", () => {
  //     //1. 렌더
  //     const {container} = render(
  //         <BookStoreThemeProvider>
  //             <Title size="large" color='primary'>제목</Title>
  //         </BookStoreThemeProvider>
  //     );
  //     //2. 확인
  //     expect(container?.firstChild).toHaveStyle({color: 'brown'})
  // });
});
