const email = document.getElementById("email");
const password = document.getElementById("password");

const button = document.getElementById("button");

function send() {
  const emailInput = email.value;
  const pass = password.value;
  const data = { emailInput, pass };
  console.log(data);
  fetch("/", {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
button.addEventListener("click", send);
