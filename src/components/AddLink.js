import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../store/categories/selectors";
import { addLink } from "../store/links/actions";

const initialForm = {
  category: "",
  name: "",
  content: "",
};

export default function AddLink() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [form, setForm] = useState(initialForm);
  const selectCategoryRef = useRef();

  function submitForm(e) {
    e.preventDefault();
    dispatch(addLink(form));
    setForm(initialForm);
    selectCategoryRef.current.value = "";
  }

  if (categories.length === 0) return null;

  return (
    <form onSubmit={submitForm}>
      <div>
        <label htmlFor="linkCategory">Select a category</label>
        <select
          id="linkCategory"
          name="linkCategory"
          defaultValue="select"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
          ref={selectCategoryRef}
        >
          <option value="">select</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="linkName">Give your link a name</label>
        <input
          id="linkName"
          name="linkName"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Link name"
          required
        ></input>
      </div>
      <div>
        <label htmlFor="linkContent">Add a link</label>
        <input
          id="linkContent"
          name="linkContent"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="Add a link"
          required
        ></input>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}
