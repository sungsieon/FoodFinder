import {useState,useEffect} from 'react';
import './App.css';
import { markerdata } from './components/MarkerData';
import Asidebar from './components/Asidebar';
import {Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import KakaoMap from './components/KakaoMap';
import SignUp from './components/SignUp';
import UserProvider from './components/UserProvider';


function App() {
  const [moveBoolean,setMoveBoolean] = useState(false);


  useEffect(() => {
    // moveBoolean 상태가 변경될 때마다 실행되는 부분
    console.log('moveBoolean changed:', moveBoolean);
  }, [moveBoolean]); // useEffect가 moveBoolean 상태에 의존하도록 설정



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
