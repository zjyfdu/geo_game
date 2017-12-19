/**
 * Created by zhaijy on 2017/12/19.
 */
var map, geocoder, clickLoc = [], trueLoc = [], checkDistance, exit, checkRightAns;
var geoArray = ['台北', '新北', '桃园', '台中', '高雄', '基隆', '新竹', '嘉义', '北京', '上海', '天津', '重庆', '石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '张家口', '保定', '承德', '沧州', '廊坊', '衡水', '太原', '大同', '阳泉', '长治', '晋城', '晋中', '朔州', '运城', '忻州', '临汾', '吕梁', '呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛', '长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '哈尔滨', '齐齐哈尔', '鸡西', '鹤岗', '双鸭山', '大庆', '伊春', '佳木斯', '七台河', '牡丹江', '黑河', '澳门', '香港', '绥化', '南京', '无锡', '徐州', '常州', '苏州', '南通', '扬州', '镇江', '盐城', '淮安', '泰州', '连云港', '宿迁', '杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州', '舟山', '台州', '丽水', '合肥', '芜湖', '蚌埠', '马鞍山', '安庆', '淮南', '滁州', '铜陵', '亳州', '淮北', '阜阳', '宿州', '六安', '宣城', '黄山', '池州', '福州', '厦门', '泉州', '莆田', '漳州', '三明', '南平', '龙岩', '宁德', '南昌', '赣州', '宜春', '吉安', '上饶', '抚州', '九江', '景德镇', '萍乡', '新余', '鹰潭', '济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '滨州', '德州', '聊城', '临沂', '菏泽', '莱芜', '郑州', '开封', '洛阳', '商丘', '安阳', '平顶山', '新乡', '焦作', '许昌', '漯河', '三门峡', '鹤壁', '周口', '驻马店', '南阳', '信阳', '濮阳', '武汉', '黄石', '十堰', '荆州', '宜昌', '襄阳', '鄂州', '荆门', '黄冈', '孝感', '咸宁', '随州', '长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '张家界', '怀化', '常德', '益阳', '郴州', '永州', '娄底', '广州', '深圳', '珠海', '汕头', '佛山', '韶关', '湛江', '肇庆', '江门', '茂名', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮', '南宁', '柳州', '桂林', '梧州', '北海', '崇左', '来宾', '贵港', '贺州', '玉林', '百色', '河池', '钦州', '防城港', '海口', '三亚', '三沙', '儋州', '成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '广安', '宜宾', '达州', '雅安', '巴中', '资阳', '贵阳', '六盘水', '遵义', '铜仁', '安顺', '毕节', '昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '拉萨', '日喀则', '昌都', '林芝', '山南', '西安', '铜川', '咸阳', '渭南', '汉中', '安康', '商洛', '延安', '榆林', '宝鸡', '兰州', '嘉峪关', '金昌', '白银', '天水', '酒泉', '张掖', '武威', '定西', '陇南', '平凉', '庆阳', '西宁', '海东', '银川', '石嘴山', '吴忠', '固原', '中卫', '乌鲁木齐', '克拉玛依', '吐鲁番', '哈密'];
var count;
var grade = 0;
// function init() {
    map = new qq.maps.Map(document.getElementById("container"), {

    //通过mapTypeId来设置卫星地图样式
        mapTypeId:qq.maps.MapTypeId.HYBRID,
        center: new qq.maps.LatLng(39.916527,116.397128),
        zoomLevel:14
    });

    //点击增加标志
    qq.maps.event.addListener(map, 'click', function(event) {
       var marker=new qq.maps.Marker({
                position:event.latLng,
                map:map
          });
      qq.maps.event.addListener(map, 'click', function(event) {
            marker.setMap(null);
    });
    });

    geocoder = new qq.maps.Geocoder({
        complete : function(result){
            var tmp = result.detail.location;
            trueLoc = [tmp.getLng(), tmp.getLat()];
            console.log("true location" + trueLoc);
            var start = new qq.maps.LatLng(clickLoc[1], clickLoc[0]);
            var end = new qq.maps.LatLng(trueLoc[1], trueLoc[0]);
            var dis = Math.round(qq.maps.geometry.spherical.computeDistanceBetween(start, end)/1000);
            if (dis <= 50)
                grade += 10;
            else if (dis <= 100)
                grade += 5;
            else if (dis <= 200)
                grade += 2;
            document.getElementById("distance").innerHTML = "your click point is " +　dis + " km from " + geoArray[count];
            document.getElementById("grade").innerHTML = "you got " + grade + " points";
            count = count + 1;
            if (count >= geoArray.length)
                restart();
            else
                document.getElementById("res").innerHTML = "click " + geoArray[count] + " on map";
            console.log(count);
            if (count%10 == 0)
                alert("your average score is " + Math.round(grade*10/count)/10 + "!\nyou are such a smart ass!!" + "\ncarry on!!");
            clickLoc = [];
            }
    });

    exit = function () {
        alert("close the browser by yourself, don\'t count on me");
    }

    restart = function () {

        var len = geoArray.length;
        for(var i = 0; i < len - 1; i++){
        var idx = Math.floor(Math.random() * (len - i));
        var temp = geoArray[idx];
        geoArray[idx] = geoArray[len - i - 1];
        geoArray[len - i -1] = temp;
        }
        count = 0;
        document.getElementById("res").innerHTML = "click " + geoArray[count] + " on map and then check your ans";
    }

    check = function () {

        if (clickLoc.length == 0)
            alert("click the location of " + geoArray[count] + " before you check your answer");
        else
            geocoder.getLocation(geoArray[count]);
    }

    checkRightAns = function() {
        if (trueLoc.length == 0)
            alert("click the location of " + geoArray[count] + " before you check the right answer");
        else{
            var marker=new qq.maps.Marker({
                    position:new qq.maps.LatLng(trueLoc[1], trueLoc[0]),
                    map:map
            });
            qq.maps.event.addListener(map, 'click', function(event) {
                marker.setMap(null);
            });
        }

    }

// }
