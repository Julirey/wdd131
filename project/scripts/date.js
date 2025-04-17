// Copyright Year
const ParagraphElement = document.querySelector("#copyrightYear");
let currentYear = new Date().getFullYear();
ParagraphElement.innerHTML = `©${currentYear}`;

// Last modified
const lastModifiedElement = document.querySelector("#lastModified");
let lastModified = document.lastModified;
lastModifiedElement.innerHTML = `Last Modification: ${lastModified}`;
