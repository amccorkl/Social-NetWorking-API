const { User, Thought } = require('../models');

//route/path is /api/users  
module.exports = {
  // get all users 
  getUsers(req, res) {
    User.find()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // get a single user,  userId must be added into the url param
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      //excludes version number from the return
      .select('-__v')
      .populate('thoughts')
      .populate('friends')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that id exists' })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json({ message: err }));
  },
  // create a new user (requires username and password per model setup)
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json({ message: err }));
  },
  // update user info
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      //this should update User's entire entry 
      { $set: req.body },
      // update only email
      // { $set: {email: req.body.email }},
      //run validation on entry and updated User info
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'no user with that Id' })
          : res.status(200).json(user)
      )
      .catch((err) => {
        console.log(err)
        res.status(500).json({ message: err})
      })  
  },
  // delete a user


  //add a friend to user's friends list


  //remove friend
}