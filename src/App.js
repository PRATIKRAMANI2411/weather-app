import { useEffect, useState } from "react";
import moment from "moment";
import "./styles.css";

export default function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=5957da6fecf0890a0f5fe7b4e85327fe`
      )
        .then((res) => res.json())
        .then((result) => {
          console.log("result", result);
          setData(result);
        });
    };
    fetchdata();
  }, [lat, long]);
  console.log("data=", data);
  const { name, main, sys, weather } = data;

  return (
    <>
      <div className="App">
        <h1 className="main-name">{name} Weather</h1>
        <div className="flex">
          <p className="day">
            {moment().format("dddd")}, <span>{moment().format("LL")}</span>
          </p>
          <p className="description">{weather[0].main}</p>
        </div>
        <div className="flex">
          <p className="temp">Temprature: {main?.temp}&deg;C</p>
          <p className="temp">Humidity: {main?.humidity}</p>
        </div>
        <div className="flex">
          <p className="sunrise-sunset">
            Sunrise: {new Date(sys?.sunrise * 1000).toLocaleTimeString("en-In")}
          </p>
          <p className="sunrise-sunset">
            Sunset: {new Date(sys?.sunset * 1000).toLocaleTimeString("en-In")}
          </p>
        </div>
      </div>
    </>
  );
}
