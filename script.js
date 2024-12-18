const addButton = document.getElementById('addButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

addButton.addEventListener("click", function(){
    const taskText = taskInput.value.trim();
    if(taskInput!==""){
        const listItem = document.createElement("li");
        const taskContent = document.createElement("span");
        taskContent.innerText=taskText;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent="Delete";
        deleteBtn.addEventListener("click", function(){
            taskList.removeChild(listItem);
        });

        
        listItem.appendChild(taskContent);
        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);
    }else {
        alert("Please Enter a task")
    }
    
});