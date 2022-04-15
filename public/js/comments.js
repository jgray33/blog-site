
const commentFormHandler = async function (event) {
    event.preventDefault()
    const post_id = document.querySelector("#commentID").getAttribute("data-id")
    const comment_content = document.querySelector("#comment-box").value
    console.log(post_id, comment_content)

    if (comment_content) {
        await fetch ("/api/comments",{
            method: "POST",
            body: JSON.stringify({post_id, comment_content}),
            headers: {"Content-Type": "application/json" }
                    })
                    document.location.reload()
    }


}

document
.querySelector(".commentInput")
.addEventListener("submit", commentFormHandler)