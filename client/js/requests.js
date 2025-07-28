fetch("/api/requests")
  .then(res => res.json())
  .then(requests => {
    const tbody = document.getElementById("requestsTableBody");
    tbody.innerHTML = "";

    requests.forEach(req => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${req.applicantName}</td>
        <td><a href="admin-pet-profile.html?id=${req.petId}">${req.petId}</a></td>
        <td>${req.date}</td>
        <td>${req.status}</td>
        <td>
          <button onclick="updateStatus('${req.id}', 'approved')">✅ Approve</button>
          <button onclick="updateStatus('${req.id}', 'declined')">❌ Decline</button>
        </td>
      `;

      tbody.appendChild(tr);
    });
  })
  .catch(err => {
    console.error("Failed to load requests:", err);
    alert("Could not load requests.");
  });

function updateStatus(requestId, status) {
  fetch(`/api/requests/${requestId}/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Request updated.");
        location.reload();
      } else {
        alert("Update failed.");
      }
    });
}

