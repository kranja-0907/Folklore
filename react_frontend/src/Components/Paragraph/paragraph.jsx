import { Helmet } from "react-helmet";
import Draggable from "react-draggable";
import { useEffect, useState } from "react";

export default function Paragraph({ post, postNbr }) {

  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  const [content, setContent] = useState("")
  const [imageBlob, setImageBlob] = useState()
  const [choices, setChoices] = useState([{ choiceValue: "" }, { choiceValue: "" }])
  const [condition1, setConditions1] = useState("")
  const [condition2, setConditions2] = useState("")

  useEffect(() => {
    import("./paragraph.css");

    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile]);

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    setSelectedFile(e.target.files[0])
  }

  const updateContent = (content) => {
    setContent(content);
    post.content = content
  }

  const updateChoice = (value, index) => {
    console.log(post)
    if (index === 0) {
      setConditions1(value)
      post.choice1 = value
    } else if (index === 1) {
      setConditions2(value)
      post.choices2 = value
    }
  }

  return (
    <Draggable>
      <div className="movableParagraph">
        <div className="holder">
          {selectedFile && <div className="paragraphImage" style={{ backgroundImage: `url(${preview})` }}></div>}
          <div className="paragraphImg">
            <input type="file" id="paragraphImg" accept="image/*" onChange={onSelectFile}></input>
          </div>
          <div name="ddlHolder" className="ddlHolder">
            <select multiple="multiple" className="ddlChoices"></select>
          </div>
          <div className="storyPart ui-widget-content">
            <textarea className="paragraph" value={content} onChange={async (e) => updateContent(e.target.value)}></textarea>
            <hr />
            <div className="options">
              <div className="number">{postNbr * 2 - 1}</div>
              <textarea className="option" value={condition1} onChange={(e) => updateChoice(e.target.value, 0)}></textarea>
              <div className="number">{postNbr * 2}</div>
              <textarea className="option" value={condition2} onChange={(e) => updateChoice(e.target.value, 1)}></textarea>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}
