
import './App.css'
import {LogOut} from "lucide-react";
import { useNavigate } from "react-router-dom";



function App() {
    const navigate = useNavigate();

  return (
      <>
          <h1 className="text-3xl font-bold underline text-red-500">
              Hello world!

          </h1>
          <button

              onClick={() => {
                  navigate("/login");
              }}
          >
            Login
          </button>
      </>
  )
}

export default App
