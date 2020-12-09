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

export default function Message({ slice }) {
  const dispatch = useDispatch();
  const appStateMessage = useSelector(selectAppMessage);
  const categoriesStateMessage = useSelector(selectCategoriesMessage);
  const linksStateMessage = useSelector(selectLinksMessage);
  const snippetsStateMessage = useSelector(selectSnippetsMessage);

  let message;
  let clearMessage;
  switch (slice) {
    case "appState":
      message = appStateMessage;
      clearMessage = clearAppMessage;
      break;
    case "categories":
      message = categoriesStateMessage;
      clearMessage = clearCategoriesMessage;
      break;
    case "links":
      message = linksStateMessage;
      clearMessage = clearLinksMessage;
      break;
    case "snippets":
      message = snippetsStateMessage;
      clearMessage = clearSnippetsMessage;
      break;
    default:
      message = null;
  }

  if (!message) return null;

  return (
    <div style={{ color: message.type === "error" ? "red" : "green" }}>
      <p>
        {slice}: {message.text}{" "}
        {message.type === "error" && (
          <button onClick={() => dispatch(clearMessage())}> X </button>
        )}
      </p>
    </div>
  );
}
