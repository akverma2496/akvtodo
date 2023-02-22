import { BrowserRouter , Routes , Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Main from "./Components/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} /> 
          <Route exact path='/main' element={<Main />} /> 
        </Routes>
    </BrowserRouter>
  );
}

export default App;
