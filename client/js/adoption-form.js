const BASE_URL = "https://adopet-server.onrender.com"; // 🟢 הוספנו את כתובת השרת

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
    age: parseInt(data.age)
  };

  console.log("📤 Sending request data:", requestData);

  try {
    const res = await fetch(`${BASE_URL}/api/requests`, {
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

window.addEventListener("DOMContentLoaded", async () => {
  const requestId = new URLSearchParams(window.location.search).get("requestId");
  if (!requestId) return;

  document.querySelector("button[type='submit']").style.display = "none";

  try {
    const res = await fetch(`${BASE_URL}/api/requests/${requestId}`);
    const request = await res.json();

    if (!request || !request.applicantName) {
      alert("Failed to load adoption request.");
      return;
    }

    document.getElementById("reason").value = request.reason;
    document.getElementById("travelPlan").value = request.travelPlan;
    document.querySelector(`input[name="experience"][value="${request.experience}"]`).checked = true;
    document.querySelector(`input[name="hasPets"][value="${request.hasPets}"]`).checked = true;
    document.getElementById("otherPets").value = request.otherPets || "";
    document.querySelector(`input[name="homeType"][value="${request.homeType}"]`).checked = true;
    document.getElementById("age").value = request.age;

    document.querySelectorAll("#adoption-form input").forEach(input => input.disabled = true);
  } catch (err) {
    console.error("Error loading request:", err);
    alert("Error loading adoption request");
  }
});

