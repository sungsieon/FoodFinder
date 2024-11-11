import { markerdata } from "./MarkerData";
import Asidebar from "./Asidebar";
import {useState,useEffect} from 'react';

const {kakao} = window;

export default function KakaoMap(){
    

    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    
    
    const username = localStorage.getItem("userData");
    console.log(username)

    

    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      
      setName(userData.name)
    })
        
    useEffect(() => {
        const getData = async() => {
      const API_KEY = "amgtM2vHu5RlfJ8lFGZoGxbjEt858XedqjyzrVvNCSyxOexA0w1PVQdYJrEz%2FNxK77MkO40kBvtZp2DnTsZzng%3D%3D"
      const url = `https://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=${API_KEY}&pageNo=1&numOfRows=30&resultType=json`;
    
      let response = await fetch(url);
      let data = await response.json();
      console.log(data);
      const items = data.getFoodKr.item;
        setData(items);
     console.log(items)
    }
      getData();
  },[])
  
 
    
    useEffect(() => {
    var container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(35.193363, 128.98607),
      level: 3,
    };
    var map = new kakao.maps.Map(container, options);
  
    markerdata.forEach((el) => {
      new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(el.lat, el.lng),
        title: el.title,
      });
    });
  
  
  
  markerdata.forEach((el) => {
      const markerPosition = new kakao.maps.LatLng(el.lat,el.lng);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        map: map,
        title: el.title,
      })
  
  var infowindow = new kakao.maps.InfoWindow({
    content : `<div className="infodiv" style="padding:5px;">${el.title}</div>`,
    removable : true,
  })
  
  
  
  kakao.maps.event.addListener(marker, 'click', function(id){
    infowindow.open(map, marker);
   
  });
  });
  
    },[])


    return(
        <>
        <navbar className="navbar">
     <div>
      <button className="username">{name}님 반갑습니다!</button>
     </div>
     <div className="titleBox">
      <h3 className="title"><svg className="foodIcon2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 192c0-35.3 28.7-64 64-64c.5 0 1.1 0 1.6 0C73 91.5 105.3 64 144 64c15 0 29 4.1 40.9 11.2C198.2 49.6 225.1 32 256 32s57.8 17.6 71.1 43.2C339 68.1 353 64 368 64c38.7 0 71 27.5 78.4 64c.5 0 1.1 0 1.6 0c35.3 0 64 28.7 64 64c0 11.7-3.1 22.6-8.6 32H8.6C3.1 214.6 0 203.7 0 192zm0 91.4C0 268.3 12.3 256 27.4 256H484.6c15.1 0 27.4 12.3 27.4 27.4c0 70.5-44.4 130.7-106.7 154.1L403.5 452c-2 16-15.6 28-31.8 28H140.2c-16.1 0-29.8-12-31.8-28l-1.8-14.4C44.4 414.1 0 353.9 0 283.4z"/></svg>MyFood</h3>
     </div>
     <div className="menu">
      <button>오늘 뭐 먹을까?</button>
      <button>Home</button>
     </div>
     </navbar>
     <div id="map" style={{width:"100%", height:"600px"}}></div> 
     <Asidebar data={data} />
        </>
    )
}