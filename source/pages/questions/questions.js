// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    wx.hideShareMenu();

    this.Base.setMyData({
      xz: null,
      tmid: this.Base.options.id - 1
    });
    var that = this;
    var timuid = this.Base.options.idd;
    
    var d = new Date().getTime();
    console.log("接收到的参数" + 'id' + timuid);
    var disciplinetm = wx.getStorageSync(

      this.Base.options.cishu+'id' + timuid,

    )
    var disciplinetm = JSON.parse(disciplinetm);

    for (var i = that.Base.getMyData().tmid; i <= that.Base.getMyData().tmid; i++) {

      var duoxuan = [];
      if (disciplinetm.type == 'S') {
        duoxuan.push(['A', disciplinetm.option_a, false, 'isrightA', 'isceA']);
        duoxuan.push(['B', disciplinetm.option_b, false, 'isrightB', 'isceB']);
        duoxuan.push(['C', disciplinetm.option_c, false, 'isrightC', 'isceC']);
        duoxuan.push(['D', disciplinetm.option_d, false, 'isrightD', 'isceD']);
        duoxuan.push(['E', disciplinetm.option_e, false, 'isrightE', 'isceE']);
        duoxuan.push(['F', disciplinetm.option_f, false, 'isrightF', 'isceF']);
        duoxuan.push(['G', disciplinetm.option_g, false, 'isrightG', 'isceG']);
        duoxuan.push(['H', disciplinetm.option_h, false, 'isrightH', 'isceH']);
        disciplinetm.status_name = duoxuan;

        for (var j = 0; j < duoxuan.length; j++) {

          disciplinetm[duoxuan[j][3]] = disciplinetm.anwser.indexOf(duoxuan[j][0]);
          disciplinetm[duoxuan[j][4]] = disciplinetm.isanwser.indexOf(duoxuan[j][0]);

        }





      } else {
        duoxuan.push(['A', disciplinetm.option_a]);
        duoxuan.push(['B', disciplinetm.option_b]);
        duoxuan.push(['C', disciplinetm.option_c]);
        duoxuan.push(['D', disciplinetm.option_d]);
        duoxuan.push(['E', disciplinetm.option_e]);
        duoxuan.push(['F', disciplinetm.option_f]);
        duoxuan.push(['G', disciplinetm.option_g]);
        duoxuan.push(['H', disciplinetm.option_h]);
        disciplinetm.status_name = duoxuan;


      }
      disciplinetm.title_anwser = disciplinetm.title_anwser.replace(/ /g, "&nbsp;");
      this.Base.setMyData({
        disciplinetm: disciplinetm
      });
    }















    // var d = new Date().getTime();
    wx.getStorage({
      key: this.Base.options.cishu,
      success: function (res) {
    console.log(777777777777777777);
        //  var d1 = new Date().getTime() - d;
        //  that.Base.info(d1.toString());


      
        var jsonStr = res.data.replace(/\ufeff/g, ""); //重点
        var disciplinetm = JSON.parse(jsonStr);

        for (var i = that.Base.getMyData().tmid; i <= that.Base.getMyData().tmid; i++) {

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
              disciplinetm[i][duoxuan[j][4]] = disciplinetm[i].isanwser.indexOf(duoxuan[j][0]);

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
        }
        
        console.log(disciplinetm[that.Base.getMyData().tmid]);
        console.log("重点");
        that.Base.setMyData({
          disciplinetm: disciplinetm[that.Base.getMyData().tmid],
          item: disciplinetm
        });
      },
    })
    
  }
  onMyShow() {
    var that = this;
   

    // var d = new Date().getTime();
    // wx.getStorage({
    //   key: this.Base.options.coursesct_id,
    //   success: function (res) {
    //    console.log("成了");
    //       //      var d1 = new Date().getTime() - d;
    //       // that.Base.info(d1.toString());



    //   var   jsonStr = res.data.replace(/\ufeff/g, "");//重点
    //     var disciplinetm = JSON.parse(jsonStr);

    //     for (var i = that.Base.getMyData().tmid; i <= that.Base.getMyData().tmid; i++) {
    //       console.log(123123);
    //       var duoxuan = [];
    //       if (disciplinetm[i].type == 'S') {
    //         duoxuan.push(['A', disciplinetm[i].option_a, false, 'isrightA', 'isceA']);
    //         duoxuan.push(['B', disciplinetm[i].option_b, false, 'isrightB', 'isceB']);
    //         duoxuan.push(['C', disciplinetm[i].option_c, false, 'isrightC', 'isceC']);
    //         duoxuan.push(['D', disciplinetm[i].option_d, false, 'isrightD', 'isceD']);
    //         duoxuan.push(['E', disciplinetm[i].option_e, false, 'isrightE', 'isceE']);
    //         duoxuan.push(['F', disciplinetm[i].option_f, false, 'isrightF', 'isceF']);
    //         duoxuan.push(['G', disciplinetm[i].option_g, false, 'isrightG', 'isceG']);
    //         duoxuan.push(['H', disciplinetm[i].option_h, false, 'isrightH', 'isceH']);
    //         disciplinetm[i].status_name = duoxuan;

    //         for (var j = 0; j < duoxuan.length; j++) {

    //           disciplinetm[i][duoxuan[j][3]] = disciplinetm[i].anwser.indexOf(duoxuan[j][0]);
    //           disciplinetm[i][duoxuan[j][4]] = disciplinetm[i].isanwser.indexOf(duoxuan[j][0]);

    //         }





    //       } else {
    //         duoxuan.push(['A', disciplinetm[i].option_a]);
    //         duoxuan.push(['B', disciplinetm[i].option_b]);
    //         duoxuan.push(['C', disciplinetm[i].option_c]);
    //         duoxuan.push(['D', disciplinetm[i].option_d]);
    //         duoxuan.push(['E', disciplinetm[i].option_e]);
    //         duoxuan.push(['F', disciplinetm[i].option_f]);
    //         duoxuan.push(['G', disciplinetm[i].option_g]);
    //         duoxuan.push(['H', disciplinetm[i].option_h]);
    //         disciplinetm[i].status_name = duoxuan;


    //       }


    //       disciplinetm[i].title_anwser = disciplinetm[i].title_anwser.replace(/ /g, "&nbsp;");
    //     }
    //     that.Base.setMyData({ disciplinetm: disciplinetm[that.Base.getMyData().tmid], item: disciplinetm });

    //   },
    // })



  }

  // select(e) {

  //   var tihao = e.currentTarget.dataset.timu;

  //   var xuanxian = e.currentTarget.dataset.duoxuan;
  //   var a = e.currentTarget.dataset.duoxuan;

  //   var xz = this.Base.getMyData().disciplinetm;

  //   xz.status_name[xuanxian][2] = !xz.status_name[xuanxian][2];
  //   var xuanze = '';
  //   var xuanze1 = '';
  //   for (var i = 0; i < 8; i++) {
  //     if (xz.status_name[i][2] == true)
  //       xuanze += xz.status_name[i][0];

  //   }

  //   for (var i = 0; i < 8; i++) {
  //     if (xz.status_name[i][2] == true)
  //       xuanze1 += xz.status_name[i][0] + ',';

  //   }
  //   var chang = xuanze.length;
  //   var fenda = xuanze1.split(',', chang);
  //   this.Base.setMyData({
  //     disciplinetm: xz,
  //     xz: xuanze
  //   });
  //   // console.log(chushi);
  //   // console.log(xz);
  // }

  // radioChange(e) {
  //   var type = e.currentTarget.dataset.idd;
  //   if (type == 'R') {
  //     this.Base.setMyData({
  //       xz: e.currentTarget.id
  //     });
  //     this.tjdn(e);
  //   } else {



  //   }

  //   this.Base.setMyData({
  //     xz: e.currentTarget.id
  //   });
  // }
  // tjdn(e) {
  //   let xz = this.Base.getMyData().xz;
  //   if (xz == undefined || xz == "") {
  //     this.Base.info("请选择一个选项");
  //   } else {
  //     var qwe = this.Base.getMyData().item;
  //     var tmid = this.Base.getMyData().tmid
  //     qwe[tmid].isanwser = xz;

  //     if (qwe[tmid].type == 'S') {

  //       for (var j = 0; j < qwe[tmid].status_name.length; j++) {

  //         qwe[tmid][qwe[tmid].status_name[j][3]] = qwe[tmid].anwser.indexOf(qwe[tmid].status_name[j][0]);
  //         qwe[tmid][qwe[tmid].status_name[j][4]] = xz.indexOf(qwe[tmid].status_name[j][0]);

  //       }
  //     }
  //     wx.setStorage({
  //       key: this.Base.options.coursesct_id,
  //       data: JSON.stringify(qwe),
  //     });
  //     this.Base.setMyData({

  //       daan: xz,
  //       idd: e.currentTarget.dataset.id,
  //       disciplinetm: qwe[tmid]
  //     });
  //     this.Base.setMyData({
  //       yc: false
  //     })

     



  //     api.addquestionjl({
  //       question_id: e.currentTarget.dataset.id,
  //       coursesct_id: this.Base.getMyData().disciplinetm.coursesct_id,
  //       member_id: this.Base.getMyData().memberinfo.id,
  //       anwser: xz
  //     }, (hd) => {


  //       // api.disciplinetm({ coursesct_id: this.Base.options.coursesct_id }, (disciplinetm) => {
  //       //   for (var i = 0; i < disciplinetm.length; i++) {
  //       //     var duoxuan = [];
  //       //     if (disciplinetm[i].type == 'S') {
  //       //       duoxuan.push(['A', disciplinetm[i].option_a, false, 'isrightA', 'isceA']);
  //       //       duoxuan.push(['B', disciplinetm[i].option_b, false, 'isrightB', 'isceB']);
  //       //       duoxuan.push(['C', disciplinetm[i].option_c, false, 'isrightC', 'isceC']);
  //       //       duoxuan.push(['D', disciplinetm[i].option_d, false, 'isrightD', 'isceD']);
  //       //       duoxuan.push(['E', disciplinetm[i].option_e, false, 'isrightE', 'isceE']);
  //       //       duoxuan.push(['F', disciplinetm[i].option_f, false, 'isrightF', 'isceF']);
  //       //       duoxuan.push(['G', disciplinetm[i].option_g, false, 'isrightG', 'isceG']);
  //       //       duoxuan.push(['H', disciplinetm[i].option_h, false, 'isrightH', 'isceH']);
  //       //       disciplinetm[i].status_name = duoxuan;

  //       //       for (var j = 0; j < duoxuan.length; j++) {

  //       //         disciplinetm[i][duoxuan[j][3]] = disciplinetm[i].anwser.indexOf(duoxuan[j][0]);
  //       //         disciplinetm[i][duoxuan[j][4]] = disciplinetm[i].isanwser.indexOf(duoxuan[j][0]);
  //       //       }

  //       //     } else {
  //       //       duoxuan.push(['A', disciplinetm[i].option_a]);
  //       //       duoxuan.push(['B', disciplinetm[i].option_b]);
  //       //       duoxuan.push(['C', disciplinetm[i].option_c]);
  //       //       duoxuan.push(['D', disciplinetm[i].option_d]);
  //       //       duoxuan.push(['E', disciplinetm[i].option_e]);
  //       //       duoxuan.push(['F', disciplinetm[i].option_f]);
  //       //       duoxuan.push(['G', disciplinetm[i].option_g]);
  //       //       duoxuan.push(['H', disciplinetm[i].option_h]);
  //       //       disciplinetm[i].status_name = duoxuan;


  //       //     }

  //       //     disciplinetm[i].title_anwser = disciplinetm[i].title_anwser.replace(/ /g, "&nbsp;");
  //       //   }

  //       //   this.Base.setMyData({ disciplinetm: disciplinetm[this.Base.getMyData().tmid], item: disciplinetm, xz: null, yc: null });
  //       // })
  //       if (xz != e.currentTarget.dataset.daan) {

  //         api.wrongquestion({
  //           member_id: this.Base.getMyData().memberinfo.id,
  //           question_id: e.currentTarget.dataset.id,
  //           coursesct_id: this.Base.getMyData().disciplinetm.coursesct_id
  //         }, (cx) => {

  //           if (cx.length == 0) {
  //             api.addwrongquestion({
  //               member_id: this.Base.getMyData().memberinfo.id,
  //               question_id: e.currentTarget.dataset.id,
  //               coursesct_id: this.Base.getMyData().disciplinetm.coursesct_id
  //             }, () => {



  //             }, false)


  //           }

  //         }, false)



  //       }



  //     }, false)

  //   }
  //   // this.onReady1();

  // }
  xuanti() {

    wx.navigateBack({

    })
  }
  zhangjie() {

    wx.navigateBack({
      delta: 2
    })
  }
  shouye() {

    wx.switchTab({
      url: '/pages/home/home',
    })

  }
  huadon(e) {
    var id = this.Base.getMyData().tmid;
    var list = this.Base.getMyData().disciplinetm;
    if (list[id].status_name[0].length == 2) {

      list[id].status_name[0][2] = false;
      list[id].status_name[1][2] = false;
      list[id].status_name[2][2] = false;
      list[id].status_name[3][2] = false;
      list[id].status_name[4][2] = false;
      list[id].status_name[5][2] = false;
      list[id].status_name[6][2] = false;
      list[id].status_name[7][2] = false;

    }
    this.Base.setMyData({
      tmid: e.detail.current,
      xz: null,
      xzz: null
    });
    // this.onReady1();
  }
  syt() {
    var id = this.Base.getMyData().tmid;
    var item = this.Base.getMyData().item;

    if (id == 0) {
      this.Base.toast("已经是第一题了");
    } else {
      var duoxuan = [];
      if (item[id - 1].type == 'S') {
        duoxuan.push(['A', item[id - 1].option_a, false, 'isrightA', 'isceA']);
        duoxuan.push(['B', item[id - 1].option_b, false, 'isrightB', 'isceB']);
        duoxuan.push(['C', item[id - 1].option_c, false, 'isrightC', 'isceC']);
        duoxuan.push(['D', item[id - 1].option_d, false, 'isrightD', 'isceD']);
        duoxuan.push(['E', item[id - 1].option_e, false, 'isrightE', 'isceE']);
        duoxuan.push(['F', item[id - 1].option_f, false, 'isrightF', 'isceF']);
        duoxuan.push(['G', item[id - 1].option_g, false, 'isrightG', 'isceG']);
        duoxuan.push(['H', item[id - 1].option_h, false, 'isrightH', 'isceH']);
        item[id - 1].status_name = duoxuan;

        for (var j = 0; j < duoxuan.length; j++) {

          item[id - 1][duoxuan[j][3]] = item[id - 1].anwser.indexOf(duoxuan[j][0]);
          item[id - 1][duoxuan[j][4]] = item[id - 1].isanwser.indexOf(duoxuan[j][0]);
        }

      } else {
        duoxuan.push(['A', item[id - 1].option_a]);
        duoxuan.push(['B', item[id - 1].option_b]);
        duoxuan.push(['C', item[id - 1].option_c]);
        duoxuan.push(['D', item[id - 1].option_d]);
        duoxuan.push(['E', item[id - 1].option_e]);
        duoxuan.push(['F', item[id - 1].option_f]);
        duoxuan.push(['G', item[id - 1].option_g]);
        duoxuan.push(['H', item[id - 1].option_h]);
        item[id - 1].status_name = duoxuan;


      }
      if (item[id].status_name[0].length == 2) {

        item[id].status_name[0][2] = false;
        item[id].status_name[1][2] = false;
        item[id].status_name[2][2] = false;
        item[id].status_name[3][2] = false;
        item[id].status_name[4][2] = false;
        item[id].status_name[5][2] = false;
        item[id].status_name[6][2] = false;
        item[id].status_name[7][2] = false;

      }
      this.Base.setMyData({
        disciplinetm: item[id - 1],
        tmid: id - 1,
        xz: ''
      });
    }
  }
  //下一题
  xyt() {
    //var d = new Date().getTime();

    var id = this.Base.getMyData().tmid;
    var item = this.Base.getMyData().item;
    if (id == item.length - 1) {
      this.Base.toast("已经是最后一题了");
    } else {
      var duoxuan = [];
      if (item[id + 1].type == 'S') {
        duoxuan.push(['A', item[id + 1].option_a, false, 'isrightA', 'isceA']);
        duoxuan.push(['B', item[id + 1].option_b, false, 'isrightB', 'isceB']);
        duoxuan.push(['C', item[id + 1].option_c, false, 'isrightC', 'isceC']);
        duoxuan.push(['D', item[id + 1].option_d, false, 'isrightD', 'isceD']);
        duoxuan.push(['E', item[id + 1].option_e, false, 'isrightE', 'isceE']);
        duoxuan.push(['F', item[id + 1].option_f, false, 'isrightF', 'isceF']);
        duoxuan.push(['G', item[id + 1].option_g, false, 'isrightG', 'isceG']);
        duoxuan.push(['H', item[id + 1].option_h, false, 'isrightH', 'isceH']);
        item[id + 1].status_name = duoxuan;

        for (var j = 0; j < duoxuan.length; j++) {

          item[id + 1][duoxuan[j][3]] = item[id + 1].anwser.indexOf(duoxuan[j][0]);
          item[id + 1][duoxuan[j][4]] = item[id + 1].isanwser.indexOf(duoxuan[j][0]);
        }

      } else {
        duoxuan.push(['A', item[id + 1].option_a]);
        duoxuan.push(['B', item[id + 1].option_b]);
        duoxuan.push(['C', item[id + 1].option_c]);
        duoxuan.push(['D', item[id + 1].option_d]);
        duoxuan.push(['E', item[id + 1].option_e]);
        duoxuan.push(['F', item[id + 1].option_f]);
        duoxuan.push(['G', item[id + 1].option_g]);
        duoxuan.push(['H', item[id + 1].option_h]);
        item[id + 1].status_name = duoxuan;


      }
      if (item[id].status_name[0].length == 2) {

        item[id].status_name[0][2] = false;
        item[id].status_name[1][2] = false;
        item[id].status_name[2][2] = false;
        item[id].status_name[3][2] = false;
        item[id].status_name[4][2] = false;
        item[id].status_name[5][2] = false;
        item[id].status_name[6][2] = false;
        item[id].status_name[7][2] = false;

      }
      this.Base.setMyData({
        disciplinetm: item[id + 1],
        tmid: id + 1,
        xz: ''
      });

      // var d1 = new Date().getTime() - d;
      // this.Base.info(d1.toString());



    }
  }
  cuotiku() {
    wx.navigateTo({
      url: '/pages/errordatabase/errordatabase',
    })


  }
  chonzuoone() {
    var that = this;
    var coursesct_id = that.Base.options.coursesct_id;
    wx.showModal({

      content: '是否确定重做本题',

      success: function (res) {
        if (res.confirm) {
         
          api.delquestionjl({
            member_id: that.Base.getMyData().memberinfo.id,
            coursesct_id: coursesct_id,
            questionsrd: that.Base.getMyData().disciplinetm.id
          }, (del) => {

            var item = that.Base.getMyData().item;
            var tmid = that.Base.getMyData().tmid;
            item[tmid].isanwser = '';

            wx.setStorage({
              key: coursesct_id,
              data: JSON.stringify(item),
            });

            that.Base.setMyData({
              disciplinetm: item[tmid],
              idd: null,
              xz: null


            })


          })


        } else {

        }
      }
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
  paihanban(){
    var id = this.Base.getMyData().disciplinetm.shijuan_id;
  wx.navigateTo({
    url: '/pages/cjph/cjph?id='+id,
  })


  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.radioChange = content.radioChange;
body.tjdn = content.tjdn;
body.xuanti = content.xuanti;
body.shouye = content.shouye;
body.paihanban = content.paihanban;
body.chonzuoone = content.chonzuoone;
body.cuotiku = content.cuotiku;
body.huadon = content.huadon;
body.zhangjie = content.zhangjie;
body.syt = content.syt;
body.xyt = content.xyt;
body.onReady1 = content.onReady1;
body.touchStart = content.touchStart;
body.touchEnd = content.touchEnd;
body.select = content.select;
Page(body)