function CMenu(){
    var _oBg;
    var _oButPlay;
    var _oAudioToggle;
    var _ButMoreGames;
    var _oFade;
    
    this._init = function(){
        _oBg = new createjs.Bitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);

        //play button begin
        var oSpritePlay = s_oSpriteLibrary.getSprite('menu_start');
        var oPlayData = {   
                        images: [oSpritePlay], 
                        frames: {width: 96, height: 96, regX: 48, regY: 48}, 
                        framerate: 10,
                        animations: {move: {frames: [0,1,2,3,4,5,6,7,7,7,7,7,7]}}
                    };
        var oSpritePlaySheet = new createjs.SpriteSheet(oPlayData);
        var _oSpritePlay = new createjs.Sprite(oSpritePlaySheet, "move");
        _oButPlay = new CGfxButton((CANVAS_WIDTH/2+31),CANVAS_HEIGHT/2+26, _oSpritePlay);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        //play button end

        //car begin
        var oSpriteDecorCar = s_oSpriteLibrary.getSprite('menu_car');
        var _oCarData = {   
                        images: [oSpriteDecorCar], 
                        frames: {width: 337, height: 234.5, regX: 168.5, regY: 117.25}, 
                        animations: {move: [0,7]}
                    };
        var oSpriteDecorCarSheet = new createjs.SpriteSheet(_oCarData);
        var _oSpriteDecorCar = new createjs.Sprite(oSpriteDecorCarSheet, "move");
        _oSpriteDecorCar.x = 460;
        _oSpriteDecorCar.y = 650;
        _oSpriteDecorCar.play();
        s_oStage.addChild(_oSpriteDecorCar);
        //car end

        var _oDecorHome = new createjs.Bitmap( s_oSpriteLibrary.getSprite('menu_home'));
        _oDecorHome.x = 55;
        _oDecorHome.y = 270;
        s_oStage.addChild(_oDecorHome);

        var _oDecorCook = new createjs.Bitmap( s_oSpriteLibrary.getSprite('menu_cook'));
        _oDecorCook.x = 800;
        _oDecorCook.y = 287;
        s_oStage.addChild(_oDecorCook);

        var _oLoginFb = new CGfxButton(CANVAS_WIDTH - 30 - 150, 40, s_oSpriteLibrary.getSprite('menu_login_fb'), true);
        var _oLoginGp = new CGfxButton(CANVAS_WIDTH - 30 - 80, 40, s_oSpriteLibrary.getSprite('menu_login_gp'), true);
        var _oLoginVk = new CGfxButton(CANVAS_WIDTH - 30 - 10, 40, s_oSpriteLibrary.getSprite('menu_login_vk'), true);

        var oSpriteMoreGames = s_oSpriteLibrary.getSprite('but_more_games');
        _ButMoreGames = new CGfxButton((oSpriteMoreGames.width/2) + 5,(oSpriteMoreGames.height/2) + 5,oSpriteMoreGames, true);

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('setting_icon');
            // _oAudioToggle = new CGfxButton(CANVAS_WIDTH - (oSprite.width/2) - 10,(oSprite.height/2) + 10,oSprite, true);
            //_oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);

            s_oSoundtrack = createjs.Sound.play("soundtrack",{ loop:100});
        }

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        
        s_oStage.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0}, 1000).call(function(){_oFade.visible = false;});  
    };
    
    this.unload = function(){
        _oButPlay.unload(); 
        _oButPlay = null;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            // _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        s_oStage.removeChild(_oBg);
        _oBg = null;
        
        s_oStage.removeChild(_oFade);
        _oFade = null;
    };
    
    this._onButPlayRelease = function(){
        this.unload();
        s_oMain.gotoRoadMap();
    };

    this._onAudioToggle = function(){
        createjs.Sound.setMute(!s_bAudioActive);
    };
    
    this._init();
}