"use client";

import FirstSection from "@/components/ui/firstsection";
import SecondSection from "@/components/ui/secondsection";
import { WeatherData } from "@/components/ui/weatherinterface";
import { useEffect, useState } from "react";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  
  useEffect(() => {
    // Fetch weather data
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Singapore&appid=${API_KEY}&units=metric`
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
      }

      console.log("call")
    };

    fetchWeather();

    const intervalId = setInterval(fetchWeather, 10000);
    return () => clearInterval(intervalId);
  }, [API_KEY]);
  return (
    <div className="flex flex-col bg-primary h-screen w-screen text-secondary">
      <div className="font-extrabold text-4xl text-center p-4 text-purple-300">
        Singapore Weather Dashboard
      </div>
      <FirstSection weatherData={weatherData}></FirstSection>
      <SecondSection weatherData={weatherData}></SecondSection>
    </div>
  );
}
