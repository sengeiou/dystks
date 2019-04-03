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
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var api = new InstApi();
    api.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({ indexbanner });
    }, false)
  }
  lianxi(){
    wx.navigateToMiniProgram({
      appId: 'wxce8dfd9950dacbe7', // 要跳转的小程序的appid
      path: 'page/index/index', // 跳转的目标页面
      extarData: {
        open: 'auth'
      },
      success(res) {
        // 打开成功  
      }
    }) 
  }
  xuexi(){
    wx.navigateToMiniProgram({
      appId: 'wx59cda72fdbc6ef18', // 要跳转的小程序的appid
      path: 'page/index/index', // 跳转的目标页面
      extarData: {
        open: 'auth'
      },
      success(res) {
        // 打开成功  
      }
    }) 

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.xuexi = content.xuexi;
body.lianxi=content.lianxi;
Page(body)