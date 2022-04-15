import React from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Header from "./Header";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import EditForm from "./EditForm";
import {useNavigate} from "react-router-dom"

function EditPost(props) {
  const { id } = useParams();
  const [published, setPublished] = React.useState();
  const [textData, setTextData] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  let navigate = useNavigate();
  function handlePublishToggle() {
    setPublished((prev) => !prev);
  }
  const axiosPrivate = useAxiosPrivate();
  React.useEffect(() => {
    axiosPrivate
      .get("/posts/" + id)
      .then(function (res) {
        setTextData(res.data?.text);
        setPublished(res.data?.published);
        setLoading(false);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [id, axiosPrivate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axiosPrivate.patch("/posts/" + id, {text: textData, published: published})
        navigate("/")
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Header />
      {!loading && (
        <EditForm
          handlePublishToggle={handlePublishToggle}
          textData={textData}
          setTextData={setTextData}
          published={published}
          handleSubmit={handleSubmit}
        />
      )}
      <Footer />
    </div>
  );
}

export default EditPost;
