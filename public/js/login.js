console.log("connected");

const createNewBtn = document.getElementById("createNew")



const loginFormHandler = async (event) => {
    console.log("clicked")
  event.preventDefault();

  let email = document.querySelector("#usernameLogin").value
  let password = document.querySelector("#usernamePassword").value.trim();

  console.log(email, password)

  if (email && password) {
    const response = await fetch('/api/users/login', {
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

const signupFormHandler = async (event) => { 
  event.preventDefault()

  const username = document.querySelector("#usernameSignup").value.trim()
  const email = document.querySelector("#emailSignup").value.trim()
  const password = document.querySelector("#passwordSignup").value.trim()

  console.log(username, email, password)

  if (username && email && password) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({username, email, password}),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response)

    if (response.ok){
      document.location.replace("/")
      console.log("User created")
       } else {
         console.log("Wrong!")
       }
  }

}

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

  document.querySelector(".signup-form").addEventListener("submit", signupFormHandler)
