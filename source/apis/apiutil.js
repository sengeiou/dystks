import { ApiConfig } from 'apiconfig.js';

export class ApiUtil {
  static   chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  static  chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
  static  chnUnitChar = ["", "十", "百", "千"];



  static numToChn(num) {
    var index = num.toString().indexOf(".");
    if (index != -1) {
      var str = num.toString().slice(index);
      var a = "点";
      for (var i = 1; i < str.length; i++) {
        a += ApiUtil.chnNumChar[parseInt(str[i])];
      }
      return a;
    } else {
      return;
    }
  }
  static sectionToChinese(section) {
    var str = '', chnstr = '', zero = false, count = 0;   //zero为是否进行补零， 第一次进行取余由于为个位数，默认不补零
    while (section > 0) {
      var v = section % 10;  //对数字取余10，得到的数即为个位数
      if (v == 0) {                    //如果数字为零，则对字符串进行补零
        if (zero) {
          zero = false;        //如果遇到连续多次取余都是0，那么只需补一个零即可
          chnstr = ApiUtil.chnNumChar[v] + chnstr;
        }
      } else {
        zero = true;           //第一次取余之后，如果再次取余为零，则需要补零
        str = ApiUtil.chnNumChar[v];
        str += ApiUtil.chnUnitChar[count];
        chnstr = str + chnstr;
      }
      count++;
      section = Math.floor(section / 10);
    }
    return chnstr;
  }

  static TransformToChinese(num) {
    var a = ApiUtil.numToChn(num);
    num = Math.floor(num);
    var unitPos = 0;
    var strIns = '', chnStr = '';
    var needZero = false;

    if (num === 0) {
      return ApiUtil.chnNumChar[0];
    }
    while (num > 0) {
      var section = num % 10000;
      if (needZero) {
        chnStr = ApiUtil.chnNumChar[0] + chnStr;
      }
      strIns = ApiUtil.sectionToChinese(section);
      strIns += (section !== 0) ? ApiUtil.chnUnitSection[unitPos] : ApiUtil.chnUnitSection[0];
      chnStr = strIns + chnStr;
      needZero = (section < 1000) && (section > 0);
      num = Math.floor(num / 10000);
      unitPos++;
    }

    return chnStr ;
  }











































  static renamelist = [];
  static HtmlDecode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");


    s = s.replace(new RegExp("</p>", "gm"), "</p><br />");
    s = s.replace(new RegExp("\"/alucard263096/carpost/upload/", "gm"), "\"" + "https://cmsdev.app-link.org/alucard263096/carpost/upload/");


    return s;
  }

  static fixRename(ret) {
    var renamelist = ApiUtil.renamelist;
    console.log("rename a");
    if (ret instanceof Array) {
      for (var i = 0; i < ret.length; i++) {
        if (ret[i].member_id != undefined && renamelist[ret[i].member_id] != undefined && renamelist[ret[i].member_id] != "") {
          ret[i].member_nickName = renamelist[ret[i].member_id];
        }
        if (ret[i].nickName != undefined && renamelist[ret[i].id] != undefined && renamelist[ret[i].id] != "") {
          ret[i].nickName = renamelist[ret[i].id];
        }
      }
    } else {
      console.log("rename b");
      if (ret.member_id != undefined && renamelist[ret.member_id] != undefined && renamelist[ret.member_id] != "") {
        ret.member_nickName = renamelist[ret.member_id].nickName;
      }
      if (ret.nickName != undefined && renamelist[ret.id] != undefined && renamelist[ret.id] != "") {
        console.log("rename c");
        ret.nickName = renamelist[ret.id];
      }
    }
    return ret;
  }

  static Toast(toastCtrl, msg) {
    let toast = toastCtrl.create({
      message: msg
    });
    toast.present();
  }

  static FormatDateTime(val) {
    return val.getFullYear() + "-" + (val.getMonth() + 1) + "-" + val.getDate() +
      " " + val.getHours() + ":" + val.getMinutes() + ":" + val.getSeconds();
  }
  static FormatDate(val) {
    return val.getFullYear() + "-" + (val.getMonth() + 1) + "-" + val.getDate();
  }

  static IsMobileNo(str) {

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    return myreg.test(str);
  }
  static FormatPercent(val) {
    val = val * 100.0;
    return val.toFixed(2) + '%';
  }
  static FormatPrice(val) {
    val = val * 1.0;
    return val.toFixed(2);
  }
  static FormatNumber(val, digits) {
    val = val * 1.0;
    return val.toFixed(digits);
  }
  static Storage = null;

  static TimeAgo(agoTime) {

    // 计算出当前日期时间到之前的日期时间的毫秒数，以便进行下一步的计算
    var time = (new Date()).getTime() / 1000 - agoTime;

    var num = 0;
    if (time >= 31104000) { // N年前
      num = parseInt(time / 31104000);
      return num + '年前';
    }
    if (time >= 2592000) { // N月前
      num = parseInt(time / 2592000);
      return num + '月前';
    }
    if (time >= 86400) { // N天前
      num = parseInt(time / 86400);
      return num + '天前';
    }
    if (time >= 3600) { // N小时前
      num = parseInt(time / 3600);
      return num + '小时前';
    }
    if (time > 60) { // N分钟前
      num = parseInt(time / 60);
      return num + '分钟前';
    }
    return '1分钟前';
  }


  static fixImages(info) {
    var images = [];
    if (info.photo1 != "") {
      images.push(info.photo1);
    }
    if (info.photo2 != "") {
      images.push(info.photo2);
    }
    if (info.photo3 != "") {
      images.push(info.photo3);
    }
    if (info.photo4 != "") {
      images.push(info.photo4);
    }
    if (info.photo5 != "") {
      images.push(info.photo5);
    }
    if (info.photo6 != "") {
      images.push(info.photo6);
    }
    if (info.photo7 != "") {
      images.push(info.photo7);
    }
    if (info.photo8 != "") {
      images.push(info.photo8);
    }
    if (info.photo9 != "") {
      images.push(info.photo9);
    }
    if (info.photo10 != "") {
      images.push(info.photo10);
    }
    if (info.photo11 != "") {
      images.push(info.photo11);
    }
    if (info.photo12 != "") {
      images.push(info.photo12);
    }
    if (info.photo13 != "") {
      images.push(info.photo13);
    }
    if (info.photo14 != "") {
      images.push(info.photo14);
    }
    return images;
  }
  static toChinesNum(num) {
    let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = "零"
    let unit = ["", "十", "百", "千", "万"];
    num = parseInt(num);
    let getWan = (temp) => {
      let strArr = temp.toString().split("").reverse();
      let newNum = "";
      for (var i = 0; i < strArr.length; i++) {
        newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
      }
      return newNum;
    }
    let overWan = Math.floor(num / 10000);
    let noWan = num % 10000;
    if (noWan.toString().length < 4) noWan = "0" + noWan;
    return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);

  }

  


}