const addMembershipForm = document.getElementById('addMembershipForm');

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

  // Redirect back to the membership list page
  window.location.href = 'index.html';
}

// Add event listener to handle form submission and add a new membership
addMembershipForm.addEventListener('submit', addMembership);
