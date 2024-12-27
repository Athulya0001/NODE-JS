async function handleSubmit(event) {
  event.preventDefault();

  const todo = document.getElementById("todo").value;
  console.log(todo, "from the form");

  try {
    const response = await fetch("http://localhost:3000/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Corrected "application/JSON" to "application/json"
      body: JSON.stringify(todo), // Wrap todo in an object
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    } else {
      const data = await response.json();
      console.log(data);
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
    console.log(response, "response");
    const todoData = await response.json();
    console.log(todoData, "todoData");
    let listElement = "";
    todoData.map((data,index)=>{
        console.log(data.todo)
    })



    const listContent = document.getElementById("listContent");
    const lists = document.createElement("li");

    // const listValue = todoData.map((value, index) => {
    //   return value;
    // });
    // lists.textContent = listValue;
    // listContent.appendChild(lists);
  }
}
fetchData();

// const listContent = document.getElementById('listContent');
// async function fetchList(){
//     const listValue = await fetch('http://loaclhost:3000/getTodos');
//     const data = JSON.parse(listValue);

//     const listItems = data.map((value, index)=>{
//         return value;
//     })

//     const list = document.createElement('li');
//     list.textContent = listItems;
//     listContent.appendChild(list);
//     console.log(list, "list content")
// }
// fetchList();
