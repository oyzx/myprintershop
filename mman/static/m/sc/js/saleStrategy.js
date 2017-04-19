alldept = JSON.parse(localStorage.getItem("alldept"))
var idept =document.querySelector("#cdept")
for(var i = 0;i<alldept.length;i++){
    var span = document.createElement("span")
    span.innerHTML = alldept[i].name
    var input = document.createElement("input")
    input.setAttribute("type","checkbox")
    input.setAttribute("class","dept")
    input.setAttribute("value",alldept[i].id)
    if(i == 0){
        input.checked = true
    }
    idept.appendChild(span)
    idept.appendChild(input)
}

_e.bind(".deptAll","click",function(){
    var deptAll = document.querySelector(".deptAll")
    var dept = document.querySelectorAll(".dept")
    var i
    if(deptAll.checked == true){
        for(i = 0;i < dept.length;i++){
            dept[i].checked = true
        }
    }else{
        for(i = 0;i < dept.length;i++){
            dept[i].checked = false
        }
    }
})

loadDate({
    data:"",
    method:"get",
    url:"/sc/commodity/getext"+_e.jurisdiction(),
    async:true,
    callback:function(others){
        trs=[]
        trs.push([0,"父节点"])
        for(var i in others.tree) {
            trs.push([others.tree[i][0],others.tree[i][2],others.tree[i][7],others.tree[i][8],["data-code",others.tree[i][1]]]);
        }
        loadtree(trs)
        loadtbl(others)
        t.funcs.loadData.call(t)
    }
})
function loadtree(treedata){
    var trs=new _e["tree"]()
    var event=[{e:"click",func:function () { //需要绑定的函数，绑定tbl
        t.funcs.loadData.call(t,{    //在table.js中的204行显示
            qseq:12, //数组中下标
            qverb:'k',// like '% %' 条件
            qpt:this.getAttribute("data-code") //值
        })
    }, is_leaf:1}]
    trs.init("#trees",treedata,1,"TR",event)    //创建树
}

function loadtbl(others){
    coldefs = [{
        seq: 1, //在数据[[],[]]中的位置rows[i][seq] 返回值
        render: function(item) {
            return "<b>" + item + "</b>"
        }, // 这里render是function，它可以组合或变换当前数据行，然后进行显示
        sortable: true, // 可排序 function
        retrievable: true, // 可检索 function
        title: "商品名", // 列标题
        visible: true, //是否可见
        name: "name", //和后端对应，FormData里面的key，后端解析时要一致
    },{
        seq: 7, //在数据[[],[]]中的位置rows[i][seq] 返回值
        render: function(item) {
            return "<b>" + item + "</b>"
        }, // 这里render是function，它可以组合或变换当前数据行，然后进行显示
        sortable: true, // 可排序 function
        retrievable: true, // 可检索 function
        title: "规格", // 列标题
        visible: true, //是否可见
        name: "specification", //和后端对应，FormData里面的key，后端解析时要一致
    },{
        seq: 11, //在数据[[],[]]中的位置rows[i][seq] 返回值
        render: function(item) {
            return "<b>"+item+"</b>"
        }, // 这里render是function，它可以组合或变换当前数据行，然后进行显示
        sortable: true, // 可排序 function
        retrievable: true, // 可检索 function
        title: "单位", // 列标题
        visible: true, //是否可见
        name: "unit", //和后端对应，FormData里面的key，后端解析时要一致
    },{
        seq: 12,
        render: function(item) {
            return "<b>"+item+"</b>"
        },
        sortable: true, // 可排序 function
        retrievable: true, // 可检索 function
        title: "种类", // 列标题
        visible: true, //是否可见
    },{
        seq: 0, //在数据[[],[]]中的位置rows[i][seq] 返回值
        render: function(item) {
            return "<b>" + item + "</b>"
        }, // 这里render是function，它可以组合或变换当前数据行，然后进行显示
        sortable: true, // 可排序 function
        retrievable: true, // 可检索 function
        title: "流水号", // 列标题
        visible: true, //是否可见
        checkall: false, // 是否可全选
        isID: 1,
        name: "id", //和后端对应，FormData里面的key，后端解析时要一致
    }]

    t = new _e["table"]()
    row_actions =[]

    rows_actions = [{cls:"doerow",func:function(tbl){    //这里改了
        var check = document.querySelectorAll(".check")
        var commodityList = document.querySelector("#commodityList")
        for(i = 0;i < check.length;i++){
            if(check[i].checked){
                var tr = document.createElement("tr")
                tr.innerHTML = "<td class='comId' comId='"+tbl.data[i][0]+"'>"+tbl.data[i][1]+"</td>"+
                        "<td>"+tbl.data[i][7]+"</td>"+
                        "<td>"+tbl.data[i][11]+"</td>"+
                        "<td><input type='button' value='删除' onclick='deleteCom(this)'/></td>"
                commodityList.appendChild(tr)
            }
        }
    },title:"批量添加"}]

    ext_row = function(rows,i){
        return "this is " + i
    }

    t.funcs.init.call(t,"tbl",
        coldefs,row_actions,rows_actions,"table","__THE__TABLE__",ext_row,"/sc/commodity/getcommoditys")
}

