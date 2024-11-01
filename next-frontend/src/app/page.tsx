"use client";

import FirstSection from "@/components/ui/firstsection";
import SecondSection from "@/components/ui/secondsection";
import { WeatherForecast } from "@/components/ui/forecastinterface";
import { WeatherData } from "@/components/ui/weatherinterface";
import { useEffect, useState } from "react";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherForecast, setWeatherForecast] =
    useState<WeatherForecast | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("Singapore"); // Default country
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [loadingForecast, setLoadingForecast] = useState(true);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const fetchWeather = async (country: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred");
      }
    } finally {
      setLoadingWeather(false); // Set loading to false after fetching is complete
    }
  };

  const fetchWeatherForecast = async (country: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${country}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather forecast");
      }
      const data = await response.json();
      setWeatherForecast(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred");
      }
    } finally {
      setLoadingForecast(false); // Set loading to false after fetching is complete
    }
  };

  useEffect(() => {
    setLoadingWeather(true);
    setLoadingForecast(true);
    fetchWeather(selectedCountry);
    fetchWeatherForecast(selectedCountry);

    const intervalId = setInterval(() => fetchWeather(selectedCountry), 5000);
    return () => clearInterval(intervalId);
  }, [selectedCountry, apiKey]);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  const isLoading = loadingWeather || loadingForecast;

  return (
    <div className="flex flex-col bg-primary h-screen w-full text-secondary">
      <div className="flex justify-between items-center p-2">
        <div className="font-extrabold text-4xl text-purple-300">
          Weather Dashboard
        </div>
        <div className="text-sm text-white">
          <label className="mr-2">Select Country:</label>
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className="bg-secondary text-primary p-2 rounded-md"
          >
            <option value="Singapore">Singapore</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Thailand">Thailand</option>
            <option value="Vietnam">Vietnam</option>
          </select>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <div className="text-white">Loading...</div>
        </div>
      ) : (
        <>
          <FirstSection weatherData={weatherData} country={selectedCountry} />
          <SecondSection
            weatherForecast={weatherForecast}
            country={selectedCountry}
          />
        </>
      )}
    </div>
  );
}
