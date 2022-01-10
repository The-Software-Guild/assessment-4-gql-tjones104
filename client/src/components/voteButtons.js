import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const LIKE_MUTATION = gql`
  mutation LikeMutation($issueId: ID!) {
    likePost(issueId: $issueId) {
      id
    }
  }
`;

const DISLIKE_MUTATION = gql`
  mutation LikeMutation($issueId: ID!) {
    dislikePost(issueId: $issueId) {
      id
    }
  }
`;

const VoteButtons = ({
  user,
  id,
  likes,
  dislikes,
  likeCount,
  dislikeCount,
}) => {
  const [likestyle, setLikestyle] = useState("like-button");
  const [dislikestyle, setDislikestyle] = useState("dislike-button");
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");

  const [likePost] = useMutation(LIKE_MUTATION, {
    variables: {
      issueId: id,
    },
  });

  const [dislikePost] = useMutation(DISLIKE_MUTATION, {
    variables: {
      issueId: id,
    },
  });

  useEffect(() => {
    if (token) {
      if (user && likes.find((like) => like.likedBy.id === user._id)) {
        setLikestyle("liked-button");
      } else setLikestyle("like-button");
      if (
        user &&
        dislikes.find((dislike) => dislike.dislikedBy.id === user._id)
      ) {
        setDislikestyle("disliked-button");
      } else setDislikestyle("dislike-button");
    }
  }, [user, likes, dislikes, token]);

  const handleLike = () => {
    if (token) {
      setLikestyle("liked-button");
      if (likestyle === "like-button" && dislikestyle !== "disliked-button") {
        likePost();
        setLikestyle("liked-button");
      } else if (
        likestyle === "like-button" &&
        dislikestyle === "disliked-button"
      ) {
        dislikePost();
        likePost();
        setDislikestyle("dislike-button");
        setLikestyle("liked-button");
      } else {
        likePost();
        setLikestyle("like-button");
      }
    } else {
      navigate("/login");
    }
  };

  const handleDislike = () => {
    if (token) {
      setDislikestyle("disliked-button");
      if (dislikestyle === "dislike-button" && likestyle !== "liked-button") {
        dislikePost();
        setDislikestyle("disliked-button");
      } else if (
        dislikestyle === "dislike-button" &&
        likestyle === "liked-button"
      ) {
        likePost();
        dislikePost();
        setLikestyle("like-button");
        setDislikestyle("disliked-button");
      } else {
        dislikePost();
        setDislikestyle("dislike-button");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="like">
        <button className={likestyle} onClick={(e) => handleLike(e)}>
          Like
        </button>
      </div>
      <p>{likeCount - dislikeCount}</p>
      <div className="dislike">
        <button className={dislikestyle} onClick={(e) => handleDislike(e)}>
          Dislike
        </button>
      </div>
    </div>
  );
};

export default VoteButtons;
