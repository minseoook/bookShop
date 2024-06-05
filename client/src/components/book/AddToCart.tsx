import styled from "styled-components";
import { BookDetail } from "../../models/book.model";
import InputText from "../common/InputText";
import Button from "../common/Button";
import { useState } from "react";
import { addCart } from "../../api/cart.api";
import { useAlert } from "../../hooks/useAlert";

interface Props {
  book: BookDetail;
}
const AddToCart = ({ book }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const { showAlert } = useAlert();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrease = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  const addTocart = () => {
    addCart({ quantity: quantity, book_id: book.id }).then(() => {
      showAlert("장바구니 추가 완료되었습니다");
    });
  };
  return (
    <AddtoCartStyle>
      <div>
        <InputText
          inputType="number"
          value={quantity}
          onChange={handleChange}
        />
        <Button size="medium" scheme="normal" onClick={handleIncrease}>
          +
        </Button>
        <Button size="medium" scheme="normal" onClick={handleDecrease}>
          -
        </Button>
      </div>
      <Button size="medium" scheme="primary" onClick={addTocart}>
        장바구니 담기
      </Button>
    </AddtoCartStyle>
  );
};

const AddtoCartStyle = styled.div`
  display: flex;
  justify-content: space-between;
`;
export default AddToCart;
