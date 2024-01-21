const parser = require('papaparse');
const User = require('../model/User.model');

exports.addLocation = async (req, res) => {
    try {
        // extract location details from user
        const { name, latitude, longitude } = req.body;
        // extract user's id
        const { _id } = req.user;

        // update user with new location details
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                $push: {
                    locations: {
                        name,
                        latitude,
                        longitude,
                    },
                },
                $set: {
                    currentLocation: {
                        name,
                        latitude,
                        longitude,
                    },
                },
            },
            { new: true, useFindAndModify: false },
        );

        // if user is not found
        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
                data: null,
            });
        }

        res.status(200).json({
            message: "Location added successfully!",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};

exports.editLocation = async (req, res) => {
    try {
        const { _id } = req.user;
        const { id: locationId, name: newLocationName } = req.body;

        const location = await User.findOneAndUpdate(
            { _id, 'locations._id': locationId },
            {
                $set: {
                    'locations.$.name': newLocationName,
                }
            },
            { new: true }
        );

        if (!location) {
            return res.status(404).json({
                message: 'Location not found',
                data: null,
            });
        }

        res.status(200).json({
            message: 'Location updated successfully',
            data: location,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};

exports.getLocationCsvData = async (req, res) => { }

exports.deleteLocation = async (req, res) => { }

exports.getUser = async (req, res) => { }