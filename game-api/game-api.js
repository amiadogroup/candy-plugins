/** File: game-api.js
 * Candy Game API
 * 
 * Authors:
 *  - Jonatan Männchen <jonatan.maennchen@amiadogroup.com>
 * 
 * Copyright:
 *  - (c) 2012 Amiado Group AG. All rights reserved.
 */

var CandyShop = (function(self) { return self; }(CandyShop || {}));

CandyShop.GameAPI = (function(self, Candy, $) {
	/** Object: about
	 * About Game API
	 *
	 * Contains:
	 *   (String) name - Candy Game API
	 *   (Float) version - Candy Game API version
	 */
	self.about = {
		name: 'Candy Game API',
		version: '0.1.1'
	};
	
	return self;
}(CandyShop.GameAPI || {}, Candy, jQuery));