import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Lista } from "./components/Lista"
import { NuevoEvento } from "./components/NuevoEvento"
import { EditarEvento } from "./components/EditarEvento"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lista/>} />
        <Route path="/nuevoEvento" element={<NuevoEvento/>} />
        <Route path="/editarEvento/:id" element={<EditarEvento/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
