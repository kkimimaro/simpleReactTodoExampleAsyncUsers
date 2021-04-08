import React, { useState } from "react";
import PropTypes from "prop-types";

function useInputValue(defaultValue = "") {
  const [value, setValue] = useState("");

  return {
    bind: {
      value,
      onChange: (event) => setValue(event.target.value),
    },
    clear: () => setValue(""),
    value: () => value,
  };
}

function AddTodo({ onCreate }) {
  const input = useInputValue("");

  function submitHandler(event) {
    event.preventDefault();

    if (input.value().trim()) {
      onCreate(input.value());
      input.clear();
    }
  }

  return (
    <form style={{ marginBottom: "1rem" }} onSubmit={submitHandler}>
      <input placeholder="Add todo..." type="text" {...input.bind} />
      <button className="button" type="submit">
        Add todo
      </button>
    </form>
  );
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default AddTodo;
