const reviewEle = document.getElementById("reviewCounter");

function displayReviewCounter() {
    let reviewCount = localStorage.getItem("reviewCount") || 0;
    reviewEle.textContent = `In total you have submitted ${reviewCount} reviews.`;
};

// First load
document.addEventListener("DOMContentLoaded", () => {
    displayReviewCounter();
});