const { User, Thought } = require("../models");

//the route/path for thoughts /api/thoughts
module.exports = {
  //get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => {
        !thoughts
          ? res
              .status(404)
              .json({ message: "No thoughts so far by user with this id" })
          : res.status(200).json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //get one thought by id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select(["-__v"])
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought yet by user with this id" })
          : res.status(200).json(thought)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: err });
      });
  },

   // POST to create a new thought
    // EXAMPLE DATA ----->
    // {
    //   "thoughtText": "Here's a cool thought...",
    //   "username": "lernantino",
    //   "userId": "5edff358a0fcb779aa7b118b"
    // }
  
  //create a new thought, 
  //BUT I should find the user through their id first and then provide way to update their own account with a findOneAndUpdate
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: err });
      });
  },

  // update an existing thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $set: { thoughtText: req.body },
      },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought entry for this id" })
          : res.status(200).json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // delete a thought through id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: `no thought by user with this id` })
          : res.status(200).json({ message: "Thought  successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // delete everything by a user?

  // add a reaction

  // delete a reaction
};

