import React from "react";
import "./Markdown.css";
import ReactMarkdown from "react-markdown";

function Markdown({ content }) {
  return (
    <div className="markdown">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export default Markdown;
