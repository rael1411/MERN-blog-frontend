import React from "react";
import Post from "./Post";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header"
import Footer from "./Footer"

export default function UnpublishedPosts(props) {
  const [postsData, setPostsData] = React.useState([])
  const [loading, setLoading] = React.useState(true);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  //FETCH POSTS AND ADD THEM TO STATE
  React.useEffect(() => {
      let isMounted = true;
      const controller = new AbortController()
      const getPosts = async () => {
        try {
            const res = await axiosPrivate.get("/posts/unpublished", {
                signal: controller.signal
            })
            isMounted && setPostsData(res.data)
            setLoading(false);
        } catch (err) {
            console.error(err)
            navigate("/login", { state: { from: location}, replace: true})
        }
      }
      getPosts();

      return () => {
          isMounted = false;
          controller.abort()
      }

  },[axiosPrivate, location, navigate]);
  let loadingSpinner =<div className="loader">Loading...</div>
  const posts = <ul>
  {postsData.map((post) => {
      return <li key={post._id} ><Post link={true} post={post}/> </li>
  })} </ul>
  return (
    <div>
      <Header />
      {loading ? <div>{loadingSpinner} </div>: <div>{posts}</div>}
      <Footer />
    </div>
  );
}
