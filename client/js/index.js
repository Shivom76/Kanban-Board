document.addEventListener('DOMContentLoaded',()=>{

    const token = localStorage.getItem('token');

    const todoBox=document.querySelector('.todo')
    const todo=document.getElementById('todo')
    const ongoing=document.getElementById('ongoing')
    const completed=document.getElementById('completed')

    const url='https://kanban-board-a4aw.vercel.app'
    // const url='http://localhost:9090'

    
    const createTaskElement = (id, content) => {
        const div = document.createElement('div');
        div.classList.add('dragItems');
        div.id = id;
        div.innerHTML = content;
        div.setAttribute('draggable', 'true');

        const btn=document.createElement('button')
        btn.classList.add('crossBtn')
        btn.innerHTML='X'
        div.appendChild(btn)


        btn.addEventListener('click', () => {
            fetch(`${url}/api/todos/del/${id}`, { // Use 'id' from function arg
                method: 'DELETE',
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                if (res.ok) {
                    div.remove(); // Remove the whole div
                    console.log('Removed successfully');
                }
            })
            .catch(err => console.error("Error:", err));
        });
        
        fn(div); 
        
        return div;
    };

        fetch(`${url}/api/todos`,{
            headers: {
                'Authorization': `Bearer ${token}` // ADD THIS
            }
        })
        .then(res=>res.json())
        .then(tasks => {
            if(Array.isArray(tasks.allTodos)){
                tasks.allTodos.forEach((task)=>{
                    let taskDiv=createTaskElement(task._id,task.content);
                    const targetBox = document.getElementById(task.status);
            
                    // 2. Fallback: If box not found, or task has no status, use the default todoBox
                    if (targetBox) {
                        targetBox.appendChild(taskDiv);
                    } else {
                        todoBox.appendChild(taskDiv); 
                    }
                })
            }
            console.log(tasks)
        })
    .catch((err)=>{
        console.error(err)
    })

    
    const dragItems=document.querySelectorAll('.dragItems')
    const dragBoxes=document.querySelectorAll('.box')


    dragItems.forEach((item)=>{
        item.addEventListener('dragstart',(e)=>{
            e.dataTransfer.setData('text/plain',e.target.id)
            // console.log('drag start')
        });
    })

    dragBoxes.forEach((box)=>{
        box.addEventListener('dragover',(e)=>{
            e.preventDefault()
            // console.log('dragging')
        })

        box.addEventListener('drop',(e)=>{
            e.preventDefault()
            const draggedElementId=e.dataTransfer.getData('text/plain')

            const draggedElement=document.getElementById(draggedElementId)
            console.log('drop over')
            if(draggedElement){
                box.appendChild(draggedElement)
                let newStatus=box.id
                fetch(`${url}/api/todos/update/${draggedElementId}`,
                {
                    method:'PATCH',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body:JSON.stringify({status:newStatus})
                })
                console.log('new statuss')


            }
        })
    })

    const fn=(item)=>{
        item.addEventListener('dragstart',(e)=>{
            e.dataTransfer.setData('text/plain',e.target.id)
            // console.log('drag start')
        });
    }

    const form=document.querySelector('form')
    const input=document.querySelector('input')


    form.addEventListener('submit',async(e)=>{
        e.preventDefault()
        let text=input.value
        if (!text) return;
        // const newId=uuid.v4()
        
        let TodoData={
            // id:newId,
            content:text
        }
        try{
            const response=await fetch(`${url}/api/todos`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(TodoData)
            })

            let data=await response.json()

            const realId = data.allTodos ? data.allTodos._id : data._id;
            let newElement = createTaskElement(realId, text);
            todoBox.appendChild(newElement)

            input.value=''

        }catch (error) {
            console.error('Submission failed:', error);
            alert('Failed to save task. Check server status.');
        }

    })

    const clearBtn=document.querySelector('.clearBtn')
    clearBtn.addEventListener('click',async ()=>{
        const response=await fetch(`${url}/api/todos/clearAll`,
        {
            method:'DELETE',
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })

        if(response.ok){
            document.querySelector('.todo').innerHTML = '';
            console.log('delete done')
        }
    })


    // keep it such that if user is logged in, the logout btn is visible
    if(token){
        const registerBtn=document.querySelector('#registerBtn')
        const loginBtn=document.querySelector('#loginBtn')
        // const logoutBtn=document.querySelector('#logoutBtn')
        
        registerBtn.remove()
        loginBtn.remove()
        
        const logoutBtnCreate=document.createElement("button")
        logoutBtnCreate.classList.add("navList")
        logoutBtnCreate.id="logoutBtn"
        logoutBtnCreate.innerText = "Logout";

        logoutBtnCreate.addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            window.location.href = "/client/index.html"; // Redirect to index page 
        });

        const navR_Ul=document.querySelector(".navR_Ul")
        navR_Ul.appendChild(logoutBtnCreate)
    }
})