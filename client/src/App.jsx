import { BrowserRouter,Routes,Route } from "react-router-dom"
import Signin from "./pages/Signin"
import Header from "./components/Header"
import FooterCom from "./components/FooterCom"
import SignUp from "./pages/SignUp"
import About from "./pages/About"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
const App = () => {
  return (
   <BrowserRouter>
   <Header/>
    <Routes>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/projects" element={<Projects/>}/>
      <Route path="/" element={<Home/>}/>
    </Routes>
   
   <FooterCom/>
   </BrowserRouter>
  )
}

export default App
