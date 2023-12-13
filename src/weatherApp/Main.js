import React, { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { Search } from "./Search";
import Loader from "./Loader";
import MessageError from "./MessageError";
import LeafletMap from "./LeafletMap";
import { HoldUpWeathers } from "./HoldUpWeathers";
import { MainBody } from "./MainBody";
import { ShowWeather } from "./ShowWeather";
const BASE_USL = "https://api.openweathermap.org/data/2.5";

const API_KEY = "5e4971375e6ec66b3c2ab9b6d5dbd6b7";

const Main = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [temp, setTemp] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [Cord, setCord] = useState({ lat: 35.715298, lng: 51.404343 });
  const convertTemperature = (Temperature) => {
    if (isCelsius) {
      return Temperature;
    } else {
      return (Temperature * 9) / 5 + 32;
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        setTemp(null);
        setError("");
        setQuery("");
        const response = await fetch(
          `${BASE_USL}/weather?lat=${Cord?.lat}&lon=${Cord?.lng}&appid=${API_KEY}`,
          { signal }
        );
        if (!response.ok) {
          throw new Error("Error: Unable to fetch the city");
        }
        const data = await response.json();
        data?.name ? setData(data) : setError("there in no any name");

        setTemp(Math.round(data?.main?.temp));
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      }
      setIsLoading(false);
    };

    fetchData();
    return () => {
      abortController.abort(); // Cancel the request on cleanup
    };
  }, [Cord]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        setTemp(null);
        setError("");
        const response = await fetch(
          `${BASE_USL}/weather?q=${query}&appid=${API_KEY}&utits=metric`,
          { signal }
        ); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Error: Unable to fetch the city");
        }
        const data = await response.json();
        setData(data);
        setTemp(Math.round(data?.main?.temp));
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      }
      setIsLoading(false);
    };

    if (query.length < 3) {
      setData([]);
      setError("");
      setTemp(null);
      return;
    }

    fetchData();

    return () => {
      abortController.abort(); // Cancel the request on cleanup
    };
  }, [query]);

  return (
    <div style={{ marginBottom: 200 }}>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
      </NavBar>

      <MainBody>
        <HoldUpWeathers>
          {isLoading && <Loader />}
          {error && <MessageError message={error} />}
          {!isLoading && !error && (
            <ShowWeather
              temp={temp}
              data={data}
              convertTemperature={convertTemperature}
              isCelsius={isCelsius}
              error={error}
              setIsCelsius={setIsCelsius}
              isLoading={isLoading}
            />
          )}
        </HoldUpWeathers>
        <HoldUpWeathers>
          <LeafletMap setCord={setCord} />
        </HoldUpWeathers>
      </MainBody>
    </div>
  );
};

export default Main;
