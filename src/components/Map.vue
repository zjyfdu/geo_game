<template>
  <div class="map">
    <div class="map-container" id="map-container"></div>
    <mapNavigator @zoomIn="zoomIn" @zoomOut="zoomOut" @restart="restart" @check="check" :descriptions="descriptions" :score="score" :checkdisabled="checkdisabled"></mapNavigator>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import $L from "leaflet";
import axios from "axios";
import mapNavigator from "./MapNavigator.vue";

const createMap = divId => {
  var map = new $L.map(divId, {
    detectRetina: true,
    zoomControl: false,
    minZoom: 4,
    maxZoom: 9
  });
  return map;
};

const createTileLayer = async (map, url, options) => {
  let tileLayer = await $L.tileLayer(url, options);
  tileLayer.addTo(map);
  return tileLayer;
};

export default {
  name: "Map",
  components: {
    mapNavigator
  },
  data() {
    return {
      map: null,
      tileurl: "http://192.168.100.21:5000/tile?x={x}&y={y}&z={z}",
      latlngurl: "http://192.168.100.21:5000/loc",
      cities: [
        "台北",
        "新北",
        "桃园",
        "台中",
        "高雄",
        "基隆",
        "新竹",
        "嘉义",
        "北京",
        "上海",
        "天津",
        "重庆",
        "石家庄",
        "唐山",
        "秦皇岛",
        "邯郸",
        "邢台",
        "张家口",
        "保定",
        "承德",
        "沧州",
        "廊坊",
        "衡水",
        "太原",
        "大同",
        "阳泉",
        "长治",
        "晋城",
        "晋中",
        "朔州",
        "运城",
        "忻州",
        "临汾",
        "吕梁",
        "呼和浩特",
        "包头",
        "乌海",
        "赤峰",
        "通辽",
        "鄂尔多斯",
        "呼伦贝尔",
        "巴彦淖尔",
        "乌兰察布",
        "沈阳",
        "大连",
        "鞍山",
        "抚顺",
        "本溪",
        "丹东",
        "锦州",
        "营口",
        "阜新",
        "辽阳",
        "盘锦",
        "铁岭",
        "朝阳",
        "葫芦岛",
        "长春",
        "吉林",
        "四平",
        "辽源",
        "通化",
        "白山",
        "松原",
        "白城",
        "哈尔滨",
        "齐齐哈尔",
        "鸡西",
        "鹤岗",
        "双鸭山",
        "大庆",
        "伊春",
        "佳木斯",
        "七台河",
        "牡丹江",
        "黑河",
        "澳门",
        "香港",
        "绥化",
        "南京",
        "无锡",
        "徐州",
        "常州",
        "苏州",
        "南通",
        "扬州",
        "镇江",
        "盐城",
        "淮安",
        "泰州",
        "连云港",
        "宿迁",
        "杭州",
        "宁波",
        "温州",
        "绍兴",
        "湖州",
        "嘉兴",
        "金华",
        "衢州",
        "舟山",
        "台州",
        "丽水",
        "合肥",
        "芜湖",
        "蚌埠",
        "马鞍山",
        "安庆",
        "淮南",
        "滁州",
        "铜陵",
        "亳州",
        "淮北",
        "阜阳",
        "宿州",
        "六安",
        "宣城",
        "黄山",
        "池州",
        "福州",
        "厦门",
        "泉州",
        "莆田",
        "漳州",
        "三明",
        "南平",
        "龙岩",
        "宁德",
        "南昌",
        "赣州",
        "宜春",
        "吉安",
        "上饶",
        "抚州",
        "九江",
        "景德镇",
        "萍乡",
        "新余",
        "鹰潭",
        "济南",
        "青岛",
        "淄博",
        "枣庄",
        "东营",
        "烟台",
        "潍坊",
        "济宁",
        "泰安",
        "威海",
        "日照",
        "滨州",
        "德州",
        "聊城",
        "临沂",
        "菏泽",
        "莱芜",
        "郑州",
        "开封",
        "洛阳",
        "商丘",
        "安阳",
        "平顶山",
        "新乡",
        "焦作",
        "许昌",
        "漯河",
        "三门峡",
        "鹤壁",
        "周口",
        "驻马店",
        "南阳",
        "信阳",
        "濮阳",
        "武汉",
        "黄石",
        "十堰",
        "荆州",
        "宜昌",
        "襄阳",
        "鄂州",
        "荆门",
        "黄冈",
        "孝感",
        "咸宁",
        "随州",
        "长沙",
        "株洲",
        "湘潭",
        "衡阳",
        "邵阳",
        "岳阳",
        "张家界",
        "怀化",
        "常德",
        "益阳",
        "郴州",
        "永州",
        "娄底",
        "广州",
        "深圳",
        "珠海",
        "汕头",
        "佛山",
        "韶关",
        "湛江",
        "肇庆",
        "江门",
        "茂名",
        "惠州",
        "梅州",
        "汕尾",
        "河源",
        "阳江",
        "清远",
        "东莞",
        "中山",
        "潮州",
        "揭阳",
        "云浮",
        "南宁",
        "柳州",
        "桂林",
        "梧州",
        "北海",
        "崇左",
        "来宾",
        "贵港",
        "贺州",
        "玉林",
        "百色",
        "河池",
        "钦州",
        "防城港",
        "海口",
        "三亚",
        "三沙",
        "儋州",
        "成都",
        "自贡",
        "攀枝花",
        "泸州",
        "德阳",
        "绵阳",
        "广元",
        "遂宁",
        "内江",
        "乐山",
        "南充",
        "眉山",
        "广安",
        "宜宾",
        "达州",
        "雅安",
        "巴中",
        "资阳",
        "贵阳",
        "六盘水",
        "遵义",
        "铜仁",
        "安顺",
        "毕节",
        "昆明",
        "曲靖",
        "玉溪",
        "保山",
        "昭通",
        "丽江",
        "普洱",
        "临沧",
        "拉萨",
        "日喀则",
        "昌都",
        "林芝",
        "山南",
        "西安",
        "铜川",
        "咸阳",
        "渭南",
        "汉中",
        "安康",
        "商洛",
        "延安",
        "榆林",
        "宝鸡",
        "兰州",
        "嘉峪关",
        "金昌",
        "白银",
        "天水",
        "酒泉",
        "张掖",
        "武威",
        "定西",
        "陇南",
        "平凉",
        "庆阳",
        "西宁",
        "海东",
        "银川",
        "石嘴山",
        "吴忠",
        "固原",
        "中卫",
        "乌鲁木齐",
        "克拉玛依",
        "吐鲁番",
        "哈密"
      ],
      score: 0,
      descriptions: ["点击下一题，然后在地图上点击相应的城市"],
      clickLoc: null,
      clickCity: "",
      clickProvince: "",
      rightLoc: null,
      rightCity: "",
      rightProvince: "",
      randcity: "",
      marker_icon: $L.icon({
        iconUrl: "../assets/marker-icon-2x.png"
      })
    };
  },
  computed: {
    clickAns: function() {
      return "我觉得这里是" + this.randcity;
    },
    checkdisabled: function() {
      return this.randcity === "" || this.clickLoc === null;
    }
  },
  mounted() {
    this.map = createMap("map-container");

    createTileLayer(this.map, this.tileurl, {});

    // 设施地图视图 中心位置
    this.map.setView([39.92, 116.46], 4);
    this.map.on("click", e => {
      this.clickLoc = e.latlng;
      if (this.randcity !== "") {
        $L.marker(e.latlng, { icon: this.marker_icon })
          .addTo(this.map)
          .bindPopup(this.clickAns)
          .openPopup();
      }
    });
  },
  methods: {
    zoomIn() {
      this.map.zoomIn();
    },
    zoomOut() {
      this.map.zoomOut();
    },
    resetMap() {
      this.map.setView([39.92, 116.46], 4);
    },
    restart() {
      this.randcity = this.cities[
        Math.floor(Math.random() * this.cities.length)
      ];
      this.descriptions = ["请点击" + this.randcity + "的位置"];
    },
    check() {
      if (this.clickLoc === null) {
        // this.descriptions.push("大哥请先点击" + this.randcity + "的位置");
        return;
      }
      const getlocation = () => {
        return axios.get(this.latlngurl, {
          params: {
            location: this.clickLoc.lat + "," + this.clickLoc.lng
          }
        });
      };
      const getaddress = () => {
        return axios.get(this.latlngurl, {
          params: {
            address: this.randcity
          }
        });
      };
      const locAddHandle = (res1, res2) => {
        this.clickCity = res1.data.result.address_component.city;
        this.clickProvince = res1.data.result.address_component.province;
        this.descriptions.push(
          "点击的是" + this.clickProvince + this.clickCity
        );
        this.rightCity = res2.data.result.address_components.city;
        this.rightProvince = res2.data.result.address_components.province;
        this.rightLoc = res2.data.result.location;
      };
      const finalHandle = () => {
        if (this.rightCity === this.clickCity) {
          this.descriptions.push("答对了");
          // this.scorealert("(*^_^*)", "答对了加10分", "success");
          this.score += 10;
        } else if (this.rightProvince === this.clickProvince) {
          this.descriptions.push("起码在同一个省了");
          // this.scorealert("emmmmm", "起码在同一个省了，给你5分吧", "success");
          this.score += 5;
        } else {
          this.descriptions.push("都不在一个省了");
          // this.scorealert(
          //   "T-T",
          //   "都不在一个省了，看到这1分了吗，丢了也不给你",
          //   "error"
          // );
        }
        $L.marker(this.rightLoc, { icon: this.marker_icon })
          .addTo(this.map)
          .bindPopup("这里是" + this.rightProvince + this.rightCity)
          .openPopup();
        this.clickLoc = null;
      };
      axios
        .all([getlocation(), getaddress()])
        .then(axios.spread(locAddHandle))
        .then(finalHandle);
    }
    // scorealert(title, message, type) {
    //   this.$notify({
    //     title: title,
    //     message: message,
    //     type: type,
    //     offset: 300
    //   });
    // }
  }
};
</script>

<style scoped>
.map-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
