import { Route, Routes } from "react-router-dom"
import SettelmentForm from "./SettelmentForm"
import "./index.css"
import Thanku from "./Thanku"
import Demo from "./Demo"

function App() {


  return (
    <>
     <Routes>
      <Route path="/" element={<SettelmentForm/>}/>
      <Route path="/thanks" element={<Thanku/>}/>
      <Route path="/demo"  element={<Demo/>}/>
     </Routes>
   
    </>
  )
}

export default App
