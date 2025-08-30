document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const res = await fetch("/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, message })
  });

  const data = await res.json();
  if (data.success) {
    alert("Message saved successfully!");
    e.target.reset();
  } else {
    alert("Error: " + data.error);
  }
});