const membershipsList = document.getElementById('memberships-list');
const addMembershipForm = document.getElementById('add-membership-form');

// Display all memberships on page load
window.onload = async () => {
  const response = await fetch('/memberships');
  const memberships = await response.json();

  memberships.forEach((membership) => {
    const li = document.createElement('li');
    li.innerText = `${membership.name}: $${membership.price}`;
    membershipsList.appendChild(li);
  });
};

// Add new membership
addMembershipForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;

  const response = await fetch('/memberships', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, price }),
  });

  if (response.status === 409) {
    alert('Membership already exists');
  } else {
    const membership = await response.json();
    const li = document.createElement('li');
    li.innerText = `${membership.name}: $${membership.price}`;
    membershipsList.appendChild(li);

    alert('Membership added successfully');
  }
});
