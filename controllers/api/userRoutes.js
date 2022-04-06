const router = require("express").Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");

// Get all the users
router.get("/", async (req, res) => {

  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
    console.log(userData)
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new user - once created, shows as logged in.
router.post("/signup", async (req, res) => {
console.log(req.body, "From sign up route")
  try {
        // newUser.password = await bcrypt.hash(req.body.password, 10);
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true
      req.session.email = userData.email
      
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err)
  }
});


router.post("/login", async (req, res) => {
  try {
    console.log(req.body, "From login route")
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
        })
              
    if (!dbUserData) {
      console.log("no user with that email")
      res.status(400).json({ message: "Incorrect" });
      return;
    }
    const validPassword = await dbUserData.checkPassword(req.body.password);
    console.log(validPassword)

    if (!validPassword) {
      console.log("Wrong passy")
      res.status(400).json({ message: "Wrong passy" });
      return;
    }
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = dbUserData.id
      req.session.email = dbUserData.email
      res
        .status(200)
        .json({ user: dbUserData, message: "You're logged in now" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req,res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }
})

router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    if (!userData) {
      res.status(404).json({ message: "No user with that id" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
