import { useState } from "react";

export default function Asidebar({ data }) {
  const [changeColor, setChangeColor] = useState({});
  const [favorite, setFavorite] = useState({});
  const [showFavorites, setShowFavorites] = useState(false);

  const asideMenu = data.map((item, index) => {
    const toggleColor = () => {
      setChangeColor({ ...changeColor, [index]: !changeColor[index] });
    };

    const toggleFavorite = () => {
      setFavorite({ ...favorite, [index]: !favorite[index] });
    };

    return (
      <div onClick={toggleColor} className={changeColor[index] ? "storeMenu active" : "storeMenu"} key={index}>
        <h4>{item.TITLE}</h4>
        <br />
        <div className="starBox">
          {/* 별점 아이콘 SVG 코드 */}
        </div>
        <p className="address">
          [주소]
          <br />
          {item.ADDR1}
        </p>
        <br />
        <p>
          [운영 시간]
          <br />
          {item.USAGE_DAY_WEEK_AND_TIME}
        </p>
        <br />
        <p>
          [메뉴]
          <br />
          {item.TITLE}
        </p>
        <br />
        <div className="iconBox">
          <button className="bottomBtn">예약하기</button>
          <button onClick={toggleFavorite} className="bottomBtn2" style={{ width: "60px" }}>
            찜
          </button>

          <svg className="heart" style={{ width: "50px" }} data-name=" 레이어 1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512">
 
  <g id="_레이어_1-2" data-name=" 레이어 1-2">
    <path  fill={favorite[index] ? "orange" : "black"} d="M498.1,164.6c-11.2-39.4-34.6-68.7-71.5-86.8-35-17.1-70.9-18.1-107.1-4.4-24.6,9.3-44.6,25-60.1,46.4-2.9,4.1-3.4,4.1-6.4,0-4.1-6-8.9-11.2-14.1-16.2-31.3-30.7-69-43.9-112.1-38-51,6.9-86.4,35.7-107.1,82.7-5.1,11.4-7.5,23.6-8.3,36.1v30.8c1.1,5.5.8,11,2,16.4,3.5,17.3,10.3,33.5,19.2,48.7,15.5,26.3,36.9,47.4,59.8,67,28.6,24.6,58.8,47.2,88.8,70.1,22.5,17,45.1,33.7,67.9,50.4,7.1,5.3,7.2,5.3,14.5,0,8.9-6.5,17.8-13,26.6-19.5,34.8-25.8,69.4-51.9,103.3-78.9,23.9-19.1,47.4-38.5,67.2-62,15-17.8,26.6-37.3,34-59.3,3.6-10.8,5.5-21.8,6.4-33.1v-29.6c-1-6.8-1-13.9-2.8-20.6v-.2Z"/>
  </g>
</svg>
  
         
        </div>
      </div>
    );
  });

  
 const filteredMenu = asideMenu.filter((item,index) => favorite[index]);


  return (
    <>
      <div className="aside">
        <div className="topButton">
          <div onClick={() => setShowFavorites(false)} className="allButton">전체</div>
          <div onClick={() => setShowFavorites(true)} className="goodButton">
          <svg
            className="heart2"
            style={{ width: "30px" }}
            data-name="레이어 1"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 512 512"
          >
            <g data-name="레이어 1">
              <path
                fill="orange"
                d="M498.1,164.6c-11.2-39.4-34.6-68.7-71.5-86.8-35-17.1-70.9-18.1-107.1-4.4-24.6,9.3-44.6,25-60.1,46.4-2.9,4.1-3.4,4.1-6.4,0-4.1-6-8.9-11.2-14.1-16.2-31.3-30.7-69-43.9-112.1-38-51,6.9-86.4,35.7-107.1,82.7-5.1,11.4-7.5,23.6-8.3,36.1v30.8c1.1,5.5,.8,11,2,16.4,3.5,17.3,10.3,33.5,19.2,48.7,15.5,26.3,36.9,47.4,59.8,67,28.6,24.6,58.8,47.2,88.8,70.1,22.5,17,45.1,33.7,67.9,50.4,7.1,5.3,7.2,5.3,14.5,0,8.9-6.5,17.8-13,26.6-19.5,34.8-25.8,69.4-51.9,103.3-78.9,23.9-19.1,47.4-38.5,67.2-62,15-17.8,26.6-37.3,34-59.3,3.6-10.8,5.5-21.8,6.4-33.1v-29.6c-1-6.8-1-13.9-2.8-20.6v-.2Z"
              />
            </g>
          </svg>
          </div>
        </div>
        <div className="asideBox">{showFavorites ? filteredMenu : asideMenu}</div>
      </div>
    </>
  );
}