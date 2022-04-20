import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Post from "./Post";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { useParams } from "react-router-dom";
import AuthProvider from "../context/AuthProvider"
import axios from "../api/axios";


export default function PostDetails() {
  const [postData, setPostData] = React.useState({});
  const [commentsData, setCommentsData] = React.useState([]);
  const [postLoading, setPostLoading] = React.useState(true);
  const [commentLoading, setCommentLoading] = React.useState(true);
  const [showComment, setShowComment] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    content: "",
  });
  const { auth } = React.useContext(AuthProvider);
  const { id } = useParams();
  const postLink = "/posts/" + id;
  const commentsLink = postLink + "/comments/";

  //GET POST AND COMMENTS FROM API
  React.useEffect(() => {
    axios.get(postLink)
      .then((res) => setPostData(res.data))
      .then(() => setPostLoading(false))
    axios.get(commentsLink)
      .then((res) => setCommentsData(res.data))
      .then(() => setCommentLoading(false));
  }, [commentsLink, postLink]);
  const comments = (
    <ul>
      {commentsData.map((comment) => {
        return (
          <li key={comment._id}>
            <Comment authed = {auth.accessToken? true : false}comment={comment} postId={id} />{" "}
          </li>
        );
      })}{" "}
    </ul>
  );
  //toggle the comment form
  function toggleComment() {
    setShowComment((prevShowComment) => !prevShowComment);
  }
  //form controller for CommentForm component
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  let loadingSpinner = <div className="loader">Loading...</div>;
  //submit function for the commentform compoonent
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const link = "http://localhost:5000/posts/" + id + "/comments/";
      let res = await fetch(link, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          content: formData.content,
          post: id,
        }),
      });
      if (res.status === 201) {
        console.log("comment created");
        //changing the commentsdata state to re-render the comments and resetting the form
        let counter = 0;
        let newComment = {
          email: formData.email,
          content: formData.content,
          timestamp: Date.now(),
          _id: counter
        };
        counter++;
        setCommentsData((prevCommentsData) => [newComment, ...prevCommentsData]);
        setFormData({
          email: "",
          content: ""
        })
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="app">
      <Header />
      {/* if the post or the comments are still loading show the loading spinner */}
      <div>
        {postLoading || commentLoading ? (
          <div>{loadingSpinner}</div>
        ) : (
          <div>
            <Post post={postData} link={false} /> {comments}{" "}
          </div>
        )}
      </div>
      <button  onClick={toggleComment} className="button">
        Post comment
      </button>
      {showComment && (
        <CommentForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={formData}
        />
      )}
      <Footer />
    </div>
  );
}
