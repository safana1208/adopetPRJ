fetch("/api/stats")
  .then(res => res.json())
  .then(data => {
    // הכנסת נתונים לתוך ה־DOM
    document.getElementById("totalPets").textContent = data.totalPets;
    document.getElementById("successfulAdoptions").textContent = data.successfulAdoptions;
    document.getElementById("totalUsers").textContent = data.totalUsers;
    document.getElementById("pendingRequests").textContent = data.pendingRequests;
    document.getElementById("mostAdoptedBreed").textContent = data.mostAdoptedBreed;
    document.getElementById("totalDonations").textContent = data.totalDonations + " ₪";

    // עיבוד גרף אימוצים לפי חודשים
    const labels = Object.keys(data.adoptionsPerMonth).sort();
    const values = labels.map(label => data.adoptionsPerMonth[label]);

    new Chart(document.getElementById("adoptionChart"), {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Adoptions",
          data: values,
          backgroundColor: "#0A6B72"
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  })
  .catch(err => {
    console.error("Error loading stats:", err);
    alert("Failed to load statistics.");
  });
