// Windchill

const tempEle = document.querySelector("#temperature").textContent;
const wSpeedEle = document.querySelector("#windspeed").textContent;
const wChillEle = document.querySelector("#windchill");

let temp = tempEle.split(" ");
let wSpeed = wSpeedEle.split(" ");

temp = temp[0];
wSpeed = wSpeed[0];


const calculateWindChill = (temperature, windSpeed) => 
  13.12 +
  0.6215 * temperature -
  11.37 * windSpeed ** 0.16 +
  0.3965 * temperature * windSpeed ** 0.16;

if (temp <= 10 && wSpeed > 4.8) {
  let wChill = calculateWindChill(temp, wSpeed);
  wChillEle.innerHTML = `${wChill.toFixed(2)} &deg;C` ;
} else {
  wChillEle.textContent = "N/a";
}
