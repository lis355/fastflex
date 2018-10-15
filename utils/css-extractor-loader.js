const path = require("path");
const loaderUtils = require("loader-utils");

function getInjectCssLinkCode(contents) {
	contents = contents.trim();
	return `document.head.insertAdjacentHTML('beforeend', '<style type="text/css">${contents}</style>');`;
}

module.exports = function(content, map, meta) {
	const options = loaderUtils.getOptions(this) || {};

	if (options.extractFiles) {
		let fileName = path.parse(this.resourcePath).name + ".css";
		let filePath = fileName;

		this.emitFile(filePath, content);
		content = `/* ${fileName} extracted to file ${filePath} */`;
	}
	else {
		content = getInjectCssLinkCode(content);
	}

	this.callback(null, content, map, meta);
};
