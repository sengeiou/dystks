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
    this.Base.setMyData({ xuanzhon: 0 });
  }
  onMyShow() {
    var that = this;
    var api = new InstApi();
    var xuanzhon=this.Base.getMyData().xuanzhon;
    if (xuanzhon==0)
    {
    api.ksjlph({ shijuan_id: this.Base.options.id, orderby: 'score desc', member_id: this.Base.getMyData().memberinfo.id },
      (ksjlph) => {

        for (var i = 0; i < ksjlph.length; i++) {
          var a = ksjlph[i].score;
          ksjlph[i].score = (parseInt(a)).toFixed(1);


        }
        this.Base.setMyData({
          ksjlph: ksjlph
        })

        })
    } else {
      var api = new InstApi();
      api.ksjlph1({ shijuan_id: this.Base.options.id, orderby: 'zuigao desc', },
        (ksjlph) => {
          for (var i = 0; i < ksjlph.length; i++) {
            var a = ksjlph[i].zuigao;
            ksjlph[i].score = (parseInt(a)).toFixed(1);


          }
          this.Base.setMyData({
            ksjlph: ksjlph
          })

        })

    }


  }
  xuanze(e) {

    this.Base.setMyData({
      xuanzhon: e.target.id
    })
    var member = '';
    if (e.target.id == 0) {
      member = this.Base.getMyData().memberinfo.id;
      var api = new InstApi();
      api.ksjlph({ shijuan_id: this.Base.options.id, orderby: 'score desc', member_id: member },
        (ksjlph) => {
          for (var i = 0; i < ksjlph.length; i++) {
            var a = ksjlph[i].score;
            ksjlph[i].score = (parseInt(a)).toFixed(1);


          }
          this.Base.setMyData({
            ksjlph: ksjlph
          })

        })

    }
    else {
      var api = new InstApi();
      api.ksjlph1({ shijuan_id: this.Base.options.id, orderby: 'zuigao desc', },
        (ksjlph) => {
          for (var i = 0; i < ksjlph.length; i++) {
            var a = ksjlph[i].zuigao;
            ksjlph[i].score = (parseInt(a)).toFixed(1);


          }
          this.Base.setMyData({
            ksjlph: ksjlph
          })

        })

    }





  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.xuanze = content.xuanze;
Page(body)