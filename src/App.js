import {useState } from "react"
import HeadInput from "./HeadInput"
import ListItems from "./ListItems"
import Modal from "./Modal"
import "./App.css"

const App = () => {

  const [data , setData] = useState([])
  const [modal , setmodal] = useState({display:false , id:""})

  const modalHandler = (e) => {
    setmodal({display:!modal.display , id:e.target.id})
  }

  return(
    <div className="App">
      <HeadInput setData={setData} data={data} />
      <hr />
      <ListItems setData={setData} data={data} myModal={modalHandler}/>
      {data.length>1 && <button className="clal" onClick={ () => setData([]) }>Clear All</button>}
      {modal.display && <Modal modal={modal} myModal={modalHandler} data={data}/>}
    </div>
  )
}

export default App;
