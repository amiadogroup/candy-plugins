/** File: candy.js
 * Candy Game Pictionary
 * 
 * Authors:
 *  - Jonatan Männchen <jonatan.maennchen@amiadogroup.com>
 * 
 * Copyright:
 *  - (c) 2012 Amiado Group AG. All rights reserved.
 */

if(CandyShop.GameAPI) {
	CandyShop.GameAPI.Pictionary = (function(self, Candy, $) {
		/** Object: about
		 * About Game API
		 *
		 * Contains:
		 *   (String) name - Candy Game Pictionary
		 *   (Float) version - Candy Game Pictionary version
		 */
		self.about = {
			name: 'Candy Game Pictionary',
			version: '0.1.1'
		};
		
		/** Function: init
		 * Initializes the game-api plugin with the default settings.
		 */
		self.init = function(){
		};
		
		/** Function: createGame
		 * Create a Game
		 */
		self.createGame = function() {
			return {
				/** Boolean: started
				 * Contains if game is started
				 */
				started: false,
				
				/** Function apiCall
				 * Call from API to Game
				 * 
				 * Parameters:
				 *   (Object) data
				 */
				apiCall: function(data) {
					if(typeof data.command != 'undefined') {
						if(data.command == 'draw') {
							this.draw(data.points);
						} else if(data.command == 'start') {
							this.start();
						} else if(data.command == 'end') {
							this.end();
						}
					}
				},
				
				/** Function: start
				 * Start this Game
				 */
				start: function() {
					this.started = true;
					console.log('Started');
				},
				
				/** Function: draw
				 * Draw a line
				 * 
				 * Parameters:
				 *   (Object) points
				 */
				draw: function(points) {
					if(this.started) {
						console.log(points);
					}
				},
				
				/** Function: end
				 * End this Game
				 */
				end: function() {
					this.started = false;
					console.log('Ended');
				}
			};
		};
		
		return self;
	}(CandyShop.GameAPI.Pictionary || {}, Candy, jQuery));
}