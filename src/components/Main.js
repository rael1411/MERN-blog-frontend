import React from "react";
import Post from "./Post";
import axios from "../api/axios";

export default function Main(props) {
  const [postsData, setPostsData] = React.useState([])
  const [loading, setLoading] = React.useState(true);

  //FETCH POSTS AND ADD THEM TO STATE
  React.useEffect(() => {
    axios.get("/posts")
        .then(res => setPostsData(res.data))
        .then(() => setLoading(false))
  },[setPostsData]);
  let loadingSpinner =<div className="loader">Loading...</div>
  const posts = <ul>
  {postsData.map((post) => {
      return <li key={post._id} ><Post link={true} post={post}/> </li>
  })} </ul>
  return (
    <div>
      {loading ? <div>{loadingSpinner} </div>: <div>{posts}</div>}
    </div>
  );
}
