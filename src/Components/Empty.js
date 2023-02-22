import React from 'react';

const Empty = () => {

  const emptyStyles = {
    width: "90%",
    margin: "auto",
    marginTop: "15px",
    textAlign: "center",
    padding: "175px 50px",
    color: "grey",
  }

  return (
    <div style={emptyStyles}>
      <h3>Your task list is empty</h3>
    </div>
  )
}

export default Empty