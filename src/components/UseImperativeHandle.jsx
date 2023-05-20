import React, { useRef, useState } from "react";
import UseImperativeInput from "./UseImperativeInput";

const Form = () => {
  const inputRef = useRef();
  return (
    <form>
      <UseImperativeInput ref={inputRef}></UseImperativeInput>
      <button type="button" onClick={() => inputRef.current.focus()}>
        Focus
      </button>
    </form>
  );
};

export default Form;
