import { BrowserRouter, Route, Routes } from "react-router-dom"
import Messages from "./assets/pages/messagesPage/Messages"
import { SignIn, SignUp } from "./assets/pages/sign/Sign"
import Main from "./assets/pages/mainPage/MAin"

function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/messages/:id/:chatId" element={<Messages />} />
          <Route path="*" element={<h1>444 PAGE NOT FOUND</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
