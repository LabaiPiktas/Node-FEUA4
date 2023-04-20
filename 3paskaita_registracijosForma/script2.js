const users = [
    {
      id: 1,
      name: "John",
      surname: "Doe",
      email: "johndoe@example.com",
      password: "password123",
      address: "123 Main St",
      city: "New York",
      zip: 10001,
      phone: "555-555-1234"
    },
    {
      id: 2,
      name: "Jane",
      surname: "Doe",
      email: "janedoe@example.com",
      password: "password456",
      address: "456 Main St",
      city: "Los Angeles",
      zip: 90001,
      phone: "555-555-5678"
    },
  ];
  
  const submitBtn = document.getElementById("submit");
  submitBtn.addEventListener("click", () => {
    e.preventDefault();
    const passwordInput = document.querySelector("#password").value;
    const repeatPasswordInput = document.querySelector("#confirm_password").value;
    if(passwordInput === repeatPasswordInput) {
        const password = passwordInput;
    }

    const password = document.querySelector("input[name='password']").value;
    const email = document.querySelector("input[name='email']").value;
    const name = document.querySelector("input[name='name']").value;
    const surname = document.querySelector("input[name='surname']").value;
    const address = document.querySelector("input[name='address']").value;
    const zip = document.querySelector("input[name='zip']").value;
    const phone = document.querySelector("input[name='phone']").value;
    const isAgreement = document.querySelector("#agree").checked;
    



  // atvaizdavimas
  fetch("http://localhost:3000/users")
    .then((resp) => resp.json())
    .then((response) => {
      const userList = document.querySelector("#usersList");
      response.forEach((user) => {
        const li = document.createElement("li");
        li.textContent = `${user.name} - ${user.surname}`;
        userList.append(li);
      });
    });

  

  

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, surname: surname, password: password, email: email, address: address, zip: zip, city: city, phone: phone, isAgreement: isAgreement }),
    }).then(() => {
      location.reload();
     
    })
    .catch(error => console.error(error));
  }); /*else {
    alert("Nesutampa slaptažodis, bandykite vėl!");*/
  


  const userList = document.querySelector("#usersList");

  

fetch("http://localhost:3000/users")
  .then(response => response.json())
  .then(data => {
    const users = data;
    // Loop through the users and create an li element for each one
    users.forEach(user => {
      const li = document.createElement("li");
      li.textContent = `${user.name} ${user.surname}`;
      userList.appendChild(li);
    });
       
  })
  .catch(error => console.error(error));
  
  
  

  window.open("index.html", "_blank");


