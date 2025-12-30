const form=document.querySelector('form')

const username=document.querySelector('#username')
const email=document.querySelector('#email')
const password=document.querySelector('#password')

form.addEventListener("submit",(e)=>{
    e.preventDefault()

    const usernameVal=username.value
    const emailVal=email.value
    const passwordVal=password.value

    const userData={
        username:usernameVal,
        email:emailVal,
        password:passwordVal
    }

    fetch("http://localhost:9090/api/auth/register",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(userData)
    })
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
        if(data.success){
            localStorage.setItem('token',data.token)
            localStorage.setItem('username',data.body.username)

            window.location.href = "index.html";
        }
    })
    .catch(err => {
        console.error("Network error:", err);
        alert("Could not connect to the server.");
    });
})