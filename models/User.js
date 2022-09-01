const { Schema, model } = require("mongoose");

//define the user schema
const userSchema = new Schema(
  //object to define fields
  {
    username: {
      type: String,
      required: [true, "the username is required"],
      unique: [true, "this username is already in use"],
      trim: true,
      minLength: 2,
    },

    email: {
      type: String,
      required: [true, "an email is required"],
      unique: [true, "this email is already in use"],
      trim: true,
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        // [/.+\@.+\..+/],
      //[/^([\w.!#$%&*+=?^_{|}~\/-]+)@([\w.-]+)\.([a-z.]{2,6})$/, 'Please fill a valid email address'] // this version matches the input to a RegEx
    },
    thoughts: [
      // creates an array of objects. This field is the Type of ObjectId (the Mongo specific id). The ref property connects this to the thought model.
      {
        //do I add mongoose before the Schema word here?
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user", 
        
      },
    ],
  },
  {
    //creating virtual object
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//create the virtual friendCount that gets the friends array
userSchema.virtual("friendCount")
  .get(function () {
  return this.friends.length;
});

//name and initialize the model
const User = model("user", userSchema);

module.exports = User;
