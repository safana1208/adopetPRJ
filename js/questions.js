document.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("userFirstName");
  if (name) {
    document.getElementById("userName").textContent = name;
  }

  const form = document.getElementById("questionnaire-form");

  questions.forEach((q) => {
    const p = document.createElement("p");
    p.textContent = q.label;
    form.appendChild(p);

    q.options.forEach((opt) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = q.name;
      input.value = opt.value;

      label.appendChild(input);
      label.appendChild(document.createTextNode(" " + opt.label));

      if (opt.withInput) {
        const extraInput = document.createElement("input");
        extraInput.type = "text";
        extraInput.name = q.name + "Name";
        extraInput.placeholder = "Enter breed name";
        extraInput.className = "input";
        label.appendChild(document.createElement("br"));
        label.appendChild(extraInput);
      }

      form.appendChild(label);
    });
  });

  const button = document.createElement("button");
  button.className = "arrow-btn";
  button.innerHTML = "➜";
  button.type = "submit";
  form.appendChild(button);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const answers = {};

    for (const [key, value] of formData.entries()) {
      answers[key] = value;
    }

    localStorage.setItem("questionnaireAnswers", JSON.stringify(answers));
    window.location.href = "pets.html";
  });
});
