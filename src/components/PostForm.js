import React from "react";
import MDEditor from '@uiw/react-md-editor';

export default function PostForm(props) {
  const itemStyle={
    margin: "5px",
  }
  return (
    <form>
      <br />
        <label htmlFor="title" >Title:</label> <br />
        <input style={itemStyle} name="title" id="post-title" type="text" value={props.formData.title} onChange={props.handleChange}/>
        <br />
        <MDEditor style={itemStyle} value={props.textData} height={500} onChange={(newTextData = "") => props.setTextData(newTextData)} name="text"/>
        <label htmlFor="publish">Publish immediately?</label><input style={itemStyle} type="checkbox" name= "publish" checked={props.formData.publish} onChange={props.handleChange}/>
        <br/>
        <button style={itemStyle} onClick={props.handleSubmit}>Submit</button>
    </form>
  );
}
