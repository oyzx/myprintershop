/**
 * Created by bobodaren007 on 2016/7/12 0012.
 */


window.onload = function() {
    document.querySelector(".searchInput").focus();
}

function subName() {
    if (document.querySelector(".goodsList").childNodes != null) document.querySelector(".goodsList").innerHTML = " "
    var sarchIput = document.querySelector(".searchInput").value
    var sarchBtn = document.querySelector('.searchBtn')
    if (sarchIput.length == 0) {
        sarchBtn.innerHTML = '<i class="icon iconfont icon-search"></i>'
    } else {
        sarchBtn.innerHTML = '<i class="icon iconfont icon-close" style="padding: 16px;margin-left:-16px"></i>'
        sarchBtn.onclick = function() {
            document.querySelector(".searchInput").value = ''
            sarchBtn.innerHTML = '<i class="icon iconfont icon-search"></i>'
        }
    }

    fd = new FormData(), xhr = new XMLHttpRequest()
    fd.append("name", sarchIput)
    xhr.open("POST", "/sales/getcomsbyname", true)
    xhr.send(fd)
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var searchJson = eval('(' + xhr.responseText + ');')

            loadSearchGoods(searchJson, 1)
            console.log(searchJson)
        }
    }
}


function loadSearchGoods(json, num) {
    var goodsList = document.querySelector(".goodsList")
    if (num == 1) {
        goodsList.innerHTML = ''
    }
    for (var i = 0; i < json.data.length; i++) {
        var url = "location.href='goodsdetail.html?comid=" + json.data[i].id + "&commoditytype=" + json.data[i].commoditytype
        url += "'"
        if(json.data[i].discount==100){
          var isVip=""
        }else{
          var isVip='会员'+json.data[i].discount/10+'折 / ¥ '+ (json.data[i].price*json.data[i].discount) / 10000
        }
        if (json.data[i].commoditytype == 7) {
            var preorderFlag = document.querySelectorAll(".preorderFlag")
            if (json.data[i].promotionflag == 1) {
                var commodity = '<ul style="-webkit-overflow-scrolling: touch;" class="flex allGoods"  id="' + json.data[i].id + '' +
                    '" data-preorder="' + json.data[i].preorder + '" onclick=' + url + '><img src="' + 'http://od35wia0b.bkt.clouddn.com/' +
                    json.data[i].url + '" alt=""/>' +
                    '<li class="flex-1"><h1 class="orderType"><span>【' + json.data[i].name + '】</span><spqn>(提前' + json.data[i].delivery_interval + '天预定)</spqn>' + json.data[i].intro + '</h1>' +
                    '<h2 class="price" style="color:#e4393c">¥ ' + json.data[i].price / 100 + '<span>/ ' + json.data[i].specification + '</span>' +
                    '<p style="float: right" class="iconRight"><i data-promotionflag="' + json.data[i].promotionflag + '" data-discount="'+json.data[i].discount+'" data-stockamount="' + json.data[i].stockamount + '"></i></p></h2><h2 style="margin: 0;font-size: 12px;"><p style="color:#999" class="preorderFlag">买 ' + json.data[i].promotion[0].data.buys + ' 送 ' + json.data[i].promotion[0].data.gifts + '</p></h2>' +
                    '<h3 class="flex"> <p class="flex-1">库存(<span class="saletype">' + json.data[i].stockamount + '</span >)<span>' +
                    '<div class="addTo flex"><i data-promotion-buys="' + json.data[i].promotion[0].data.buys + '" data-promotion-gift="' + json.data[i].promotion[0].data.gifts + '" data-promotion-count="' + json.data[i].promotion[0].data.count + '" data-promotion-reapttimes="' + json.data[i].promotion[0].data.reapttimes + '" data-id="' + json.data[i].id + '" data-commoditytype="' + json.data[i].commoditytype + '" class="icon iconfont minus icon-minuscircleo" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" style="display:none;"></i>' +
                    '<b class="flex-1" id="com_' + json.data[i].id + '"></b><i' +
                    ' data-preorder="' + json.data[i].preorder + '" data-preorderprice="' + json.data[i].preorderprice + '" ' +
                    'data-price="' + json.data[i].price + '" data-promotionflag="' + json.data[i].promotionflag + '"' +
                    ' data-specification="' + json.data[i].specification + '" data-startorder="' + json.data[i].startorder + '"' +
                    'data-discount="'+json.data[i].discount+'" data-stockamount="' + json.data[i].stockamount + '" data-unit="' + json.data[i].unit + '" data-url="' + json.data[i].url + '"' +
                    ' data-name="' + json.data[i].name + '" data-id="' + json.data[i].id + '" ' +
                    'data-groupprice="' + json.data[i].groupprice + '" data-finishordder="' + json.data[i].finishordder + '" ' +
                    'data-delivery_interval="' + json.data[i].delivery_interval + '" data-commoditytype="' + json.data[i].commoditytype + '" ' +
                    'data-promotion-repeatpurchasetimes="' + json.data[i].promotion[0].repeatpurchasetimes + '" data-preorder="' + json.data[i].preorder + '" data-promotion-buys="' + json.data[i].promotion[0].data.buys + '" data-promotion-gift="' + json.data[i].promotion[0].data.gifts + '" data-promotion-count="' + json.data[i].promotion[0].data.count + '" data-promotion-reapttimes="' + json.data[i].promotion[0].data.reapttimes + '"' +
                    '  class="icon iconfont icon-pluscircle"' +
                    '></i></div></h3></li></ul>'
                goodsList.innerHTML += commodity

            }
            if (json.data[i].promotionflag == 2) {
                var commodity = '<ul style="-webkit-overflow-scrolling: touch;" class="flex allGoods"  id="' + json.data[i].id + '' +
                    '" data-preorder="' + json.data[i].preorder + '" onclick=' + url + '><img src="' + 'http://od35wia0b.bkt.clouddn.com/' +
                    json.data[i].url + '" alt=""/>' +
                    '<li class="flex-1"><h1 class="orderType"><span>【' + json.data[i].name + '】</span><spqn>(提前' + json.data[i].delivery_interval + '天预定)</spqn> ' + json.data[i].intro + '</h1>' +
                    '<h2 class="price" style="color:#e4393c">¥ ' + json.data[i].price / 100 * json.data[i].promotion[0].discount / 100 + '<span>/ ' + json.data[i].specification + '</span>' +
                    '<p style="float: right" class="iconRight"></span> </p></h2><h2 style="margin: 0;font-size: 12px;"><p style="color:#999" class="preorderFlag">' + json.data[i].promotion[0].discount / 10 + ' 折 / <strike>原价 :  ¥ ' + json.data[i].price / 100 + ' </strike></p></h2>' +
                    '<h3 class="flex"> <p class="flex-1">库存(<span class="saletype">' + json.data[i].stockamount + '</span >)<span>' +
                    '<div class="addTo flex"><i data-promotionflag="' + json.data[i].promotionflag + '" data-discount="'+json.data[i].discount+'" data-stockamount="' + json.data[i].stockamount + '" data-id="' + json.data[i].id + '" data-commoditytype="' + json.data[i].commoditytype + '" data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-discount="' + json.data[i].promotion[0].discount + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" class="icon iconfont minus icon-minuscircleo" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" style="display:none;"></i>' +
                    '<b class="flex-1" id="com_' + json.data[i].id + '"></b><i data-preorder="' + json.data[i].preorder + '" data-preorderprice="' + json.data[i].preorderprice + '" ' +
                    'data-price="' + json.data[i].price + '" data-promotionflag="' + json.data[i].promotionflag + '"' +
                    ' data-specification="' + json.data[i].specification + '" data-startorder="' + json.data[i].startorder + '"' +
                    'data-discount="'+json.data[i].discount+'" data-stockamount="' + json.data[i].stockamount + '" data-unit="' + json.data[i].unit + '" data-url="' + json.data[i].url + '"' +
                    ' data-name="' + json.data[i].name + '" data-id="' + json.data[i].id + '" ' +
                    'data-groupprice="' + json.data[i].groupprice + '" data-finishordder="' + json.data[i].finishordder + '" ' +
                    'data-delivery_interval="' + json.data[i].delivery_interval + '" data-commoditytype="' + json.data[i].commoditytype + '" ' +
                    'data-promotion-repeatpurchasetimes="' + json.data[i].promotion[0].repeatpurchasetimes + '" data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-discount="' + json.data[i].promotion[0].discount + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" data-preorder="' + json.data[i].preorder + '" class="icon iconfont icon-pluscircle"' +
                    '></i></div></h3></li></ul>'
                goodsList.innerHTML += commodity

                /* document.querySelectorAll(".price")[i].innerHTML='¥ ' + json.data[i].price/100*json.data[i].promotion[0].discount/100+'<span>/'+json.data[i].specification+'</span>'
                 preorderFlag[i].innerHTML=json.data[i].promotion[0].discount/10+' 折 / <strike>原价 :  ¥ ' +json.data[i].price/100+' </strike>'
                */
            }
            if (json.data[i].promotionflag == 3) {
                var commodity = '<ul style="-webkit-overflow-scrolling: touch;" class="flex allGoods"  id="' + json.data[i].id + '' +
                    '" data-preorder="' + json.data[i].preorder + '" onclick=' + url + '><img src="' + 'http://od35wia0b.bkt.clouddn.com/' +
                    json.data[i].url + '" alt=""/>' +
                    '<li class="flex-1"><h1 class="orderType"><span>【' + json.data[i].name + '】</span><spqn>(提前' + json.data[i].delivery_interval + '天预定)</spqn> ' + json.data[i].intro + '</h1>' +
                    '<h2 class="price" style="color:#e4393c">¥ ' + json.data[i].price / 100 + '<span>/ ' + json.data[i].specification + '</span>' +
                    '<p style="float: right" class="iconRight"></span> </p></h2><h2 style="margin: 0;font-size: 12px;"><p style="color:#999" class="preorderFlag">赠：优惠券' + json.data[i].promotion[0].pv / 100 + '元</p></h2>' +
                    '<h3 class="flex"> <p class="flex-1">库存(<span class="saletype">' + json.data[i].stockamount + '</span >)<span>' +
                    '<div class="addTo flex"><i data-promotionflag="' + json.data[i].promotionflag + '" data-discount="'+json.data[i].discount+'" data-stockamount="' + json.data[i].stockamount + '" data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-pv="' + json.data[i].promotion[0].pv + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" data-id="' + json.data[i].id + '" data-commoditytype="' + json.data[i].commoditytype + '" class="icon iconfont minus icon-minuscircleo" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" style="display:none;"></i>' +
                    '<b class="flex-1" id="com_' + json.data[i].id + '"></b><i data-preorder="' + json.data[i].preorder + '" data-preorderprice="' + json.data[i].preorderprice + '" ' +
                    'data-price="' + json.data[i].price + '" data-promotionflag="' + json.data[i].promotionflag + '"' +
                    ' data-specification="' + json.data[i].specification + '" data-startorder="' + json.data[i].startorder + '"' +
                    ' data-stockamount="' + json.data[i].stockamount + '" data-discount="'+json.data[i].discount+'" data-unit="' + json.data[i].unit + '" data-url="' + json.data[i].url + '"' +
                    ' data-name="' + json.data[i].name + '" data-id="' + json.data[i].id + '" ' +
                    'data-groupprice="' + json.data[i].groupprice + '" data-finishordder="' + json.data[i].finishordder + '" ' +
                    'data-delivery_interval="' + json.data[i].delivery_interval + '" data-commoditytype="' + json.data[i].commoditytype + '" ' +
                    'data-promotion-repeatpurchasetimes="' + json.data[i].promotion[0].repeatpurchasetimes + '" data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-pv="' + json.data[i].promotion[0].pv + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" data-preorder="' + json.data[i].preorder + '" class="icon iconfont icon-pluscircle"' +
                    '></i></div></h3></li></ul>'
                goodsList.innerHTML += commodity

                //preorderFlag[i].innerHTML='赠：优惠券'+json.data[i].promotion[0].pv/100+'元'
                // document.querySelectorAll(".")
            }
            if (json.data[i].promotionflag == 4) {
                var commodity = '<ul style="-webkit-overflow-scrolling: touch;" class="flex allGoods"  id="' + json.data[i].id + '' +
                    '" data-preorder="' + json.data[i].preorder + '" onclick=' + url + '><img src="' + 'http://od35wia0b.bkt.clouddn.com/' +
                    json.data[i].url + '" alt=""/>' +
                    '<li class="flex-1"><h1 class="orderType"><span>【' + json.data[i].name + '】</span><spqn>(提前' + json.data[i].delivery_interval + '天预定)</spqn> ' + json.data[i].intro + '</h1>' +
                    '<h2 class="price" style="color:#e4393c">¥ ' + json.data[i].price / 100 + '<span>/ ' + json.data[i].specification + '</span>' +
                    '<p style="float: right" class="iconRight"></span> </p></h2><h2 style="margin: 0;font-size: 12px;"><p style="color:#999" class="preorderFlag">赠：红包' + json.data[i].promotion[0].cashgift / 100 + '元</p></h2>' +
                    '<h3 class="flex"> <p class="flex-1">库存(<span class="saletype">' + json.data[i].stockamount + '</span >)<span>' +
                    '<div class="addTo flex"><i data-promotionflag="' + json.data[i].promotionflag + '" data-discount="'+json.data[i].discount+'" data-stockamount="' + json.data[i].stockamount + '" data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-cashgift="' + json.data[i].promotion[0].cashgift + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" data-preorder="' + json.data[i].preorder + '" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" class="icon iconfont minus icon-minuscircleo" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" style="display:none;"></i>' +
                    '<b class="flex-1" id="com_' + json.data[i].id + '"></b><i data-preorder="' + json.data[i].preorder + '" data-preorderprice="' + json.data[i].preorderprice + '" ' +
                    'data-price="' + json.data[i].price + '" data-promotionflag="' + json.data[i].promotionflag + '"' +
                    ' data-specification="' + json.data[i].specification + '" data-startorder="' + json.data[i].startorder + '"' +
                    ' data-stockamount="' + json.data[i].stockamount + '" data-discount="'+json.data[i].discount+'" data-unit="' + json.data[i].unit + '" data-url="' + json.data[i].url + '"' +
                    ' data-name="' + json.data[i].name + '" data-id="' + json.data[i].id + '" ' +
                    'data-groupprice="' + json.data[i].groupprice + '" data-finishordder="' + json.data[i].finishordder + '" ' +
                    'data-delivery_interval="' + json.data[i].delivery_interval + '" data-commoditytype="' + json.data[i].commoditytype + '" ' +
                    'data-promotion-repeatpurchasetimes="' + json.data[i].promotion[0].repeatpurchasetimes + '" data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-cashgift="' + json.data[i].promotion[0].cashgift + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" data-preorder="' + json.data[i].preorder + '" class="icon iconfont icon-pluscircle"' +
                    '></i></div></h3></li></ul>'
                goodsList.innerHTML += commodity
                    //preorderFlag[i].innerHTML='赠：红包'+json.data[i].promotion[0].cashgift/100+'元'
            }
            if (json.data[i].promotionflag == 0) {
                var commodity = '<ul style="-webkit-overflow-scrolling: touch;" class="flex allGoods"  id="' + json.data[i].id + '' +
                    '" data-preorder="' + json.data[i].preorder + '" onclick=' + url + '><img src="' + 'http://od35wia0b.bkt.clouddn.com/' +
                    json.data[i].url + '" alt=""/>' +
                    '<li class="flex-1"><h1 class="orderType"><span>【' + json.data[i].name + '】</span><spqn>(提前' + json.data[i].delivery_interval + '天预定)</spqn> ' + json.data[i].intro + '</h1>' +
                    '<h2 class="price">¥ ' + json.data[i].price / 100 + '<span>/ ' + json.data[i].specification + '</span>' +
                    '<p style="float: right" class="iconRight"></span> </p></h2><h2 style="margin: 0;font-size: 12px;"><p style="color:#999" class="preorderFlag">'+isVip+'</p></h2>' +
                    '<h3 class="flex"> <p class="flex-1">库存(<span class="saletype">' + json.data[i].stockamount + '</span >)<span>' +
                    '<div class="addTo flex"><i data-promotionflag="' + json.data[i].promotionflag + '" data-discount="'+json.data[i].discount+'" data-stockamount="' + json.data[i].stockamount + '" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" class="icon iconfont minus icon-minuscircleo" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" style="display:none;"></i>' +
                    '<b class="flex-1" id="com_' + json.data[i].id + '"></b><i data-preorder="' + json.data[i].preorder + '" data-preorderprice="' + json.data[i].preorderprice + '" ' +
                    'data-price="' + json.data[i].price + '" data-promotionflag="' + json.data[i].promotionflag + '"' +
                    ' data-specification="' + json.data[i].specification + '" data-startorder="' + json.data[i].startorder + '"' +
                    ' data-stockamount="' + json.data[i].stockamount + '" data-discount="'+json.data[i].discount+'" data-unit="' + json.data[i].unit + '" data-url="' + json.data[i].url + '"' +
                    ' data-name="' + json.data[i].name + '" data-id="' + json.data[i].id + '" ' +
                    'data-groupprice="' + json.data[i].groupprice + '" data-finishordder="' + json.data[i].finishordder + '" ' +
                    'data-delivery_interval="' + json.data[i].delivery_interval + '" data-commoditytype="' + json.data[i].commoditytype + '" ' +
                    'data-preorder="' + json.data[i].preorder + '" class="icon iconfont icon-pluscircle"' +
                    '></i></div></h3></li></ul>'
                goodsList.innerHTML += commodity
            }
        }
        if (json.data[i].commoditytype == 9 || json.data[i].commoditytype == 4 || json.data[i].commoditytype == 1 || json.data[i].commoditytype == 8) {
            if (json.data[i].promotionflag == 1) {
                var commodity = '<ul style="-webkit-overflow-scrolling: touch;" class="flex allGoods"  id="' + json.data[i].id + '' +
                    '" data-preorder="' + json.data[i].preorder + '" onclick=' + url + '><img src="' + 'http://od35wia0b.bkt.clouddn.com/' +
                    json.data[i].url + '" alt=""/>' +
                    '<li class="flex-1"><h1 class="orderType"><span>【' + json.data[i].name + '】</span> ' + json.data[i].intro + '</h1>' +
                    '<h2 class="price" style="color:#e4393c">¥ ' + json.data[i].price / 100 + '<span>/ ' + json.data[i].specification + '</span>' +
                    '<p style="float: right" class="iconRight"></p></h2><h2 style="margin: 0;font-size: 12px;"><p style="color:#999" class="preorderFlag">买 ' + json.data[i].promotion[0].data.buys + ' 送 ' + json.data[i].promotion[0].data.gifts + '</p></h2>' +
                    '<h3 class="flex"> <p class="flex-1">库存(<span class="saletype">' + json.data[i].stockamount + '</span >)<span>' +
                    '<div class="addTo flex"><i data-promotion-buys="' + json.data[i].promotion[0].data.buys + '" data-promotion-gift="' + json.data[i].promotion[0].data.gifts + '" data-promotion-count="' + json.data[i].promotion[0].data.count + '" data-promotion-reapttimes="' + json.data[i].promotion[0].data.reapttimes + '" data-promotionflag="' + json.data[i].promotionflag + '" data-discount="'+json.data[i].discount+'" data-stockamount="' + json.data[i].stockamount + '" data-promotion-buys="' + json.data[i].promotion[0].buys + '" data-promotion-gift="' + json.data[i].promotion[0].gift + '" data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" class="icon iconfont minus icon-minuscircleo" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" style="display:none;"></i>' +
                    '<b class="flex-1"  id="com_' + json.data[i].id + '"></b><i data-preorder="' + json.data[i].preorder + '" data-preorderprice="' + json.data[i].preorderprice + '" ' +
                    'data-price="' + json.data[i].price + '" data-promotionflag="' + json.data[i].promotionflag + '"' +
                    ' data-specification="' + json.data[i].specification + '" data-startorder="' + json.data[i].startorder + '"' +
                    ' data-stockamount="' + json.data[i].stockamount + '" data-discount="'+json.data[i].discount+'" data-unit="' + json.data[i].unit + '" data-url="' + json.data[i].url + '"' +
                    ' data-name="' + json.data[i].name + '" data-id="' + json.data[i].id + '" ' +
                    'data-groupprice="' + json.data[i].groupprice + '" data-finishordder="' + json.data[i].finishordder + '" ' +
                    'data-delivery_interval="' + json.data[i].delivery_interval + '" data-commoditytype="' + json.data[i].commoditytype + '" ' +
                    'data-promotion-repeatpurchasetimes="' + json.data[i].promotion[0].repeatpurchasetimes + '" data-preorder="' + json.data[i].preorder + '" data-promotion-buys="' + json.data[i].promotion[0].data.buys + '" data-promotion-gift="' + json.data[i].promotion[0].data.gifts + '" data-promotion-count="' + json.data[i].promotion[0].data.count + '" data-promotion-reapttimes="' + json.data[i].promotion[0].data.reapttimes + '"  class="icon iconfont icon-pluscircle"' +
                    '></i></div></h3></li></ul>'
                goodsList.innerHTML += commodity
            }
            if (json.data[i].promotionflag == 2) {
                var commodity = '<ul style="-webkit-overflow-scrolling: touch;" class="flex allGoods"  id="' + json.data[i].id + '' +
                    '" data-preorder="' + json.data[i].preorder + '" onclick=' + url + '><img src="' + 'http://od35wia0b.bkt.clouddn.com/' +
                    json.data[i].url + '" alt=""/>' +
                    '<li class="flex-1"><h1 class="orderType"><span>【' + json.data[i].name + '】</span> ' + json.data[i].intro + '</h1>' +
                    '<h2 class="price" style="color:#e4393c">¥ ' + json.data[i].price / 100 * json.data[i].promotion[0].discount / 100 + '<span>/ ' + json.data[i].specification + '</span>' +
                    '<p style="float: right" class="iconRight"></span> </p></h2><h2 style="margin: 0;font-size: 12px;"><p style="color:#999" class="preorderFlag">' + json.data[i].promotion[0].discount / 10 + ' 折 / <strike>原价 :  ¥ ' + json.data[i].price / 100 + ' </strike></p></h2>' +
                    '<h3 class="flex"> <p class="flex-1">库存(<span class="saletype">' + json.data[i].stockamount + '</span >)<span>' +
                    '<div class="addTo flex"><i data-promotionflag="' + json.data[i].promotionflag + '" data-discount="'+json.data[i].discount+'" data-stockamount="' + json.data[i].stockamount + '" data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-discount="' + json.data[i].promotion[0].discount + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" data-preorder="' + json.data[i].preorder + '" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" class="icon iconfont minus icon-minuscircleo" style="display:none;"></i>' +
                    '<b class="flex-1" id="com_' + json.data[i].id + '"></b><i data-preorder="' + json.data[i].preorder + '" data-preorderprice="' + json.data[i].preorderprice + '" ' +
                    'data-price="' + json.data[i].price + '" data-promotionflag="' + json.data[i].promotionflag + '"' +
                    ' data-specification="' + json.data[i].specification + '" data-startorder="' + json.data[i].startorder + '"' +
                    ' data-stockamount="' + json.data[i].stockamount + '" data-discount="'+json.data[i].discount+'" data-unit="' + json.data[i].unit + '" data-url="' + json.data[i].url + '"' +
                    ' data-name="' + json.data[i].name + '" data-id="' + json.data[i].id + '" ' +
                    'data-groupprice="' + json.data[i].groupprice + '" data-finishordder="' + json.data[i].finishordder + '" ' +
                    'data-delivery_interval="' + json.data[i].delivery_interval + '" data-commoditytype="' + json.data[i].commoditytype + '" ' +
                    'data-promotion-repeatpurchasetimes="' + json.data[i].promotion[0].repeatpurchasetimes + '" data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-discount="' + json.data[i].promotion[0].discount + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" data-preorder="' + json.data[i].preorder + '" class="icon iconfont icon-pluscircle"' +
                    '></i></div></h3></li></ul>'
                goodsList.innerHTML += commodity

            }
            if (json.data[i].promotionflag == 3) {
                var commodity = '<ul style="-webkit-overflow-scrolling: touch;" class="flex allGoods"  id="' + json.data[i].id + '' +
                    '" data-preorder="' + json.data[i].preorder + '" onclick=' + url + '><img src="' + 'http://od35wia0b.bkt.clouddn.com/' +
                    json.data[i].url + '" alt=""/>' +
                    '<li class="flex-1"><h1 class="orderType"><span>【' + json.data[i].name + '】</span> ' + json.data[i].intro + '</h1>' +
                    '<h2 class="price" style="color:#e4393c">¥ ' + json.data[i].price / 100 + '<span>/ ' + json.data[i].specification + '</span>' +
                    '<p style="float: right" class="iconRight"></span> </p></h2><h2 style="margin: 0;font-size: 12px;"><p style="color:#999" class="preorderFlag">赠：优惠券' + json.data[i].promotion[0].pv / 100 + '元</p></h2>' +
                    '<h3 class="flex"> <p class="flex-1">库存(<span class="saletype">' + json.data[i].stockamount + '</span >)<span>' +
                    '<div class="addTo flex"><i data-promotionflag="' + json.data[i].promotionflag + '" data-discount="'+json.data[i].discount+'" data-stockamount="' + json.data[i].stockamount + '" data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-pv="' + json.data[i].promotion[0].pv + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" data-preorder="' + json.data[i].preorder + '" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" class="icon iconfont minus icon-minuscircleo" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" style="display:none;"></i>' +
                    '<b class="flex-1" id="com_' + json.data[i].id + '"></b><i data-preorder="' + json.data[i].preorder + '" data-preorderprice="' + json.data[i].preorderprice + '" ' +
                    'data-price="' + json.data[i].price + '" data-promotionflag="' + json.data[i].promotionflag + '"' +
                    ' data-specification="' + json.data[i].specification + '" data-startorder="' + json.data[i].startorder + '"' +
                    ' data-stockamount="' + json.data[i].stockamount + '" data-discount="'+json.data[i].discount+'" data-unit="' + json.data[i].unit + '" data-url="' + json.data[i].url + '"' +
                    ' data-name="' + json.data[i].name + '" data-id="' + json.data[i].id + '" ' +
                    'data-groupprice="' + json.data[i].groupprice + '" data-finishordder="' + json.data[i].finishordder + '" ' +
                    'data-delivery_interval="' + json.data[i].delivery_interval + '" data-commoditytype="' + json.data[i].commoditytype + '" ' +
                    'data-promotion-repeatpurchasetimes="' + json.data[i].promotion[0].repeatpurchasetimes + '" data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-pv="' + json.data[i].promotion[0].pv + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" data-preorder="' + json.data[i].preorder + '" class="icon iconfont icon-pluscircle"' +
                    '></i></div></h3></li></ul>'
                goodsList.innerHTML += commodity
            }
            if (json.data[i].promotionflag == 4) {
                var commodity = '<ul style="-webkit-overflow-scrolling: touch;" class="flex allGoods"  id="' + json.data[i].id + '' +
                    '" data-preorder="' + json.data[i].preorder + '" onclick=' + url + '><img src="' + 'http://od35wia0b.bkt.clouddn.com/' +
                    json.data[i].url + '" alt=""/>' +
                    '<li class="flex-1"><h1 class="orderType"><span>【' + json.data[i].name + '】</span> ' + json.data[i].intro + '</h1>' +
                    '<h2 class="price" style="color:#e4393c">¥ ' + json.data[i].price / 100 + '<span>/ ' + json.data[i].specification + '</span>' +
                    '<p style="float: right" class="iconRight"></span> </p></h2><h2 style="margin: 0;font-size: 12px;"><p style="color:#999" class="preorderFlag">赠：红包' + json.data[i].promotion[0].cashgift / 100 + '元</p></h2>' +
                    '<h3 class="flex"> <p class="flex-1">库存(<span class="saletype">' + json.data[i].stockamount + '</span >)<span>' +
                    '<div class="addTo flex"><i data-promotionflag="' + json.data[i].promotionflag + '" data-discount="'+json.data[i].discount+'" data-stockamount="' + json.data[i].stockamount + '" data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-cashgift="' + json.data[i].promotion[0].cashgift + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" data-preorder="' + json.data[i].preorder + '"　data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" class="icon iconfont minus icon-minuscircleo" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" style="display:none;"></i>' +
                    '<b class="flex-1" id="com_' + json.data[i].id + '"></b><i data-preorder="' + json.data[i].preorder + '" data-preorderprice="' + json.data[i].preorderprice + '" ' +
                    'data-price="' + json.data[i].price + '" data-promotionflag="' + json.data[i].promotionflag + '"' +
                    ' data-specification="' + json.data[i].specification + '" data-startorder="' + json.data[i].startorder + '"' +
                    ' data-stockamount="' + json.data[i].stockamount + '" data-discount="'+json.data[i].discount+'" data-unit="' + json.data[i].unit + '" data-url="' + json.data[i].url + '"' +
                    ' data-name="' + json.data[i].name + '" data-id="' + json.data[i].id + '" ' +
                    'data-groupprice="' + json.data[i].groupprice + '" data-finishordder="' + json.data[i].finishordder + '" ' +
                    'data-delivery_interval="' + json.data[i].delivery_interval + '" data-commoditytype="' + json.data[i].commoditytype + '" ' +
                    ' data-promotion-count="' + json.data[i].promotion[0].count + '" data-promotion-cashgift="' + json.data[i].promotion[0].cashgift + '" data-promotion-reapttimes="' + json.data[i].promotion[0].reapttimes + '" data-preorder="' + json.data[i].preorder + '" class="icon iconfont icon-pluscircle"' +
                    '></i></div></h3></li></ul>'
                goodsList.innerHTML += commodity
            }
            if (json.data[i].promotionflag == 0) {
                var commodity = '<ul style="-webkit-overflow-scrolling: touch;" class="flex allGoods"  id="' + json.data[i].id + '' +
                    '" data-preorder="' + json.data[i].preorder + '" onclick=' + url + '><img src="' + 'http://od35wia0b.bkt.clouddn.com/' +
                    json.data[i].url + '" alt=""/>' +
                    '<li class="flex-1"><h1 class="orderType"><span>【' + json.data[i].name + '】</span> ' + json.data[i].intro + '</h1>' +
                    '<h2 class="price">¥ ' + json.data[i].price / 100 + '<span>/ ' + json.data[i].specification + '</span>' +
                    '<p style="float: right" class="iconRight"></span> </p></h2><h2 style="margin: 0;font-size: 12px;"><p style="color:#999" class="preorderFlag">'+isVip+'</p></h2>' +
                    '<h3 class="flex"> <p class="flex-1">库存(<span class="saletype">' + json.data[i].stockamount + '</span >)<span>' +
                    '<div class="addTo flex"><i data-promotionflag="' + json.data[i].promotionflag + '" data-discount="'+json.data[i].discount+'" data-stockamount="' + json.data[i].stockamount + '" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" class="icon iconfont minus icon-minuscircleo" data-commoditytype="' + json.data[i].commoditytype + '" data-id="' + json.data[i].id + '" style="display:none;"></i>' +
                    '<b class="flex-1" id="com_' + json.data[i].id + '"></b><i data-preorder="' + json.data[i].preorder + '" data-preorderprice="' + json.data[i].preorderprice + '" ' +
                    'data-price="' + json.data[i].price + '" data-promotionflag="' + json.data[i].promotionflag + '"' +
                    ' data-specification="' + json.data[i].specification + '" data-startorder="' + json.data[i].startorder + '"' +
                    ' data-stockamount="' + json.data[i].stockamount + '" data-discount="'+json.data[i].discount+'" data-unit="' + json.data[i].unit + '" data-url="' + json.data[i].url + '"' +
                    ' data-name="' + json.data[i].name + '" data-id="' + json.data[i].id + '" ' +
                    'data-groupprice="' + json.data[i].groupprice + '" data-finishordder="' + json.data[i].finishordder + '" ' +
                    'data-delivery_interval="' + json.data[i].delivery_interval + '" data-commoditytype="' + json.data[i].commoditytype + '" ' +
                    'data-preorder="' + json.data[i].preorder + '" class="icon iconfont icon-pluscircle"' +
                    '></i></div></h3></li></ul>'
                goodsList.innerHTML += commodity
            }
            _e.bindAll(".addTo", "click", addto)
            function addto(){
              window.event ? window.event.cancelBubble = true : e.stopPropagation();
            }
        }


        var getLSG = JSON.parse(localStorage.getItem('localStorageGoods'))
        if (getLSG != null) {
            for (var l = 0; l < getLSG.length; l++) {
                if (getLSG[l].amount != 0) {
                    if (json.data[i].id == Number(getLSG[l].id) && json.data[i].commoditytype == Number(getLSG[l].commoditytype)) {

                        document.querySelector("#com_" + json.data[i].id).innerHTML = getLSG[l].amount

                        document.querySelector("#com_" + json.data[i].id).parentNode.firstChild.style.display = "block"
                    }
                }
            }
        }


        var saletype = document.querySelectorAll(".saletype")
        for (var j = 0; j < saletype.length; j++) {
            if (saletype[j].innerText == 0||saletype[j].innerText < 0) {
              saletype[j].parentNode.parentNode.childNodes[2].childNodes[1].innerHTML="已售罄"
                saletype[j].parentNode.parentNode.childNodes[2].childNodes[2].style.display = "none"
                saletype[j].parentNode.parentNode.childNodes[2].childNodes[1].style.display = "block"
                saletype[j].parentNode.parentNode.childNodes[1].innerHTML = ""
            }
        }

    }
    _e.bindAll(".icon-pluscircle", "click", numBoxPing)
    _e.bindAll(".icon-minuscircleo", "click", numBoxReduce)


    if (document.querySelector(".goodsList").childNodes.length != 0) {
        var lastId = document.querySelectorAll(".allGoods")
        lastId[lastId.length - 1].setAttribute("class", "flex allGoods id_lastid")
    }
}




