import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) {
    return " ";
  }
  return (
    <div className="PostPage">
      <h1>{postInfo.title}</h1>
      <div className="details">
        <div className="authorInfo">@{postInfo.author.username}</div>
        <div className="time">
          {formatISO9075(new Date(postInfo.createdAt))}
        </div>
        {userInfo.id === postInfo.author._id && (
          <div className="editPost">
            <Link to={`/edit/${postInfo._id}`}>
              <button>Edit</button>
            </Link>
          </div>
        )}
      </div>

      <div className="postImg">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
      </div>

      <div
        className="postContent"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
};

export default PostPage;
