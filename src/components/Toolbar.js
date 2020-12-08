import React, { useEffect } from "react";
import { getCategories } from "../store/categories/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../store/categories/selectors";
import Paper from "@material-ui/core/Paper";
import AddCategory from "./AddCategory";

export default function Toolbar() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories);
  }, [dispatch]);

  const categories = useSelector(selectCategories);

  return (
    <div>
      <Paper elevation={2}>
        <h2>
          Please select a category to show the corresponding results for it:
        </h2>
        {categories.map((category) => {
          return <h3>{category.name}</h3>;
        })}{" "}
        <AddCategory />
      </Paper>
    </div>
  );
}
