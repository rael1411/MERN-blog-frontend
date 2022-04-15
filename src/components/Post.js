import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import gfm from "remark-gfm"
import AuthProvider from "../context/AuthProvider"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import SureCheck from "./SureCheck";

export default function Post(props) {
  const [commentCount, setCommentCount] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [displaySure, setDisplaySure] = React.useState(false)
  const { auth } = React.useContext(AuthProvider);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const toggleSure = () => {setDisplaySure(prevDisplaySure => !prevDisplaySure)}
  const handleDelete = async () => {
    await axiosPrivate.delete("/posts/" + props.post._id)
    window.location.reload()
  }
  const sendEdit = () => {
    navigate("/edit/" + props.post._id)
  }
  const link =
    "http://localhost:5000/posts/" + props.post._id + "/comment-count/";
  React.useEffect(() => {
    fetch(link)
      .then((response) => response.json())
      .then((data) => setCommentCount(data))
      .then((data) => setLoading(false));
  }, [link]);
  //splitting text into array to display new lines properly
  const textArray = props.post.text.split("\n");
  const displayText = textArray.map((item, counter) => <ReactMarkdown key={counter} remarkPlugins={[gfm]}>{item}</ReactMarkdown>);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(props.post.timestamp)
  return (
    <div className="post-wrapper">
      <h1 className="post-title">
        {props.link ? (
          <Link to={`post/${props.post._id}`}>{props.post.title} </Link>
        ) : (
          props.post.title
        )}
      </h1>
        <span className="by-text">by: </span>
        {props.post.user?.username}
        <br />
        <br />
      <small>
      {date.getHours()}:{date.getMinutes()} {date.toLocaleDateString(undefined ,options)} 
      </small>
      {displayText}
      {auth?.accessToken && <><button className="button" onClick={toggleSure}>Delete</button> <button className="button" onClick={sendEdit}>Edit</button><br/></>}
      {displaySure && <SureCheck handleToggle={toggleSure} handleDelete={handleDelete}/>}
      {props.link && !loading && (
        <Link to={`post/${props.post._id}`}>
          <><small className="comment-count"><br/>{commentCount.count} comments</small> </>{" "}
        </Link>
      )}
    </div>
  );
}
