async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "13d618c867dd48aca30172200251805";
  const weatherDiv = document.getElementById("weather");
  const errorDiv = document.getElementById("error");

  if (!city) {
    errorDiv.textContent = "Please enter a city name.";
    weatherDiv.style.display = "none";
    return;
  }

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    document.getElementById("location").textContent = `${data.location.name}, ${data.location.country}`;
    document.getElementById("icon").src = `https:${data.current.condition.icon}`;
    document.getElementById("temp").textContent = `Temperature: ${data.current.temp_c}°C`;
    document.getElementById("condition").textContent = `Condition: ${data.current.condition.text}`;
    document.getElementById("humidity").textContent = `Humidity: ${data.current.humidity}%`;
    document.getElementById("wind").textContent = `Wind: ${data.current.wind_kph} kph`;

    weatherDiv.style.display = "block";
    errorDiv.textContent = "";
  } catch (error) {
    weatherDiv.style.display = "none";
    errorDiv.textContent = "Unable to fetch weather. Please check the city name.";
  }
}
