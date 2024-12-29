async function submitInfo(event) {
    event.preventDefault();
  
    let fullName = document.getElementById("fullName").value;
    let emailId = document.getElementById("emailId").value;
    let password = document.getElementById("password").value;
  
    try {
      const response = await fetch("http://localhost:3000/addUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, emailId, password }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }else{}
  
      const data = await response.json();
      console.log(data, "Response after adding user");
  
      fullName.value ="";
      emailId.value = "";
      password.value ="";
  
      fetchUserData();
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  async function fetchUserData() {
    try {
      const response = await fetch("http://localhost:3000/getUsers", { method: "GET" });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const userData = await response.json();
      console.log(userData, "User data");
  
      const userList = document.getElementById("userList");
      userList.innerHTML = "";
  
      userData.forEach((user, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Name: ${user.fullName}, Email: ${user.emailId}`;
        userList.appendChild(listItem);
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  
  document.addEventListener("DOMContentLoaded", fetchUserData);  