 const deleteBtn = document.querySelector(".deleteBtn")
 const editBtn = document.querySelector(".editBtn")

 const updatePost = async(event)=> {
     const newTitle = document.querySelector("#postTitle").value
     const newContents = document.querySelector("#newContents").value

     const id = event.target.getAttribute("data-id")
     const response = await fetch(`/api/blog-post/${id}`, {
         method: "PUT", 
         body: JSON.stringify({
             post_title: newTitle,
             post_contents: newContents
         }),
         headers: { "Content-Type": "application/json"}, 
     })
     if (response.ok) {
         document.location.replace('/dashboard');
         alert("Post updated") 
     } else {
         alert("Didn't work")
     }
     }


const deletePost = async (event) => {
    const id = event.target.getAttribute("data-id")
    const response = await fetch(`/api/blog-post/${id}`, {
        method: "DELETE"
    })
    if (response.ok) {
        document.location.replace("/dashboard")
        alert("Post deleted")
    } else {
        console.log(response)
        alert("didn't work sorry")
    }
}

editBtn.addEventListener("click", updatePost)
deleteBtn.addEventListener("click", deletePost)