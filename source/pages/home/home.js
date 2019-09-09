// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { MemberApi } from "../../apis/member.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    var api = new MemberApi();
    var that=this;
    
    super.onLoad(options);
    api.info({}, (info) => {
      this.Base.setMyData({ memberinfo: info });


      setTimeout(() => {
        that.jiazai();

      }, 500)

    })
    
  }
  onMyShow() {
    var that = this;
    var api = new InstApi();
    api.indexbanner({}, (indexbanner) => {
      this.Base.setMyData({ indexbanner });
    }, false)
  }
  getUserInfo() {

    AppBase.UserInfo.openid = undefined;



    this.onShow();


  }
  lianxi(){
    wx.navigateToMiniProgram({
      appId: 'wxce8dfd9950dacbe7', // 要跳转的小程序的appid
      path: 'pages/wode/wode', // 跳转的目标页面
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
      path: 'pages/home/home', // 跳转的目标页面
      extarData: {
        open: 'auth'
      },
      success(res) {
        // 打开成功  
      }
    }) 

  }

  jiazai(){
    var that = this;
    var id = this.Base.options.id;

    var fenxianid = this.Base.options.fenxianid;

    var api = new InstApi();
    if (id != undefined && fenxianid != undefined && this.Base.getMyData().memberinfo.id != fenxianid) {

      api.jiesuo({
        fxmember_id: fenxianid,
        shijuan_id: id,
        jsmember: this.Base.getMyData().memberinfo.id
      }, (qwe) => {


      })
    }
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.xuexi = content.xuexi;
body.lianxi=content.lianxi;
body.jiazai=content.jiazai;
body.getUserInfo = content.getUserInfo;
Page(body)