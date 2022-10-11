import "./ListItems.css"

const ListItems = ({data , setData , myModal}) => {


  const doneHandler = (e) => {
    const removeIndex = data.findIndex(item => item.dataId === e.target.id);
    data.splice(removeIndex,1);
    setData([...data]);
  }

  return(
      <>
        <ul>
            {
              data.map((task)=>{
                return (
                    <div className="listdiv" key={task.dataId}>
                     <li>{task.dataValue}</li>
                     <span className="listspan">
                      <button id={task.dataId} className="done" onClick={doneHandler}>Done</button>
                      <button id={task.dataId} className="edit" onClick={(e)=>myModal(e)}>Edit</button> 
                     </span>
                    </div>
                )
              })
            }
        </ul>
      </>
  )
}

export default ListItems