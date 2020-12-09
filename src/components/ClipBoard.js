import React from "react";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CheckIcon from "@material-ui/icons/Check";
import useCopyToClipboard from "../utils/useCopyToClipboard";

export default function ClipBoard({ code }) {
  const [isCopied, handleCopy] = useCopyToClipboard(1000);

  return (
    <button onClick={() => handleCopy(code)}>
      {isCopied ? <CheckIcon /> : <AssignmentIcon />}
    </button>
  );
}
