import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Messages from "./assets/pages/messagesPage/Messages"
import { SignIn, SignUp } from "./assets/pages/sign/Sign"
import Main from "./assets/pages/mainPage/MAin"
import ProtectedLayout from "./services/protected"
import SplashScreen from './assets/pages/splash/splash';

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/welcome" element={<SplashScreen />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Main />} />
            <Route path="/messages/:id/:chatId" element={<Messages />} />
          </Route>

          <Route path="*" element={<h1>444 PAGE NOT FOUND</h1>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;