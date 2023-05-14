/*const tableBody = document.querySelector('tbody');
let sortOrder = 1; // 1 for ascending, -1 for descending

function sortUsers() {
  fetch(`http://localhost:3000/users/${sortOrder === 1 ? 'asc' : 'desc'}`)
    .then((response) => response.json())
    .then((users) => {
      tableBody.innerHTML = '';

      users.forEach((user) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.surname}</td>
          <td>${user.email}</td>
          <td>${user.membershipType}</td>
          <td>${user.ipAddress}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error(error));
}

// Add a load event listener to the window object
window.addEventListener('load', () => {
  // Load user data on page load
  sortUsers();
});

// Get the "Sort" button element
const sortBtn = document.getElementById('sort-btn');

// Add a click event listener to the button
sortBtn.addEventListener('click', () => {
  sortOrder = sortOrder === 1 ? -1 : 1;
  sortUsers();
});

// Get the "Add User" button element
const addUserButton = document.getElementById('add-user-btn');

// Add a click event listener to the button
addUserButton.addEventListener('click', () => {
  // Redirect the user to the create-user.html page
  window.location.href = 'create-user.html';
});*/
const cardContainer = document.getElementById('card-container');
let sortOrder = 1; // 1 for ascending, -1 for descending

function sortUsers() {
  fetch(`http://localhost:3000/users/${sortOrder === 1 ? 'asc' : 'desc'}`)
    .then((response) => response.json())
    .then((users) => {
      cardContainer.innerHTML = '';

      users.forEach((user) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <h2>${user.name} ${user.surname}</h2>
          <p>Email: ${user.email}</p>
          <p>Membership Type: ${user.membershipType}</p>
          <p>IP Address: ${user.ipAddress}</p>
        `;
        cardContainer.appendChild(card);
      });
    })
    .catch((error) => console.error(error));
}

// Load user data on page load
sortUsers();

// Get the "Sort" button element
const sortBtn = document.getElementById('sort-btn');

// Add a click event listener to the button
sortBtn.addEventListener('click', () => {
  sortOrder = sortOrder === 1 ? -1 : 1;
  sortUsers();
});

// Get the "Add User" button element
const addUserButton = document.getElementById('add-user-btn');

// Add a click event listener to the button
addUserButton.addEventListener('click', () => {
  // Redirect the user to the create-user.html page
  window.location.href = 'create-user.html';
});

sortUsers();
