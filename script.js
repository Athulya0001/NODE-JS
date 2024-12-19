// async function handleSubmit(event) {
//     event.preventDefault();

//     const todo = document.getElementById('todo').value;
//     try {
//         const response =await fetch('http://localhost:3000/', {
//             method:"POST",
//             headers:{"Content-type": 'application/json'},
//             body:JSON.stringify(todo)
//         });

//         if(!response.ok){
//             console.log("Failed to send data, status: ", response.status)
//         }
        
//     } catch (error) {
//         console.log(error)
//     }
// }

async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    const todo = document.getElementById('todo').value;

    try {
        const response = await fetch('http://localhost:3000/', {
            method: "POST",
            headers: { "Content-Type": "text/plain" }, // Send as plain text
            body: todo // Send raw string
        });

        if (response.ok) {
            const result = await response.text();
            console.log("Response from server:", result);
        } else {
            console.error("Failed to send data. Status:", response.status);
        }
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

document.getElementById('todo').addEventListener('submit', handleSubmit);