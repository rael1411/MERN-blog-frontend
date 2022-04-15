import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import PostForm from "./PostForm";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

export default function WritePost() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = React.useState({
    title: "",
    publish: true,
  });
  const [textData, setTextData] = React.useState("");
  function handleChange(e) {
    const { name, value, type } = e.target;
    setFormData((prevFormData) => {
      if (type === "checkbox") {
        return {
          ...prevFormData,
          [name]: !prevFormData.publish,
        };
      }
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const newPost = {
      title: formData.title,
      published: formData.publish,
      text: textData,
    };
    axiosPrivate.post("/posts", newPost).then(
      (res) => {
        console.log(res);
        navigate("/");
      },
      (err) => {
        console.log(err);
      }
    );
  }
  return (
    <div>
      <Header />
      <PostForm
        formData={formData}
        handleChange={handleChange}
        textData={textData}
        setTextData={setTextData}
        handleSubmit={handleSubmit}
      />
      <Footer />
    </div>
  );
}
