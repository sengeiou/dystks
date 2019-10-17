// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    wx.reLaunch();
    this.Base.Page = this;
    //options.id=5;
    wx.hideShareMenu();
    super.onLoad(options);
    this.Base.setMyData({ sj: 0, istrue: false,dqt:1 })
    this.Base.setMyData({
      A1: [], A2: [],
      A3: [], A4: [],
      A5: [], A6: [],
      A7: [], A8: [],
      A9: [], A10: [],
      tishu1: 0, tishu2: 0,
      tishu3: 0, tishu4: 0,
      tishu5: 0, tishu6: 0,
      tishu7: 0, tishu8: 0,
      tishu9: 0, tishu10: 0,
    })
    var api = new InstApi();
    var that=this;
    api.getshijuaninfo({ id: this.Base.options.id }, (shijuan) => {
      
      console.log(shijuan);
      this.Base.setMyData({
        shijuan: shijuan
      })
    })

    api.gettimu({ shijuan_id: this.Base.options.id}, (disciplinetm) => {
      console.log(disciplinetm);
      var tishu = 0;


  

      var a1 = that.Base.getMyData().A1;
      var a2 = that.Base.getMyData().A2;
      var a3 = that.Base.getMyData().A3;
      var a4 = that.Base.getMyData().A4;
      var a5 = that.Base.getMyData().A5;
      var a6 = that.Base.getMyData().A6;
      var a7 = that.Base.getMyData().A7;
      var a8 = that.Base.getMyData().A8;
      var a9 = that.Base.getMyData().A9;
      var a10 = that.Base.getMyData().A10;
      for (var i = 0; i < disciplinetm.length; i++) {

        var duoxuan = [];
        if (disciplinetm[i].type == 'S') {
          duoxuan.push(['A', disciplinetm[i].option_a, false, 'isrightA', 'isceA']);
          duoxuan.push(['B', disciplinetm[i].option_b, false, 'isrightB', 'isceB']);
          duoxuan.push(['C', disciplinetm[i].option_c, false, 'isrightC', 'isceC']);
          duoxuan.push(['D', disciplinetm[i].option_d, false, 'isrightD', 'isceD']);
          duoxuan.push(['E', disciplinetm[i].option_e, false, 'isrightE', 'isceE']);
          duoxuan.push(['F', disciplinetm[i].option_f, false, 'isrightF', 'isceF']);
          duoxuan.push(['G', disciplinetm[i].option_g, false, 'isrightG', 'isceG']);
          duoxuan.push(['H', disciplinetm[i].option_h, false, 'isrightH', 'isceH']);
          disciplinetm[i].status_name = duoxuan;

          for (var j = 0; j < duoxuan.length; j++) {

            disciplinetm[i][duoxuan[j][3]] = disciplinetm[i].anwser.indexOf(duoxuan[j][0]);
            //disciplinetm[i][duoxuan[j][4]] = disciplinetm[i].isanwser.indexOf(duoxuan[j][0]);

          }





        } else {
          duoxuan.push(['A', disciplinetm[i].option_a]);
          duoxuan.push(['B', disciplinetm[i].option_b]);
          duoxuan.push(['C', disciplinetm[i].option_c]);
          duoxuan.push(['D', disciplinetm[i].option_d]);
          duoxuan.push(['E', disciplinetm[i].option_e]);
          duoxuan.push(['F', disciplinetm[i].option_f]);
          duoxuan.push(['G', disciplinetm[i].option_g]);
          duoxuan.push(['H', disciplinetm[i].option_h]);
          disciplinetm[i].status_name = duoxuan;


        }
        disciplinetm[i].title_anwser = disciplinetm[i].title_anwser.replace(/ /g, "&nbsp;");
        disciplinetm[i].xz = '';
      }
      var tishu = 0;
      for (var i = 0; i < disciplinetm.length; i++) {
        if (disciplinetm[i].xz != '') {
          tishu++;
        }
      }

      for (var j = 0; j < disciplinetm.length; j++) {
        if (j >= 0 && j < 50) {

          a1.push(disciplinetm[j]);
        }
        if (j >= 50 && j < 100) {
          a2.push(disciplinetm[j]);
        }
        if (j >= 100 && j < 150) {
          a3.push(disciplinetm[j]);
        }
        if (j >= 150 && j < 200) {
          a4.push(disciplinetm[j]);
        }
        if (j >= 200 && j < 250) {
          a5.push(disciplinetm[j]);
        }
        if (j >= 250 && j < 300) {
          a6.push(disciplinetm[j]);
        }
        if (j >= 300 && j < 350) {
          a7.push(disciplinetm[j]);
        }
        if (j >= 350 && j < 400) {
          a8.push(disciplinetm[j]);
        }
        if (j >= 400 && j < 450) {
          a9.push(disciplinetm[j]);
        }
        if (j >= 450 && j < 500) {
          a10.push(disciplinetm[j]);
        }




      }




      this.Base.setMyData({
        timu: disciplinetm, tishu: tishu, A1: a1
      })
      setTimeout(() => {
        this.Base.setMyData({
          A2: a2,
          A3: a3, A4: a4,
          A5: a5, A6: a6,
          A7: a7, A8: a8,
          A9: a9, A10: a10
        })

      }, 1000)


    })
    this.timer = setInterval(() => {
      var sj = this.Base.getMyData().sj + 1;
      this.Base.setMyData({ sj: sj })

    }, 1000)
  }
  onMyShow() {
    var that = this;
      


  }
  onUnload() {
    console.log("卸载了");
    clearInterval(this.timer);
  }
  shouye() {
    wx.switchTab({
      url: '/pages/home/home',
    })

  }
  dati(e) {

    console.log("kaishi");
    var that = this;
    var tihao = e.currentTarget.dataset.tihao;
    var xuanzhon = e.currentTarget.id;
    var xuanxian = e.currentTarget.dataset.duoxuan;
    var j = e.currentTarget.dataset.tixu;
    console.log(j);
    console.log("模拟弄");
    if (j >= 0 && j < 50) {
      var a1 = that.Base.getMyData().A1;
      if (a1[tihao].type == 'S') {
        a1[tihao].status_name[xuanxian][2] = !a1[tihao].status_name[xuanxian][2];
        var xuanze = '';
        var xuanze1 = '';
        for (var i = 0; i < 8; i++) {
          if (a1[tihao].status_name[i][2] == true)
            xuanze += a1[tihao].status_name[i][0];
        }


        a1[tihao].xz = xuanze;
      }
      else {

        a1[tihao].xz = xuanzhon;
      }
      var tishu = 0;
      for (var i = 0; i < a1.length; i++) {
        if (a1[i].xz != '') {
          tishu++;
        }

      }
      this.Base.setMyData({
        ["A1[" +tihao+"]"]: a1[tihao], tishu1: tishu
      })
      console.log("结束");


    }
    if (j >= 50 && j < 100) {
      var a1 = that.Base.getMyData().A2;
      console.log(a1);
      console.log("hahaha");
      if (a1[tihao].type == 'S') {
        a1[tihao].status_name[xuanxian][2] = !a1[tihao].status_name[xuanxian][2];
        var xuanze = '';
        var xuanze1 = '';
        for (var i = 0; i < 8; i++) {
          if (a1[tihao].status_name[i][2] == true)
            xuanze += a1[tihao].status_name[i][0];
        }


        a1[tihao].xz = xuanze;
      }
      else {

        a1[tihao].xz = xuanzhon;
      }
      var tishu = 0;
      for (var i = 0; i < a1.length; i++) {
        if (a1[i].xz != '') {
          tishu++;
        }

      }
      this.Base.setMyData({
        ["A2[" + tihao + "]"]: a1[tihao], tishu2: tishu
      })

    }
    if (j >= 100 && j < 150) {
      var a1 = that.Base.getMyData().A3;
      if (a1[tihao].type == 'S') {
        a1[tihao].status_name[xuanxian][2] = !a1[tihao].status_name[xuanxian][2];
        var xuanze = '';
        var xuanze1 = '';
        for (var i = 0; i < 8; i++) {
          if (a1[tihao].status_name[i][2] == true)
            xuanze += a1[tihao].status_name[i][0];
        }


        a1[tihao].xz = xuanze;
      }
      else {

        a1[tihao].xz = xuanzhon;
      }
      var tishu = 0;
      for (var i = 0; i < a1.length; i++) {
        if (a1[i].xz != '') {
          tishu++;
        }

      }
      this.Base.setMyData({
        ["A3[" + tihao + "]"]: a1[tihao], tishu3: tishu
      })
    }
    if (j >= 150 && j < 200) {
      var a1 = that.Base.getMyData().A4;
      if (a1[tihao].type == 'S') {
        a1[tihao].status_name[xuanxian][2] = !a1[tihao].status_name[xuanxian][2];
        var xuanze = '';
        var xuanze1 = '';
        for (var i = 0; i < 8; i++) {
          if (a1[tihao].status_name[i][2] == true)
            xuanze += a1[tihao].status_name[i][0];
        }


        a1[tihao].xz = xuanze;
      }
      else {

        a1[tihao].xz = xuanzhon;
      }
      var tishu = 0;
      for (var i = 0; i < a1.length; i++) {
        if (a1[i].xz != '') {
          tishu++;
        }

      }
      this.Base.setMyData({
        ["A4[" + tihao + "]"]: a1[tihao], tishu4: tishu
      })
    }
    if (j >= 200 && j < 250) {
      var a1 = that.Base.getMyData().A5;
      if (a1[tihao].type == 'S') {
        a1[tihao].status_name[xuanxian][2] = !a1[tihao].status_name[xuanxian][2];
        var xuanze = '';
        var xuanze1 = '';
        for (var i = 0; i < 8; i++) {
          if (a1[tihao].status_name[i][2] == true)
            xuanze += a1[tihao].status_name[i][0];
        }


        a1[tihao].xz = xuanze;
      }
      else {

        a1[tihao].xz = xuanzhon;
      }
      var tishu = 0;
      for (var i = 0; i < a1.length; i++) {
        if (a1[i].xz != '') {
          tishu++;
        }

      }
      this.Base.setMyData({
        ["A5[" + tihao + "]"]: a1[tihao], tishu5: tishu
      })
    }
    if (j >= 250 && j < 300) {
      var a1 = that.Base.getMyData().A6;
      if (a1[tihao].type == 'S') {
        a1[tihao].status_name[xuanxian][2] = !a1[tihao].status_name[xuanxian][2];
        var xuanze = '';
        var xuanze1 = '';
        for (var i = 0; i < 8; i++) {
          if (a1[tihao].status_name[i][2] == true)
            xuanze += a1[tihao].status_name[i][0];
        }


        a1[tihao].xz = xuanze;
      }
      else {

        a1[tihao].xz = xuanzhon;
      }
      var tishu = 0;
      for (var i = 0; i < a1.length; i++) {
        if (a1[i].xz != '') {
          tishu++;
        }

      }
      this.Base.setMyData({
        ["A6[" + tihao + "]"]: a1[tihao], tishu6: tishu
      })
    }
    if (j >= 300 && j < 350) {
      var a1 = that.Base.getMyData().A7;
      if (a1[tihao].type == 'S') {
        a1[tihao].status_name[xuanxian][2] = !a1[tihao].status_name[xuanxian][2];
        var xuanze = '';
        var xuanze1 = '';
        for (var i = 0; i < 8; i++) {
          if (a1[tihao].status_name[i][2] == true)
            xuanze += a1[tihao].status_name[i][0];
        }


        a1[tihao].xz = xuanze;
      }
      else {

        a1[tihao].xz = xuanzhon;
      }
      var tishu = 0;
      for (var i = 0; i < a1.length; i++) {
        if (a1[i].xz != '') {
          tishu++;
        }

      }
      this.Base.setMyData({
        ["A7[" + tihao + "]"]: a1[tihao], tishu7: tishu
      })
    }
    if (j >= 350 && j < 400) {
      var a1 = that.Base.getMyData().A8;
      if (a1[tihao].type == 'S') {
        a1[tihao].status_name[xuanxian][2] = !a1[tihao].status_name[xuanxian][2];
        var xuanze = '';
        var xuanze1 = '';
        for (var i = 0; i < 8; i++) {
          if (a1[tihao].status_name[i][2] == true)
            xuanze += a1[tihao].status_name[i][0];
        }


        a1[tihao].xz = xuanze;
      }
      else {

        a1[tihao].xz = xuanzhon;
      }
      var tishu = 0;
      for (var i = 0; i < a1.length; i++) {
        if (a1[i].xz != '') {
          tishu++;
        }

      }
      this.Base.setMyData({
        ["A8[" + tihao + "]"]: a1[tihao], tishu8: tishu
      })
    }
    if (j >= 400 && j < 450) {
      var a1 = that.Base.getMyData().A9;
      if (a1[tihao].type == 'S') {
        a1[tihao].status_name[xuanxian][2] = !a1[tihao].status_name[xuanxian][2];
        var xuanze = '';
        var xuanze1 = '';
        for (var i = 0; i < 8; i++) {
          if (a1[tihao].status_name[i][2] == true)
            xuanze += a1[tihao].status_name[i][0];
        }


        a1[tihao].xz = xuanze;
      }
      else {

        a1[tihao].xz = xuanzhon;
      }
      var tishu = 0;
      for (var i = 0; i < a1.length; i++) {
        if (a1[i].xz != '') {
          tishu++;
        }

      }
      this.Base.setMyData({
        ["A9[" + tihao + "]"]: a1[tihao], tishu9: tishu
      })
    }
    if (j >= 450 && j < 500) {
      var a1 = that.Base.getMyData().A10;
      if (a1[tihao].type == 'S') {
        a1[tihao].status_name[xuanxian][2] = !a1[tihao].status_name[xuanxian][2];
        var xuanze = '';
        var xuanze1 = '';
        for (var i = 0; i < 8; i++) {
          if (a1[tihao].status_name[i][2] == true)
            xuanze += a1[tihao].status_name[i][0];
        }


        a1[tihao].xz = xuanze;
      }
      else {

        a1[tihao].xz = xuanzhon;
      }
      var tishu = 0;
      for (var i = 0; i < a1.length; i++) {
        if (a1[i].xz != '') {
          tishu++;
        }

      }
      this.Base.setMyData({
        ["A10[" + tihao + "]"]: a1[tihao], tishu10: tishu
      })
    }

    var a1 = this.Base.getMyData().tishu1;
    var a2 = this.Base.getMyData().tishu2;
    var a3 = this.Base.getMyData().tishu3;
    var a4 = this.Base.getMyData().tishu4;
    var a5 = this.Base.getMyData().tishu5;
    var a6 = this.Base.getMyData().tishu6;
    var a7 = this.Base.getMyData().tishu7;
    var a8 = this.Base.getMyData().tishu8;
    var a9 = this.Base.getMyData().tishu9;
    var a10 = this.Base.getMyData().tishu10;
    var dqt = this.Base.getMyData().dqt;
    console.log(this.Base.getMyData().timu[j]);
    if (this.Base.getMyData().timu[j].type=='R')
    {
      this.Base.setMyData({ tishu: a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10, dqt: ++dqt })
    }
           
   


  }


  jiaojuan() {
    var that = this;
    var api = new InstApi();
    wx.showModal({

      content: '确定交卷吗？答题结果可以在成绩排名处查看',

      success: function (res) {
        if (res.confirm) {
          var timu = that.Base.getMyData().timu;
          var a1 = that.Base.getMyData().A1;
          var a2 = that.Base.getMyData().A2;
          var a3 = that.Base.getMyData().A3;
          var a4 = that.Base.getMyData().A4;
          var a5 = that.Base.getMyData().A5;
          var a6 = that.Base.getMyData().A6;
          var a7 = that.Base.getMyData().A7;
          var a8 = that.Base.getMyData().A8;
          var a9 = that.Base.getMyData().A9;
          var a10 = that.Base.getMyData().A10;




          var daan = [];
          for (var i = 0; i < a1.length; i++) {
            // i == 0 ? daan += timu[i].xz  :  daan += ',' + timu[i].xz;
            daan.push(a1[i].xz);
          }
          for (var i = 0; i < a2.length; i++) {
            // i == 0 ? daan += timu[i].xz  :  daan += ',' + timu[i].xz;
            daan.push(a2[i].xz);
          }
          for (var i = 0; i < a3.length; i++) {
            // i == 0 ? daan += timu[i].xz  :  daan += ',' + timu[i].xz;
            daan.push(a3[i].xz);
          }
          for (var i = 0; i < a4.length; i++) {
            // i == 0 ? daan += timu[i].xz  :  daan += ',' + timu[i].xz;
            daan.push(a4[i].xz);
          }
          for (var i = 0; i < a5.length; i++) {
            // i == 0 ? daan += timu[i].xz  :  daan += ',' + timu[i].xz;
            daan.push(a5[i].xz);
          }
          for (var i = 0; i < a6.length; i++) {
            // i == 0 ? daan += timu[i].xz  :  daan += ',' + timu[i].xz;
            daan.push(a6[i].xz);
          }
          for (var i = 0; i < a7.length; i++) {
            // i == 0 ? daan += timu[i].xz  :  daan += ',' + timu[i].xz;
            daan.push(a7[i].xz);
          }
          for (var i = 0; i < a8.length; i++) {
            // i == 0 ? daan += timu[i].xz  :  daan += ',' + timu[i].xz;
            daan.push(a8[i].xz);
          }
          for (var i = 0; i < a9.length; i++) {
            // i == 0 ? daan += timu[i].xz  :  daan += ',' + timu[i].xz;
            daan.push(a9[i].xz);
          }
          for (var i = 0; i < a10.length; i++) {
            // i == 0 ? daan += timu[i].xz  :  daan += ',' + timu[i].xz;
            daan.push(a10[i].xz);
          }







          daan = daan.join(",")
          api.addksjl({ sjid: that.Base.options.id, daan: daan, shijian: that.Base.getMyData().sj }, (qqq) => {
            console.log(that.Base.getMyData().sj);
            console.log(qqq);
            wx.navigateBack({
              delta: 1

            })

          })

          console.log(daan);
        } else {

        }
      }
    })


  }
  hideModal() {
    this.Base.setMyData({ istrue: false });
  }
  xuanti() {
    this.Base.setMyData({ istrue: true });
  }
  tiaoti(e) {
    this.hideModal();
 console.log(e);
    this.Base.setMyData({ dqt: e.currentTarget.id})
    // var gaodu = 0;
    // var query = wx.createSelectorQuery();
    // var xuanze = [];

    // for (var i = 0; i <= e.currentTarget.dataset.shunxu; i++) {
    //   xuanze.push('#q' + i);
    // }

    // var xuanze = xuanze.join(",");
    // console.log(xuanze);
    // console.log(12132);
    // query.selectAll(xuanze).boundingClientRect();
    // console.log(i);
    // if (i == 1) {

    //   wx.pageScrollTo({
    //     scrollTop: 45,
    //     duration: 0
    //   })
    // }
    // query.exec(function (res) {
    //   console.log(res);
    //   for (var i = 0; i < res[0].length; i++) {
    //     gaodu += res[0][i].height;

    //     if (i == res[0].length - 1) {
    //       wx.pageScrollTo({
    //         scrollTop: gaodu + 35,
    //         duration: 0
    //       })
    //     }

    //   }

    // })

  }
  xiaoshi() {

    this.Base.setMyData({
      istrue: false

    })

  }
  touchStart(e) {
    this.Base.setMyData({
      "touch.x": e.changedTouches[0].clientX,
      "touch.y": e.changedTouches[0].clientY
    });
  }
  touchEnd(e) {
    let x = e.changedTouches[0].clientX;
    let y = e.changedTouches[0].clientY;
    var x1 = this.Base.getMyData().touch.x;
    var y1 = this.Base.getMyData().touch.y;
    if (x1 - x > 50 && Math.abs(y1 - y) < 50) { //右滑
      this.xyt();
    
    } else if (x1 - x < -50 && Math.abs(y1 - y) < 50) { //左滑
      this.syt();
     
    }
  }
  syt(){
    var dqt=this.Base.getMyData().dqt;
    if(dqt!=1)
    {
 this.Base.setMyData({dqt:--dqt});

    }
    else{

      this.Base.toast("已经是第一题了");
    }

  }
  xyt(){
    var dqt = this.Base.getMyData().dqt;
    var timucd=this.Base.getMyData().timu.length;
    if(dqt==timucd)
    {
      this.Base.toast("已经是最后一题了");

    }
    else{
      this.Base.setMyData({ dqt: ++dqt });
    }

  }
  tjdn(){
  this.xyt();

  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.shouye = content.shouye;
body.dati = content.dati;
body.jiaojuan = content.jiaojuan;
body.xuanti = content.xuanti;
body.hideModal = content.hideModal;
body.tiaoti = content.tiaoti;
body.xiaoshi = content.xiaoshi;
body.touchStart = content.touchStart;
body.touchEnd = content.touchEnd;
body.syt=content.syt;
body.xyt=content.xyt;
body.tjdn=content.tjdn;
Page(body)