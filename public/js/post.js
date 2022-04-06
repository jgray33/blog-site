console.log("connected")

const commentFormHandler = async (event) => {
    console.log("clicked")
    event.preventDefault()

let comment = document.querySelector("#comment-box").value

console.log(comment)

const response = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({comment}),
    headers: { "Content-Type": "application/json" },
})
if(response.ok) {
    console.log("Comment posted")
} else {
    console.log("Comment not posted")
}
 
}

document.querySelector(".comment-box").addEventListener("submit", commentFormHandler)