import React, { useLayoutEffect, useState } from "react";

function CounterLayoutEffect() {
  const [count, setCount] = useState(0);

  // First, let's start with the useEffect one:
  useLayoutEffect(() => {
    for (let i = 0; i < 40000; i++) {
      console.log(i);
    }
    if (count === 3) {
      setCount(0);
    }
  }, [count]);
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount((prev) => prev + 1)}>Increase</button>
    </div>
  );
}
export default CounterLayoutEffect;
