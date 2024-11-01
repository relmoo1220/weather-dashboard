// Define the structure of the weather data for the 5-day/3-hour forecast
export interface WeatherForecast {
  cod: string; // Response code
  message: number; // Message
  cnt: number; // Number of forecasted data points
  list: ForecastItem[]; // Array of forecast items
  city: City; // City information
}

// Define the structure of each forecast item
export interface ForecastItem {
  dt: number; // Date and time of the forecast (Unix timestamp)
  main: MainWeather; // Main weather data
  weather: WeatherDescription[]; // Array of weather descriptions
  clouds: Clouds; // Cloudiness data
  wind: Wind; // Wind data
  visibility: number; // Visibility
  pop: number; // Probability of precipitation
  rain?: Rain; // Rain data (if applicable)
  snow?: Snow; // Snow data (if applicable)
  sys: Sys; // System data
  dt_txt: string; // Date and time of the forecast in ISO format
}

// Define the structure of the main weather data
export interface MainWeather {
  temp: number; // Temperature
  feels_like: number; // Feels like temperature
  temp_min: number; // Minimum temperature
  temp_max: number; // Maximum temperature
  pressure: number; // Atmospheric pressure
  sea_level?: number; // Sea level pressure (if available)
  grnd_level?: number; // Ground level pressure (if available)
  humidity: number; // Humidity percentage
}

// Define the structure of the weather description
export interface WeatherDescription {
  id: number; // Weather condition ID
  main: string; // Group of weather parameters (Rain, Snow, etc.)
  description: string; // Weather condition description
  icon: string; // Weather icon ID
}

// Define the structure of the clouds data
export interface Clouds {
  all: number; // Cloudiness percentage
}

// Define the structure of the wind data
export interface Wind {
  speed: number; // Wind speed
  deg: number; // Wind direction
  gust?: number; // Wind gust (if available)
}

// Define the structure of the rain data (if applicable)
export interface Rain {
  "1h"?: number; // Rain volume for the last hour (if available)
  "3h"?: number; // Rain volume for the last 3 hours (if available)
}

// Define the structure of the snow data (if applicable)
export interface Snow {
  "1h"?: number; // Snow volume for the last hour (if available)
  "3h"?: number; // Snow volume for the last 3 hours (if available)
}

// Define the structure of the city data
export interface City {
  id: number; // City ID
  name: string; // City name
  coord: Coordinates; // City coordinates
  country: string; // Country code
  population: number; // City population
  timezone: number; // Timezone offset in seconds
  sunrise: number; // Sunrise time (Unix timestamp)
  sunset: number; // Sunset time (Unix timestamp)
}

// Define the structure of the coordinates
export interface Coordinates {
  lat: number; // Latitude
  lon: number; // Longitude
}

// Define the structure of the system data
export interface Sys {
  type: number; // System type
  id: number; // System ID
  message: number; // Message
  country: string; // Country code
  sunrise: number; // Sunrise time (Unix timestamp)
  sunset: number; // Sunset time (Unix timestamp)
}
