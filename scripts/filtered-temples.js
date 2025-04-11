const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },
  {
    "templeName": "Logan Utah",
    "location": "Logan, Utah, United States",
    "dedicated": "1884, May, 17",
    "area": 119619,
    "imageUrl": "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/logan-utah/400x250/logan-temple-768119-wallpaper.jpg"
  },
  {
    "templeName": "Vernal Utah",
    "location": "Vernal, Utah, United States",
    "dedicated": "1997, November, 2",
    "area": 38771,
    "imageUrl": "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/vernal-utah/400x250/vernal-temple-lds-82531-wallpaper.jpg"
  },
  {
    "templeName": "The Hague Netherlands",
    "location": "Zoetermeer, Netherlands",
    "dedicated": "2019, September, 8",
    "area": 10500,
    "imageUrl": "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/the-hague-netherlands/2019/400x250/3-hague-netherlands-temple-1088316.jpg"
  },
  {
    "templeName": "Jordan River Utah",
    "location": "South Jordan, Utah, United States",
    "dedicated": "1981, November, 16",
    "area": 148236,
    "imageUrl": "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/jordan-river-utah/400x250/CWD_f5579d41-7344-4498-a589-4017ba5fcc91.jpg"
  },
  {
    "templeName": "Barranquilla Colombia",
    "location": "Barranquilla, Colombia",
    "dedicated": "2018, December, 9",
    "area": 25300,
    "imageUrl": "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/barranquilla-colombia/400x250/2-Barranquilla-Columblia-Temple-2135201.jpg"
  }
];

const templesGrid = document.querySelector("#temples");

function displayTemples(temples) {
  templesGrid.innerHTML = "";

  temples.forEach((temple) => {
    const figure = document.createElement("figure");
    figure.classList.add("temple-card");
    figure.innerHTML = `
      <figcaption>  
        <h3>${temple.templeName}</h3>
        <p><span class="highlight">Location:</span> ${temple.location}</p>
        <p><span class="highlight">Dedicated:</span> ${temple.dedicated}</p>
        <p><span class="highlight">Size:</span> ${temple.area} sq ft</p>
      </figcaption>
      <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
    `;
    templesGrid.appendChild(figure);
  });
}

function filterTemples(category) {
  let filteredArray;

  switch (category) {
    case "old":
      filteredArray = temples.filter(temple => parseInt(temple.dedicated.split(",")[0]) < 1900);
      break;
    case "new":
      filteredArray = temples.filter(temple => parseInt(temple.dedicated.split(",")[0]) > 2000);
      break;
    case "large":
      filteredArray = temples.filter(temple => temple.area > 90000);
      break;
    case "small":
      filteredArray = temples.filter(temple => temple.area < 10000);
      break;
    default:
      filteredArray = temples;
  }

  displayTemples(filteredArray);
}
  
// Event Listener
document.querySelectorAll(".navigation a").forEach((button) => {
  button.addEventListener("click", () => {
    // Ensure only the latest option is highlighted
    document.querySelectorAll(".navigation a").forEach((button) => {
      button.classList.remove("active");
    });
    button.classList.add("active");

    // Filter temples by button text
    filterTemples(button.textContent.toLowerCase());
  });
});

// First load
document.addEventListener("DOMContentLoaded", () => {
  displayTemples(temples);
});