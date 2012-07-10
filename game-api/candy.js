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
	
	/** Object: games
	 * Holds Opend Games
	 * 
	 * Contains List:
	 *   (Object) room - A Game
	 */
	self.games = {};
	
	/** Function: init
	 * Initializes the game-api plugin with the default settings.
	 */
	self.init = function(){
		Candy.View.Event.Message.beforeShow = this.handleBeforeShow;
	};
	
	/** Function: handleBeforeShow
	 * Looks into message, if message contains
	 * api-stuff, hide and handle it.
	 * 
	 * Parameters:
	 *   (Array) args
	 */
	self.handleBeforeShow = function(args) {
		if(args.message.substring(0, 9) == 'game-api:') {
			try {
				CandyShop.GameAPI.apiCall(args.roomJid, $.parseJSON(args.message.substring(9)));
			 } catch (e) {
				 console.log(e);
				 return args.message;
			 }
			return null;
		} else {
			return args.message;
		}
	};
	
	/** Function: apiCall
	 * Make an API Call
	 * 
	 * Parameters:
	 *   (String) roomJid
	 *   (Array) data
	 */
	self.apiCall = function(roomJid, data) {
		if(typeof this.games[roomJid] != 'undefined') {
			this.games[roomJid].apiCall(data);
		} else {
			// Not implemented for now....
			console.log('Should do an Invite now...');
		}
	};
	
	return self;
}(CandyShop.GameAPI || {}, Candy, jQuery));