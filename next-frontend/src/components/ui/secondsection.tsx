"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { WeatherForecast } from "./forecastinterface";

const chartConfig = {
  temp: {
    label: "Temp",
    color: "hsl(var(--chart-1))",
  },
  feels_like: {
    label: "Feels Like",
    color: "hsl(var(--chart-2))",
  },
  temp_min: {
    label: "Min Temp",
    color: "hsl(var(--chart-3))",
  },
  temp_max: {
    label: "Max Temp",
    color: "hsl(var(--chart-5))",
  },
  humidity: {
    label: "Humidity",
    color: "hsl(var(--chart-4))",
  },
  wind_speed: {
    label: "Speed",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

interface SecondSectionProps {
  weatherForecast: WeatherForecast | null;
  country: string | null;
}

export default function SecondSection({
  weatherForecast,
  country,
}: SecondSectionProps) {
  const [chartData, setChartData] = useState<
    {
      date: string;
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
      wind_speed: number;
    }[]
  >([]);

  useEffect(() => {
    if (!weatherForecast || !country) {
      return; // Exit early from the effect, not the component
    }

    const transformedData = weatherForecast.list.map((item) => ({
      date: item.dt_txt,
      temp: item.main.temp,
      feels_like: item.main.feels_like,
      temp_min: item.main.temp_min,
      temp_max: item.main.temp_max,
      humidity: item.main.humidity,
      wind_speed: item.wind.speed,
    }));

    setChartData(transformedData);
  }, [weatherForecast, country]);

  return (
    <div className="flex p-2 w-full h-[550px] justify-center space-x-4">
      <Card className="bg-purple-300 text-purple-900 font-bold min-w-[600px] h-full border-purple-900 border-4">
        <CardHeader>
          <CardTitle>Temperature Forecast of {country}</CardTitle>
          <CardDescription>
            5-day forecast of temperature and feels-like
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-mobile)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-mobile)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })} ${date.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`;
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="feels_like"
                type="natural"
                fill="url(#fillDesktop)"
                fillOpacity={0.4}
                stroke={chartConfig.feels_like.color}
                stackId="a"
              />
              <Area
                dataKey="temp"
                type="natural"
                fill="url(#fillMobile)"
                fillOpacity={0.4}
                stroke={chartConfig.temp.color}
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                Next 5 Days Forecast
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
      <Card className="bg-purple-300 text-purple-900 font-bold min-w-[600px] h-full border-purple-900 border-4">
        <CardHeader>
          <CardTitle>Min/Max Temperature Forecast of {country}</CardTitle>
          <CardDescription>
            5-day forecast of minimum and maximum temperature
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })} ${date.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`;
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar
                dataKey="temp_min"
                fill={chartConfig.temp_min.color}
                radius={4}
              />
              <Bar
                dataKey="temp_max"
                fill={chartConfig.temp_max.color}
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Next 5 Days Forecast
          </div>
        </CardFooter>
      </Card>
      <div className="flex flex-col h-full space-y-2">
        <Card className="text-sm bg-purple-300 text-purple-900 border-purple-900 border-4 overflow-hidden font-bold h-1/2">
          <CardHeader>
            <CardTitle>Humidity Forecast of {country}</CardTitle>
            <CardDescription>5-day forecast of humidity levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })} ${date.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`;
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  dataKey="humidity"
                  type="step"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke={chartConfig.humidity.color}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="text-sm bg-purple-300 text-purple-900 border-purple-900 border-4 overflow-hidden font-bold h-1/2">
          <CardHeader>
            <CardTitle>Wind Speed Forecast of {country}</CardTitle>
            <CardDescription>5-day forecast of wind speeds</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })} ${date.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`;
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  dataKey="wind_speed"
                  type="step"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke={chartConfig.wind_speed.color}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
