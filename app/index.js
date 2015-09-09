var LiveUI = require('../index');
var lui = new LiveUI("2AB3D033-10F8-48E8-9A1E-50A952CB0831");

//lui.config.apiKey = "2AB3D033-10F8-48E8-9A1E-50A952CB0831";

console.log(lui.config.apiKey);
console.log(lui.translation('MY_LANGUAGE_KEY', 'en'));
console.log(lui.image('MY_IMAGE_KEY', 'en'));
console.log(lui.color('MY_COLOR_KEY'));
console.log(lui.colorAlpha('MY_COLOR_KEY'));

//process.exit();
