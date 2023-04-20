fetch("http://localhost:3000/users")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((user) => {
      const tbody = document.querySelector("tbody");
      const tr = document.createElement("tr");

      Object.values(user).forEach((value) => {
        const td = document.createElement("td");
        td.textContent = value;
        tr.append(td);
      });

      tbody.append(tr);
    });
  });

  const User = require("http://localhost:3000/users");

app.post("/users", (req, res) => {
  const { username, password } = req.body;

  // Check if user exists in database
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Internal server error" });
      return;
    }

    if (!user) {
      res.status(401).send({ message: "Invalid username or password" });
      return;
    }

    // Check if password is correct
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Internal server error" });
        return;
      }

      if (!isMatch) {
        res.status(401).send({ message: "Invalid username or password" });
        return;
      }

      // Authentication successful - send success message
      res.send({ message: "Authentication successful" });
    });
  });
});
