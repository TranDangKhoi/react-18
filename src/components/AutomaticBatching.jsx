import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";

const AutomaticBatching = () => {
  const [count, setCount] = useState(1);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    setTimeout(() => {
      flushSync(() => {
        setCount((c) => c + 1);
      });
      flushSync(() => {
        setFlag((f) => !f);
      });
    });
    // React chỉ re-render 1 lần trong khi mình thay đổi 2 cái state lận mò (Đó được gọi là batching)
  }
  //   useEffect(() => {
  //     setTimeout(() => {
  //       flushSync(() => {
  //         setCount((c) => c + 1);
  //       });
  //       flushSync(() => {
  //         setFlag((f) => !f);
  //       });
  //       // Khi invoke event handleClick thì tự dưng cái này sẽ chạy 2 lần (đó được gọi là batching)
  //     }, 1000);
  //   }, []);

  console.log("Rendered");

  return (
    <>
      <button onClick={handleClick}>Click me!</button>
      <div>Count:{count}</div>
      <div>Flag: {`${flag}`}</div>
    </>
  );
};

export default AutomaticBatching;
