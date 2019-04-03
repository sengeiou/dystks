// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { ApiUtil } from "../../apis/apiutil.js";
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
    api.ksjlph({ shijuan_id: this.Base.options.id, member_id: this.Base.getMyData().memberinfo.id, orderby:'cishu'},(dtjl)=>{
        for(var i=0;i<dtjl.length;i++)
        {
          dtjl[i].cishu = ApiUtil.toChinesNum(dtjl[i].cishu);

        }
      this.Base.setMyData({ dtjl: dtjl});
    })
  }
  shouye(){
    wx.switchTab({
      url: '/pages/home/home',
    })

  }
kshg(e){

wx.navigateTo({
  url: '/pages/kaoshihgxt/kaoshihgxt?id=' + e.currentTarget.id,
})

}

  
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.shouye = content.shouye;
body.kshg=content.kshg;
Page(body)