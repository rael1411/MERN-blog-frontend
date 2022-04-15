import MDEditor from "@uiw/react-md-editor";
function EditForm(props) {
  const itemStyle = {
    margin: "5px",
  };
  return (
    <form>
      <br />
      <MDEditor
        style={itemStyle}
        value={props.textData}
        height={500}
        onChange={(newTextData = "") => props.setTextData(newTextData)}
        name="text"
      />
      <label htmlFor="publish">Publish?</label>
      <input
        style={itemStyle}
        type="checkbox"
        name="published"
        checked={props.published}
        onChange={props.handlePublishToggle}
      />
      <br />
      <button style={itemStyle} onClick={props.handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default EditForm;
