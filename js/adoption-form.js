document.getElementById("adoption-form").addEventListener("submit", function (e) {
  e.preventDefault();

  //  בעתיד לשלוח לשרת
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());
  console.log("Adoption form submitted:", data);

  // מעבר למסך הבא
  window.location.href = "thanks.html";
});
