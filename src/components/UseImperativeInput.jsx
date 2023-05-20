import React, { useImperativeHandle, useRef, useState } from "react";

const UseImperativeInput = (props, ref) => {
  const [value, setValue] = useState("");
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
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
    </>
  );
};

export default React.forwardRef(UseImperativeInput);
