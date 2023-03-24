function §\x01\x02§()
{
   return 2355 % 511 * 5;
}
var §\x01§ = -671 + "\x01\x02"();
while(true)
{
   if(eval("\x01") == 884)
   {
      set("\x01",eval("\x01") - 155);
      §§push(true);
   }
   else
   {
      if(eval("\x01") == 354)
      {
         set("\x01",eval("\x01") + 151);
         break;
      }
      if(eval("\x01") == 276)
      {
         set("\x01",eval("\x01") + 78);
         if(function §\x01\x02§()
         {
            return 2355 % 511 * 5;
         })
         {
            set("\x01",eval("\x01") + 151);
         }
      }
      else if(eval("\x01") == 271)
      {
         set("\x01",eval("\x01") + 630);
         §§push(true);
      }
      else if(eval("\x01") == 597)
      {
         set("\x01",eval("\x01") - 326);
      }
      else if(eval("\x01") == 414)
      {
         set("\x01",eval("\x01") - 364);
         §§push("\x0f");
      }
      else if(eval("\x01") == 940)
      {
         set("\x01",eval("\x01") - 530);
      }
      else if(eval("\x01") == 729)
      {
         set("\x01",eval("\x01") + 60);
         if(function §\x01\x02§()
         {
            return 2355 % 511 * 5;
         })
         {
            set("\x01",eval("\x01") + 25);
         }
      }
      else if(eval("\x01") == 901)
      {
         set("\x01",eval("\x01") - 872);
         if(function §\x01\x02§()
         {
            return 2355 % 511 * 5;
         })
         {
            set("\x01",eval("\x01") + 95);
         }
      }
      else
      {
         if(eval("\x01") != 410)
         {
            if(eval("\x01") == 789)
            {
               set("\x01",eval("\x01") + 25);
               toggleHighQuality();
               §§pop()[function §\x01\x02§()
               {
                  return 2355 % 511 * 5;
               }].gotoAndPlay();
               addr805:
               §§pop()[§§pop()] = §§pop();
               _loc2_.UpdateBullets = function()
               {
                  var _loc2_ = 0;
                  while(_loc2_ < this.bulletlist.length)
                  {
                     this.bulletlist[_loc2_].Update();
                     _loc2_ = _loc2_ + 1;
                  }
               };
               _loc2_.UpdateTowers = function()
               {
                  var _loc2_ = 0;
                  while(_loc2_ < this.towerlist.length)
                  {
                     this.towerlist[_loc2_].Update();
                     _loc2_ = _loc2_ + 1;
                  }
               };
               _loc2_.ShootBullet = function(ptower, ptarget)
               {
                  var _loc8_ = ptower.type;
                  var _loc10_ = 0;
                  var _loc5_ = 0;
                  var _loc4_ = 0;
                  if(ptarget)
                  {
                     _loc5_ = ptarget._x + ptarget.inner._x - 10 - ptower._x;
                     _loc4_ = ptarget._y + ptarget.inner._y - 15 - ptower._y;
                     var _loc9_ = Math.sqrt(_loc5_ * _loc5_ + _loc4_ * _loc4_);
                     _loc5_ /= _loc9_;
                     _loc4_ /= _loc9_;
                     _loc10_ = ptower.shootPower;
                  }
                  var _loc2_ = this.bulletholder.attachMovie(_loc8_,_loc8_ + random(99999),this.bulletholder.getNextHighestDepth());
                  _loc2_._x = ptower._x;
                  _loc2_._y = ptower._y;
                  _loc2_.vx = _loc5_ * _loc10_;
                  _loc2_.vy = _loc4_ * _loc10_;
                  _loc2_.pierceMax = ptower.pierceMax;
                  _loc2_.isspread = ptower.isspread;
                  _loc2_.game = this;
                  _loc2_.type = _loc8_;
                  _loc2_.shooter = ptower;
                  _loc2_.cacheAsBitmap = true;
                  _loc2_._xscale = _loc2_._yscale = ptower.bulletScale;
                  var _loc7_ = Math.atan(_loc4_ / _loc5_);
                  _loc7_ = 57.29577951308232 * _loc7_;
                  _loc2_._rotation = _loc7_ + 90;
                  if(_loc2_._rotation > 90 and _loc4_ < 0)
                  {
                     _loc2_._rotation -= 180;
                  }
                  if(_loc5_ < 0 and _loc4_ > 0)
                  {
                     _loc2_._rotation -= 180;
                  }
                  if(ptarget)
                  {
                     var _loc11_ = new Object();
                     ptower._rotation = _loc2_._rotation;
                     ptower.inner.arm.gotoAndPlay(2);
                     if(_loc2_.type == "dart" || _loc2_.type == "super")
                     {
                        _loc2_.inner._x += 8;
                        _loc2_.hitbit._x += 6;
                     }
                  }
                  _loc2_.Init();
                  this.bulletlist.push(_loc2_);
               };
               _loc2_.CreateNewTower = function(type, px, py)
               {
                  var _loc2_ = 0;
                  var _loc5_ = false;
                  switch(type)
                  {
                     case "dart":
                        _loc2_ = this.COST_DART;
                        break;
                     case "tack":
                        _loc2_ = this.COST_TACK;
                        break;
                     case "spikey":
                        _loc2_ = this.COST_SPIKEY;
                        break;
                     case "bomb":
                        _loc2_ = this.COST_BOMB;
                        break;
                     case "ice":
                        _loc2_ = this.COST_ICE;
                        break;
                     case "super":
                        _loc2_ = this.COST_SUPER;
                  }
                  if(_loc2_ > this.money)
                  {
                     this.Output("not enough money.");
                     return undefined;
                  }
                  this.money -= _loc2_;
                  this.UpdateMoney();
                  var _loc3_ = this.towerholder.attachMovie("tower" + type,"tower" + type + random(99999),this.towerholder.getNextHighestDepth());
                  _loc3_._x = px;
                  _loc3_._y = py;
                  _loc3_.type = type;
                  _loc3_.game = this;
                  _loc3_.Init();
                  this.towerlist.push(_loc3_);
                  this.SelectTower(_loc3_);
               };
               _loc2_.SellCurrentTower = function()
               {
                  if(this.currentTower != null)
                  {
                     this.money += Math.floor(this.SELL_RATE * this.currentTower.spentonme);
                     this.UpdateMoney();
                     this.RemoveTower(this.currentTower);
                     this.DeselectCurrent();
                  }
               };
               _loc2_.EnableOptions = function()
               {
                  this.toweroptions._visible = true;
                  this.toweroptions.sellfor_txt.text = Math.floor(this.SELL_RATE * this.currentTower.spentonme);
               };
               _loc2_.DisableOptions = function()
               {
                  this.toweroptions._visible = false;
               };
               _loc2_.RemoveTower = function(ptower)
               {
                  var _loc2_ = 0;
                  while(_loc2_ < this.towerlist.length)
                  {
                     if(ptower == this.towerlist[_loc2_])
                     {
                        this.towerlist.splice(_loc2_,1);
                        ptower.setDepthTo(mx.managers.DepthManager.kTop);
                        ptower.removeMovieClip();
                        return undefined;
                     }
                     _loc2_ = _loc2_ + 1;
                  }
               };
               _loc2_.RemoveBullet = function(pbul)
               {
                  var _loc2_ = 0;
                  while(_loc2_ < this.bulletlist.length)
                  {
                     if(pbul == this.bulletlist[_loc2_])
                     {
                        this.bulletlist.splice(_loc2_,1);
                        return undefined;
                     }
                     _loc2_ = _loc2_ + 1;
                  }
               };
               _loc2_.ClearBalloons = function()
               {
                  var _loc2_ = 0;
                  while(_loc2_ < 9999)
                  {
                     this.bloonholder["bloon" + _loc2_].removeMovieClip();
                     _loc2_ = _loc2_ + 1;
                  }
               };
               _loc2_.ClearBullets = function()
               {
                  while(this.bulletlist.length > 0)
                  {
                     var _loc2_ = this.bulletlist.shift();
                     _loc2_.removeMovieClip();
                  }
               };
               _loc2_.ClearTowers = function()
               {
                  while(this.towerlist.length > 0)
                  {
                     var _loc2_ = this.towerlist.shift();
                     _loc2_.setDepthTo(mx.managers.DepthManager.kTop);
                     _loc2_.removeMovieClip();
                  }
               };
               _loc2_.ResolveInput = function()
               {
                  if(Key.isDown(27))
                  {
                     this.DeselectCurrent();
                  }
               };
               _loc2_.DeselectCurrent = function()
               {
                  this.currentTool = "none";
                  this.currentTower.gotoAndStop(1);
                  this.currentTower = null;
               };
               _loc2_.SelectTower = function(ptower)
               {
                  this.DeselectCurrent();
                  this.currentTower = ptower;
                  this.currentTower.gotoAndStop(2);
                  this.toweroptions.towername_txt.text = this.currentTower.towerName;
                  this.toweroptions.towerspeed_txt.text = this.currentTower.GetSpeedRating();
                  this.toweroptions.towerrange_txt.text = this.currentTower.attackRadius;
                  this.toweroptions.Refresh();
                  this.currentTower.setDepthTo(mx.managers.DepthManager.kBottom);
               };
               _loc2_.SetCurrentTool = function(ptool)
               {
                  var _loc2_ = 0;
                  switch(ptool)
                  {
                     case "dart":
                        _loc2_ = this.COST_DART;
                        break;
                     case "tack":
                        _loc2_ = this.COST_TACK;
                        break;
                     case "spikey":
                        _loc2_ = this.COST_SPIKEY;
                        break;
                     case "bomb":
                        _loc2_ = this.COST_BOMB;
                        break;
                     case "ice":
                        _loc2_ = this.COST_ICE;
                        break;
                     case "super":
                        _loc2_ = this.COST_SUPER;
                  }
                  if(_loc2_ > this.money)
                  {
                     this.Output("not enough money.");
                     return undefined;
                  }
                  this.DeselectCurrent();
                  trace("try to select current tool: " + ptool);
                  this.towerplace.gotoAndStop("tack");
                  this.towerplace.gotoAndStop(ptool);
                  this.towerplace.radiusmc.cantplace.gotoAndPlay(1);
                  this.currentTool = ptool;
               };
               _loc2_.ShowTowerInfo = function(ptype)
               {
                  this.towerinfo._visible = true;
                  switch(ptype)
                  {
                     case "dart":
                        this.towerinfo.towername_txt.text = "Dart Tower";
                        this.towerinfo.towercost_txt.text = this.COST_DART;
                        this.towerinfo.towerspeed_txt.text = "Fast";
                        this.towerinfo.towerinfo_txt.text = "Shoots a single dart. Can upgrade to piercing darts and long range darts";
                        break;
                     case "tack":
                        this.towerinfo.towername_txt.text = "Tack Tower";
                        this.towerinfo.towercost_txt.text = this.COST_TACK;
                        this.towerinfo.towerspeed_txt.text = "Medium";
                        this.towerinfo.towerinfo_txt.text = "Shoots volley of tacks in 8 directions. Can upgrade its shoot speed and its range.";
                        break;
                     case "bomb":
                        this.towerinfo.towername_txt.text = "Bomb Tower";
                        this.towerinfo.towercost_txt.text = this.COST_BOMB;
                        this.towerinfo.towerspeed_txt.text = "Medium";
                        this.towerinfo.towerinfo_txt.text = "Launches a bomb that explodes on impact. Can upgrade to bigger bombs and longer range.";
                        break;
                     case "ice":
                        this.towerinfo.towername_txt.text = "Ice Tower";
                        this.towerinfo.towercost_txt.text = this.COST_ICE;
                        this.towerinfo.towerspeed_txt.text = "Slow";
                        this.towerinfo.towerinfo_txt.text = "Freezes nearby bloons. Frozen bloons are immune to darts and tacks, but bombs will destroy them. Can upgrade to increased freeze time, and larger freeze radius.";
                        break;
                     case "super":
                        this.towerinfo.towername_txt.text = "Super Monkey";
                        this.towerinfo.towercost_txt.text = this.COST_SUPER;
                        this.towerinfo.towerspeed_txt.text = "Hypersonic";
                        this.towerinfo.towerinfo_txt.text = "Super monkey shoots a continuous stream of darts and can mow down even the fastest and most stubborn bloons.";
                  }
               };
               _loc2_.HideTowerInfo = function()
               {
                  this.towerinfo._visible = false;
               };
               _loc2_.CanAfford = function(pupgrade)
               {
                  switch(pupgrade)
                  {
                     case "dart1":
                        if(this.money >= this.COST_DART_PIERCE_UPGRADE)
                        {
                           return true;
                        }
                        break;
                     case "dart2":
                        if(this.money >= this.COST_DART_RANGE_UPGRADE)
                        {
                           return true;
                        }
                        break;
                     case "tack1":
                        if(this.money >= this.COST_TACK_RATE_UPGRADE)
                        {
                           return true;
                        }
                        break;
                     case "tack2":
                        if(this.money >= this.COST_TACK_RANGE_UPGRADE)
                        {
                           return true;
                        }
                        break;
                     case "bomb1":
                        if(this.money >= this.COST_BOMB_SIZE_UPGRADE)
                        {
                           return true;
                        }
                        break;
                     case "bomb2":
                        if(this.money >= this.COST_BOMB_RANGE_UPGRADE)
                        {
                           return true;
                        }
                        break;
                     case "ice1":
                        if(this.money >= this.COST_ICE_FREEZE_UPGRADE)
                        {
                           return true;
                        }
                        break;
                     case "ice2":
                        if(this.money >= this.COST_ICE_RANGE_UPGRADE)
                        {
                           return true;
                        }
                        break;
                     case "super1":
                        if(this.money >= this.COST_SUPER_RANGE_UPGRADE)
                        {
                           return true;
                        }
                        break;
                  }
               };
               _loc2_.GetUpgradeCost = function(pnum)
               {
                  var _loc2_ = this.currentTower.type + pnum;
                  trace("grade: " + _loc2_);
                  switch(_loc2_)
                  {
                     case "dart1":
                        return this.COST_DART_PIERCE_UPGRADE;
                     case "dart2":
                        return this.COST_DART_RANGE_UPGRADE;
                     case "tack1":
                        return this.COST_TACK_RATE_UPGRADE;
                     case "tack2":
                        return this.COST_TACK_RANGE_UPGRADE;
                     case "bomb1":
                        return this.COST_BOMB_SIZE_UPGRADE;
                     case "bomb2":
                        return this.COST_BOMB_RANGE_UPGRADE;
                     case "ice1":
                        return this.COST_ICE_FREEZE_UPGRADE;
                     case "ice2":
                        return this.COST_ICE_RANGE_UPGRADE;
                     case "super1":
                        return this.COST_SUPER_RANGE_UPGRADE;
                     default:
                  }
               };
               _loc2_.GetUpgrade = function(pupgrade)
               {
                  trace("try to buy: " + pupgrade);
                  switch(pupgrade)
                  {
                     case "dart1":
                        this.money -= this.COST_DART_PIERCE_UPGRADE;
                        this.currentTower.spentonme += this.COST_DART_PIERCE_UPGRADE;
                        this.currentTower.upgrade1 = true;
                        if(this.currentTower.type == "dart")
                        {
                           this.currentTower.pierceMax += 1;
                        }
                        break;
                     case "dart2":
                        this.money -= this.COST_DART_RANGE_UPGRADE;
                        this.currentTower.spentonme += this.COST_DART_RANGE_UPGRADE;
                        this.currentTower.upgrade2 = true;
                        if(this.currentTower.type == "dart")
                        {
                           this.currentTower.attackRadius += 25;
                        }
                        break;
                     case "tack1":
                        this.money -= this.COST_TACK_RATE_UPGRADE;
                        this.currentTower.spentonme += this.COST_TACK_RATE_UPGRADE;
                        this.currentTower.upgrade1 = true;
                        if(this.currentTower.type == "tack")
                        {
                           this.currentTower.attackRate -= 15;
                        }
                        break;
                     case "tack2":
                        this.money -= this.COST_TACK_RANGE_UPGRADE;
                        this.currentTower.spentonme += this.COST_TACK_RANGE_UPGRADE;
                        this.currentTower.upgrade2 = true;
                        if(this.currentTower.type == "tack")
                        {
                           this.currentTower.bulletScale = 130;
                           this.currentTower.attackRadius += 10;
                        }
                        break;
                     case "bomb1":
                        this.money -= this.COST_BOMB_SIZE_UPGRADE;
                        this.currentTower.spentonme += this.COST_BOMB_SIZE_UPGRADE;
                        this.currentTower.upgrade1 = true;
                        if(this.currentTower.type == "bomb")
                        {
                           this.currentTower.bulletScale = 150;
                        }
                        break;
                     case "bomb2":
                        this.money -= this.COST_BOMB_RANGE_UPGRADE;
                        this.currentTower.spentonme += this.COST_BOMB_RANGE_UPGRADE;
                        this.currentTower.upgrade2 = true;
                        if(this.currentTower.type == "bomb")
                        {
                           this.currentTower.attackRadius += 20;
                        }
                        break;
                     case "ice1":
                        this.money -= this.COST_ICE_FREEZE_UPGRADE;
                        this.currentTower.spentonme += this.COST_ICE_FREEZE_UPGRADE;
                        this.currentTower.upgrade1 = true;
                        if(this.currentTower.type == "ice")
                        {
                           this.currentTower.freezeLen += 20;
                        }
                        break;
                     case "ice2":
                        this.money -= this.COST_ICE_RANGE_UPGRADE;
                        this.currentTower.spentonme += this.COST_ICE_RANGE_UPGRADE;
                        this.currentTower.upgrade2 = true;
                        if(this.currentTower.type == "ice")
                        {
                           this.currentTower.bulletScale = 100;
                           this.currentTower.attackRadius += 15;
                        }
                        break;
                     case "super1":
                        this.money -= this.COST_SUPER_RANGE_UPGRADE;
                        this.currentTower.spentonme += this.COST_SUPER_RANGE_UPGRADE;
                        this.currentTower.upgrade1 = true;
                        if(this.currentTower.type == "super")
                        {
                           this.currentTower.attackRadius += 100;
                        }
                  }
                  this.currentTower.CalcRadius();
                  this.SelectTower(this.currentTower);
                  this.UpdateMoney();
               };
               _loc2_.UpdateMoney = function()
               {
                  this.mainTimeline.money_txt.text = this.money;
                  this.toweroptions.upgrade1.CheckAfford();
                  this.toweroptions.upgrade2.CheckAfford();
               };
               _loc2_.Output = function(pstring)
               {
                  this.mainTimeline.output.inner.output_txt.text = pstring;
                  if(!this.mainTimeline.output._visible)
                  {
                     this.mainTimeline.output.gotoAndPlay("drawOn");
                  }
               };
               _loc2_.SetUpSound = function()
               {
                  this.frozenClink = new Sound(this.mainTimeline);
                  this.frozenClink.attachSound("clink");
               };
               _loc2_.BuildLevels = function()
               {
                  this.ABSTL(12,1,1);
                  this.ABSTL(25,2,1);
                  this.ABSTL(12,3,1);
                  this.ABSTL(2,3,2);
                  this.ABSTL(12,3,1);
                  this.ABSTL(3,3,2);
                  this.ABSTL(5,4,1);
                  this.ABSTL(12,4,2);
                  this.ABSTL(5,4,1);
                  this.ABSTL(12,4,2);
                  this.ABSTL(15,5,1);
                  this.ABSTL(10,5,2);
                  this.ABSTL(15,5,1);
                  this.ABSTL(15,5,2);
                  this.ABSTL(10,6,3);
                  this.ABSTL(75,7,2);
                  this.ABSTL(20,8,1);
                  this.ABSTL(30,8,2);
                  this.ABSTL(30,8,1);
                  this.ABSTL(20,8,2);
                  this.ABSTL(20,8,1);
                  this.ABSTL(20,8,2);
                  this.ABSTL(5,6,3);
                  this.ABSTL(25,9,2);
                  this.ABSTL(15,9,3);
                  this.ABSTL(25,9,2);
                  this.ABSTL(35,10,3);
                  this.ABSTL(15,11,4);
                  this.ABSTL(25,12,2);
                  this.ABSTL(25,12,3);
                  this.ABSTL(3,12,4);
                  this.ABSTL(40,13,2);
                  this.ABSTL(40,13,1);
                  this.ABSTL(28,13,3);
                  this.ABSTL(35,13,2);
                  this.ABSTL(28,14,4);
                  this.ABSTL(30,15,3);
                  this.ABSTL(30,15,2);
                  this.ABSTL(30,15,3);
                  this.ABSTL(20,16,2);
                  this.ABSTL(30,16,3);
                  this.ABSTL(30,16,2);
                  this.ABSTL(20,16,3);
                  this.ABSTL(20,16,2);
                  this.ABSTL(25,16,3);
                  this.ABSTL(70,17,2);
                  this.ABSTL(45,17,3);
                  this.ABSTL(70,17,2);
                  this.ABSTL(30,18,2);
                  this.ABSTL(27,18,4);
                  this.ABSTL(25,18,3);
                  this.ABSTL(90,19,3);
                  this.ABSTL(16,20,4);
                  this.ABSTL(12,20,3);
                  this.ABSTL(15,20,4);
                  this.ABSTL(12,20,3);
                  this.ABSTL(17,20,4);
                  this.ABSTL(15,21,4);
                  this.ABSTL(10,21,2);
                  this.ABSTL(20,21,4);
                  this.ABSTL(15,21,3);
                  this.ABSTL(70,21,3);
                  this.ABSTL(45,22,4);
                  this.ABSTL(30,23,4);
                  this.ABSTL(35,23,3);
                  this.ABSTL(34,23,4);
                  this.ABSTL(30,24,3);
                  this.ABSTL(42,24,4);
                  this.ABSTL(20,24,3);
                  this.ABSTL(30,24,2);
                  this.ABSTL(25,25,4);
                  this.ABSTL(30,25,3);
                  this.ABSTL(28,25,4);
                  this.ABSTL(40,25,3);
                  this.ABSTL(85,26,4);
                  this.ABSTL(20,27,5);
                  this.ABSTL(55,28,4);
                  this.ABSTL(45,28,3);
                  this.ABSTL(100,29,4);
                  this.ABSTL(25,29,4);
                  this.ABSTL(19,29,5);
                  this.ABSTL(250,30,3);
                  this.ABSTL(27,31,5);
                  this.ABSTL(55,31,3);
                  this.ABSTL(10,31,2);
                  this.ABSTL(20,32,4);
                  this.ABSTL(25,32,3);
                  this.ABSTL(23,32,5);
                  this.ABSTL(150,33,4);
                  this.ABSTL(25,34,5);
                  this.ABSTL(35,34,3);
                  this.ABSTL(35,34,4);
                  this.ABSTL(25,35,4);
                  this.ABSTL(85,35,3);
                  this.ABSTL(85,35,4);
                  this.ABSTL(17,36,5);
                  this.ABSTL(115,36,4);
                  this.ABSTL(18,36,5);
                  this.ABSTL(59,37,5);
                  this.ABSTL(220,38,4);
                  this.ABSTL(50,39,1);
                  this.ABSTL(50,39,2);
                  this.ABSTL(50,39,3);
                  this.ABSTL(50,39,4);
                  this.ABSTL(40,39,5);
                  this.ABSTL(80,40,5);
                  this.ABSTL(20,41,6);
                  this.ABSTL(20,41,5);
                  this.ABSTL(20,41,6);
                  this.ABSTL(50,42,4);
                  this.ABSTL(30,42,5);
                  this.ABSTL(30,42,6);
                  this.ABSTL(150,43,4);
                  this.ABSTL(60,43,5);
                  this.ABSTL(40,43,6);
                  this.ABSTL(120,44,5);
                  this.ABSTL(120,45,6);
                  this.ABSTL(60,46,6);
                  this.ABSTL(60,46,5);
                  this.ABSTL(59,46,4);
                  this.ABSTL(70,47,5);
                  this.ABSTL(79,47,4);
                  this.ABSTL(40,47,6);
                  this.ABSTL(70,48,4);
                  this.ABSTL(80,48,6);
                  this.ABSTL(80,48,5);
                  this.ABSTL(70,49,6);
                  this.ABSTL(99,49,4);
                  this.ABSTL(80,49,5);
                  this.ABSTL(10,50,6);
                  this.ABSTL(10,50,5);
                  this.ABSTL(10,50,6);
                  this.ABSTL(10,50,5);
                  this.ABSTL(10,50,6);
                  this.ABSTL(10,50,5);
                  this.ABSTL(10,50,6);
                  this.ABSTL(10,50,5);
                  this.ABSTL(10,50,6);
                  this.ABSTL(10,50,5);
                  this.ABSTL(10,50,6);
                  this.ABSTL(10,50,5);
                  this.ABSTL(10,50,6);
                  this.ABSTL(10,50,5);
                  this.ABSTL(10,50,6);
                  this.ABSTL(10,50,5);
                  this.ABSTL(10,50,6);
                  this.ABSTL(10,50,5);
                  this.ABSTL(10,50,6);
                  this.ABSTL(9,50,5);
               };
               _loc2_.ABSTL = function(pnum, plevel, ptype)
               {
                  var _loc2_ = 0;
                  while(_loc2_ < pnum)
                  {
                     this.ABTL(plevel,ptype);
                     _loc2_ = _loc2_ + 1;
                  }
               };
               _loc2_.ABTL = function(plevel, ptype)
               {
                  if(!this.levelsArray[plevel - 1])
                  {
                     var _loc2_ = new Array();
                     this.levelsArray[plevel - 1] = _loc2_;
                  }
                  this.levelsArray[plevel - 1].push(ptype);
               };
               _loc2_.GetNextLevelHint = function()
               {
                  return this.levelHints[this.curLevel];
               };
               _loc2_.BuildLevelHints = function()
               {
                  this.levelHints[0] = "";
                  this.levelHints[1] = "That was too easy, press \'Start Round\' to play the next round.";
                  this.levelHints[2] = "Still super easy, you didn\'t miss any did you?";
                  this.levelHints[3] = "Blue bloons move faster and have red bloons inside them.";
                  this.levelHints[4] = "Remember to spend your money.";
                  this.levelHints[5] = "Green bloons move even faster and have blue bloons inside them!";
                  this.levelHints[6] = "Lots of blue ones coming up. Hope you\'re ready...";
                  this.levelHints[7] = "The dart tower piercing upgrade allows darts to pop up to 2 bloons each.";
                  this.levelHints[8] = "Ice towers work best with bomb towers nearby.";
                  this.levelHints[9] = "Are you ready for a whole bunch of greens?";
                  this.levelHints[10] = "Yellow bloons are - you guessed it, even bigger and even faster and have greens inside them.";
                  this.levelHints[11] = "Tower upgrades are usually a better option than just adding more towers.";
                  this.levelHints[12] = "Tower defense is about what towers you use and where you put them.";
                  this.levelHints[13] = "The super monkey tower is not a joke, he really kicks ass!";
                  this.levelHints[14] = "You lose one life for every bloon that escapes. So a blue bloon costs you two lives, a green three lives etc.";
                  this.levelHints[15] = "I\'ve tried and you can\'t pass the game using only tack towers. You can slow the game down a lot though.";
                  this.levelHints[16] = "Relax a bit, there are no yellow bloons in the next level.";
                  this.levelHints[17] = "Have you played Bloons?";
                  this.levelHints[18] = "A whole bunch of greens coming up.";
                  this.levelHints[19] = "Too easy. Let\'s step this up a bit.";
                  this.levelHints[20] = "Place your towers so that they can be shooting at something for a long time, corners are good.";
                  this.levelHints[21] = "Ready for 45 straight yellows?";
                  this.levelHints[22] = "Yellows, greens, then more yellows - that should take care of you...";
                  this.levelHints[23] = "Did you know that the Greek national anthem has 136 verses?";
                  this.levelHints[24] = "93% of American teenage girls say shopping is their favourite activity.";
                  this.levelHints[25] = "Tack towers are really useful for thinning out the crowds - get the speed upgrade for extra effectiveness.";
                  this.levelHints[26] = "Black bloons are nasty - they are small but contain 2 yellows inside them. Oh did I mention they are IMMUNE TO BOMBS?!";
                  this.levelHints[27] = "When you sell a tower, you get 80% of what you paid for it, including all the upgrade money you spent.";
                  this.levelHints[28] = "Lots and lots of yellows - more than a hundred even, followed by a bunch of black bloons.";
                  this.levelHints[29] = "Next is a cash round - pop hundreds and hundreds of greens to top up your money. If you leak any I\'ll wince.";
                  this.levelHints[30] = "Monkeys aren\'t so good at shooting at things moving to their left. Something about being right handed I guess.";
                  this.levelHints[31] = "The good thing about black bloons is that they move slower than yellows.";
                  this.levelHints[32] = "A - lot of yellows.";
                  this.levelHints[33] = "10% of people lose their temper every day. If they play counterstrike its more like 90% I think...";
                  this.levelHints[34] = "You will probably need to use every tower type to finish the game.";
                  this.levelHints[35] = "You can improve frame rate a bit by having no towers selected during the round.";
                  this.levelHints[36] = "Just black bloons coming up. Lots of \'em";
                  this.levelHints[37] = "Just around the corner there are a throng of yellow bloons waiting to have a go...";
                  this.levelHints[38] = "Just for fun, there are some of each colour bloon in the next level. Enjoy popping those easy reds for a change.";
                  this.levelHints[39] = "80 blacks bloons. Enjoy.";
                  this.levelHints[40] = "Its important to not lose early lives, because the levels are only getting harder.";
                  this.levelHints[41] = "White bloons are IMMUNE TO FREEZING - and they also have 2 yellows inside them.";
                  this.levelHints[42] = "How many monkeys does it take to make a super monkey? That stuff will keep you up at night.";
                  this.levelHints[43] = "Lots and lots and lots of black bloons. More than ever.";
                  this.levelHints[44] = "Lots and lots and lots of WHITE bloons. More than ever.";
                  this.levelHints[45] = "Lots of white, then black, then yellow bloons. The next level is going to hurt.";
                  this.levelHints[46] = "You still playing? I\'m impressed, I couldn\'t get this far without cheating.";
                  this.levelHints[47] = "You got any super monkeys yet? Are they really worth all that money?";
                  this.levelHints[48] = "Its ok if you don\'t pass this level. Really it is. Just hit \'try again\'. Its the effort that counts.";
                  this.levelHints[49] = "This is the last level. There are TONS AND TONS of black AND white bloons coming. Hope you have lots of lives left...";
               };
               _loc2_.COST_DART = 250;
               _loc2_.COST_TACK = 400;
               _loc2_.COST_SPIKEY = 500;
               _loc2_.COST_BOMB = 900;
               _loc2_.COST_ICE = 850;
               _loc2_.COST_SUPER = 4000;
               _loc2_.COST_DART_RANGE_UPGRADE = 100;
               _loc2_.COST_DART_PIERCE_UPGRADE = 210;
               _loc2_.COST_TACK_RANGE_UPGRADE = 150;
               _loc2_.COST_TACK_RATE_UPGRADE = 250;
               _loc2_.COST_BOMB_SIZE_UPGRADE = 650;
               _loc2_.COST_BOMB_RANGE_UPGRADE = 250;
               _loc2_.COST_ICE_FREEZE_UPGRADE = 450;
               _loc2_.COST_ICE_RANGE_UPGRADE = 300;
               _loc2_.COST_SUPER_RANGE_UPGRADE = 2400;
               _loc2_.RANGE_DART = 100;
               _loc2_.RANGE_TACK = 70;
               _loc2_.RANGE_SPIKEY = 85;
               _loc2_.RANGE_BOMB = 120;
               _loc2_.RANGE_ICE = 60;
               _loc2_.RANGE_SUPER = 140;
               _loc2_.SELL_RATE = 0.8;
               _loc2_.STARTING_MONEY = 650;
               _loc2_.MAX_LIVES = 40;
               §§push(ASSetPropFlags(_global.BloonsTD.prototype,null,1));
            }
            else
            {
               if(eval("\x01") == 973)
               {
                  set("\x01",eval("\x01") - 793);
                  continue;
               }
               if(eval("\x01") != 180)
               {
                  if(eval("\x01") == 124)
                  {
                     set("\x01",eval("\x01") + 286);
                  }
                  else
                  {
                     if(eval("\x01") == 29)
                     {
                        set("\x01",eval("\x01") + 95);
                        break;
                     }
                     if(eval("\x01") == 505)
                     {
                        set("\x01",eval("\x01") + 219);
                     }
                     else if(eval("\x01") == 474)
                     {
                        set("\x01",eval("\x01") + 250);
                     }
                     else if(eval("\x01") == 425)
                     {
                        set("\x01",eval("\x01") + 367);
                        §§push(!function §\x01\x02§()
                        {
                           return 2355 % 511 * 5;
                        });
                     }
                     else if(eval("\x01") == 814)
                     {
                        set("\x01",eval("\x01") - 543);
                     }
                     else if(eval("\x01") == 50)
                     {
                        set("\x01",eval("\x01") + 375);
                        §§push(eval(function §\x01\x02§()
                        {
                           return 2355 % 511 * 5;
                        }));
                     }
                     else if(eval("\x01") == 792)
                     {
                        set("\x01",eval("\x01") + 181);
                        if(function §\x01\x02§()
                        {
                           return 2355 % 511 * 5;
                        })
                        {
                           set("\x01",eval("\x01") - 793);
                        }
                     }
                     else if(eval("\x01") == 724)
                     {
                        set("\x01",eval("\x01") + 56);
                        §§push("\x0f");
                        §§push(1);
                     }
                     else
                     {
                        if(eval("\x01") != 780)
                        {
                           if(eval("\x01") == 952)
                           {
                              set("\x01",eval("\x01") - 952);
                              break;
                           }
                           break;
                        }
                        set("\x01",eval("\x01") - 366);
                        var §§pop() = function §\x01\x02§()
                        {
                           return 2355 % 511 * 5;
                        };
                     }
                  }
                  continue;
               }
               set("\x01",eval("\x01") + 772);
               if(!_global.BloonsTD)
               {
                  var _loc2_ = _global.BloonsTD = function(timeline)
                  {
                     this.mainTimeline = timeline;
                     this.bloonholder = this.mainTimeline.bloonholder;
                     this.bulletholder = this.mainTimeline.bulletholder;
                     this.towerholder = this.mainTimeline.towerholder;
                     this.towerplace = this.mainTimeline.towerplace;
                     this.toweroptions = this.mainTimeline.toweroptions;
                     this.towerinfo = this.mainTimeline.towerinfo;
                     this.winpanel = this.mainTimeline.winpanel;
                     this.mainTimeline.output._visible = false;
                     this.mainTimeline.onEnterFrame = mx.utils.Delegate.create(this,this.EnterFrame);
                     this.mainTimeline.playarea.onPress = mx.utils.Delegate.create(this,this.OnClick);
                     var _loc2_ = 1;
                     while(_loc2_ < 32)
                     {
                        this.mainTimeline["pathhit" + _loc2_]._visible = false;
                        _loc2_ = _loc2_ + 1;
                     }
                     this.Init();
                  }.prototype;
                  _loc2_.Init = function()
                  {
                     this.timeLastFrame = getTimer();
                     this.fpsFrameCount = 0;
                     this.timeSum = 0;
                     this.levelsArray = new Array();
                     this.levelHints = new Array();
                     this.towerinfo._visible = false;
                     this.mainTimeline.startrnd_btn._visible = true;
                     this.ClearAll();
                     this.BuildLevels();
                     this.BuildLevelHints();
                     this.lives = this.MAX_LIVES;
                     this.curLevel = 0;
                     this.money = this.STARTING_MONEY;
                     this.noMore = true;
                     this.currentTower = null;
                     this.currentTool = "none";
                     this.ingame = false;
                     this.towerlist = new Array();
                     this.bulletlist = new Array();
                     this.mainTimeline.lives_txt.text = this.lives;
                     this.UpdateMoney();
                     this.SetUpSound();
                  };
                  _loc2_.OnClick = function()
                  {
                     if(this.currentTool != "none")
                     {
                        if(this.towerplace.radiusmc._currentframe == 1)
                        {
                           this.CreateNewTower(this.currentTool,_xmouse,_ymouse);
                        }
                     }
                     else
                     {
                        this.DeselectCurrent();
                     }
                  };
                  _loc2_.ClearAll = function()
                  {
                     this.ClearBalloons();
                     this.ClearBullets();
                     this.numBloons = 0;
                     this.ClearTowers();
                  };
                  _loc2_.Test = function()
                  {
                  };
                  _loc2_.StartLevel = function()
                  {
                     if(!this.noMore && this.numBloons == 0)
                     {
                        return undefined;
                     }
                     this.endRoundCount = 0;
                     this.mainTimeline.startrnd_btn._visible = false;
                     this.mainTimeline.output.gotoAndPlay("drawOff");
                     trace("START NEW LEVEL");
                     this.curLevel = this.curLevel + 1;
                     this.ingame = true;
                     this.noMore = false;
                     this.counter = 0;
                     this.numBloons = 0;
                     this.bloonIndex = 0;
                     this.bloonsSpawned = 0;
                     this.bloonInterval = 15 - this.curLevel;
                     if(this.bloonInterval < 5)
                     {
                        this.bloonInterval = Math.ceil(5 - this.curLevel / 20);
                     }
                  };
                  _loc2_.EnterFrame = function()
                  {
                     this.ResolveInput();
                     if(this.currentTower != null)
                     {
                        this.EnableOptions();
                     }
                     else
                     {
                        this.DisableOptions();
                     }
                     if(this.curLevel)
                     {
                        this.mainTimeline.level_txt.text = this.curLevel;
                     }
                     else
                     {
                        this.mainTimeline.level_txt.text = 1;
                     }
                     if(this.currentTool != "none")
                     {
                        this.towerplace._x = _xmouse;
                        this.towerplace._y = _ymouse;
                        var _loc3_ = false;
                        var _loc2_ = 0;
                        while(_loc2_ < this.towerlist.length)
                        {
                           if(this.towerlist[_loc2_].hitbit.hitTest(this.towerplace.hitbit))
                           {
                              this.towerplace.radiusmc.gotoAndStop(2);
                              _loc3_ = true;
                              break;
                           }
                           _loc2_ = _loc2_ + 1;
                        }
                        _loc2_ = 1;
                        while(_loc2_ < 32)
                        {
                           if(this.mainTimeline["pathhit" + _loc2_].hitTest(this.towerplace.hitbit))
                           {
                              this.towerplace.radiusmc.gotoAndStop(2);
                              break;
                           }
                           if(!_loc3_)
                           {
                              this.towerplace.radiusmc.gotoAndStop(1);
                           }
                           _loc2_ = _loc2_ + 1;
                        }
                     }
                     else
                     {
                        this.towerplace._x = 1500;
                        this.towerplace._y = 1500;
                     }
                     if(!this.ingame)
                     {
                        return undefined;
                     }
                     if(!this.noMore)
                     {
                        this.counter = this.counter + 1;
                        if(this.counter > this.bloonInterval)
                        {
                           this.counter = 0;
                           this.NewBloon(this.levelsArray[this.curLevel - 1][this.bloonIndex]);
                           this.bloonIndex = this.bloonIndex + 1;
                           if(!this.levelsArray[this.curLevel - 1][this.bloonIndex])
                           {
                              trace("no more bloons");
                              this.noMore = true;
                           }
                        }
                     }
                     else if(this.numBloons < 1)
                     {
                        if(this.endRoundCount > 20)
                        {
                           this.EndLevel();
                           this.endRoundCount = 0;
                        }
                        else
                        {
                           this.endRoundCount = this.endRoundCount + 1;
                        }
                     }
                     this.UpdateTowers();
                     this.UpdateBullets();
                     this.CalcFPS();
                  };
                  _loc2_.CalcFPS = function()
                  {
                     this.timeSum += getTimer() - this.timeLastFrame;
                     this.fpsFrameCount = this.fpsFrameCount + 1;
                     if(this.timeSum >= 1000)
                     {
                        this.mainTimeline.fps_txt.text = this.fpsFrameCount;
                        this.timeSum = 0;
                        this.fpsFrameCount = 0;
                     }
                     this.timeLastFrame = getTimer();
                  };
                  _loc2_.NewBloon = function(prank, pframe, px, py, pname)
                  {
                     this.numBloons = this.numBloons + 1;
                     var _loc4_ = prank;
                     var _loc3_ = pname;
                     if(!pname)
                     {
                        this.bloonsSpawned = this.bloonsSpawned + 1;
                        _loc3_ = "bloon" + this.bloonsSpawned;
                     }
                     var _loc2_ = this.bloonholder.attachMovie("plain" + _loc4_,_loc3_,this.bloonholder.getNextHighestDepth());
                     _loc2_.rank = _loc4_;
                     _loc2_._x = -10 + random(20);
                     _loc2_._y = 200 + random(20);
                     _loc2_.game = this;
                     if(pframe)
                     {
                        var _loc5_ = Math.round(pframe * _loc2_._totalframes);
                        _loc2_.gotoAndPlay(_loc5_);
                        _loc2_._x = px;
                        _loc2_._y = py;
                     }
                  };
                  _loc2_.PoppedOne = function(pcheck)
                  {
                     if(!pcheck)
                     {
                        this.numBloons = this.numBloons - 1;
                     }
                     this.money = this.money + 1;
                     this.UpdateMoney();
                  };
                  _loc2_.Escaped = function(pbloon)
                  {
                     if(!this.ingame)
                     {
                        return undefined;
                     }
                     this.lives -= pbloon.rank;
                     this.mainTimeline.lives_txt.text = this.lives;
                     if(this.lives < 1)
                     {
                        this.lives = 0;
                        this.mainTimeline.lives_txt.text = this.lives;
                        this.GameOver(false);
                     }
                     else
                     {
                        this.numBloons = this.numBloons - 1;
                     }
                  };
                  _loc2_.EndLevel = function()
                  {
                     this.ingame = false;
                     trace("You win");
                     this.ClearBullets();
                     this.ClearBalloons();
                     if(this.curLevel < 50)
                     {
                        this.mainTimeline.startrnd_btn._visible = true;
                        var _loc2_ = 101 - this.curLevel;
                        this.money += _loc2_;
                        this.UpdateMoney();
                        this.Output("Round " + this.curLevel + " passed. " + _loc2_ + " money awarded. " + this.GetNextLevelHint());
                     }
                     else
                     {
                        this.GameOver(true);
                     }
                  };
                  §§goto(addr805);
                  §§push(_loc2_);
                  §§push("GameOver");
               }
            }
            function §\x01\x02§()
            {
               return 2355 % 511 * 5;
            }
            break;
         }
         set("\x01",eval("\x01") - 134);
         §§push(true);
      }
   }
}
