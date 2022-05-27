console.log("connected to dashboard js");

const addNewBtn = document.getElementById("addNew");
const modal = document.querySelector(".myModal-container");
const justModal = document.querySelector(".myModal")
const title = document.getElementById("inputTitle");
const publishBtn = document.getElementById("post-btn");
const content = document.getElementById("textarea");
const cancelBtn = document.getElementById('cancel-btn')

const modalAppear = async () => {
  console.log("button clicked")
  modal.classList.add("show")
  justModal.classList.add("show")
};

const modalDisappear = async () => {
  console.log("button clicked")
  modal.classList.remove("show")
  justModal.classList.remove("show")
};

const addNewPost = async (event) => {
  event.preventDefault();
  const blogTitle = title.value;
  const blogContent = content.value;
   if (blogTitle && blogContent) {
    const response = await fetch("api/blog-post", {
      method: "POST",
      body: JSON.stringify({ blogTitle, blogContent }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      console.log("blog posted");
      modalDisappear()
      window.location.reload()
    } else {
      console.log("That blog didn't post");
    }
  }
};


addNewBtn.addEventListener("click", modalAppear);
publishBtn.addEventListener("click", addNewPost);
cancelBtn.addEventListener("click", modalDisappear)
