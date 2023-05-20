import React, { useImperativeHandle, useRef, useState } from "react";

const UseImperativeInput = ({ value, setValue }, ref) => {
  const [secondValue, setSecondValue] = useState("");
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => {
    return {
      focusInput: () => {
        inputRef.current.focus();
        // setSecondValue("what is this hook?");
        setValue("what is this hook?");
      },
    };
  });
  return (
    <>
      <input
        type="text"
        value={secondValue}
        onChange={(e) => setSecondValue(e.target.value)}
      />
      <input
        type="text"
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};

export default React.forwardRef(UseImperativeInput);
