import React from "react";
import "./../styles/inputField.css";

const InputField = () => {
  return (
    <form className="input">
      <input type="text" placeholder="Enter a Task" className="input__box" />
      <button type="submit" className="input_submit">
        GO
      </button>
    </form>
  );
};

export default InputField;
