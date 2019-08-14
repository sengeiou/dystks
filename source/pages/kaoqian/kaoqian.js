// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    wx.hideShareMenu();
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var api = new InstApi();
    
    api.getshijuaninfo({ id: this.Base.options.id }, (shijuan) => {
      this.Base.setMyData({
        shijuan: shijuan

      })
    })

  }
  kshg() {
    wx.navigateTo({
      url: '/pages/kaoshihg/kaoshihg?id=' + this.Base.options.id,
    })

  }
  kaoshi() {
    console.log(111);
    var pg=(new Date()).getTime()%7;
    if(pg==0){
      pg="";
    }else{
      pg=pg.toString();
    }
 

    wx.navigateTo({
      url: '/pages/ks/ks' + pg + '?time=' + (new Date()).getTime()+'&id=' + this.Base.options.id,
    })
   
  }
  shouye() {
    wx.switchTab({
      url: '/pages/home/home?id=' + this.Base.options.id,
    })

  }
  cjph() {
    wx.navigateTo({
      url: '/pages/cjph/cjph?id=' + this.Base.options.id,
    })

  }
  

}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.kshg = content.kshg;
body.cjph = content.cjph;
body.shouye = content.shouye;
body.kaoshi = content.kaoshi;
Page(body)