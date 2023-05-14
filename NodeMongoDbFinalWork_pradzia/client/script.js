const membershipsList = document.getElementById('memberships');
const addMembershipForm = document.getElementById('addMembershipForm');

// Function to fetch the memberships and display them on the page
// Function to fetch the memberships and display them on the page
async function fetchMemberships() {
  const response = await fetch('http://localhost:3000/memberships');
  const memberships = await response.json();

  membershipsList.innerHTML = '';
  memberships.forEach((membership) => {
    const box = document.createElement('div');
    box.classList.add('membership-box');

    const priceAndName = document.createElement('div');
    priceAndName.classList.add('price-and-name');

    const price = document.createElement('p');
    price.classList.add('membership-price');
    price.textContent = membership.price;
    priceAndName.appendChild(price);

    const name = document.createElement('h3');
    name.classList.add('membership-name');
    name.textContent = membership.name;
    priceAndName.appendChild(name);

    box.appendChild(priceAndName);

    const description = document.createElement('p');
    description.classList.add('membership-description');
    description.textContent = membership.description;
    box.appendChild(description);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteMembership(membership._id);
    });
    box.appendChild(deleteButton);

    membershipsList.appendChild(box);
  });
}

// Call fetchMemberships function to display the memberships when the page loads
fetchMemberships();

// Function to handle form submission and add a new membership
async function addMembership(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;

  const response = await fetch('http://localhost:3000/memberships', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, price, description }),
  });

  const data = await response.json();

  // Refresh the memberships list after adding a new membership
  await fetchMemberships();

  // Clear the form fields after adding a new membership
  addMembershipForm.reset();
}

// Function to delete a membership
// Change the parameter name of deleteMembership() to membershipId
async function deleteMembership(membershipId) {
  try {
    const response = await fetch(
      `http://localhost:3000/memberships/${membershipId}`,
      {
        method: 'DELETE',
      },
    );
    const data = await response.json();
    if (response.status === 404) {
      alert('Membership not found');
    } else {
      await fetchMemberships();
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
}

// Modify the delete button click event to pass membership._id as the parameter
deleteButton.addEventListener('click', () => {
  deleteMembership(membership._id);
});

// Add event listener to handle form submission and add a new membership
addMembershipForm.addEventListener('submit', addMembership);
