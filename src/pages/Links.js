import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLinks } from "../store/links/actions";
import { selectAllLinks } from "../store/links/selector";
import LinkCard from "../components/LinkCard";

const Links = () => {
  const dispatch = useDispatch();
  const links = useSelector(selectAllLinks);

  console.log("i am Link", links);

  useEffect(() => {
    dispatch(getAllLinks());
  }, [dispatch]);

  return (
    <div>
      {links.map((l) => {
        return <LinkCard key={l.id} name={l.name} content={l.content} />;
      })}
    </div>
  );
};

export default Links;