var localStorageGoods = new Array()
    // localStorage.setItem('localStorageGoods', JSON.stringify(localStorageGoods))
var ping = 0
var temporaryLocalStorageLength = 0

function numBoxPing() {
    window.event ? window.event.cancelBubble = true : e.stopPropagation();
    var retrievedObject = localStorage.getItem('localStorageGoods')
    var getlocalStorageGoods = JSON.parse(retrievedObject)
    var temporaryLocalStorage = []
    ping = this.parentNode.childNodes[1].innerText
    if (this.getAttribute("data-promotionflag") == "1") {
        var getLSG = JSON.parse(localStorage.getItem('localStorageGoods'))
        if (getLSG != null) {
            for (var l = 0; l < getLSG.length; l++) {
                var thisId = this.getAttribute("data-id")
                if (Number(thisId) == Number(getLSG[l].id) && Number(this.getAttribute("data-commoditytype")) == Number(getLSG[l].commoditytype)) {
                  if (getLSG.length != 0) {
                    if (getLSG[l].amount != 0) {
                            ping++
                            if (getlocalStorageGoods != null) {
                                temporaryLocalStorage = getlocalStorageGoods
                                temporaryLocalStorageLength = temporaryLocalStorage.length
                                for (var i = 0; i < temporaryLocalStorageLength; i++) {
                                    if (this.getAttribute("data-id") == temporaryLocalStorage[i].id && this.getAttribute("data-commoditytype") == temporaryLocalStorage[i].commoditytype) {
                                        if (temporaryLocalStorage[i].amount == this.getAttribute("data-stockamount")) {
                                            _e.msgBox({
                                                msg: "库存不足！",
                                                timeout: 2000,
                                                className: "error"
                                            })
                                            return
                                        }
                                        temporaryLocalStorage[i].amount++
                                        if (this.getAttribute("data-promotionflag") == "1") {
                                          if(temporaryLocalStorage[i].amount>Number(this.getAttribute("data-promotion-repeatpurchasetimes"))){
                                    _e.msgBox({
                                        msg: "不享受优惠！",
                                        timeout: 700,
                                        className: "error"
                                    })
                                    return
                                  }
                                            if (Number(this.getAttribute("data-promotion-count")) < Number(this.getAttribute("data-promotion-reapttimes"))) {
                                              if(this.getAttribute("data-promotion-buys")>1){
                                                if (temporaryLocalStorage[i].amount>=Number(this.getAttribute("data-promotion-buys"))&&temporaryLocalStorage[i].amount <= (Number(this.getAttribute("data-promotion-reapttimes")) - Number(this.getAttribute("data-promotion-count"))) * Number(this.getAttribute("data-promotion-buys"))) {
                                                  _e.msgBox({
                                                    msg: "享受优惠！",
                                                    timeout: 700,
                                                    className: "info"
                                                  })
                                                } else {
                                                  _e.msgBox({
                                                    msg: "不享受优惠！",
                                                    timeout: 700,
                                                    className: "error"
                                                  })
                                                }
                                              }else{
                                                if (temporaryLocalStorage[i].amount <= ((json.message[0].promotion[0].data.reapttimes - json.message[0].promotion[0].data.count) * json.message[0].promotion[0].data.buys)) {
                                                  _e.msgBox({
                                                    msg: "享受优惠！",
                                                    timeout: 700,
                                                    className: "info"
                                                  })
                                                } else {
                                                  _e.msgBox({
                                                    msg: "不享受优惠！",
                                                    timeout: 700,
                                                    className: "error"
                                                  })
                                                }
                                              }
                                            } else {
                                                _e.msgBox({
                                                    msg: "不享受优惠！",
                                                    timeout: 700,
                                                    className: "error"
                                                })
                                            }
                                        }


                                            if (this.getAttribute("data-promotionflag") == "2" || this.getAttribute("data-promotionflag") == "3" || this.getAttribute("data-promotionflag") == "4") {
                                              if(temporaryLocalStorage[i].amount>Number(this.getAttribute("data-promotion-repeatpurchasetimes"))){
                                                    _e.msgBox({
                                                        msg: "不享受优惠！",
                                                        timeout: 700,
                                                        className: "error"
                                                    })
                                                    return
                                                  }
                                                if (this.getAttribute("data-promotion-count") < this.getAttribute("data-promotion-reapttimes")) {
                                                    if (temporaryLocalStorage[i].amount <= (this.getAttribute("data-promotion-reapttimes") - this.getAttribute("data-promotion-count"))) {
                                                        _e.msgBox({
                                                            msg: "享受优惠！",
                                                            timeout: 2000,
                                                            className: "info"
                                                        })
                                                    } else {
                                                        _e.msgBox({
                                                            msg: "优惠次数已享完！",
                                                            timeout: 2000,
                                                            className: "error"
                                                        })
                                                    }
                                                } else {
                                                    _e.msgBox({
                                                        msg: "优惠次数已享完！",
                                                        timeout: 2000,
                                                        className: "error"
                                                    })
                                                }
                                            }

                                        this.parentNode.childNodes[0].style.display = "block"
                                        this.parentNode.childNodes[1].innerHTML = ping
                                        localStorage.setItem('localStorageGoods', JSON.stringify(temporaryLocalStorage))
                                        return
                                    }
                                }
                            }
                        } else {
                            location.href = 'http://www.newfan.net.cn/s/goodsdetail.html?comid=' + this.getAttribute("data-id") + '&commoditytype=' + this.getAttribute("data-commoditytype")
                            return
                        }
                    } else {
                        location.href = 'http://www.newfan.net.cn/s/goodsdetail.html?comid=' + this.getAttribute("data-id") + '&commoditytype=' + this.getAttribute("data-commoditytype")
                        return
                    }
                } else {
                    location.href = 'http://www.newfan.net.cn/s/goodsdetail.html?comid=' + this.getAttribute("data-id") + '&commoditytype=' + this.getAttribute("data-commoditytype")
                    return
                }
            }
        } else {
            location.href = 'http://www.newfan.net.cn/s/goodsdetail.html?comid=' + this.getAttribute("data-id") + '&commoditytype=' + this.getAttribute("data-commoditytype")
            return
        }
    }
    ping++
    if (getlocalStorageGoods != null) {
        temporaryLocalStorage = getlocalStorageGoods
        temporaryLocalStorageLength = temporaryLocalStorage.length
        for (var i = 0; i < temporaryLocalStorageLength; i++) {
            if (this.getAttribute("data-id") == temporaryLocalStorage[i].id && this.getAttribute("data-commoditytype") == temporaryLocalStorage[i].commoditytype) {
                if (temporaryLocalStorage[i].amount == this.getAttribute("data-stockamount")) {
                    _e.msgBox({
                        msg: "库存不足！",
                        timeout: 2000,
                        className: "error"
                    })
                    return
                }
                temporaryLocalStorage[i].amount++

                    if (this.getAttribute("data-promotionflag") == "2" || this.getAttribute("data-promotionflag") == "3" || this.getAttribute("data-promotionflag") == "4") {
                      if(temporaryLocalStorage[i].amount>Number(this.getAttribute("data-promotion-repeatpurchasetimes"))){
                                    _e.msgBox({
                                        msg: "不享受优惠！",
                                        timeout: 700,
                                        className: "error"
                                    })
                                    return
                                  }
                        if (this.getAttribute("data-promotion-count") < this.getAttribute("data-promotion-reapttimes")) {
                            if (temporaryLocalStorage[i].amount <= (this.getAttribute("data-promotion-reapttimes") - this.getAttribute("data-promotion-count"))) {
                                _e.msgBox({
                                    msg: "享受优惠！",
                                    timeout: 2000,
                                    className: "info"
                                })
                            } else {
                                _e.msgBox({
                                    msg: "优惠次数已享完！",
                                    timeout: 2000,
                                    className: "error"
                                })
                            }
                        } else {
                            _e.msgBox({
                                msg: "优惠次数已享完！",
                                timeout: 2000,
                                className: "error"
                            })
                        }
                    }

                this.parentNode.childNodes[0].style.display = "block"
                this.parentNode.childNodes[1].innerHTML = ping
                localStorage.setItem('localStorageGoods', JSON.stringify(temporaryLocalStorage))
                return
            }
        }
    }

    temporaryLocalStorage[temporaryLocalStorageLength] = {}
    temporaryLocalStorage[temporaryLocalStorageLength]["id"] = this.getAttribute("data-id")
    temporaryLocalStorage[temporaryLocalStorageLength]["name"] = this.getAttribute("data-name")
    temporaryLocalStorage[temporaryLocalStorageLength]["url"] = this.getAttribute("data-url")
    temporaryLocalStorage[temporaryLocalStorageLength]["commoditytype"] = this.getAttribute("data-commoditytype")
    temporaryLocalStorage[temporaryLocalStorageLength]["delivery_interval"] = this.getAttribute("data-delivery_interval")
    temporaryLocalStorage[temporaryLocalStorageLength]["finishordder"] = this.getAttribute("data-finishordder")
    temporaryLocalStorage[temporaryLocalStorageLength]["groupprice"] = this.getAttribute("data-groupprice")
    temporaryLocalStorage[temporaryLocalStorageLength]["preorder"] = this.getAttribute("data-preorder")
    temporaryLocalStorage[temporaryLocalStorageLength]["preorderprice"] = this.getAttribute("data-preorderprice")
    temporaryLocalStorage[temporaryLocalStorageLength]["price"] = this.getAttribute("data-price")
    temporaryLocalStorage[temporaryLocalStorageLength]["flag"] = 1
    temporaryLocalStorage[temporaryLocalStorageLength]["promotionflag"] = this.getAttribute("data-promotionflag")
    temporaryLocalStorage[temporaryLocalStorageLength]["specification"] = this.getAttribute("data-specification")
    temporaryLocalStorage[temporaryLocalStorageLength]["startorder"] = this.getAttribute("data-startorder")
    temporaryLocalStorage[temporaryLocalStorageLength]["stockamount"] = this.getAttribute("data-stockamount")
    temporaryLocalStorage[temporaryLocalStorageLength]["unit"] = this.getAttribute("data-unit")
    temporaryLocalStorage[temporaryLocalStorageLength]["amount"] = 1
    temporaryLocalStorage[temporaryLocalStorageLength]["promotion"] = []
        // temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]={}
    temporaryLocalStorage[temporaryLocalStorageLength]["deliverytimes"] = 0
    if (this.getAttribute("data-promotionflag") == "2") {
        if (this.getAttribute(".count") > this.getAttribute("data-promotion-reapttimes")) {
            _e.msgBox({
                msg: "不享受优惠！",
                timeout: 2000,
                className: "error"
            })
        }
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0] = {}
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]["count"] = this.getAttribute("data-promotion-count")
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]["discount"] = this.getAttribute("data-promotion-discount")
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]["reapttimes"] = this.getAttribute("data-promotion-reapttimes")
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]["repeatpurchasetimes"] = this.getAttribute("data-promotion-repeatpurchasetimes")

    }
    if (this.getAttribute("data-promotionflag") == "3") {
        if (this.getAttribute(".count") > this.getAttribute("data-promotion-reapttimes")) {
            _e.msgBox({
                msg: "不享受优惠！",
                timeout: 2000,
                className: "error"
            })
        }
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0] = {}
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]["count"] = this.getAttribute("data-promotion-count")
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]["pv"] = this.getAttribute("data-promotion-pv")
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]["reapttimes"] = this.getAttribute("data-promotion-reapttimes")
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]["repeatpurchasetimes"] = this.getAttribute("data-promotion-repeatpurchasetimes")

    }

    if (this.getAttribute("data-promotionflag") == "4") {
        if (this.getAttribute(".count") > this.getAttribute("data-promotion-reapttimes")) {
            _e.msgBox({
                msg: "不享受优惠！",
                timeout: 2000,
                className: "error"
            })
        }
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0] = {}
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]["count"] = this.getAttribute("data-promotion-count")
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]["cashgift"] = this.getAttribute("data-promotion-cashgift")
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]["reapttimes"] = this.getAttribute("data-promotion-reapttimes")
        temporaryLocalStorage[temporaryLocalStorageLength]["promotion"][0]["repeatpurchasetimes"] = this.getAttribute("data-promotion-repeatpurchasetimes")

    }

    console.log(temporaryLocalStorage)
    this.parentNode.childNodes[0].style.display = "block"
    this.parentNode.childNodes[1].innerHTML = ping
    temporaryLocalStorageLength++
    localStorage.setItem('localStorageGoods', JSON.stringify(temporaryLocalStorage))
}



