import React, { useEffect, useState } from 'react'
import "./styles.css"

function ColorButtons() {

  const [selectedColor, setSelectedColor] = useState(null);
    

    const handleColorChange = (color) => {
       localStorage.setItem("color",color) //for addnoteasync
       setSelectedColor(color)
    }

    useEffect(()=> {
      const color = localStorage.getItem("color") || "#ff0"
      setSelectedColor(color)
    },[])

  return (
    <div>
        <button onClick={(e) => handleColorChange("#ff8181")} style={{backgroundColor:"#ff8181"}} className={`color-button ${selectedColor === "#ff8181" ? "selected-button" : ""}`}/>
        <button onClick={() => handleColorChange("#ffee76","yellow")} style={{backgroundColor:"#ffee76"}} className={`color-button ${selectedColor === "#ffee76" ? "selected-button" : ""}`}/>
        <button onClick={() => handleColorChange("#88ff76","green")} style={{backgroundColor:"#88ff76"}} className={`color-button ${selectedColor === "#88ff76" ? "selected-button" : ""}`}/>
        <button onClick={() => handleColorChange("#ffb153","orange")} style={{backgroundColor:"#ffb153"}} className={`color-button ${selectedColor === "#ffb153" ? "selected-button" : ""}`}/>
        <button onClick={() => handleColorChange("#8ae3ff","blue")} style={{backgroundColor:"#8ae3ff"}} className={`color-button ${selectedColor === "#8ae3ff" ? "selected-button" : ""}`}/>
        <button onClick={() => handleColorChange("#e29aff","purple")} style={{backgroundColor:"#e29aff"}} className={`color-button ${selectedColor === "#e29aff" ? "selected-button" : ""}`}/>
        <button onClick={() => handleColorChange("#ff8ec3","pink")} style={{backgroundColor:"#ff8ec3"}} className={`color-button ${selectedColor === "#ff8ec3" ? "selected-button" : ""}`}/>

    </div>
  )
}

export default ColorButtons