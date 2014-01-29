
// Main Parallax function
var createParallax = function(args){
    
    // Variables
    var def = { top:null, left:null, width:Ti.UI.FILL, height:Ti.UI.FILL, contentWidth:'auto', contentHeight:'auto', layers:null };
    var def_layer = null;
    var dif_W = 0;
    var dif_H = 0;
    
    // get arguments
    if(args){ for(var arg in args){ def[arg] = args[arg]; } }
    
    // create main parallax area
    var main = Ti.UI.createScrollView();
    
    // setup main parallax area
    main.top=def.top;
    main.left=def.left;
    main.width=def.width;
    main.height=def.height;
    main.contentWidth=def.contentWidth;
    main.contentHeight=def.contentHeight;
    main.disableBounce=true;
    
    // Calculate diff (outter) area from window
    dif_W = (main.contentWidth-main.size.width);
    dif_H = (main.contentHeight-main.size.height);
    
    // function to return a layer
    main.layer=function(index){
        return main.getChildren()[index];
    };
    
    // function to add layer to
    main.addLayer=function(layer,index){
        // Variables
        var currentLayer = null;
        def_layer = { top:null, left:null, width:Ti.UI.SIZE, height:Ti.UI.SIZE, opacity:1, image:null, view:null };
        
        // get arguments of layer
        for(var arg in layer){ def_layer[arg] = layer[arg]; }
        
        // create image layer ou set view layer
        if(def_layer.image!=null){
            currentLayer = Ti.UI.createImageView();
            currentLayer.image=def_layer.image;
        }else{
            currentLayer = def_layer.view;
        }
        
        // setup layer
        currentLayer.zIndex = index;
        currentLayer.top = def_layer.top;
        currentLayer.left = def_layer.left;
        currentLayer.originalTop = def_layer.top;
        currentLayer.originalLeft = def_layer.left;
        currentLayer.width = def_layer.width;
        currentLayer.height = def_layer.height;
        currentLayer.opacity = def_layer.opacity;
        currentLayer.speed = def_layer.speed;

        // add layer to main stage
        main.add(currentLayer);
    };
    
    // create layers
    if(def.layers.length>0){
        for(var i=0;i<def.layers.length;i++){
            main.addLayer(def.layers[i],i);
        }
    }
    
    // scroll event
    main.addEventListener('scroll',function(e){
        // move diff
        var px = e.x/dif_W;
        var py = e.y/dif_H;
        
        // get layers
        for(var i=0;i<main.getChildren().length;i++){
            
            var dif = 0;
            var pos = 0;
            ob = main.getChildren()[i];
            
            // move layer in horizontal
            if(ob.width!=def.contentWidth){
                dif = (ob.width - def.contentWidth);
                pos = -parseInt((dif * px),10);
                ob.left = pos;
            }
            
            // move layer in vertical
            if(ob.height!=def.contentHeight){
                dif = (ob.height - def.contentHeight);
                pos = -parseInt((dif * py),10);
                ob.top = pos;
            }
        }
    });

    // return parallax area
    return main;
};

