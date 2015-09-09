/**
 * LiveUI for Node.js
 * https://github.com/Ridiculous-Innovations/LiveUI-Node.js
 *
 * Copyright (c) 2015 Ondrej Rafaj
 * Licensed under the MIT license.
 */

module.exports = function LiveUI(apiKey, pathToTempFolder) {
	
	//this.config.apiKey = apiKey;
	
	function LiveUI(apiKey) {
		console.log('constructor');
	};
	
	/**
	* Your app API key, you can find it in LiveUI admin panel (admin.liveui.io)
	*
	*
	*/
	this.config = {
		apiKey: apiKey,
		build: 'live',
		debug: false,
		replaceStringsWithUnderscores: false,
		cacheExpiry: 180, 							// In minutes; Min is 5 minutes
		cacheFolderPath: '/tmp/liveui/',
		apiUrl: "http://api.liveui.io/",
		imagesUrl: "http://images.liveui.io/"
	};
	
	/**
	* Return a translation string for a key and language code
	*
	* @param  {String} key
	* @param  {String} langCode
	* @return {String}
	*/
	this.translation = function(key, langCode) {
		return 'Translation back :)';
	},
	
	/**
	* Unescape special characters in the given string of html.
	*
	* @param  {String} key
	* @param  {String} langCode
	* @return {Data}
	*/
	this.image = function(key, langCode) {
		return null;
	},
	
	/**
	* Unescape special characters in the given string of html.
	*
	* @param  {String} key
	* @return {String}
	*/
	this.color = function(key) {
		return 'FF0000';
	},
	
	/**
	* Unescape special characters in the given string of html.
	*
	* @param  {String} key
	* @return {int}
	*/
	this.colorAlpha = function(key) {
		return 80;
	},
	
	/**
	* Check if all is setup for a LiveUI call
	*
	* @return {bool}
	*/
	this.doCheck = function() {
		if (!this.config.apiKey) {
			throw new Error('API key is not present');
			return false;
		}
		return true;
	},
	
	/**
	* Available language codes
	*
	* @return {Array}
	*/
	this.languageCodes = function() {
		return null;
	},
	
	/**
	* Reload data from the LiveUI servers
	*/
	this.reloadData = function() {
		this._getApi('translations', null);
		this._getApi('visuals/images', null);
		this._getApi('visuals/colors', null);
	};
	
	//
	// ------------------ Private functions ------------------
	//
	
	this._storage = null;
	
	this._init = function() {
		console.log('Initializing LiveUI for Node.js');
		this._storage = require('node-persist');
		this.reloadData();
	};
	
	this._getApi = function(path, data) {
		console.log('Trying to update ' + path + ' from ' + this.config.apiUrl);
		
		var request = require('request');
		var os = require('os');
		
		var options = {
			url: this.config.apiUrl + path + '.json',
			headers: {
				'X-ApiKey': this.config.apiKey,
				'X-AppBuild': this.config.build,
				'X-ApiVersion': '1.0',
				'X-Platform': 'Node.js',
				'X-PlatformVersion': process.version,
				'X-ModuleVersion': '0.0.1',
				'X-OsName': os.type(),
				'X-OsHostName': os.hostname(),
				'X-OsArch': os.arch(),
				'X-OsUptime': os.uptime(),
				'X-OsTotalMem': os.totalmem(),
				'X-OsFreeMem': os.freemem(),
				'Content-Type': 'application/json',
			}
		};
		
		var self = this;
		
		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				var res = JSON.parse(body);
				if (res.data != undefined) {
					var cache = require('js-cache');
					cache.set(res.apiId, res.data, (60 * self.config.cacheExpiry));
				}
			}
			else {
				console.log(error);
			}
		}
		
		request(options, callback);
	};
	
	// Initialize LiveUI
	
	this._init();
	
};















