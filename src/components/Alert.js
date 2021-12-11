import React, { useContext } from 'react'
import contextValue from '../context/notes/NoteContext'

const Alert = () => {
  const context = useContext(contextValue);
  const {feature}= context;
    return (
        <div
        className={`alert text-white alert-dismissible fade show bg-${feature.success==="Success"?"success":"danger"}`}
        role="alert"
        id="alert"
        style={{ visibility: "hidden"}}
      >
        <strong>{feature.success} :</strong> {feature.message}.
    
      </div>
    )
}

export default Alert
