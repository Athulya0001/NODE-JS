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
      console.log("Network response was not ok");
    }

    const userData = await response.json();
    console.log(userData, "User data");

    const userList = document.getElementById("userList");
    userList.innerHTML = "";

    userData.forEach((user, index) => {
      const listItem = document.createElement("li");

      const name = document.createElement('p');
      const email = document.createElement('p');
      const password = document.createElement('p');
      const dlt = document.createElement('button');
      dlt.textContent = 'Delete';
      dlt.style.backgroundColor = 'rgb(137, 10, 10)';
      dlt.style.color = 'rgb(255, 255, 255)';
      dlt.style.border = 'none';
      const edit = document.createElement('button');
      edit.textContent = 'Edit';
      edit.style.backgroundColor = 'rgb(27, 27, 106)';
      edit.style.color = 'rgb(255, 255, 255)';
      edit.style.border = 'none';

      dlt.addEventListener("click", async function () {
        try {
          const response = await fetch(`http://localhost:3000/deleteUser/${user._id}`, {
            method: "DELETE",
          });
          console.log(response, "response")

          if (!response.ok) {
            console.log("Failed to delete user");
          }

          const data = await response.json();
          console.log(data.message);

          fetchUserData();
        } catch (error) {
           console.error("Error deleting user: ", error);
        }
      });


      name.textContent = `Fullname : ${user.Fullname}`;
      email.textContent = `Email : ${user.Email}`;
      password.textContent = `Password: ${user.password}`;
      listItem.appendChild(name);
      listItem.appendChild(email);
      listItem.appendChild(password);
      listItem.appendChild(dlt);
      listItem.appendChild(edit);
      userList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchUserData);  