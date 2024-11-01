![fe66a02d2c5690dc845fb1667bd5f368](https://github.com/user-attachments/assets/e71ce315-623e-40b9-ac31-bdf53f8d7a67)
# Weather Dashboard

This Weather Dashboard is a responsive web application built with Next.js and shadcn that provides real-time weather data and a 5-day weather forecast. Leveraging the OpenWeather API, users can select their desired country to retrieve the current weather conditions and detailed forecasts.

### Key Features

- Current Weather Data: Displays the current weather conditions, including temperature, humidity, and general weather descriptions.
- 5-Day Forecast: Offers a comprehensive 5-day weather forecast with hourly updates to help users plan their activities.
- Interactive Visualizations: Utilizes Recharts for engaging and informative weather data visualizations, enhancing user experience and understanding of weather trends.

### Technologies Used

- Next.js: A powerful React framework for server-rendered applications.
- Tailwind CSS: A utility-first CSS framework for designing responsive and modern user interfaces.
- shadcn: A UI component library providing reusable and customizable components.
- Recharts: A composable charting library for building responsive charts.
- OpenWeather API: A reliable source for accessing current weather data and forecasts.

### Installation

After cloning this repository, below are the steps to run this web application.

- Change Directory

```
cd .\next-frontend\
```

- Install Dependencies

```
npm install
```

- Create a .env file based on the .env.example (you would need to create an account on OpenWeather to get your API Key)

```
NEXT_PUBLIC_API_KEY=your_api_key_here
```

- Run the web application

```
npm run dev
```

### Learning

This project deepened my understanding of Next.js, focusing on data fetching techniques and API integration. I learned how to utilize the OpenWeather API for real-time weather data and enhance the UI using shadcn and Recharts. Overall, this experience has strengthened my skills in building dynamic web applications.
