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
    var coursesct_id = this.Base.options.id;

    wx.getStorage({
      key: coursesct_id,
      success: function (res) {
        console.log("有了");
        var jsonStr = res.data.replace(/\ufeff/g, "");//重点
        var disciplinetm = JSON.parse(jsonStr);
        var asd = [];
        for (var i = 0; i < disciplinetm.length && i < 60; i++) {
          asd.push(disciplinetm[i]);
        }
        that.Base.setMyData({
          disciplinetm: asd
        })
        setTimeout(function () {

          that.Base.setMyData({ disciplinetm: disciplinetm });




        }, 100)
      },
      fail: function (error) {
        console.log("有个锤子");
       
        var api = new InstApi();
        api.kghgall({ ksjl: that.Base.options.id }, (disciplinetm) => {
          that.Base.setMyData({ disciplinetm: disciplinetm })

      

          wx.setStorage({
            key: that.Base.options.id,
            data: JSON.stringify(disciplinetm),
          });


          setTimeout(function () {
            api.kghgall({ ksjl: that.Base.options.id, }, (disciplinetm) => {
              that.Base.setMyData({ disciplinetm: disciplinetm });

              wx.setStorage({
                key: that.Base.options.id,
                data: JSON.stringify(disciplinetm),
              });
            }, false)

          }, 100)




        })



      }

    })

  }
  xuanti(e) {

    console.log(e);
    var idd = e.target.dataset.idd;
    var id = e.target.id;
    var coursesct_id = e.target.dataset.id;

    var disciplinetm = this.Base.getMyData().disciplinetm;

    wx.setStorageSync(this.Base.options.id+'id' + idd, JSON.stringify(disciplinetm[id - 1]));



    wx.navigateTo({
      url: '/pages/questions/questions?id=' + id + '&&coursesct_id=' + coursesct_id + '&&idd=' + idd+'&&cishu='+ this.Base.options.id,
    })

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.xuanti = content.xuanti;
Page(body)