function deleteCom(e){   //删除当前一行
    e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode)
}

_e.bind("#planCommodity","click",function(){          //提交
	var startTime = document.querySelector("#startTime")   //生效时间
	var endTime = document.querySelector("#endTime")       //过期时间
	var InputName = document.querySelector("#InputName")   //优惠卷名字
	var faceValue = document.querySelector("#faceValue")   //面值
	var fullValue = document.querySelector("#fullValue")   //满额
	var InputMemo = document.querySelector("#InputMemo")   //说明
	var margin = document.querySelector("#margin")         //余量
	var dept = document.querySelectorAll(".dept")          //部门
	var commodityList = document.querySelector("#commodityList")
	if(commodityList.children.length == 0){
		_e["msgBox"]({
            msg: "请选择商品",
            timeout:3000
        })
		return
	}
	var deptFlag = 0
	for(var i = 0;i < dept.length;i++){
        if(dept[i].checked == true){
            deptFlag = 1
        }
    }
	if(deptFlag == 0){
		_e["msgBox"]({
            msg: "请选择部门",
            timeout:3000
        })
		return
	}
	
	if(startTime.value == ""){
		_e["msgBox"]({
            msg: "生效时间不能为空",
            timeout:3000
        })
		return
	}
	if(endTime.value == ""){
		_e["msgBox"]({
            msg: "过期时间不能为空",
            timeout:3000
        })
		return
	}
	if(InputName.value == ""){
		_e["msgBox"]({
            msg: "优惠卷名字不能为空",
            timeout:3000
        })
		return
	}
	if(faceValue.value == ""){
		_e["msgBox"]({
            msg: "面值不能为空",
            timeout:3000
        })
		return
	}
	if(fullValue.value == ""){
		_e["msgBox"]({
            msg: "满额不能为空",
            timeout:3000
        })
		return
	}
	if(InputMemo.value == ""){
		_e["msgBox"]({
            msg: "说明不能为空",
            timeout:3000
        })
		return
	}
	if(margin.value == ""){
		_e["msgBox"]({
            msg: "余量不能为空",
            timeout:3000
        })
		return
	}
	
    var tableDlg = "<table border='1' style='width: 350px;margin:20px auto;'><thead><tr>" +
        "<th>商品名</th><" +
        "th>规格</th>" +
        "<th>单位</th></tr></thead><tbody>"
    for(j = 0;j < commodityList.children.length;j++){
        var comTr = commodityList.children[j]
        tableDlg += "<tr><td comId='"+comTr.children[0].getAttribute("comid")+"'>"+comTr.children[0].innerHTML+"</td>"+
            "<td>"+comTr.children[1].innerHTML+"</td>"+
            "<td>"+comTr.children[2].innerHTML+"</td></tr>"
    }
    tableDlg += "</tbody></table>"
    if (document.querySelector("#dlgData")) document.querySelector("#dlgData").parentNode.removeChild(document.querySelector("#dlgData"));
    var dlg = _e.dialog({id:"dlgData",width:"500px",
        title:"查看当前采购表单",
        mainBody:tableDlg,
        actions:[{id:"btn",title:"确定",func:function(){
            var fd = new FormData(),xml = new XMLHttpRequest()
            var issued = document.querySelector("#issued")
			var couponId = document.querySelector("#couponId")
			if(Number(couponId.innerHTML) > 0){
				fd.append("coupon",Number(couponId.innerHTML))
			}
            fd.append("valid",_e["dateToInt"](startTime.value))
            fd.append("expired",_e["dateToInt"](endTime.value))
            fd.append("pv",Number(faceValue.value)*100)
            fd.append("leavings",Number(margin.value))
            // fd.append("amount",Number(circulation.value))
            fd.append("intro",InputMemo.value)
            fd.append("conditionmoney",Number(fullValue.value)*100)
            fd.append("name",InputName.value)
            fd.append("status",1)
            for(var i = 0;i < dept.length;i++){
                if(dept[i].checked == true){
                    fd.append("dept",Number(dept[i].value))
                    for(var j = 0;j < commodityList.children.length;j++){
                        fd.append("commodity",Number(commodityList.children[j].children[0].getAttribute("comid")))
                    }
                }
            }
            xml.open("POST","/sc/coupon/insert",true)
            xml.send(fd)
            xml.onreadystatechange = function(){
                if (xml.readyState==4 && xml.status==200){
                    var d=eval('('+xml.responseText+');')
                    alert(d.msg)
                    self.location.reload()
                    dlg.parentNode.removeChild(dlg)
                }
            }
        }}]
    })
    dlg.show()
})

