const path = require("path");
const loaderUtils = require("loader-utils");

module.exports = function(content, map, meta) {
	const options = loaderUtils.getOptions(this) || {};

	let css = content.trim();

	function generateInsertHtmlCode(html) {
		return `document.head.insertAdjacentHTML('beforeend', '${html}');`;
	}

	if (options.extractFiles) {
		let fileName = path.parse(this.resourcePath).name + ".css";
		this.emitFile(fileName, content);

		content = `/* ${fileName} extracted */\n`;
		content += generateInsertHtmlCode(`<link type="text/css" rel="stylesheet" href="${fileName}"/>`);
	}
	else {
		content = generateInsertHtmlCode(`<style type="text/css">${css}</style>`);
	}

	this.callback(null, content, map, meta);
};
