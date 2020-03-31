const express = require('express');
const router = express.Router();

const checkAuth = require ('../middleware/check-auth');
const channelListControllers = require('../controllers/channelList');

//all users
router.post('/create',checkAuth, channelListControllers.create_new_channel);
router.get('/:channelid',checkAuth,channelListControllers.find_channel)
router.get('/users/:userid',checkAuth,channelListControllers.find_all_user_channel)
router.get('/',checkAuth, channelListControllers.list_all_channel);
router.delete('/:channelid',checkAuth, channelListControllers.delete_channel);
router.patch('/:channelid',checkAuth, channelListControllers.update_channel);
router.get('/realcomm/:channelid', channelListControllers.testing_channel);

//export the servlet to the server
module.exports = router;