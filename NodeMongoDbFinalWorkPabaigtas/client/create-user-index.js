document.addEventListener('DOMContentLoaded', () => {
  const addUserButton = document.querySelector('button[type="submit"]');
  const cancelButton = document.getElementById('cancel-btn');
  const form = document.getElementById('add-user-form');
  const membershipDropdown = document.getElementById('membershipType');

  cancelButton.addEventListener('click', () => {
    window.location.href = 'create-user.html';
  });

  addUserButton.addEventListener('click', () => {
    window.location.href = 'create-user.html';
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name');
    const surname = formData.get('surname');
    const email = formData.get('email');
    const membershipType = formData.get('membershipType');
    const ipAddress = formData.get('ipAddress');

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        surname,
        email,
        membershipType,
        ipAddress,
      }),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = 'user-management.html';
        } else {
          alert('Failed to create user');
        }
      })
      .catch((error) => console.error(error));
  });

  fetch('http://localhost:3000/memberships')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.forEach(membership => {
        const option = document.createElement('option');
        option.value = membership._id;
        option.textContent = membership.name;
        membershipDropdown.appendChild(option);
      });
    })
    .catch(error => console.error(error));
});
