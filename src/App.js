import {useState,useEffect} from 'react';
import './App.css';
import Asidebar from './components/Asidebar';
import {Routes,Route} from 'react-router-dom';
import Login from './components/login';
import KakaoMap from './components/KakaoMap';
import SignUp from './components/SignUp';
import UserProvider from './components/UserProvider';


function App() {
  const [moveBoolean,setMoveBoolean] = useState(false);


  useEffect(() => {
  
    console.log('moveBoolean changed:', moveBoolean);
  }, [moveBoolean]);



  return (
    <>
    <UserProvider>
      <Routes>
        <Route path="/" element={<Login setMoveBoolean={setMoveBoolean}/>} />
        <Route path="map" element={<KakaoMap />} />
        <Route path="signUp" element={<SignUp setMoveBoolean={setMoveBoolean}/>} />
      </Routes>
    </UserProvider>
     
    
    
    </>
  );

}

export default App;
