import { BrowserRouter, Route, Routes } from "react-router-dom"
import Messages from "./assets/pages/messagesPage/Messages"


function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/messages" element={<Messages />} />
          <Route path="*" element={<h1>444 PAGE NOT FOUND</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
