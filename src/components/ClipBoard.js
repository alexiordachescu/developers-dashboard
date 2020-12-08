import React from "react";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import CheckIcon from "@material-ui/icons/Check";
import useCopyToClipboard from "../utils/useCopyToClipboard";

export default function ClipBoard({ code }) {
  const [isCopied, handleCopy] = useCopyToClipboard(1000);

  return (
    <button onClick={() => handleCopy(code)}>
      {isCopied ? <CheckIcon /> : <FileCopyIcon />}
    </button>
  );
}
