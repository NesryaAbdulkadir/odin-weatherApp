async function getData(location) {
  apiKey = "V6J6JYJ68MCJSWZQWPSAAVQCA";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/?location=${location}&key=${apiKey}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
    });
    if (!response.ok) {
      throw new Error("HTTP error");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function displayData(location) {
  const data = await getData(location);
  if (data) {
    const temperature = data.days[0].temp;
    const humidity = data.days[0].hours[0].humidity;
    const wind = data.days[0].hours[0].windspeed;
    const start = location[0].toUpperCase();
    const rest = location.slice(1);
    location = start + rest;

    document.getElementById("temperature").innerText = `${temperature}°C`;
    document.getElementById("humidity").innerText = `${humidity}%`;
    document.getElementById("wind").innerText = `${wind} km/h`;
    document.getElementById("location").innerText = location;
  }
}
function search() {
  const form = document.getElementById("search");
  const input = document.querySelector("input");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let location = localStorage.getItem("location") || {};
    location = input.value;
    localStorage.setItem("location", location);
    await getData(location);
    displayData(location);
    input.value = "";
  });
}
window.addEventListener("load", () => {
  const location = localStorage.getItem("location") || {};
  displayData(location);
});
search();
