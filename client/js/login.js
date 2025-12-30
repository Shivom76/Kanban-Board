const form=document.querySelector('form')
const username=document.querySelector("#username")
const password=document.querySelector("#password")

const url='https://kanban-board-a4aw.vercel.app'

form.addEventListener("submit",(e)=>{
    e.preventDefault()

    const userData={
        username:username.value,
        password:password.value
    }

    // fetch(`http://localhost:9090/api/auth/login`,{
    fetch(`${url}/api/auth/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(userData)
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.success){

            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.body.username);

            window.location.href="/client/index.html"
        }
    })
    .catch(err=>{
        console.error(err)
    })
})