const fs = require('fs');
const path = require('path');

module.exports = config => {
	config.devServer = {
		host: 'localhost',
		port: 8080,
		disableHostCheck: true
	};
}