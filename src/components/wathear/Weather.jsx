import React, { useEffect, useState } from "react";

export default function Weather() {
  const [temperature, setTemperature] = useState("--");
  const [windspeed, setWindspeed] = useState("--");
  const [humidity, setHumidity] = useState("--");
  const [desc, setDesc] = useState("Loading...");

  const lat = 24.134;
  const lon = 89.264;

  useEffect(() => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m&timezone=auto`)
      .then(res => res.json())
      .then(data => {
        const current = data.current_weather;
        setTemperature(current.temperature);
        setWindspeed(current.windspeed);

        // description
        let description = "পরিষ্কার আকাশ";
        if (current.weathercode > 2) description = "মেঘলা";
        if (current.weathercode > 50) description = "বৃষ্টি";
        setDesc(description);

        // humidity - আজকের average
        const today = new Date().toISOString().split("T")[0];
        const hourlyHumidity = data.hourly.time
          .map((t, i) => data.hourly.relativehumidity_2m[i])
          .filter((_, i) => data.hourly.time[i].startsWith(today));

        if (hourlyHumidity.length > 0) {
          const avg = Math.round(hourlyHumidity.reduce((a, b) => a + b, 0) / hourlyHumidity.length);
          setHumidity(avg);
        }
      })
      .catch(err => console.error("API Error:", err));
  }, []);

  return (
    <div className="wx">
      <p>আতাইকুলা, পাবনা</p>
      <b>{temperature}°C</b>
      <p>{desc}</p>
      <div>
        <span>💨 বাতাস: {windspeed} km/h</span>
        <span>💧 আর্দ্রতা: {humidity} %</span>
      </div>
    </div>
  );
}
