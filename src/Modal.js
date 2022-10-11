import "./Modal.css"
import { useRef , useState } from "react";

const Modal = ({modal , myModal , data}) => {
    
    const itemIndex = data.findIndex( item => item.dataId === modal.id );
    const [modalText , setModalText] = useState(data[itemIndex].dataValue);
    const inputRef = useRef();

    const editHandler = (e) => {
        data[itemIndex].dataValue = inputRef.current.defaultValue
        setModalText("");
        myModal(e);
    }

    return (
        <div className="modal">
            <input className="modalInput" ref={inputRef} type="text" value={modalText}
            onChange={(e)=> setModalText(e.target.value)}/>
            <button className="modalBtn" id={modal.id} onClick={editHandler}>Edit</button>
        </div>
    )
}

export default Modal