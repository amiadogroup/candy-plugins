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

/** Class: CandyShop.Paint
 * Paint Plugin Class
 */
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
		var html = '<li id="paint-control" data-tooltip="' + $.i18n._('candyshopPaintDoPaint') + '"><span class="paint" id="paint-control-indicator"></span></li>';
		$('#emoticons-icon').after(html);
		$('#paint-control').click(function(event) {
			CandyShop.Paint.showPainter(this);
		});
	};
	
	self.showPainter = function(elem) {
		elem = $(elem);
		var pos = elem.offset(),
			menu = $('#context-menu'),
			content = $('ul', menu),
			canvas = '<canvas width="320" height="160" />',
			send = '<input id="paint-send" type="button" value="' + $.i18n._('send') + '" />',
			cancel = '<input id="paint-cancel" type="button" value="' + $.i18n._('cancel') + '" />',
			color = '<select id="paint-color"><option value="#000000">Schwarz</option><option value="#FF0000">Rot</option><option value="#00FF00">Grün</option><option value="#0000FF">Blau</option></select>',
			width = '<select id="paint-width"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="5">5</option><option value="10">10</option></select>', 
			paint = '';

		$('#tooltip').hide();
		
		paint = canvas + send + cancel + color + width;

		content.html('<li class="paint">' + paint + '</li>');
		self.PaintArea.init(content.find('canvas'));
		
		$('#paint-send').click(function(event) {
			Candy.Core.Action.Jabber.Room.Message(
				Candy.View.getCurrent().roomJid,
				'paint:' + CandyShop.Paint.PaintArea.getData(),
				'groupchat'
			);
		});

		var posLeft = Candy.Util.getPosLeftAccordingToWindowBounds(menu, pos.left),
			posTop  = Candy.Util.getPosTopAccordingToWindowBounds(menu, pos.top);

		menu.css({'left': posLeft.px, 'top': posTop.px, backgroundPosition: posLeft.backgroundPositionAlignment + ' ' + posTop.backgroundPositionAlignment});
		menu.fadeIn('fast');

		return true;
	};
	

	self.PaintArea = {
		started : false,
		context : false,
		strokes : new Array(),

		init : function(canvas) {
			if (!canvas.get(0).getContext) {
				alert('Error: no canvas.getContext!');
				return;
			}

			// Get the 2D canvas context.
			this.context = canvas.get(0).getContext('2d');
			if (!this.context) {
				alert('Error: failed to getContext!');
				return;
			}

			// Attach the mousemove event handler.
			canvas.bind('mousedown', function(event) {
				CandyShop.Paint.PaintArea.context.beginPath();
				CandyShop.Paint.PaintArea.context.strokeStyle = $('#paint-color').val();
				CandyShop.Paint.PaintArea.context.lineWidth = $('#paint-width').val();
				CandyShop.Paint.PaintArea.context.moveTo(event.offsetX, event.offsetY);
				CandyShop.Paint.PaintArea.started = true;
				CandyShop.Paint.PaintArea.strokes.push({
					color : $('#paint-color').val(),
					width : $('#paint-width').val(),
					points: new Array()
				});
				CandyShop.Paint.PaintArea.strokes[CandyShop.Paint.PaintArea.strokes.length - 1].points.push({
					x : event.offsetX,
					y : event.offsetY
				});
			});
			canvas.bind('mousemove', function(event) {
				if (CandyShop.Paint.PaintArea.started) {
					CandyShop.Paint.PaintArea.strokes[CandyShop.Paint.PaintArea.strokes.length - 1].points.push({
						x : event.offsetX,
						y : event.offsetY
					});
					CandyShop.Paint.PaintArea.context.lineTo(event.offsetX, event.offsetY);
					CandyShop.Paint.PaintArea.context.stroke();
				}
			});
			canvas.bind('mouseout', function(event) {
				CandyShop.Paint.PaintArea.context.closePath();
				CandyShop.Paint.PaintArea.started = false;
			});
			canvas.bind('mouseup', function(event) {
				CandyShop.Paint.PaintArea.context.closePath();
				CandyShop.Paint.PaintArea.started = false;
			});
		},
		
		getData: function() {
			return JSON.stringify({strokes: this.strokes});
		}
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
			context.lineWidth = stroke.width;
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