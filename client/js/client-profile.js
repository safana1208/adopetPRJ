// נניח ששמרנו את שם המשתמש ב-localStorage בעת ההתחברות
const clientName = localStorage.getItem("clientName");

document.getElementById("clientName").textContent = clientName || "Guest";

fetch("/api/requests")
  .then(res => res.json())
  .then(requests => {
    const myRequests = requests.filter(r => r.applicantName === clientName);
    const tbody = document.getElementById("clientRequestsBody");

    if (myRequests.length === 0) {
      tbody.innerHTML = "<tr><td colspan='3'>No requests found.</td></tr>";
    } else {
      myRequests.forEach(req => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${req.petId}</td>
          <td>${req.date}</td>
          <td>${req.status}</td>
        `;
        tbody.appendChild(tr);
      });
    }
  })
  .catch(err => {
    console.error("Error loading client requests:", err);
    alert("Failed to load your requests.");
  });
