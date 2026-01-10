import {useState} from "react"
import {useNavigate} from 'react-router-dom'
import {toast} from "react-toastify"

const Register=({setIsLoggedIn})=>{
    // const url="http://localhost:9090"
    const url = 'https://kanban-board-a4aw.vercel.app';

    const [text,setText]=useState({username:"",email:"",password:""})
    const navigate=useNavigate()

    const textInput=(e)=>{
        const {name,value}=e.target
        setText((prevData)=>({
            ...prevData,[name]:value
        }))
    }

    const registerFunction=(e)=>{
        e.preventDefault()

        fetch(`${url}/api/auth/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(text)
        }).then(res=>res.json())
        .then(data=>{
            localStorage.setItem("token",data.token)
            setIsLoggedIn(true)
            toast.success("Welcome user! Registration successful.");
            navigate("/")
            console.log(data)
        })
    }

    return(
        <div className="min-h-screen flex flex-col justify-center items-center">
            <form onSubmit={registerFunction} className="max-w-md bg-white flex justify-center flex-col gap-6 border-2 border-black items-center p-6 w-11/12 md:w-4/12 rounded-lg">
                <div id="username">
                    <label htmlFor="username">Username:</label>
                    <input name="username" id="username" type="text" onChange={textInput} autoComplete="username" placeholder="Enter username" className="w-5/6 p-4 border rounded-lg rounded-tr-none focus:outline-none focus:ring-2 focus:ring-blue-400"></input>
                </div>
                <div id="email">
                    <label htmlFor="email">Email:</label>
                    <input name="email" id="email" type="email" onChange={textInput} autoComplete="email" placeholder="Enter email" className="w-5/6 border p-4 rounded-lg rounded-tr-none focus:outline-none focus:ring-2 focus:ring-blue-400"></input>
                </div>
                <div id="username">
                    <label htmlFor="password">Password:</label>
                    <input name="password" id="password" type="password" onChange={textInput} autoComplete="current-password" placeholder="Enter password" className="w-5/6 p-4 border rounded-lg rounded-tr-none focus:outline-none focus:ring-2 focus:ring-blue-400"></input>
                </div>
                <button className="registerBtnCss border-black border-spacing-3 p-2 bg-slate-500 flex items-center text-white opacity-80 hover:translate-y-[-3px] hover:opacity-100">Register</button>
            </form>
        </ div>
    )
}

export default Register;