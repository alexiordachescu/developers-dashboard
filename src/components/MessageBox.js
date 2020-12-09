import React from "react";
import Message from "./Message";

const stateSlices = ["appState", "categories", "links", "snippets"];

export default function MessageBox() {
  return (
    <div>
      {stateSlices.map((slice) => (
        <Message key={slice} slice={slice} />
      ))}
    </div>
  );
}