var frm = window.parent.document.querySelector("#frm")        //把原有的copy一份放回这里
if(frm.getAttribute("couponEdit") == "editCouponAble"){
    var ComTr = JSON.parse(localStorage.getItem("editCoupon"))
	document.querySelector("#startTime").value = ComTr.startTime   //生效时间
	document.querySelector("#endTime").value   = ComTr.endTime     //过期时间
	document.querySelector("#InputName").value = ComTr.name        //优惠卷名字
	document.querySelector("#faceValue").value = ComTr.faceValue   //面值
	document.querySelector("#fullValue").value = ComTr.fullValue   //满额
	document.querySelector("#InputMemo").value = ComTr.InputMemo   //说明
	document.querySelector("#margin").value    = ComTr.margin      //余量
	var issued = document.querySelector("#issued")
	if(Number(ComTr.issued) == 1){
		issued = "<option value='"+ComTr.issued+"'>发行</option><option value='2'>不发行</option>"
	}
	if(Number(ComTr.issued) == 2){
		issued = "<option value='"+ComTr.issued+"'>不发行</option><option value='1'>发行</option>"
	}
	
	var dept = document.querySelectorAll(".dept")    //部门
	ComTr.stockDept
	for(var i = 0;i < dept.length;i++){
		for(var j = 0;j < ComTr.stockDept.length;j++){
			if(Number(dept.value) == Number(ComTr.stockDept[j])){
				dept.checked = true
			}
		}
	}
	
    var couponId = document.querySelector("#couponId")
    couponId.innerHTML = ComTr.id
    for(i = 0;i < ComTr.stockCom.length;i++){    //把stockCom中的每一行copy并且列在id=commodityList的下面
		var tr = document.createElement("tr")
            tr.innerHTML = "<td class='comId' comId='"+ComTr.stockCom[i].comId+"'>"+ComTr.stockCom[i].comName+"</td>"+
                "<td>"+ComTr.stockCom[i].comSe+"</td>"+
                "<td>"+ComTr.stockCom[i].comUnit+"</td>"+
                "<td><input type='button' value='删除' onclick='deleteCom(this)'/></td>"
            commodityList.appendChild(tr)
    }
    frm.setAttribute("couponEdit","editCouponUnAble")
}
