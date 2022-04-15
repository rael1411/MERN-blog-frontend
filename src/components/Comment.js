import React from "react";
import { axiosPrivate } from "../api/axios";
import SureCheck from "./SureCheck"
import styled from "styled-components"

const Div = styled.div`

`
const Content = styled.p`
margin-left: 20px;
font-size: 80%;
`
const Author = styled.small`
font-size: 70%

`
export default function Comment(props) {
  const [showSureCheck, setShowSurecheck] = React.useState(false)
  const contentArray = props.comment.content.split("\n")
  const displayContent = contentArray.map((item, counter) => <Content key={counter}> {item}</Content>);
  const toggleSure = () => {
    setShowSurecheck(prev => !prev)
  }
  const handleDelete = async () => {
    await axiosPrivate.delete("/posts/" + props.postId + "/comments/" + props.comment._id)
    window.location.reload()
  }
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(props.comment.timestamp)
  return (
    <Div>
      <Author>From: {props.comment.email} on {date.toLocaleDateString(undefined ,options)} {date.getHours()}:{date.getMinutes()} </Author>
      {displayContent}
      {props.authed && < button className="button" onClick={toggleSure}>Delete</button>}
      {showSureCheck && <SureCheck handleDelete={handleDelete} handleToggle={toggleSure}/> }
    </Div>
  );
}
