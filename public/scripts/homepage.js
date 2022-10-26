$postButton = document.querySelector("#postSubmit");

const formSubmitHandler = ()=> {
    let title = document.querySelector("#newPostTitle").value
    let body = document.querySelector("#newPostBody").value
    let userID = 1;
    
    fetch('/api/blogpost/')
}

$postButton.addEventListener('click', formSubmitHandler)