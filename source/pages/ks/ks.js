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
    this.Base.setMyData({ sj: 0, istrue: false })
    this.timer = setInterval(() => {
      var sj = this.Base.getMyData().sj + 1;
      this.Base.setMyData({ sj: sj })

    }, 1000)
  }
  onMyShow() {
    var that = this;

    var api = new InstApi();
    api.getshijuan({ id: this.Base.options.id},(shijuan)=>{

      this.Base.setMyData({
        shijuan: shijuan
      })
    })

    api.gettimu({ shijuan_id: this.Base.options.id }, (disciplinetm) => {
      console.log(disciplinetm);
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

      this.Base.setMyData({ timu: disciplinetm, tishu: tishu })

    })

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

    console.log(e);
    var tihao = e.currentTarget.dataset.tihao;
    var xuanzhon = e.currentTarget.id;
    var xuanxian = e.currentTarget.dataset.duoxuan;
    var timu = this.Base.getMyData().timu;
    if (timu[tihao].type == 'S') {
      timu[tihao].status_name[xuanxian][2] = !timu[tihao].status_name[xuanxian][2];
      var xuanze = '';
      var xuanze1 = '';
      for (var i = 0; i < 8; i++) {
        if (timu[tihao].status_name[i][2] == true)
          xuanze += timu[tihao].status_name[i][0];
      }


      timu[tihao].xz = xuanze;
    }
    else {
      timu[tihao].xz = xuanzhon;
    }
    var tishu = 0;
    for (var i = 0; i < timu.length; i++) {
      if (timu[i].xz != '') {
        tishu++;
      }

    }


    this.Base.setMyData({ timu: timu, tishu: tishu })

  }
  jiaojuan() {
    var that = this;
    var api = new InstApi();
    wx.showModal({

      content: '确定交卷吗？答题结果可以在成绩排名处查看',

      success: function (res) {
        if (res.confirm) {
          var timu = that.Base.getMyData().timu;
          var daan = [];
          for (var i = 0; i < timu.length; i++) {
            // i == 0 ? daan += timu[i].xz  :  daan += ',' + timu[i].xz;
            daan.push(timu[i].xz);
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
    var gaodu = 0;
    var query = wx.createSelectorQuery();
    var xuanze=[];
  
    for (var i = 0; i < e.currentTarget.dataset.shunxu; i++) {
      xuanze.push('#q'+i);
    }
var xuanze= xuanze.join(",");
    query.selectAll(xuanze).boundingClientRect();
    if(i==0){
      wx.pageScrollTo({
        scrollTop:  45,
        duration: 300
      })
    }
    query.exec(function (res) {
      for (var i = 0; i < res[0].length;i++)
      { 
        gaodu += res[0][i].height;
        if (i == res[0].length-1)
        {
        wx.pageScrollTo({
          scrollTop: gaodu + 45,
          duration: 300
        })
        }

      }
  
    })

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
Page(body)