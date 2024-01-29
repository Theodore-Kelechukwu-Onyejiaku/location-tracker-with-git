const parser = require('papaparse');
const User = require('../model/User.model');

exports.getOthers = async (req, res) => {
    try {
        // get user id
        const { _id: userId } = req.user;

        // find the user
        const user = await User.findById(userId);

        // if no user
        if (!user) {
            return res.status(401).json({
                message: 'User does not exist',
                data: null,
            });
        }

        // get user friends
        const { friends } = user;

        // Find all users except the current user
        const otherUsers = await User.find({
            _id: { $ne: userId }, // $ne means "not equal"
        });

        // get potential friends
        const potentialFriends = otherUsers.filter((otherUser) => {
            for (const friendId of friends) {
                if (otherUser._id.equals(friendId)) {
                    return false; // Friend found, exclude user from potentialFriends
                }
            }
            return true; // Friend not found, include user in potentialFriends
        });

        res.status(200).json({
            message: 'Potential Friends',
            data: potentialFriends,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};

exports.addFriend = async (req, res) => {
    try {
        // get user id
        const { _id } = req.user;

        // get new friend id from request body
        const { id: newfriendId } = req.body;

        // get friends of user
        const { friends } = await User.findById(_id);

        // check if new friend is already a friend
        for (const friend of friends) {
            if (friend._id.equals(newfriendId)) {
                return res.status(400).json({ message: 'This user is already friends with you!' });
            }
        }

        // update user's friends 
        const updatedUser = await User.findByIdAndUpdate(_id, {
            $push: {
                friends: newfriendId,
            },
        }, { new: true, useFindAndModify: false }).populate('friends');

        res.status(200).json({
            message: 'Friend added successfully!',
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};

exports.getFriendsCsvData = async (req, res) => {
    try {
        // Extract the user's _id from the request object
        const { _id } = req.user;

        // Find the user by _id and populate the 'friends' field
        const user = await User.findById(_id).populate('friends');

        // Destructure the 'friends' field from the user object
        const { friends } = user;

        // Map over the friends array and format the data for CSV
        const formattedData = friends.map((friend) => ({
            Name: friend.username,
            Gender: friend.gender,
            Location: friend.currentLocation.name,
            friends: friend.friends.length,
            visited: friend.locations.map((location, index) => `${index + 1}. ${location.name}`).join('\n'),
        }));

        // Convert the formatted data to CSV using the 'unparse' method from the 'papaparse' library
        const csv = parser.unparse(formattedData, {
            header: true,
        });

        // Set the response headers to indicate that the content is CSV
        res.header('Content-Type', 'text/csv');

        // Send the CSV data in the response with a status code of 200 (OK)
        res.status(200).send(csv);
    } catch (error) {
        // Handle errors by sending a JSON response with an error message and status code 500 (Internal Server Error)
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};