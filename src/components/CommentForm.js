import React from "react";

export default function CommentForm(props) {
  const contentStyle = {
    height: "100px",
    width: "500px",
    resize: "none",
  };
  const formStyle = {
    padding: "20px",
  };

  return (
    <form style={formStyle}  onSubmit={props.handleSubmit}>
      <label htmlFor="email">
        <small>Email: </small>
      </label>
      <br />
      <input name="email" id="comment-email" type="email" onChange={props.handleChange} value={props.formData.email}/> <br />
      <label htmlFor="comment-content">
        <small>Comment: </small>
      </label>
      <br />
      <textarea id="comment-content" name="content" style={contentStyle} onChange={props.handleChange} value={props.formData.content}/>
      <br />
      <button className="button">Submit</button>
    </form>
  );
}
