function CRoadMap(oData){

    var _oBgAttach;
    var _oBg;
    var _oDecorAttach;
    var _oCurveAttach;
    var _oCandiessAttach;
    var _oСurtainAttach;
    var _bUpdate;

    var _ButMoreGames;

    var _oFade;

    var _oCandies = [];
    var _oCurtians = [];

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

        var oSpriteMoreGames = s_oSpriteLibrary.getSprite('but_more_games');
        _ButMoreGames = new CGfxButton((oSpriteMoreGames.width/2) + 5,(oSpriteMoreGames.height/2) + 5,oSpriteMoreGames, true);
    
        _oDecorAttach = new createjs.Container();
        this.makeDecor(_oDecorAttach);
        s_oStage.addChild(_oDecorAttach);

        this.readState(); //dummy

        _oCurveAttach = new createjs.Container();
        s_oStage.addChild(_oCurveAttach);

        _oCandiessAttach = new createjs.Container();
        s_oStage.addChild(_oCandiessAttach);
        this.makePath(0, _currPoint); //temp

        _oCurtianAttach = new createjs.Container();
        s_oStage.addChild(_oCurtianAttach);


        this.openCurtians();

      _bUpdate = true;
    };

    this.openCurtians = function(){

      var _oCurtianSprite = [];

      // _oFade = new createjs.Shape();
      // _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
      // s_oStage.addChild(_oFade);
      // createjs.Tween.get(_oFade).to({alpha:0}, 2000).call(function(){_oFade.visible = false;});


      for (var i = 4; i >= 0; i--) {
        _oCurtianSprite[i] = s_oSpriteLibrary.getSprite('roadmap_start_' + i);
        _oCurtians[i] = new createjs.Bitmap(_oCurtianSprite[i]);
        // _oCurtians[i].visible = false;
        _oCurtianAttach.addChild(_oCurtians[i]);
      };

      _oCurtians[0].x = (CANVAS_WIDTH / 2) - (_oCurtianSprite[0].width / 2); // центр
      _oCurtians[0].y = (CANVAS_HEIGHT / 2) - (_oCurtianSprite[0].height / 2); //центр

      _oCurtians[1].x = (CANVAS_WIDTH) - (_oCurtianSprite[1].width); // правый
      _oCurtians[1].y = 0; // верхний

      _oCurtians[2].x = (CANVAS_WIDTH) - (_oCurtianSprite[2].width);//правый
      _oCurtians[2].y = (CANVAS_HEIGHT) - (_oCurtianSprite[2].height);//нижний

      _oCurtians[3].x = 0;
      _oCurtians[3].y = (CANVAS_HEIGHT) - (_oCurtianSprite[3].height);//нижний

      _oCurtians[4].x = 0;// левый 
      _oCurtians[4].y = 0;// верхний       

      createjs.Tween.get(_oCurtians[0]).to({y: -1500}, 3000).call(function(){_oCurtians[0].visible = false;});
      createjs.Tween.get(_oCurtians[1]).to({x: 2000, y: -1500}, 3000).call(function(){_oCurtians[1].visible = false;});
      createjs.Tween.get(_oCurtians[2]).to({x: 2000, y: 1500}, 3000).call(function(){_oCurtians[2].visible = false;});
      createjs.Tween.get(_oCurtians[3]).to({x: -2000, y: 1500}, 3000).call(function(){_oCurtians[3].visible = false;});
      createjs.Tween.get(_oCurtians[4]).to({x: -2000, y: -1500}, 3000).call(function(){_oCurtians[4].visible = false;});

    };

    this.closeCurtian = function(){ //?

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
      var _oAddPathSprite = s_oSpriteLibrary.getSprite('roadmap_path_' + ((_idPath+1)%2));

      var _oPath = new createjs.Bitmap(_oPathSprite); //temp
      var _x_fix = (CANVAS_WIDTH - _oPathSprite.width) / 2;
      // _oPath.x = ((CANVAS_WIDTH - GAME_WIDTH) / 2);      
      _oPath.x = (_x_fix);
      _oPath.y = ((CANVAS_HEIGHT - _oPathSprite.height) / 2);

      _oCurveAttach.addChild(_oPath);

      var _oPathL = new createjs.Bitmap(_oAddPathSprite);
      _oPathL.x = _oPath.x - _oAddPathSprite.width;
      _oPathL.y = _oPath.y + 4; //LINK!!!
      _oCurveAttach.addChild(_oPathL);

      var _oPathR = new createjs.Bitmap(_oAddPathSprite);
      _oPathR.x = _oPath.x + _oAddPathSprite.width;
      _oPathR.y = _oPath.y + 4;//LINK!!! (magic number)
      _oCurveAttach.addChild(_oPathR);

      

      var _oCandiesSprite, _oCandiesIndex;

      for (var i = 0; i < LEVELS_ON_MAP; i++){
        if(i < _currPoint) {
          _oCandiesIndex = LEVELS_CANDY_DONE;
        } else if (i == _currPoint) {
          _oCandiesIndex = LEVELS_CANDY_INPROGRESS;
        } else if (i > _currPoint) {
          _oCandiesIndex = LEVELS_CANDY_CLOSE;
        }
        _oCandiesSprite = s_oSpriteLibrary.getSprite('roadmap_candy_' + _oCandiesIndex);
        _oCandies[i] = new CGfxButton(_roadPointsDefaults[_idPath][i].x + _x_fix, _roadPointsDefaults[_idPath][i].y, _oCandiesSprite, true);

        switch (_oCandiesIndex) {
          case LEVELS_CANDY_CLOSE: 
            _oCandies[i].addEventListener(ON_MOUSE_UP, function(){
              alert('Access denied!'); //TODO: make popup or nothing
            }, this);
          break;

          case LEVELS_CANDY_DONE: 
          case LEVELS_CANDY_INPROGRESS: 
            _oCandies[i].addEventListener(ON_MOUSE_UP, this.doPlay, this);
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

        for (var i = 0; i < _oCandies.length; i++) {
          _oCandies[i].unload();
        };

        s_oStage.removeAllChildren();
    };
  
    this._init();
}

var s_oGame;
var s_oBezier;