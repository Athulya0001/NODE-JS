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
      // const errorData = await response.json(); 
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data, "Response after adding user");

    fullName.value = "";
    emailId.value = "";
    password.value = "";

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

    userData.map((user, index) => {
      const listItem = document.createElement("li");
      const dataName = user.fullName;
      const dataEmail = user.emailId;
      const dataPassword = user.password;
      const name = document.createElement('p');
      const email = document.createElement('p');
      const password = document.createElement('p');

      name.textContent = `Fullname : ${dataName}`;
      email.textContent = `Email : ${dataEmail}`;
      password.textContent = `Password: ${dataPassword}`;
      listItem.appendChild(name);
      listItem.appendChild(email);
      listItem.appendChild(password);
      userList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchUserData);  