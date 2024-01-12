const NodeGeocoder = require('node-geocoder');

exports.autocomplete = async (req, res) => {
    try {
        const { searchKey } = req.params;

        const options = {
            provider: 'openstreetmap',
        };
        const geocoder = NodeGeocoder(options);

        // Use the geocoder to get the latitude, longitude and details of a location
        const response = await geocoder.geocode(searchKey);

        res.status(200).json({
            message: '',
            data: response,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error getting location',
            data: null,
        });
    }
};