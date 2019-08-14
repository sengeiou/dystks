// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  videoAd = null
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({ xuanzhon: 0 });
      
    if (wx.createRewardedVideoAd) {

      this.videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-ad1a7e5364d88607'
      })
      this.videoAd.onLoad(() => {
        console.log("1231111111111131");


      })
      this.videoAd.onError((err) => {
        console.log('onError event emit', err)
      })
      this.videoAd.onClose((res) => {
        if (res && res.isEnded) {
          var id = this.Base.getMyData().danqianzhanjie;
          var date = new Date();
          var Y = date.getFullYear();
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
          var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
          var sj = (Y + '-' + M + '-' + D);
          console.log(sj + '-' + id);
          wx.setStorage({
            key: sj + '-' + id,
            data: 111,
          });
          this.Base.toast("观看成功");
        } else {
          this.Base.toast("观看失败");
          console.log("中途退出");
          // 播放中途退出，不下发游戏奖励
        }

      })
    }

  }
  bianli(qunzu, qunzuzu) {

    for (var j = 0; j < qunzu.length; j++) {

      for (var k = 0; k < qunzuzu.length; k++) {
        if (qunzu[j].qunzu == qunzuzu[k]) {
          console.log("牛逼");
          console.log(qunzu);
          console.log(qunzuzu);

          return true
        }


      }
    }

    return false;
  }
  onMyShow() {
    var api = new InstApi();
    var qunzu = this.Base.getMyData().memberinfo.qunzu;
    api.kemu({}, (kemulist) => {
      this.Base.setMyData({ xuanzhon: kemulist[0].id});
      api.kemuleibie({}, (kemuleibie) => {
        console.log(kemuleibie);

        api.getshijuan({}, (shijuanlist) => {
          console.log(shijuanlist);

          for (var i = 0; i < kemuleibie.length; i++) {
            if (kemuleibie[i].whopen_value == 'Y') {

              kemuleibie[i].xianshi = true;
            }
            else {
              var qunzuzu = kemuleibie[i].qunzu.split(",");
              if (qunzuzu != "" && qunzu[0].qunzu != "") {
                console.log(11111);
                console.log(222222);
                console.log(qunzu);
                console.log(qunzuzu);
                kemuleibie[i].xianshi = this.bianli(qunzu, qunzuzu);
              }

            }
          }

          this.Base.setMyData({ kemulist, kemuleibie, shijuanlist });
        }, true)


      }, true)
    }, true)
  }
  gotoCat(e) {
    var id = e.currentTarget.id;
    this.Base.setMyData({ "xuanzhon": id, "xuanzhon1": 0 });

  }
  gotoCat1(e) {



    var that = this;
    var date = new Date();
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var sj = (Y + '-' + M + '-' + D);
    var jiancha = wx.getStorageSync(
      sj + '-' + e.currentTarget.id,
    )
    console.log(sj + '-' + e.currentTarget.id);
    console.log("牛逼");
    console.log(jiancha);
    if (e.currentTarget.dataset.id == 'Y' && jiancha != '111') {


      this.Base.setMyData({ danqianzhanjie: e.currentTarget.id })
      wx.showModal({

        content: '看个视频广告今天就可以无限看' + e.currentTarget.dataset.name + '啦!',

        success: function (res) {
          if (res.confirm) {
            console.log(that.videoAd);
            that.videoAd.show();

          } else {

          }
        }
      })

      return
    }







    var xuanzhon1 = this.Base.getMyData().xuanzhon1;

    var id = e.currentTarget.id;

    if (xuanzhon1 == id) {
      this.Base.setMyData({ "xuanzhon1": 0 });
    }
    else {
      this.Base.setMyData({ "xuanzhon1": id });
    }


  }
  kaoshi(e) {
    wx.navigateTo({
      url: '/pages/kaoqian/kaoqian?id=' + e.currentTarget.id,
    })
  }
  jiesuo(e) {

    var jiesuoshu = e.currentTarget.dataset.lian;
    var danqian = e.currentTarget.dataset.dan;

    if (jiesuoshu > danqian) {
      this.Base.setMyData({
        showModal: true,

        jiesuoshu: jiesuoshu,
        danqian: danqian,
        zhanjie: e.currentTarget.dataset.id,
        fenxianid: e.currentTarget.dataset.fxid,
      });
    }
    else {

      this.Base.setMyData({
        showModal1: true,
        zhanjie: e.currentTarget.dataset.id,
        zsmm: e.currentTarget.dataset.zsmm,
      })







    }





  };
  hideModal() {
    this.Base.setMyData({ showModal: false, showModal1: false });
  }
  onCancel() {
    this.hideModal();
  }
  shuru(e) {
    this.Base.setMyData({ shuru: e.detail.value })
  }
  querenmima() {
    var that = this;
    var api = new InstApi();
    var mima = this.Base.getMyData().shuru;
    var shijuan = this.Base.getMyData().zhanjie;
    var member_id = this.Base.getMyData().memberinfo.id;
    var zsmm = this.Base.getMyData().zsmm;
    console.log(zsmm);

    api.mima({ mima: mima, coursesct_id: shijuan, member_id: member_id, status: 'A' }, (res) => {


      console.log(zsmm);
      console.log(12312313213);
      if (res == zsmm) {
        that.Base.toast("解锁成功");
        that.onCancel();
        that.onMyShow();

      } else {


        that.Base.toast("密码错误");

      }

      console.log(res);


    },false)




  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.gotoCat = content.gotoCat;
body.bianli = content.bianli;
body.gotoCat1 = content.gotoCat1;
body.kaoshi = content.kaoshi;
body.jiesuo = content.jiesuo;
body.hideModal = content.hideModal;
body.onCancel = content.onCancel;
body.shuru = content.shuru;
body.querenmima = content.querenmima;
Page(body)