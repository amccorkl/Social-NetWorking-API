const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,  
  deleteFriend,
} = require('../../controllers/userController');

//routes
// /api/users
router.route('/')
  .get(getUsers)
  .post(createUser);

//single user route
// /api/users/:userId 
router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

//friend route
// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(addFriend) 
  .delete(deleteFriend);


module.exports = router;