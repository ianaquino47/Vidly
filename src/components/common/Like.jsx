import React from "react";
const Like = ({ liked, onClick }) => {
  const classes = liked ? "fa fa-heart" : "fa fa-heart-o";

  return (
    <i
      onClick={onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
