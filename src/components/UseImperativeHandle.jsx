import React, { useRef, useState } from "react";
import UseImperativeInput from "./UseImperativeInput";

const Form = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef();
  return (
    <form>
      <UseImperativeInput
        value={value}
        setValue={setValue}
        ref={inputRef}
      ></UseImperativeInput>
      <button type="button" onClick={() => inputRef.current.focusInput()}>
        Focus
      </button>
    </form>
  );
};

export default Form;
