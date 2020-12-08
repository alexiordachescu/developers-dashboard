import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../store/categories/selectors";
import { getCategories } from "../store/categories/actions";
import { addSnippet } from "../store/snippets/actions";

const initialForm = {
  category: "",
  name: "",
  content: "",
  comment: "",
};

export default function AddSnippet() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [form, setForm] = useState(initialForm);
  const selectCategoryRef = useRef();

  useEffect(() => {
    dispatch(getCategories);
  }, [dispatch]);

  function submitForm(e) {
    e.preventDefault();
    dispatch(addSnippet(form));
    setForm(initialForm);
    selectCategoryRef.current.value = "";
  }

  if (categories.length === 0) return null;

  return (
    <form onSubmit={submitForm}>
      <div>
        <label htmlFor="snippetCategory">Select a category</label>
        <select
          id="snippetCategory"
          name="snippetCategory"
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
        <label htmlFor="snippetName">Give your snippet a name</label>
        <input
          id="snippetName"
          name="snippetName"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Snippet name"
          required
        ></input>
      </div>
      <div>
        <label htmlFor="snippetContent">Add a code snippet</label>
        <textarea
          id="snippetContent"
          name="snippetContent"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="You can add a code snippet here"
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="snippetComment">Add a comment?</label>
        <textarea
          id="snippetComment"
          name="snippetComment"
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          placeholder="You can add a comment"
        ></textarea>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}
