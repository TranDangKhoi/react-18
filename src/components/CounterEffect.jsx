import React, { useEffect, useState } from "react";

const CounterEffect = () => {
  const [count, setCount] = useState(0);

  // First, let's start with the useEffect one:
  const handleClick = () => {
    setCount((prev) => prev + 1);
  };
  useEffect(() => {
    if (count === 3) {
      setCount(0);
    }
  }, [count]);
  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={handleClick}>Increase</button>
    </div>
  );
};

export default CounterEffect;
