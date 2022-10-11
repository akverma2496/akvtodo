import { useState } from "react"
import { uid } from "uid";
import "./HeadInput.css"

const HeadInput = ({data , setData}) => {

    const [text,setText] = useState("");

    const addData = () => {
        if(text.length === 0) {
            alert("Please enter something");
        }
        else{
            setData([...data , {dataValue : text , dataId : uid()}]);
            setText("");
        }
    }

    return(
        <>
        <h1>TodoApp</h1>
        <input type="text" placeholder="Add your task ..." value={text}
         onChange={(e)=> setText(e.target.value)} />
        <span className="headspan">
            <button className="headbtn" onClick={addData}>Add</button>
            <button className="headbtn" onClick={() => setText("")}>Clear</button>
        </span>
        </>
    )
}

export default HeadInput