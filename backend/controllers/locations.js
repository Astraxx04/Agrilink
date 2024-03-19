const fs = require("fs");
const path = require('path');

const getLocation = async (req, res) => {
	const { lat, lon } = req.body;
	try {
		const response = await axios.get(
			`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&zoom=10&format=json`
		);
		const importance = response.data.importance;
		const rank = response.data.place_rank;
		const placeName = response.data.address;
		const type = response.data.type;
		res.send({ placeName, importance, rank, type });
	} catch (error) {
		console.error("Error fetching data:", error);
		res.status(500).json({ error: "An error occurred" });
	}
};

const location = (req, res) => {
	console.log(req.query);
	let { lat, lon } = req.query;
	lat = Number(lat);
	lon = Number(lon);
	lat = lat.toFixed(4);
	lat = parseFloat(lat);
	lon = lon.toFixed(4);
	lon = parseFloat(lon);
    const filePath = path.resolve(__dirname, '../locations.json');
	fs.readFile(filePath, "utf8", (err, data) => {
		if (err) {
			console.error(err);
			res.status(500).json({ error: "Internal Server Error" });
			return;
		} else {
			let ObjData = JSON.parse(data);
			let arrayData = ObjData.locations;
			let minValue = 1000;
			let DataItem = {};
			let location = "";
			arrayData.map((item) => {
				if (
					minValue >
					Math.min(
						minValue,
						Math.abs(item.latitude - lat) +
							Math.abs(item.longitude - lon)
					)
				) {
					minValue = Math.min(
						minValue,
						Math.abs(item.latitude - lat) +
							Math.abs(item.longitude - lon)
					);
					DataItem = item;
				}
			});
			console.log(minValue);
			res.send({
				price: DataItem.price_estimate_per_sqft.average,
				location: DataItem.location,
			});
		}
	});
};

module.exports = {
    getLocation,
    location
};