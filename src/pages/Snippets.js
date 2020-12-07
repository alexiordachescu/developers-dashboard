import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSnippets } from "../store/snippets/actions";
import { selectAllSnippets } from "../store/snippets/selector";
import CodeSnippetCard from "../components/CodeSnippetCard";

const Snippets = () => {
  const dispatch = useDispatch();
  const snippets = useSelector(selectAllSnippets);

  console.log("i am snippets", snippets);

  useEffect(() => {
    dispatch(getAllSnippets());
  }, [dispatch]);

  return (
    <div>
      {snippets.map((s) => {
        return (
          <CodeSnippetCard
            key={s.id}
            name={s.name}
            content={s.content}
            comment={s.comment}
          />
        );
      })}
    </div>
  );
};

export default Snippets;
