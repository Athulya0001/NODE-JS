async function handleSubmit() {
    const todo = document.getElementById('todo').value;
    try {
        const response =await fetch('http://localhost:3000/', {
            method:"POST",
            header:{"Content-type": 'application/json'},
            body:JSON.stringify(todo)
        })
        
    } catch (error) {
        console.log(error)
    }
}