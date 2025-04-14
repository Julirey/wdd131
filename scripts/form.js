const productSelect = document.getElementById("product");
const formElement = document.querySelector(".form1");

const products = [
  {
    id: "fc-1888",
    name: "Flux capacitor",
    averagerating: 4.5,
  },
  {
    id: "fc-2050",
    name: "Power laces",
    averagerating: 4.7,
  },
  {
    id: "fs-1987",
    name: "Time circuits",
    averagerating: 3.5,
  },
  {
    id: "ac-2000",
    name: "Low voltage reactor",
    averagerating: 3.9,
  },
  {
    id: "jj-1969",
    name: "Warp equalizer",
    averagerating: 5.0,
  },
];

// Display products in dropdown menu
function displayProducts() {
  products.forEach((product) => {
    let option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    productSelect.appendChild(option);
  });
}

// Increment Counter on Form Submission
formElement.addEventListener("submit", function () {
  let reviewCount = localStorage.getItem("reviewCount") || 0;
  reviewCount++;
  localStorage.setItem("reviewCount", reviewCount);
});

// First load
document.addEventListener("DOMContentLoaded", () => {
  displayProducts();
});
