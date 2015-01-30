function CRoadMap(oData){

    var _oBgAttach;
    var _oBg;
    var _oDecorAttach;
    var _oCurveAttach;
    var _oCandysAttach;    
    var _bUpdate;

    var _oCandy = [];
    var _currPoint = 0;

    var _roadPointsDefaults = [
      [
        {x: 94, y: 170}, 
        {x: 267, y: 165}, 
        {x: 447, y: 154}, 
        {x: 658, y: 166}, 
        {x: 846, y: 194}, 
        {x: 930, y: 346}, 
        {x: 765, y: 430}, 
        {x: 588, y: 393}, 
        {x: 380, y: 375}, 
        {x: 188, y: 387}, 
        {x: 146, y: 540}, 
        {x: 346, y: 608}, 
        {x: 556, y: 622}, 
        {x: 764, y: 622}, 
        {x: 950, y: 615}
      ],
      [
        {x: 69, y: 615}, 
        {x: 154, y: 622}, 
        {x: 464, y: 621}, 
        {x: 675, y: 608}, 
        {x: 879, y: 540}, 
        {x: 832, y: 387}, 
        {x: 640, y: 375}, 
        {x: 434, y: 390}, 
        {x: 256, y: 430}, 
        {x: 92, y: 344}, 
        {x: 172, y: 189}, 
        {x: 368, y: 164}, 
        {x: 579, y: 158}, 
        {x: 758, y: 164}, 
        {x: 924, y: 170}
      ]
    ]

    this._init = function(){

        // s_oBezier = new CBezier();
        
        _oBgAttach = new createjs.Container();
        _oBg = new createjs.Bitmap(s_oSpriteLibrary.getSprite('bg_roadmap'));
        _oBgAttach.addChild(_oBg);
        s_oStage.addChild(_oBgAttach);
    
        _oDecorAttach = new createjs.Container();
        this.makeDecor(_oDecorAttach);
        s_oStage.addChild(_oDecorAttach);

        this.readState(); //dummy

        _oCurveAttach = new createjs.Container();
        s_oStage.addChild(_oCurveAttach);

        _oCandysAttach = new createjs.Container();
        s_oStage.addChild(_oCandysAttach);
        this.makePath(0, _currPoint); //temp
        

      _bUpdate = true;
    };

    this.makeDecor = function(_oDecorAttach){
      var _oDecor;
      var _oDecorSprite;
      for (var i = 0; i < 5; i++) {
        _oDecorSprite = s_oSpriteLibrary.getSprite('roadmap_decor_' + (i + 1));
        _oDecor = new createjs.Bitmap(_oDecorSprite);
        _oDecor.x = Math.floor(Math.random() * (CANVAS_WIDTH - _oDecorSprite.width));
        _oDecor.y = Math.floor(Math.random() * (CANVAS_HEIGHT - _oDecorSprite.height));
        _oDecorAttach.addChild(_oDecor);
      };
      
    };

    this.makePath = function(_idPath, _currPoint){
      var _oPathSprite = s_oSpriteLibrary.getSprite('roadmap_path_' + _idPath);
      var _oPath = new createjs.Bitmap(_oPathSprite); //temp
      var _x_fix = (CANVAS_WIDTH - _oPathSprite.width) / 2;
      // _oPath.x = ((CANVAS_WIDTH - GAME_WIDTH) / 2);      
      _oPath.x = (_x_fix);
      _oPath.y = ((CANVAS_HEIGHT - _oPathSprite.height) / 2);

      _oCurveAttach.addChild(_oPath);

      var _oCandySprite, _oCandyIndex;

      for (var i = 0; i < LEVELS_ON_MAP; i++){
        if(i < _currPoint) {
          _oCandyIndex = LEVELS_CANDY_DONE;
        } else if (i == _currPoint) {
          _oCandyIndex = LEVELS_CANDY_INPROGRESS;
        } else if (i > _currPoint) {
          _oCandyIndex = LEVELS_CANDY_CLOSE;
        }
        _oCandySprite = s_oSpriteLibrary.getSprite('roadmap_candy_' + _oCandyIndex);
        _oCandy[i] = new CGfxButton(_roadPointsDefaults[_idPath][i].x + _x_fix, _roadPointsDefaults[_idPath][i].y, _oCandySprite, true);

        switch (_oCandyIndex) {
          case LEVELS_CANDY_CLOSE: 
            _oCandy[i].addEventListener(ON_MOUSE_UP, function(){
              alert('Access denied!'); //TODO: make popup or nothing
            }, this);
          break;

          case LEVELS_CANDY_DONE: 
          case LEVELS_CANDY_INPROGRESS: 
            _oCandy[i].addEventListener(ON_MOUSE_UP, this.doPlay, this);
          break;               
        }

      }
    };

    this.readState = function(){
      _currPoint = 2;
    };

    this.doPlay = function(){
        this.unload();
        s_oMain.gotoGame();      
    };
    
    this.unload = function(){
        _bUpdate = false;
        createjs.Sound.stop();

        for (var i = 0; i < _oCandy.length; i++) {
          _oCandy[i].unload();
        };

        s_oStage.removeAllChildren();
    };
  
    this._init();
}

var s_oGame;
var s_oBezier;