import React from "react";
import TemperatureToggle from "./TemperatureToggle ";

export const ShowWeather = ({
  data,
  temp,
  convertTemperature,
  isCelsius,
  error,
  setIsCelsius,
  isLoading,
}) => {
  return (
    <div className="holdUp-theWeaher">
      <h1>
        {data?.name} {data?.sys?.country}
      </h1>
      <div className="holdUp-theWeaher">
        {data?.name && (
          <>
            <img
              alt="weather icon"
              src={`https://openweathermap.org/img/w/${data?.weather[0]?.icon}.png`}
            />
            <span className="weather-detail">{data?.weather[0]?.main}</span>
            <p className="weather-detail">
              Current Temperature: {convertTemperature(temp)}{" "}
              {isCelsius ? "°C" : "°F"}
            </p>
            <p className="weather-detail">
              humidity: <span>{data?.main?.humidity} %</span>
            </p>
            <p className="weather-detail">
              humidity: <span>{data?.wind?.speed} m/s</span>
            </p>
            <TemperatureToggle
              isCelsius={isCelsius}
              setIsCelsius={setIsCelsius}
              data={data}
              error={error}
              isLoading={isLoading}
            />
          </>
        )}
      </div>
    </div>
  );
};
