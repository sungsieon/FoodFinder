import { useState, useEffect } from "react";

export default function Asidebar({ data, mapData }) {
  const [changeColor, setChangeColor] = useState({});
  const [favorite, setFavorite] = useState({});
  const [showFavorites, setShowFavorites] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [reservationClose, setReservationClose] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);
  const [selectDays, setSelectDays] = useState([]);
  const [selectDates, setSelectDates] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [orangeChange, setOrangeChange] = useState(false);
  const [dateOrangeChange, setDateOrangeChange] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  function getReservations() {
    const reservation = localStorage.getItem("reservations");
    return reservation ? JSON.parse(reservation) : {};
  }

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setDateOrangeChange(false);
  };

  const handleTimeClick = (e) => {
    const target = e.target.innerText;
    if (target) {
      setSelectedTime(target);
      setOrangeChange(false);
    }
  };

  function addReservation(data) {
    const reservations = getReservations();

    if (!selectedStore || !selectedDate || !selectedTime) {
      alert("날짜, 시간 모두 선택해야 예약이 가능합니다.");
      return;
    }

    if (!reservations[selectedStore.TITLE]) {
      reservations[selectedStore.TITLE] = [];
    }

    const duplicateReservation = reservations[selectedStore.TITLE].some(
      (reservation) =>
        reservation.date === selectedDate && reservation.time === selectedTime
    );
    if (duplicateReservation) {
      alert("이미 예약이 있습니다.");
    } else {
      setConfirmClose(true);
    }

    reservations[selectedStore.TITLE].push({
      date: selectedDate,
      time: selectedTime,
    });
    setOrangeChange(true);
    setDateOrangeChange(true);

    saveReservation(reservations);
    function saveReservation() {
      localStorage.setItem("reservations", JSON.stringify(reservations));
    }
  }

  const calendar = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const rows = [];
    let dayCounter = 1;
    let currentRow = [];
    for (let i = 0; i < firstDay; i++) {
      currentRow.push(<td key={`empty-${i}`} />);
    }

    while (dayCounter <= totalDays && currentRow.length < 7) {
      const currentDay = dayCounter;
      currentRow.push(
        <td
          key={`day-${dayCounter}`}
          className={
            selectedDate === currentDay && dateOrangeChange === false
              ? "orange"
              : ""
          }
          onClick={() => handleDateClick(currentDay)}
        >
          {currentDay}
        </td>
      );
      dayCounter++;
    }

    rows.push(<tr key={`row-${rows.length}`}>{currentRow}</tr>);
    currentRow = [];

    while (dayCounter <= totalDays) {
      for (let i = 0; i < 7 && dayCounter <= totalDays; i++) {
        const currentDay = dayCounter;
        currentRow.push(
          <td
            key={`day-${dayCounter}`}
            className={
              selectedDate === currentDay && dateOrangeChange === false
                ? "orange"
                : ""
            }
            onClick={() => handleDateClick(currentDay)}
          >
            {currentDay}
          </td>
        );
        dayCounter++;
      }

      rows.push(<tr key={`row-${rows.length}`}>{currentRow}</tr>);
      currentRow = [];
    }

    if (currentRow.length > 0 && currentRow.length < 7) {
      while (currentRow.length < 7) {
        currentRow.push(
          <td
            className={
              selectedDate === dayCounter && dateOrangeChange === false
                ? "orange"
                : ""
            }
            onClick={() => handleDateClick(dayCounter)}
            key={`empty-${currentRow.length}`}
          />
        );
      }
      rows.push(<tr key={`row-${rows.length}`}>{currentRow}</tr>);
    }

    return rows;
  };

  const asideMenu = data.map((item, index) => {
    const toggleColor = () => {
      setChangeColor({ ...changeColor, [index]: !changeColor[index] });
    };

    const toggleFavorite = () => {
      setFavorite({ ...favorite, [index]: !favorite[index] });
    };

    const reservation = (mapData, item) => {
      setSelectedStore(item);
      setReservationClose(true);
      if (mapData.map && mapData.markers) {
        const markerIndex = data.findIndex((el) => el.TITLE === item.TITLE);
        const marker = mapData.markers[markerIndex];

        if (marker) {
          const markerPosition = marker.getPosition();
          mapData.map.panTo(markerPosition);
        }
      }
    };

    return (
      <div
        onClick={toggleColor}
        className={changeColor[index] ? "storeMenu active" : "storeMenu"}
        key={index}
      >
        <h4>{item.TITLE}</h4>
        <br />
        <div className="starBox"></div>
        <p className="address">
          [주소]
          <br />
          <span className="Arial"> {item.ADDR1}</span>
        </p>
        <br />
        <p>
          [운영 시간]
          <br />
          <span className="Arial">{item.USAGE_DAY_WEEK_AND_TIME}</span>
        </p>
        <br />
        <p>
          [메뉴]
          <br />
          <span className="Arial">{item.TITLE}</span>
        </p>
        <br />
        <div className="iconBox">
          <button
            onClick={() => reservation(mapData, item)}
            className="bottomBtn"
          >
            예약하기
          </button>
          <button
            onClick={toggleFavorite}
            className="bottomBtn2"
            style={{ width: "60px" }}
          >
            찜
          </button>

          <svg
            className="heart"
            style={{ width: "50px" }}
            data-name=" 레이어 1"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 512 512"
          >
            <g id="_레이어_1-2" data-name=" 레이어 1-2">
              <path
                fill={favorite[index] ? "orange" : "black"}
                d="M498.1,164.6c-11.2-39.4-34.6-68.7-71.5-86.8-35-17.1-70.9-18.1-107.1-4.4-24.6,9.3-44.6,25-60.1,46.4-2.9,4.1-3.4,4.1-6.4,0-4.1-6-8.9-11.2-14.1-16.2-31.3-30.7-69-43.9-112.1-38-51,6.9-86.4,35.7-107.1,82.7-5.1,11.4-7.5,23.6-8.3,36.1v30.8c1.1,5.5.8,11,2,16.4,3.5,17.3,10.3,33.5,19.2,48.7,15.5,26.3,36.9,47.4,59.8,67,28.6,24.6,58.8,47.2,88.8,70.1,22.5,17,45.1,33.7,67.9,50.4,7.1,5.3,7.2,5.3,14.5,0,8.9-6.5,17.8-13,26.6-19.5,34.8-25.8,69.4-51.9,103.3-78.9,23.9-19.1,47.4-38.5,67.2-62,15-17.8,26.6-37.3,34-59.3,3.6-10.8,5.5-21.8,6.4-33.1v-29.6c-1-6.8-1-13.9-2.8-20.6v-.2Z"
              />
            </g>
          </svg>
        </div>
      </div>
    );
  });

  const filteredMenu = asideMenu.filter((item, index) => favorite[index]);

  function reservationCloseBtn() {
    setReservationClose(false);
  }

  return (
    <>
      <div className="aside">
        <div className="topButton">
          <div onClick={() => setShowFavorites(false)} className="allButton">
            전체
          </div>
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
        <div className="asideBox">
          {showFavorites ? filteredMenu : asideMenu}
        </div>
      </div>
      <div className={reservationClose ? "reservation" : "hidden"}>
        <div className="dayTitle">
          <div className="monthTop">
            <h3 className="month">2024.11</h3>
            <span onClick={reservationCloseBtn}>X</span>
          </div>
          <table className="calendar1">
            <thead>
              <tr>
                <th>일</th>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th>토</th>
              </tr>
            </thead>
            <tbody className="tbody">{calendar()}</tbody>
          </table>
        </div>
        <div className="reservationTime">
          <div className="timeTitle">오전</div>
          <div className="timeBoxs">
            <div
              onClick={handleTimeClick}
              className={
                selectedTime === "11:00" && orangeChange === false
                  ? " orangeTimeBox"
                  : "timeBox"
              }
            >
              <span>11:00</span>
            </div>
            <div
              onClick={handleTimeClick}
              className={
                selectedTime === "11:30" && orangeChange === false
                  ? " orangeTimeBox"
                  : "timeBox"
              }
            >
              <span>11:30</span>
            </div>
          </div>
          <div className="timeTitle">오후</div>
          <div className="timeBoxs">
            <div
              onClick={handleTimeClick}
              className={
                selectedTime === "12:00" && orangeChange === false
                  ? " orangeTimeBox"
                  : "timeBox"
              }
            >
              <span>12:00</span>
            </div>
            <div
              onClick={handleTimeClick}
              className={
                selectedTime === "12:30" && orangeChange === false
                  ? " orangeTimeBox"
                  : "timeBox"
              }
            >
              <span>12:30</span>
            </div>
            <div
              onClick={handleTimeClick}
              className={
                selectedTime === "1:00" && orangeChange === false
                  ? " orangeTimeBox"
                  : "timeBox"
              }
            >
              <span>1:00</span>
            </div>
            <div
              onClick={handleTimeClick}
              className={
                selectedTime === "1:30" && orangeChange === false
                  ? " orangeTimeBox"
                  : "timeBox"
              }
            >
              <span>1:30</span>
            </div>
            <div
              onClick={handleTimeClick}
              className={
                selectedTime === "2:00" && orangeChange === false
                  ? " orangeTimeBox"
                  : "timeBox"
              }
            >
              <span>2:00</span>
            </div>
            <div
              onClick={handleTimeClick}
              className={
                selectedTime === "2:30" && orangeChange === false
                  ? " orangeTimeBox"
                  : "timeBox"
              }
            >
              <span>2:30</span>
            </div>
            <div
              onClick={handleTimeClick}
              className={
                selectedTime === "3:00" && orangeChange === false
                  ? " orangeTimeBox"
                  : "timeBox"
              }
            >
              <span>3:00</span>
            </div>
            <div
              onClick={handleTimeClick}
              className={
                selectedTime === "3:30" && orangeChange === false
                  ? " orangeTimeBox"
                  : "timeBox"
              }
            >
              <span>3:30</span>
            </div>
            <div
              onClick={handleTimeClick}
              className={
                selectedTime === "4:00" && orangeChange === false
                  ? " orangeTimeBox"
                  : "timeBox"
              }
            >
              <span>4:00</span>
            </div>
          </div>
        </div>
        <div onClick={addReservation} className="reservationBtn">
          예약
        </div>
      </div>
      <div className={confirmClose ? "reservationConfirm" : "hidden"}>
        <div className="confirmTop">
          <div className="checkImg">
            <h3 className="ChImg">
              <svg
                className="foodIcon2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M0 192c0-35.3 28.7-64 64-64c.5 0 1.1 0 1.6 0C73 91.5 105.3 64 144 64c15 0 29 4.1 40.9 11.2C198.2 49.6 225.1 32 256 32s57.8 17.6 71.1 43.2C339 68.1 353 64 368 64c38.7 0 71 27.5 78.4 64c.5 0 1.1 0 1.6 0c35.3 0 64 28.7 64 64c0 11.7-3.1 22.6-8.6 32H8.6C3.1 214.6 0 203.7 0 192zm0 91.4C0 268.3 12.3 256 27.4 256H484.6c15.1 0 27.4 12.3 27.4 27.4c0 70.5-44.4 130.7-106.7 154.1L403.5 452c-2 16-15.6 28-31.8 28H140.2c-16.1 0-29.8-12-31.8-28l-1.8-14.4C44.4 414.1 0 353.9 0 283.4z" />
              </svg>
              MyFood
            </h3>
          </div>
          <span
            onClick={() => setConfirmClose(!confirmClose)}
            className="confirmClose"
          >
            X
          </span>
        </div>
        <div className="check">11월 {selectedDate}일로 예약되셨습니다.</div>
      </div>
    </>
  );
}
