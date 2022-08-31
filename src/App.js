import logo from './logo.svg';
import './App.css';
import NavBar from './Component/Navbar'
import UserManager from './Component/UserManager'
import Navbar from "./Component/Navbar";
function App() {
  return (
    <div className="App p-6">
     <Navbar/>
        <UserManager/>
    </div>
  );
}

export default App;
