const cardContainer = document.querySelector('#card-container');

let sortOrder = 1; // 1 for ascending, -1 for descending

function sortUsers() {
  fetch(`http://localhost:3000/users/${sortOrder === 1 ? 'asc' : 'desc'}`)
    .then((response) => response.json())
    .then((users) => {
      cardContainer.innerHTML = '';

      const membershipIds = users.map((user) => user.membershipType);
      fetchMemberships(membershipIds)
        .then((memberships) => {
          users.forEach((user) => {
            const card = document.createElement('div');
            card.classList.add('card');

            const fullName = document.createElement('h2');
            fullName.textContent = `${user.name} ${user.surname}`;

            const email = document.createElement('p');
            email.textContent = `Email: ${user.email}`;

            const membership = document.createElement('p');
            const membershipName = memberships[user.membershipType];
            membership.textContent = `Membership: ${
              membershipName || 'Unknown'
            }`;

            const ipAddress = document.createElement('p');
            ipAddress.textContent = `IP Address: ${user.ipAddress}`;

            card.appendChild(fullName);
            card.appendChild(email);
            card.appendChild(membership);
            card.appendChild(ipAddress);

            cardContainer.appendChild(card);
          });
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
}

function fetchMemberships(membershipIds) {
  return fetch('http://localhost:3000/memberships')
    .then((response) => response.json())
    .then((memberships) => {
      const membershipMap = {};
      memberships.forEach((membership) => {
        membershipMap[membership._id] = membership.name;
      });
      return membershipMap;
    });
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

// Load user data on page load
sortUsers();