function numBoxReduce() {
    window.event ? window.event.cancelBubble = true : e.stopPropagation();
    var retrievedObject = localStorage.getItem('localStorageGoods')
    var getlocalStorageGoods = JSON.parse(retrievedObject)
    var temporaryLocalStorage = []
    temporaryLocalStorage = getlocalStorageGoods
    var reduce = 0
    reduce = this.parentNode.childNodes[1].innerText
    for (var i = 0; i < temporaryLocalStorage.length; i++) {
      temporaryLocalStorage[i].amount--
        if (this.getAttribute("data-id") == temporaryLocalStorage[i].id && this.getAttribute("data-commoditytype") == temporaryLocalStorage[i].commoditytype) {
            if (this.getAttribute("data-promotionflag") == "2" || this.getAttribute("data-promotionflag") == "3" || this.getAttribute("data-promotionflag") == "4") {
                if (this.getAttribute("data-promotion-count") < this.getAttribute("data-promotion-reapttimes")) {
                    if (temporaryLocalStorage[i].amount <= (this.getAttribute("data-promotion-reapttimes") - this.getAttribute("data-promotion-count"))) {
                        _e.msgBox({
                            msg: "享受优惠！",
                            timeout: 2000,
                            className: "info"
                        })
                    } else {
                        _e.msgBox({
                            msg: "优惠次数已享完！",
                            timeout: 2000,
                            className: "error"
                        })
                    }
                } else {
                    _e.msgBox({
                        msg: "优惠次数已享完！",
                        timeout: 2000,
                        className: "error"
                    })
                }
            }

            if (this.getAttribute("data-promotionflag") == "1") {

                if (Number(this.getAttribute("data-promotion-count")) < Number(this.getAttribute("data-promotion-reapttimes"))) {

                  if(this.getAttribute("data-promotion-buys")>1){
                    if (temporaryLocalStorage[i].amount<=Number(this.getAttribute("data-promotion-buys"))&&temporaryLocalStorage[i].amount >= (Number(this.getAttribute("data-promotion-reapttimes")) - Number(this.getAttribute("data-promotion-count"))) * Number(this.getAttribute("data-promotion-buys"))) {
                      _e.msgBox({
                        msg: "享受优惠！",
                        timeout: 700,
                        className: "info"
                      })
                    } else {
                      _e.msgBox({
                        msg: "不享受优惠！",
                        timeout: 700,
                        className: "error"
                      })
                    }
                  }else{
                    if (temporaryLocalStorage[i].amount >= ((json.message[0].promotion[0].data.reapttimes - json.message[0].promotion[0].data.count) * json.message[0].promotion[0].data.buys)) {
                      _e.msgBox({
                        msg: "享受优惠！",
                        timeout: 700,
                        className: "info"
                      })
                    } else {
                      _e.msgBox({
                        msg: "不享受优惠！",
                        timeout: 700,
                        className: "error"
                      })
                    }
                  }
                } else {
                    _e.msgBox({
                        msg: "不享受优惠！",
                        timeout: 700,
                        className: "error"
                    })
                }
            }
                reduce--
                this.parentNode.childNodes[1].innerHTML = reduce
            localStorage.setItem('localStorageGoods', JSON.stringify(temporaryLocalStorage))
            if (reduce == 0) {
                this.parentNode.childNodes[0].style.display = "none"
                this.parentNode.childNodes[1].innerHTML = null
                return
            }
            return
        }
    }
}







