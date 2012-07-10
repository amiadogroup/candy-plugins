/** File: candy.js
 * Candy Paint Plugin
 * 
 * Authors:
 *  - Jonatan Männchen <jonatan.maennchen@amiadogroup.com>
 * 
 * Copyright:
 *  - (c) 2012 Amiado Group AG. All rights reserved.
 */

var CandyShop = (function(self) { return self; }(CandyShop || {}));

CandyShop.Paint = (function(self, Candy, $) {
	/** Object: about
	 * About Game API
	 *
	 * Contains:
	 *   (String) name - Candy Paint Plugin
	 *   (Float) version - Candy Paint Plugin version
	 */
	self.about = {
		name: 'Candy Paint Plugin',
		version: '0.1.1'
	};
	
	/** Object: paintings
	 * Holds all Paintings
	 * 
	 * Contains:
	 *   (List Objects) strokes
	 *     (String) color
	 *     (Integer) strength
	 *     (List Objects) points
	 *     	 (Integer) x
	 *       (Integer) y
	 */
	self.paintings = {};
	
	/** Function: init
	 * Initializes the paint plugin with the default settings.
	 */
	self.init = function(){
		/* Init Message Observers */
		Candy.View.Event.Message.beforeShow = function(args) {
			if(args.message.substring(0, 6) == 'paint:') {
				try {
					return CandyShop.Paint.preparePainting($.parseJSON(args.message.substring(6)));
				} catch(e) {
					return null;
				}
			} else {
				return args.message;
			}
		};
		Candy.View.Event.Message.onShow = function(args) {
			$('.candy_painting_hidden').each(function(index, canvas) {
				if(typeof CandyShop.Paint.paintings[canvas.id] != 'undefined') {
					CandyShop.Paint.drawPainting(canvas);
				}
			});
		};
	};
	
	/** Function: preparePainting
	 * Prepare a painting
	 * 
	 * Parameters:
	 *   (List Objects) strokes
	 *     (String) color
	 *     (Integer) strength
	 *     (List Objects) points
	 *     	 (Integer) x
	 *       (Integer) y
	 */
	self.preparePainting = function(strokes) {
		var name = new Date().getSeconds().toString() + new Date().getMilliseconds().toString() + Math.floor((Math.random()*10000)+1).toString();
		this.paintings[name] = strokes;
		return '<canvas id="'+name+'" class="candy_painting candy_painting_hidden" width="320" height="160"></canvas>';
	};
	
	/** Function: drawPainting
	 * Look for prepared undrown paintings
	 * 
	 * Parameters:
	 *   (Element) canvas
	 */
	self.drawPainting = function(canvas) {
		/* Set to painted */
		jQuery(canvas).removeClass('candy_painting_hidden');
		
		/* load context */
		if (!canvas.getContext) { return; }
		var context = canvas.getContext('2d');
		if (!context) { return; }
		
		for(i in this.paintings[canvas.id].strokes) {
			var stroke = this.paintings[canvas.id].strokes[i];
			
			context.beginPath();
			context.strokeStyle = stroke.color;
			context.lineWidth = stroke.strength;
			context.moveTo(stroke.points[0].x, stroke.points[0].y);
			
			for(j in stroke.points) {
				var point = stroke.points[j];
				
				context.lineTo(point.x, point.y);
				context.stroke();
			}
			context.closePath();
		}
	};
	
	return self;
}(CandyShop.Paint || {}, Candy, jQuery));