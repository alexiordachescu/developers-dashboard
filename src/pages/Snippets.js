import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSnippets } from "../store/snippets/actions";
import { selectAllSnippets } from "../store/snippets/selector";

const Snippets = () => {
  const dispatch = useDispatch();
  const snippets = useSelector(selectAllSnippets);

  useEffect(() => {
    dispatch(getAllSnippets());
  }, [dispatch]);

  return (
    <div>
      <h1>Snippets</h1>
      <div>
        {snippets.map((s) => {
          console.log("i am s in snippets map", s);
        })}
      </div>
    </div>
  );
};

export default Snippets;
