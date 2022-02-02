//Selecting Elements
const form = document.querySelector("form");
const userInput = document.getElementById("input-value");
const ipAddress = document.getElementById("ip-address");
const ipLocation = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");

//Map Functionality
let map = L.map("map");
let lat;
let lng;

const displayMap = (lat, lng) => {
  let markerIcon = L.icon({
    iconUrl: "images/icon-location.svg",

    iconSize: [46, 56], // size of the icon
    iconAnchor: [23, -30], // point of the icon which will correspond to marker's location
  });
  map.setView([lat, lng], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: false,
  }).addTo(map);

  L.marker([lat, lng], { icon: markerIcon }).addTo(map);
};

//Display IP Data to DOM
const displayIpData = (data) => {
  ipAddress.innerText = data.ip;
  ipLocation.innerText = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
  timezone.innerText = `UTC ${data.location.timezone}`;
  isp.innerText = data.isp;
};
//Fetching data from API
const getIpData = (ip = "") => {
  const url = `https://geo.ipify.org/api/v1?apiKey=at_LyjWnbdhmuat3NOsUAk3VL3knaUcz&ipAddress=${ip}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      lat = data.location.lat;
      lng = data.location.lng;
      displayIpData(data);
      displayMap(lat, lng);
    });
};
getIpData();

// Show Data From User Input
form.addEventListener("submit", (e) => {
  e.preventDefault();
  getIpData(userInput.value);
  userInput.value = "";
});
