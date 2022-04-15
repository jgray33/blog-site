console.log("connected");

const loginFormHandler = async (event) => {
  console.log("clicked");
  event.preventDefault();

  let email = document.querySelector("#usernameLogin").value;
  let password = document.querySelector("#usernamePassword").value.trim();

  console.log(email, password);

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      console.log(response.statusText);
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
