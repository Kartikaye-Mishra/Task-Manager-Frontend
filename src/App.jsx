import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/Header"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Register from "./pages/Register"
import toast, {Toaster} from "react-hot-toast"
import axios from "axios"
import { Context, server } from "./main"
import { useEffect,useContext } from "react"

function App() {
 
const {user,isAuthenticated,setUser,setIsAuthenticated,setLoading} = useContext(Context)

  useEffect(() => {
  setLoading(true);
    axios.get(
      `${server}/users/me`,
      {
        withCredentials:true,
      }
      ).then(res=>{
        res.data.success? 
        setIsAuthenticated(true):
        setIsAuthenticated(false);
        
        setUser(res.data.user);
        setLoading(false);
        
        
      }
      ).catch((e)=>{
        setIsAuthenticated(false);
        console.log(e);
        setLoading(false);
      })
     
  }, [isAuthenticated])
  return (
   <>
   <Router>
   <Header></Header>
      <Routes>

        <Route path="/" element={<Home/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>

      </Routes>
<Toaster></Toaster>
   </Router>
   </>
  )
}

export default App
