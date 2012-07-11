<<<<<<< HEAD
# Colors
Send and receive colored messages.

![Color Picker](/amiadogroup/candy-plugins/raw/master/colors/screenshot.png)

## Usage
To enable *Colors* you have to include its JavaScript code and stylesheet: 

```HTML
<script type="text/javascript" src="candyshop/colors/candy.js"></script>
<link rel="stylesheet" type="text/css" href="candyshop/colors/candy.css" />
```

Call its `init()` method after Candy has been initialized: 
=======
# Text color plugin
This plugin will allow the user to select colors for the text

## Usage
Include the JavaScript file:

```HTML
<script type="text/javascript" src="path_to_plugins/colors/candy.js"></script>
```

Call its `init()` method after Candy has been initialized:
>>>>>>> fixes/dev

```JavaScript
Candy.init('/http-bind/');

<<<<<<< HEAD
// enable Colors plugin (default: 8 colors)
CandyShop.Colors.init(); 
=======
CandyShop.Colors.init();
>>>>>>> fixes/dev

Candy.Core.connect();
```

<<<<<<< HEAD
To enable less or more colors just call `CandyShop.Colors.init(<number-of-colors>)`.
=======
## Configuration options
colors - Integer - The number of colors to allow. Defaults to 8

## Example configurations
```JavaScript
// Add only 4 colors
CandyShop.Colors.init({
    colors: 4
});
```
>>>>>>> fixes/dev
