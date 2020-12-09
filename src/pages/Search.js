import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllSnippets } from "../store/snippets/selectors";
import { selectAllLinks } from "../store/links/selectors";
import { getAllSnippets } from "../store/snippets/actions";
import { getAllLinks } from "../store/links/actions";
import LinkCard from "../components/LinkCard";
import CodeSnippetCard from "../components/CodeSnippetCard";

export default function Search() {
  const dispatch = useDispatch();
  const allSnippets = useSelector(selectAllSnippets);
  const allLinks = useSelector(selectAllLinks);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({
    links: [],
    snippets: [],
  });

  useEffect(() => {
    if (allLinks.length === 0) {
      dispatch(getAllLinks());
    }
  }, [dispatch, allLinks.length]);

  useEffect(() => {
    const linkResults = allLinks.filter(
      (link) =>
        link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const snippetResults = allSnippets.filter(
      (snippet) =>
        snippet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults({ links: linkResults, snippets: snippetResults });
  }, [searchTerm, allLinks, allSnippets]);

  return (
    <div>
      <p>Search</p>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchResults.links.length !== 0 && searchTerm && (
        <div>
          <h2>Link search results:</h2>
          <div>
            {searchResults.links.map((link) => (
              <LinkCard
                key={link.id}
                id={link.id}
                name={link.name}
                content={link.content}
              />
            ))}
          </div>
        </div>
      )}

      {searchResults.snippets.length !== 0 && searchTerm && (
        <div>
          <h2>Snippet search results:</h2>
          <div>
            {searchResults.snippets.map((snippet) => (
              <CodeSnippetCard
                key={snippet.id}
                name={snippet.name}
                content={snippet.content}
                comment={snippet.comment}
                id={snippet.id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
