// js/thanks.js

document.addEventListener("DOMContentLoaded", function () {
  const donateBtn = document.querySelector(".donate-button");
  const noThanksBtn = document.querySelector(".no-thanks-button");

  if (donateBtn) {
    donateBtn.addEventListener("click", () => {
      window.location.href = "donate.html";
    });
  }

  if (noThanksBtn) {
    noThanksBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }
});
