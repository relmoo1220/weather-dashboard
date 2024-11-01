"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Thermometer, Cloud } from "lucide-react";
import { WeatherData } from "./weatherinterface";
import { useState, useEffect } from "react";

interface FirstSectionProps {
  weatherData: WeatherData | null;
}

export default function FirstSection({ weatherData }: FirstSectionProps) {
  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!weatherData || !currentDateTime) {
    return;
  }

  return (
    <div className="w-full">
      <div className="flex p-2 max-h-[300px] w-full justify-center">
        <div className="flex space-x-4">
          <Card className="flex flex-col h-full p-4 w-[400px] text-center space-y-6 justify-center items-center bg-purple-300 border-purple-900 border-4">
            <div className="flex text-base p-4 rounded-3xl bg-purple-900 font-bold text-secondary">
              <MapPin className="h-6 w-6 mr-1" />
              Singapore
            </div>
            <div className="text-3xl font-extrabold">
              {currentDateTime.toLocaleTimeString()}
            </div>
            <div className="text-lg font-bold text-purple-900">
              {currentDateTime.toLocaleDateString()}
            </div>
          </Card>
          <Card className="p-4 w-[400px] bg-purple-300 border-purple-900 border-4">
            <CardHeader>
              <CardTitle className="flex text-2xl font-extrabold items-center">
                <div className="text-purple-900">Today's Weather</div>
                <Cloud className="h-8 w-8 text-purple-900 ml-2" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg">
                Condition: {weatherData.weather[0].main}
              </div>
              <div className="text-lg">
                Description: {weatherData.weather[0].description}
              </div>
              <div>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt="Weather icon"
                />
              </div>
            </CardContent>
          </Card>
          <Card className="p-4 w-[400px] bg-purple-300 border-purple-900 border-4">
            <CardHeader>
              <CardTitle className="flex text-2xl font-extrabold items-center">
                <div className="text-purple-900">Today's Temperature</div>
                <Thermometer className="h-8 w-8 text-purple-900 ml-2" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-3">
                <div>Temperature: {weatherData.main.temp} °C</div>
                <div>Temperature Minimum: {weatherData.main.temp_min} °C</div>
                <div>Temperature Maximum: {weatherData.main.temp_max} °C</div>
                <div>Feels Like: {weatherData.main.feels_like} °C</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
