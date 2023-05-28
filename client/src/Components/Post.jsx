import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({ _id, title, summary, content, cover, createdAt, author }) => {
  return (
    <div className="post">
      <div className="blogImage">
        <Link to={`/post/${_id}`}>
          <img src={"http://localhost:4000/" + cover} alt="" />
        </Link>
      </div>

      <div className="text">
        <Link to={`/post/${_id}`} className="link">
          <h1>{title}</h1>
        </Link>
        <p className="info">
          <span className="author">{author.username}</span>
          <span className="time">
            {format(new Date(createdAt), "MMM d, yyyy HH:mm")}
          </span>
        </p>
        <p>{summary}</p>
      </div>
    </div>
  );
};

export default Post;
