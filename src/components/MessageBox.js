import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAppMessage } from "../store/appState/actions";
import { selectAppMessage } from "../store/appState/selectors";
import { clearCategoriesMessage } from "../store/categories/actions";
import { selectCategoriesMessage } from "../store/categories/selectors";
import { clearLinksMessage } from "../store/links/actions";
import { selectLinksMessage } from "../store/links/selectors";
import { clearSnippetsMessage } from "../store/snippets/actions";
import { selectSnippetsMessage } from "../store/snippets/selectors";

export default function MessageBox() {
  const dispatch = useDispatch();
  const appStateMessage = useSelector(selectAppMessage);
  const categoriesStateMessage = useSelector(selectCategoriesMessage);
  const linksStateMessage = useSelector(selectLinksMessage);
  const snippetsStateMessage = useSelector(selectSnippetsMessage);

  return (
    <div>
      {appStateMessage && (
        <p
          style={{ color: appStateMessage.type === "error" ? "red" : "green" }}
        >
          {appStateMessage.text}{" "}
          {appStateMessage.type === "error" && (
            <button onClick={() => dispatch(clearAppMessage())}> X </button>
          )}
        </p>
      )}

      {categoriesStateMessage && (
        <p
          style={{
            color: categoriesStateMessage.type === "error" ? "red" : "green",
          }}
        >
          {categoriesStateMessage.text}{" "}
          {categoriesStateMessage.type === "error" && (
            <button onClick={() => dispatch(clearCategoriesMessage())}>
              {" "}
              X{" "}
            </button>
          )}
        </p>
      )}

      {linksStateMessage && (
        <p
          style={{
            color: linksStateMessage.type === "error" ? "red" : "green",
          }}
        >
          {linksStateMessage.text}{" "}
          {linksStateMessage.type === "error" && (
            <button onClick={() => dispatch(clearLinksMessage())}> X </button>
          )}
        </p>
      )}

      {snippetsStateMessage && (
        <p
          style={{
            color: snippetsStateMessage.type === "error" ? "red" : "green",
          }}
        >
          {snippetsStateMessage.text}{" "}
          {snippetsStateMessage.type === "error" && (
            <button onClick={() => dispatch(clearSnippetsMessage())}>
              {" "}
              X{" "}
            </button>
          )}
        </p>
      )}
    </div>
  );
}
