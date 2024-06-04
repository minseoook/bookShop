import { useEffect } from "react";

export default function useOutsideClick(ref, handler) {
  useEffect(() => {
    function listener(event) {
      console.log(event.target.tagName);

      if (
        !ref.current ||
        ref.current.contains(event.target) ||
        event.target.tagName === "INPUT"
      ) {
        return;
      }

      handler(event);
    }

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [handler, ref]);
}
// 첫 렌더시 ref는 빈값 이때 클릭이 되면 ref가 빈값이라 !ref.current조건으로 앞에서 바로 리턴해야함

// !ref.current없이 ref.current.contains(event.target)이걸로만 하면 ref가 없어서 에러다 뜬다
// 2가지 케이스
// 레프 없을때 - 어디를 눌러도 이벤트리스너 발생한다 그러나 이때는 어떤일도 일어나면 안된다 그래서 !ref.current 이조건
// 레프 있을때 - 레프로 지정한곳은 눌러도 괜찮 그러나 바깥은  핸들러 실행