var el = document.querySelector(".scrollable");
var mc = new Hammer(el, {
    touchAction: 'pan-y'
});
mc.get('swipe').set({
    direction: Hammer.DIRECTION_VERTICAL
});
//tap press swipeup swipedown 不同的事件
mc.on("swipeup", function(ev) {
    var goodList = document.querySelector(".goodsList")
    if (goodList.length == 0) return
    var elelast = document.querySelector(".id_lastid")
    if (isElementInViewport(elelast)) {
        var loadShow = '<div class="loading"> <div class="rect1"></div> <div class="rect2"></div> <div class="rect3">' +
            '</div> <div class="rect4"></div> <div class="rect5"></div> </div>'
        goodList.innerHTML += loadShow

        document.querySelector(".id_lastid").setAttribute("class", "flex allGoods")
        var fd = new FormData(),
            xhr = new XMLHttpRequest()
        fd.append("name", document.querySelector(".searchInput").value)
        fd.append("start", document.querySelectorAll(".allGoods").length)

        xhr.open("POST", "/sales/getcomsbyname", true)

        xhr.send(fd)
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var json = eval('(' + xhr.responseText + ');')
                    //window.setTimeout("loadSearchGoods(json,2)",10000)
                if (json.data.length == 0) {
                    _e.msgBox({
                        msg: "已显示所有的商品！",
                        timeout: 2000,
                        className: "info"
                    })
                    goodList.removeChild(document.querySelector(".loading"))
                    return
                }
                loadSearchGoods(json, 2)
                goodList.removeChild(document.querySelector(".loading"))
            }
        }
        setTimeout("window.scrollTo(0,document.body.scrollHeight);", 200)
    }
});

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}
