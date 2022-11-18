// Guardamos la apiKey

const key = "ec7b2b7a7d48f2c3dba577c98929e34d";

/*
Relizar el llamado a la api
Recibir una ciudad como parametro
Retornara la data de dicha ciudad si la encuentra

*/
const requestCity = async (city) => {
  const baseURL = "https://api.openweathermap.org/data/2.5/weather";
  const query = `?q=${city}&appid=${key}`;

  const response = await fetch(baseURL + query);
  const data = await response.json();
  console.log(data);
  return data;
};
