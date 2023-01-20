const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}.`);
	});
});
