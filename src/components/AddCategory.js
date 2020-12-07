import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../store/categories/actions";

export default function AddCategory() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");

  function submitForm(e) {
    e.preventDefault();
    dispatch(addCategory(category));
    setCategory("");
  }

  return (
    <form onSubmit={submitForm}>
      <div>
        <label htmlFor="addCategory">Add a category</label>
        <input
          id="addCategory"
          name="addCategory"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          type="text"
          placeholder="Category name"
          required
        ></input>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}
