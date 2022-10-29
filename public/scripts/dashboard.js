if (document.querySelector('.blogCard')) {
    let $postButton = document.querySelector("#postSubmit");
    
    const formSubmitHandler = async ()=> {
        let title = document.querySelector("#newPostTitle").value.trim()
        let post_content = document.querySelector("#newPostBody").value.trim()
        
        if (title && post_content) {
            const response = await fetch('/api/blogpost/', {
                method: 'POST',
                body: JSON.stringify({ title, post_content }),
                headers: { 'Content-Type': 'application/json' },
            });
            (response.ok) ? document.location.reload() : alert('Failed to Post');
        } else {
            alert("Text fields cannot be empty")
        }
    }
    $postButton.addEventListener('click', formSubmitHandler)
}

if (document.querySelectorAll(".postCommentSubmit")) {
    let $commentBTN = document.querySelectorAll(".postCommentSubmit");

    const commentSubmitHandler = async (e)=> {
        let comment_content = e.target.previousElementSibling.lastElementChild.value;
        let post_id = e.target.parentNode.parentNode.getAttribute("data-post");

        if (comment_content) {
            const response = await fetch('/api/comment', {
                method: 'POST',
                body: JSON.stringify({ comment_content, post_id }),
                headers: { 'Content-Type': 'application/json' },
            });
            (response.ok) ? document.location.reload() : alert('Failed to Post');
        } else {
            alert("Comment field cannot be empty")
        }
    }

    $commentBTN.forEach((button) => {
        button.addEventListener("click", commentSubmitHandler);
    });
}

if (document.querySelectorAll(".editButton")) {
    let $editBTN = document.querySelectorAll(".editButton")

    const addFields = async (e) => {
        let postID = e.target.parentNode.parentNode.getAttribute("data-post");
        let editableTitle = e.target.parentNode.previousElementSibling.firstElementChild.textContent;
        let editableContent = e.target.parentNode.previousElementSibling.lastElementChild.textContent;
        let $titleDiv = document.createElement('div');
        $titleDiv.setAttribute('class', 'mb-3');
        let $titleLabel = document.createElement('label');
        $titleLabel.setAttribute('class', 'form-label');
        $titleLabel.textContent = "Title";
        $titleDiv.append($titleLabel);
        let $titleInput = document.createElement('input');
        $titleInput.setAttribute('class', 'form-control');
        $titleInput.value = editableTitle;
        $titleDiv.append($titleInput);

        let $bodyDiv = document.createElement('div');
        $bodyDiv.setAttribute('class', 'mb-3');
        let $bodyLabel = document.createElement('label');
        $bodyLabel.setAttribute('class', 'form-label');
        $bodyLabel.textContent = "Body";
        $bodyDiv.append($bodyLabel);
        let $bodyTextArea = document.createElement('textarea');
        $bodyTextArea.setAttribute('class', 'form-control');
        $bodyTextArea.setAttribute('rows', '7');
        $bodyTextArea.value = editableContent;
        $bodyDiv.append($bodyTextArea);

        let $submitEditBTN = document.createElement('button');
        $submitEditBTN.setAttribute('type', 'submit');
        $submitEditBTN.setAttribute('class', 'btn btn-primary customBTN submitEditButton');
        $submitEditBTN.textContent = "Submit Edit";
        $submitEditBTN.addEventListener('click', async (e) => {
            e.stopPropagation;
            let newTitle = e.target.previousElementSibling.previousElementSibling.lastElementChild.value.trim();
            let newPost = e.target.previousElementSibling.lastElementChild.value.trim();
            console.log(postID);
            console.log(newTitle);
            console.log(newPost);
            if (newTitle && newPost) {
                const response = await fetch(`/api/blogpost/${postID}`, {
                    method: 'PUT',
                    body: JSON.stringify({ title: newTitle, post_content: newPost}),
                    headers: { 'Content-Type': 'application/json' },
                });
                (response.ok) ? document.location.reload() : alert('Failed to Post');
            } else {
                alert("Text fields cannot be empty")
            }
        })

        e.target.parentNode.append($titleDiv);
        e.target.parentNode.append($bodyDiv);
        e.target.parentNode.append($submitEditBTN);

        e.target.parentNode.previousElementSibling.style.display = "none";
        e.target.style.display = "none";
    }

    $editBTN.forEach((button) => {
        button.addEventListener("click", addFields)
    })
}