const common = require('./common');

let fn = {};

fn.getAlgorithm = (points) => {
	let caps = common.config['buildings']['caps'];
	let cap = Math.min.apply(null, caps.filter(function(v) {
		return v >= points;
	}));
	return common.config['buildings']['parts'][caps.indexOf(cap)];
};

module.exports = fn;