async function handleSubmit(event) {
  event.preventDefault();

  const todo = document.getElementById("todo").value;
  console.log(todo, "from the form");

  try {
    const response = await fetch("http://localhost:3000/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Corrected "application/JSON" to "application/json"
      body: JSON.stringify({todo}), // Wrap todo in an object
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      const data = await response.json();
      console.log(data,"Response after adding");

      document.getElementById("todo").value = "";

      fetchData();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchData() {
  const response = await fetch("http://localhost:3000/getTodos", {
    method: "GET",
  });

  if (!response.ok) {
    console.log("Error");
  } else {
    const todoData = await response.json();
    console.log(todoData, "todoData");

    let listContent = document.getElementById('listContent');
    
    listContent.innerHTML= "";
    todoData.map((data,index)=>{
        console.log(data.todo)
        const listItems = document.createElement('li');
        listItems.textContent = data.todo;
        listContent.appendChild(listItems);
    })
  }
}

document.addEventListener("DOMContentLoaded", fetchData);
