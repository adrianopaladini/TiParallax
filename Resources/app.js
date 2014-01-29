
// Include Util functions
Ti.include('parallax.js');

// Start App
(function(){
	// create window
    var win = Ti.UI.createWindow();
    
    // create parallax
    var parallax = createParallax({
        contentWidth:2000,
        contentHeight:600,
        top:0,
        left:0,
        layers:[
                {image:'/01.png',width:2000,height:600},
                {image:'/02.png',width:2200,height:600},
                {image:'/03.png',width:2450,height:600},
                {image:'/04.png',width:2800,height:600},
                {image:'/05.png',width:3200,height:600},
            ]
        });

    // add parallax to window
    win.add(parallax);
    // open window
    win.open();
    
})();
