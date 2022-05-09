console.log("connected to dashboard js");

const addNewBtn = document.getElementById("addNew");
const form = document.getElementById("form");
const title = document.getElementById("inputTitle");
const publishBtn = document.getElementById("publishBtn");
const content = document.getElementById("textarea");

const formAppear = async () => {
  form.classList.add("visible");
};

const addNewPost = async (event) => {
  event.preventDefault();
  const blogTitle = title.value;
  const blogContent = content.value;
  if (blogTitle && blogContent) {
    const response = await fetch("api/post", {
      method: "POST",
      body: JSON.stringify({ blogTitle, blogContent }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      console.log("blog posted");
      document.location.reload()
    } else {
      console.log("That blog didn't post");
    }
  }
};

addNewBtn.addEventListener("click", formAppear);
publishBtn.addEventListener("click", addNewPost);
