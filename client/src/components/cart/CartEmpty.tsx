import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Empty from "../common/Empty";

export default function CartEmpty() {
  return (
    <Empty
      title="장바구니가 비었습니다."
      icon={<FaShoppingCart />}
      description="장바구니를 채워주세요"
    />
  );
}
