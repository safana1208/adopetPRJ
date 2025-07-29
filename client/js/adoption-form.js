document.getElementById("adoption-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const clientName = localStorage.getItem("clientName") || "Guest";
  const petId = new URLSearchParams(window.location.search).get("id");

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  const requestData = {
    applicantName: clientName,
    petId: petId,
    date: new Date().toISOString(),
    reason: data.reason,
    travelPlan: data.travelPlan,
    experience: data.experience,
    hasPets: data.hasPets,
    otherPets: data.otherPets || "",
    homeType: data.homeType,
    age: parseInt(data.age) // ⚠️ לוודא שזה מספר
  };

  console.log("📤 Sending request data:", requestData);

  try {
    const res = await fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData)
    });

    const result = await res.json();

    if (res.ok) {
      alert("Request submitted successfully!");
      window.location.href = "thanks.html";
    } else {
      alert(result.message || "Error submitting request.");
      console.error(result);
    }
  } catch (err) {
    console.error("Fetch error:", err);
    alert("Server error while submitting request.");
  }
});
