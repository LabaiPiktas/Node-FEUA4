const userList = document.getElementById("usersList");

fetch("http://localhost:3000/users")
  .then(response => response.json())
  .then(data => {
    const users = data.users;
    // Loop through the users and create an li element for each one
    users.forEach(user => {
      const li = document.createElement("li");
      li.textContent = `${user.name} ${user.surname} (${user.email})`;
      userList.appendChild(li);
    });
  })
  .catch(error => console.error(error));
