import { BrowserRouter, Route, Routes } from "react-router-dom"
import Messages from "./assets/pages/messagesPage/Messages"
import { SignIn, SignUp } from "./assets/pages/sign/Sign"
import Main from "./assets/pages/mainPage/MAin"
import ProtectedLayout from "./services/protected"


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Main />} />
            <Route path="/messages/:id/:chatId" element={<Messages />} />
          </Route>

          <Route path="*" element={<h1>444 PAGE NOT FOUND</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;