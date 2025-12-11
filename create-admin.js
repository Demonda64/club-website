var auth = require("./src/services/auth.service");

auth.createAdmin("admin@club.com", "motdepasseadmin")
  .then(() => {
    console.log("Admin créé !");
    process.exit();
  })
  .catch(console.error);
