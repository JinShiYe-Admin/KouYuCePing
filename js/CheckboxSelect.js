/**
 * Edition：v2.8.8
 * Author：天澵
 * QQ group：376687100 
 * Create Date：2016-01-02
 * Version Date：2017-06-15
 * 
1、实例的方式调用
	var box = new CheckboxSelect("seleid");
	box.onChange(function(newV,oldV){//值改变事件
		alert("内容改变！\n\t新值："+newV+"\n\t旧值："+oldV);
	});
	box.disabledTrue();//禁用多选框
	box.disabledFalse();//启用多选框
	box.resetSelecteds();//清空选项值
	box.setValues("000001,000002,000005",",");//赋值
	box.setDefaultWord("请选择");//设置未选择值时的缺省字体
	box.setRadio(true);//设置控件是否只能单选（true：单选，false：多选）
	box.setMaxOptNum(2);//设置最多能选择的选项数（设置为0则不限制）
	
2、脱离实例的调用
   	getCheckboxOptionValues("seleid");//获取value值
   	getCheckboxOptionTexts("seleid");//获取text值
   	resetCheckboxOptionSelecteds("seleid");//清空选项值
   	setCheckboxOptionSelecteds("seleid","000001,000002,000005",",");//赋值
   	setCheckboxOptionRadio("seleid",true);//设置控件是否只能单选（true：单选，false：多选）
   	setCheckboxOptionMaxOptNum("seleid",1);//设置最多能选择的选项数（设置为0则不限制）
   	CheckboxSelectDisabledFalse("seleid");//启用多选框
   	CheckboxSelectDisabledTrue("seleid");//禁用多选框
   	setCheckboxOptionDefaultWord("seleid","请选择");//设置未选择值时的缺省字体
   	setCheckboxOptionCheckAll("seleid");//设置全选
   	CheckboxSelectOnChange("seleid",function(newV,oldV){//值改变事件
   	  	alert("内容改变！\n\t新值："+newV+"\n\t旧值："+oldV);
   	});
   	var jsondata = {'01':'aaaaa','02':'bbbbb','03':'ccccc','04':'ddddd','05':'eeeee','06':'fffff'};
   	setCheckboxOptions("seleid",jsondata);//设置下拉选项内容
 */
//自定义控件参数
var cb86556_ = {
	valueSplitChar: ";", //多选框选择的value值（保存到后台的值）用什么符号隔开，这里默认为英文分号隔开
	textSplitChar: "; ", //多选框选择的text值（页面展现的值）用什么符号隔开，这里默认为英文分号加一个空格隔开
	borderColorOver: "#26A0DA", //鼠标经过或获取焦点时的边框颜色
	icoBackgColorOver: "#EAF6FD", //鼠标经过或获取焦点时的图标背景颜色
	borderColorOut: "#95B8E7", //鼠标离开或没获取焦点时的边框颜色
	icoBackgColorOut: "#FFFFFF", //鼠标离开或没获取焦点时的图标背景颜色
	icoToChar: false, //设置下拉图标为字符还是为图片(true-用字符的下拉图标，false-用图片的下拉图标)
	icoURL: "../../image/combo_arrow.png", //设置下拉图标为图片时的图片路径
	optionBorderColor: "#95B8E7", //选项面板边框颜色
	selectAllButton: false, //设置是否有全选按钮(true-有，false-没有)
	valueShowOrder: 0, //设置选择的值按哪种方式展现（0-按下拉选项顺序展现选中的值，1-按用户选择的顺序展现选中的值）
	maxSelectCount: 0, //设置最多能选择的选项数（设置为0则不限制）
	maxSelectedOperMode: 0, //配合maxSelectCount参数来设置，当maxSelectCount设置0以上的数时这个设置才有效，可设置的值（0-达到最大选择数后可继续选中，但会把前一个选中的取消，改为当前选中的，1-达到最大选择数后不可以再选择了）
	oneLineOptionNumber: 1 //设置选项面板中，一行显示多少个选项
};
! function(a, b) {
	"object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
		if(!a.document) throw Error("CheckboxSelect requires a window with a document");
		return b(a)
	} : b(a)
}("undefined" != typeof window ? window : this, function(a, b) {
	var a00_ = [0, "", {}],
		a139_ = document,
		a001_ = {
			a005_: ["a00_" + "[2]", "a012_", "onChange", "defaultWord", "disabled", "a061_", "a07_", "a08_", "a087_", "a10_"],
			a01_: [".", "_", "_$o$_", "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"],
			a103_: function(a) {
				return eval("(" + a + ")")
			},
			a116_: function(a142_) {
				return(a142_ + "").replace(/\"/g, "\\\"")
			},
			a12_: function(a15_) {
				return typeof a15_ === "string" ? a139_.getElementById(a15_) : a15_
			},
			a13_: function(a155_) {
				return typeof a155_ === "string" ? a139_.getElementsByName(a155_) : a155_
			},
			a16_: function(a) {
				return "[\"" + this.a116_(a) + "\"]"
			},
			a17_: function(a) {
				var b = a.parentNode;
				b && b.removeChild(a)
			},
			a19_: function(c) {
				var a = "{",
					b;
				for(b in c) a += '"' + b + '":"' + this.a116_(c[b]) + '",';
				return a.substring(0, a.length - 1) + "}"
			},
			a20_: function(a) {
				for(var b in a) this[b] = a[b]
			},
			a200_: function(c, a) {
				for(var b in a) c[b] = a[b]
			},
			a21_: function(b) {
				var c = {},
					a;
				for(a in b) this.a232_(b[a]) ? c[a] = b[a].concat() : this.a23_(b[a]) ? c[a] = this.a21_(b[a]) : c[a] = b[a];
				return c
			},
			a214_: function(a, b) {
				if(a && b)
					for(var c in a)
						for(var d in b)
							if(c == d) {
								a[c] = b[d];
								break
							}
				return a
			},
			a227_: function(c, d) {
				var a = !1,
					b;
				for(b in c)
					if(b == d) {
						a = !0;
						break
					}
				return a
			},
			a23_: function(a) {
				return "object" == typeof a && "[object object]" == Object.prototype.toString.call(a).toLowerCase() && !a.length
			},
			a232_: function(a) {
				return a && "object" === typeof a && "number" === typeof a.length && "function" === typeof a.splice && !a.propertyIsEnumerable("length")
			},
			a24: function(a, a) {
				delete a[a]
			},
			a25_: function(a, b) {
				a = this.a005_[0] + this.a16_(a);
				1 == b && (a += this.a16_(this.a005_[1]));
				return this.a103_(a)
			},
			a250_: function(e, f, g) {
				for(var a = [], c = 0; true; c++) {
					var d = a.length;
					if(d == e) break;
					var b = this.a268_(f),
						b = b + (g || ""); - 1 == a.indexOf(b) && (a[d] = b);
					if(1E6 == c) break
				}
				return a
			},
			a28_: {
				onChange: function(a) {
					CheckboxSelectOnChange(this.id, a)
				},
				disabledTrue: function() {
					CheckboxSelectDisabledTrue(this.id)
				},
				disabledFalse: function() {
					CheckboxSelectDisabledFalse(this.id)
				},
				resetSelecteds: function() {
					resetCheckboxOptionSelecteds(this.id)
				},
				setValues: function(a, b) {
					setCheckboxOptionSelecteds(this.id, a, b)
				},
				setDefaultWord: function(a) {
					setCheckboxOptionDefaultWord(this.id, a)
				},
				setRadio: function(a) {
					setCheckboxOptionRadio(this.id, a)
				},
				setMaxOptNum: function(a) {
					setCheckboxOptionMaxOptNum(this.id, a)
				}
			},
			a268_: function(a) {
				var b = a001_.a01_[3];
				for(var s = 0; true; s++) {
					var c = "";　　
					for(var i = 0; i < a; i++) {　　　　
						c += b.charAt(Math.floor(Math.random() * (b.length + 1)));　　
					}
					if(c.length == a) {
						return c
					}
				}
			},
			a27_: function() {
				var d = {},
					b = this.a21_(a.cb86556_);
				if(b[this.a005_[8]] && 6 == b[this.a005_[8]].length)
					for(var c = 0; c < b[this.a005_[8]].length; c++) b[this.a005_[8]][c] || (b[this.a005_[8]][c] = this.a268_(8));
				else b[this.a005_[8]] = this.a250_(6, 8);
				if(b[this.a005_[9]] && 2 == b[this.a005_[9]].length)
					for(c = 0; c < b[this.a005_[9]].length; c++) b[this.a005_[9]][c] || (b[this.a005_[9]][c] = this.a268_(8));
				else b[this.a005_[9]] = this.a250_(2, 8);
				b = [b, function(b, c) {}, "", !1, null, 0, []];
				for(c = 1; 8 > c; c++) d[this.a005_[c]] = b[c - 1];
				return d
			},
			a271_: function(a) {
				var b = !1;
				if(this.a227_(a00_[2], a)) {
					b = !0;
					a = a001_.a25_(a, 1)[a001_.a005_[8]];
					for(var c = 0; c < a.length; c++)
						if(!a001_.a12_(a[c])) {
							b = !1;
							break
						}
				}
				return b
			},
			a50_: function() {
				this.a200_(a, this.a51_);
				Array.prototype.indexOf || (Array.prototype.indexOf = function(c, b) {
					var d = this.length >>> 0;
					b = Number(b) || 0;
					b = 0 > b ? Math.ceil(b) : Math.floor(b);
					for(0 > b && (b += d); b < d; b++)
						if(b in this && this[b] === c) return b;
					return -1
				});
				this.a51_.CheckboxSelect.prototype = this.a51_.CheckboxSelectJson.prototype = this.a28_;
				a.jQuery && a.$ ? $(a139_).click(function() {
					a001_.a52_.a926_()
				}) : a139_.onclick = function() {
					a001_.a52_.a926_()
				};
				a.setInterval(function() {
					for(var c in a00_[2]) {
						var b = a001_.a12_(a001_.a25_(c, 1)[a001_.a005_[8]][2]);
						b && 0 == getCheckboxOptionValues(c).length && a001_.a25_(c, 0)[a001_.a005_[3]] && (b.value = a001_.a25_(c, 0)[a001_.a005_[3]])
					}
				}, 500)
			},
			a52_: {
				a60_: function(a, c, m, l, k, f, d) {
					a00_[2][a] = a001_.a27_();
					for(var e = a001_.a25_(a, 1)[a001_.a005_[8]], b = 0; b < e.length; b++) e[b] += a;
					for(var g = a001_.a25_(a, 1)[a001_.a005_[9]], b = 0; b < g.length; b++) g[b] += a;
					if(a001_.a23_(d)) {
						var h = d[a001_.a005_[8]];
						if(h) {
							for(b = 0; b < h.length; b++) b < e.length && h[b] && (e[b] = h[b]);
							a001_.a24(d, a001_.a005_[8])
						}
						if(e = d[a001_.a005_[9]]) {
							for(b = 0; b < e.length; b++) b < g.length && e[b] && (g[b] = e[b]);
							a001_.a24(d, a001_.a005_[9])
						}
						a001_.a214_(a001_.a25_(a, 0), d);
						a001_.a214_(a001_.a25_(a, 1), d)
					}
					d = a139_.createElement("div");
					d.style.width = l;
					d.style.height = k;
					d.innerHTML = "<input type='hidden' id='" + a001_.a25_(a, 1)[a001_.a005_[8]][0] + "' name='" + m + "'/><table id='" + a001_.a25_(a, 1)[a001_.a005_[8]][1] + "' align='center' style='border: 1px " + a001_.a25_(a, 1).borderColorOut + " solid; width:" + l + "; height:" + k + "; border-collapse:collapse; table-layout:fixed;'><tr><td><input id='" + a001_.a25_(a, 1)[a001_.a005_[8]][2] + "' readonly='readonly' type='button' style='float:left; border: 1px solid #FFFFFF; background-color:#FFFFFF; overflow: hidden; width: 100%; height: " + k + "; white-space: nowrap'></td><td width='15px' id='" + a001_.a25_(a, 1)[a001_.a005_[8]][3] + "' align='center' style='border-left: 1px " + a001_.a25_(a, 1).borderColorOut + " solid; cursor:default;" + (1 == a001_.a25_(a, 1).icoToChar ? "font-size: 10px;" : "") + "'>" + (1 == a001_.a25_(a, 1).icoToChar ? "\u25bc" : "<div style='width:100%;height:100%;background:#FFFFFF url(" + a001_.a25_(a, 1).icoURL + ") no-repeat scroll center center;'></div>") + "</td></tr></table>";
					c ? (c = a001_.a12_(a), c.parentNode.insertBefore(d, c.nextSibling)) : a001_.a12_(a).appendChild(d);
					c = a139_.createElement("div");
					c.id = a001_.a25_(a, 1)[a001_.a005_[8]][4];
					c.style.position = "absolute";
					c.style.border = "1px solid " + a001_.a25_(a, 1).optionBorderColor;
					c.style.backgroundColor = "#FFFFFF";
					c.style.overflow = "auto";
					c.style.zIndex = "99999";
					c.style.display = "block";
					c.onmouseover = function() {
						a00_[0] = 1
					};
					c.onmouseout = function() {
						a00_[0] = 0
					};
					c.style.height = "200px";
					d.appendChild(c);
					this.a596_(a, f);
					f = a001_.a12_(a001_.a25_(a, 1)[a001_.a005_[8]][1]);
					f.onmouseover = function() {
						a001_.a52_.a86_(a, !0)
					};
					f.onmouseout = function() {
						"none" == a001_.a12_(a001_.a25_(a, 1)[a001_.a005_[8]][4]).style.display && a001_.a52_.a86_(a, !1)
					};
					f.onclick = function() {
						if(!a001_.a25_(a, 0)[a001_.a005_[4]]) {
							var b = a001_.a12_(a001_.a25_(a, 1)[a001_.a005_[8]][4]);
							"none" == b.style.display && (a00_[1] = a, b.style.display = "block", a001_.a52_.a88_(a))
						}
					};
					c.style.display = "none";
					a001_.a25_(a, 0)[a001_.a005_[4]] && CheckboxSelectDisabledTrue(a)
				},
				a596_: function(a, e) {
					var h = a001_.a12_(a001_.a25_(a, 1)[a001_.a005_[8]][4]);
					h.innerHTML = "";
					h.style.width = "";
					var c = a139_.createElement("table");
					c.id = a001_.a25_(a, 1)[a001_.a005_[8]][5];
					c.style.cssText = "float:left;";
					h.appendChild(c);
					var k = 0;
					a001_.a25_(a, 1).selectAllButton && 0 >= a001_.a25_(a, 1).maxSelectCount && (k += 1, this.a550_(a, c));
					for(var m = null, g = 0; g < e.length; g++)
						for(var n in e[g]) {
							var p = n;
							if("" != p) {
								if(0 == g % a001_.a25_(a, 1).oneLineOptionNumber) m = c.insertRow(), k += 1;
								else {
									var l = m.insertCell();
									l.style.cssText = "width: 12px;"
								}
								l = m.insertCell();
								l.style.cssText = "float:left;cursor:default;white-space:nowrap;";
								l.innerHTML = this.a523_(a, p, e[g][n], 1)
							}
						}
					e = a001_.a13_(a001_.a25_(a, 1)[a001_.a005_[9]][1]);
					for(c = 0; c < e.length; c++) e[c].onclick = function() {
						var c = this.checked,
							e = getCheckboxOptionValues(a);
						if(c) {
							var b = a001_.a25_(a, 1).maxSelectCount,
								d = e.split(a001_.a25_(a, 1).valueSplitChar).length;
							if(e && 0 < b)
								if(d > b) a001_.a52_.a82_(a), this.checked = !0;
								else if(d == b)
								if(0 == a001_.a25_(a, 1).maxSelectedOperMode || 1 == b) {
									var b = a001_.a25_(a, 0)[a001_.a005_[7]],
										d = b.length - 1,
										f;
									for(f in b[d]) b.splice(d, 1), a001_.a52_.a850_(a, f, !1)
								} else this.checked = !1
						} else a001_.a25_(a, 1).selectAllButton && 0 >= a001_.a25_(a, 1).maxSelectCount && (b = a001_.a13_(a001_.a25_(a, 1)[a001_.a005_[9]][0])[0], b.checked && (b.checked = !1));
						if(c == this.checked) {
							c = this.value;
							d = this.nextSibling.nodeValue;
							b = a001_.a25_(a, 0)[a001_.a005_[7]];
							if(this.checked) f = {}, f[c] = d, b[b.length] = f;
							else
								for(d = 0; d < b.length; d++)
									for(f in b[d]) c == f && b.splice(d, 1);
							a001_.a52_.a620_(a, e)
						}
					};
					h.style.height = 8 > k ? 29 * k + "px" : "200px"
				},
				a550_: function(b, a) {
					a = a.insertRow(0).insertCell();
					a.style.cssText = "float:left;cursor:default;white-space:nowrap;";
					a.innerHTML = this.a523_(b, "1", "\u5168\u9009", 0);
					a001_.a13_(a001_.a25_(b, 1)[a001_.a005_[9]][0])[0].onclick = function() {
						a001_.a52_.a531_(b, this.checked)
					}
				},
				a523_: function(b, c, d, e) {
					var a = "";
					0 == e ? a = "<label><input type='checkbox' name='" + a001_.a25_(b, 1)[a001_.a005_[9]][0] + "' value='" + c + "' /><font color='#53261f'><b>" + d + "</b></font></label>" : 1 == e && (a = "<label><input type='checkbox' name='" + a001_.a25_(b, 1)[a001_.a005_[9]][1] + "' value='" + c + "' />" + d + "</label>");
					return a
				},
				a56_: function(b, a) {
					"function" == typeof a && (a001_.a25_(b, 0)[a001_.a005_[2]] = a)
				},
				a531_: function(b, a) {
					var l = getCheckboxOptionValues(b),
						d = "",
						f = "",
						e = a001_.a25_(b, 0)[a001_.a005_[7]],
						c = a001_.a13_(a001_.a25_(b, 1)[a001_.a005_[9]][1]);
					if(a) {
						for(a = 0; a < c.length; a++) {
							c[a].checked || (c[a].checked = !0);
							for(var g = !1, k = 0; k < e.length; k++)
								if(a001_.a227_(e[k], c[a].value)) {
									g = !0;
									break
								}
							g || (g = {}, g[c[a].value] = c[a].nextSibling.nodeValue, e[e.length] = g);
							d += "" == d ? c[a].value : a001_.a25_(b, 1).valueSplitChar + c[a].value;
							f += "" == f ? c[a].nextSibling.nodeValue : a001_.a25_(b, 1).textSplitChar + c[a].nextSibling.nodeValue
						}
						if(1 == a001_.a25_(b, 1).valueShowOrder)
							for(f = d = "", a = 0; a < e.length; a++)
								for(var h in e[a]) d += "" == d ? h : a001_.a25_(b, 1).valueSplitChar + h, f += "" == f ? e[a][h] : a001_.a25_(b, 1).textSplitChar + e[a][h]
					} else
						for(a001_.a25_(b, 0)[a001_.a005_[7]] = [], a = 0; a < c.length; a++) c[a].checked = !1;
					a001_.a12_(a001_.a25_(b, 1)[a001_.a005_[8]][0]).value = d;
					a001_.a12_(a001_.a25_(b, 1)[a001_.a005_[8]][2]).value = f;
					a001_.a12_(a001_.a25_(b, 1)[a001_.a005_[8]][1]).title = f;
					if(l != d) a001_.a25_(b, 0)[a001_.a005_[2]](d, l)
				},
				a620_: function(b, g) {
					var c = a001_.a13_(a001_.a25_(b, 1)[a001_.a005_[9]][1]),
						d = "",
						e = "";
					if(1 == a001_.a25_(b, 1).valueShowOrder)
						for(var c = a001_.a25_(b, 0)[a001_.a005_[7]], a = 0; a < c.length; a++)
							for(var f in c[a]) d += "" == d ? f : a001_.a25_(b, 1).valueSplitChar + f, e += "" == e ? c[a][f] : a001_.a25_(b, 1).textSplitChar + c[a][f];
					else
						for(a = 0; a < c.length; a++) 1 == c[a].checked && (d += "" == d ? c[a].value : a001_.a25_(b, 1).valueSplitChar + c[a].value, e += "" == e ? c[a].nextSibling.nodeValue : a001_.a25_(b, 1).textSplitChar + c[a].nextSibling.nodeValue);
					a001_.a12_(a001_.a25_(b, 1)[a001_.a005_[8]][0]).value = d;
					a001_.a12_(a001_.a25_(b, 1)[a001_.a005_[8]][2]).value = e;
					a001_.a12_(a001_.a25_(b, 1)[a001_.a005_[8]][1]).title = e;
					a001_.a25_(b, 0)[a001_.a005_[2]](d, g)
				},
				a636_: function(a, g, d) {
					var h = getCheckboxOptionValues(a),
						c = a001_.a13_(a001_.a25_(a, 1)[a001_.a005_[9]][1]),
						e = "",
						f = "";
					a001_.a25_(a, 0)[a001_.a005_[7]] = [];
					var k = a001_.a25_(a, 0)[a001_.a005_[7]];
					g = g.split(d || a001_.a25_(a, 1).valueSplitChar);
					for(d = 0; d < g.length; d++)
						for(var b = 0; b < c.length; b++)
							if(0 == d && 1 == c[b].checked && (c[b].checked = !1), g[d] == c[b].value) {
								c[b].checked = !0;
								var e = e + ("" == e ? c[b].value : a001_.a25_(a, 1).valueSplitChar + c[b].value),
									f = f + ("" == f ? c[b].nextSibling.nodeValue : a001_.a25_(a, 1).textSplitChar + c[b].nextSibling.nodeValue),
									l = {};
								l[c[b].value] = c[b].nextSibling.nodeValue;
								k[k.length] = l
							}
					a001_.a12_(a001_.a25_(a, 1)[a001_.a005_[8]][0]).value = e;
					a001_.a12_(a001_.a25_(a, 1)[a001_.a005_[8]][2]).value = f;
					a001_.a12_(a001_.a25_(a, 1)[a001_.a005_[8]][1]).title = f;
					a001_.a25_(a, 1).selectAllButton && 0 >= a001_.a25_(a, 1).maxSelectCount && (a001_.a13_(a001_.a25_(a, 1)[a001_.a005_[9]][0])[0].checked = !1);
					if(e != h) a001_.a25_(a, 0)[a001_.a005_[2]](e, h)
				},
				a68_: function(a) {
					var b = getCheckboxOptionValues(a);
					this.a82_(a);
					if("" != b) a001_.a25_(a, 0)[a001_.a005_[2]]("", b)
				},
				a82_: function(a) {
					var b = a001_.a13_(a001_.a25_(a, 1)[a001_.a005_[9]][1]);
					for(i = 0; i < b.length; i++) 1 == b[i].checked && (b[i].checked = !1);
					a001_.a25_(a, 0)[a001_.a005_[7]] = [];
					a001_.a12_(a001_.a25_(a, 1)[a001_.a005_[8]][0]).value = "";
					a001_.a12_(a001_.a25_(a, 1)[a001_.a005_[8]][2]).value = "";
					a001_.a12_(a001_.a25_(a, 1)[a001_.a005_[8]][1]).title = "";
					a001_.a25_(a, 1).selectAllButton && 0 >= a001_.a25_(a, 1).maxSelectCount && (a001_.a13_(a001_.a25_(a, 1)[a001_.a005_[9]][0])[0].checked = !1)
				},
				a850_: function(a, b, c) {
					a = a001_.a13_(a001_.a25_(a, 1)[a001_.a005_[9]][1]);
					for(i = 0; i < a.length; i++)
						if(a[i].value == b) {
							a[i].checked = c;
							break
						}
				},
				a86_: function(a, d) {
					if(!a001_.a25_(a, 0)[a001_.a005_[4]]) {
						var b = a001_.a12_(a001_.a25_(a, 1)[a001_.a005_[8]][3]),
							c = a001_.a12_(a001_.a25_(a, 1)[a001_.a005_[8]][1]);
						d ? (a001_.a25_(a, 1).icoToChar || (b.getElementsByTagName("div")[0].style.backgroundColor = a001_.a25_(a, 1).icoBackgColorOver), b.style.backgroundColor = a001_.a25_(a, 1).icoBackgColorOver, b.style.borderLeftColor = a001_.a25_(a, 1).borderColorOver, c.style.borderColor = a001_.a25_(a, 1).borderColorOver) : (a001_.a25_(a, 1).icoToChar || (b.getElementsByTagName("div")[0].style.backgroundColor = a001_.a25_(a, 1).icoBackgColorOut), b.style.backgroundColor = a001_.a25_(a, 1).icoBackgColorOut, b.style.borderLeftColor = a001_.a25_(a, 1).borderColorOut, c.style.borderColor = a001_.a25_(a, 1).borderColorOut)
					}
				},
				a88_: function(b) {
					var c = a001_.a12_(a001_.a25_(b, 1)[a001_.a005_[8]][4]),
						d = a001_.a12_(a001_.a25_(b, 1)[a001_.a005_[8]][1]),
						a;
					a = c.style.width;
					a = void 0 != a && null != a && "" != a ? a.replace("px", "") : c.scrollWidth + 22;
					a > this.a96_() ? c.style.width = this.a96_() - 22 + "px" : (b = a001_.a12_(a001_.a25_(b, 1)[a001_.a005_[8]][2]).offsetWidth, c.style.width = b > a ? b + "px" : a + "px");
					b = d.getBoundingClientRect().left;
					a = c.getBoundingClientRect().left;
					b != a && (c.style.left = b + "px");
					b = d.getBoundingClientRect().top;
					a = d.offsetHeight;
					d = c.getBoundingClientRect().top;
					b + a != d && (c.style.top = b + a + "px");
					a = c.getBoundingClientRect().left;
					var d = c.offsetWidth,
						e = this.a96_();
					a + d > e && (d = e - d, 0 <= d && (c.style.left = d + "px"));
					d = c.getBoundingClientRect().top;
					a = c.offsetHeight;
					e = this.a98_();
					d + a > e && (b -= a, 0 <= b && (c.style.top = b + "px"))
				},
				a96_: function() {
					var b = 0;
					a.innerWidth ? b = a.innerWidth : a139_.body && a139_.body.clientWidth && (b = a139_.body.clientWidth);
					if(a139_.documentElement && a139_.documentElement.clientWidth) {
						var c = a139_.documentElement.clientWidth;
						b < c && (b = c)
					}
					return b
				},
				a98_: function() {
					var b = 0;
					a.innerHeight ? b = a.innerHeight : a139_.body && a139_.body.clientHeight && (b = a139_.body.clientHeight);
					if(a139_.documentElement && a139_.documentElement.clientHeight) {
						var c = a139_.documentElement.clientHeight;
						b < c && (b = c)
					}
					return b
				},
				a926_: function() {
					for(var a in a00_[2]) {
						var b = a001_.a12_(a001_.a25_(a, 1)[a001_.a005_[8]][4]);
						b && "block" == b.style.display && (a00_[1] != a ? 0 == a00_[0] && (b.style.display = "none", this.a86_(a, !1)) : (a00_[1] = "", this.a86_(a, !0)))
					}
				}
			},
			a51_: {
				CheckboxSelect: function(b, l) {
					this.id = b;
					if(!a001_.a271_(b)) {
						var a = a001_.a12_(b);
						if(a) {
							var m = a.name || b,
								g;
							g = a.style.width ? a.style.width : "122px";
							var h;
							h = a.style.height ? a.style.height : "22px";
							for(var f = [], d = "", c = 0; c < a.options.length; c++) {
								var n = a.options[c].text,
									e = a.options[c].value;
								if("" != e) {
									1 == a.options[c].selected && (d += "" == d ? e : a001_.a01_[2] + e);
									var k = {};
									k[e] = n;
									f[f.length] = k
								}
							}
							a001_.a52_.a60_(b, !0, m, g, h, f, l);
							"" != d && a.multiple && setCheckboxOptionSelecteds(b, d, a001_.a01_[2]);
							a001_.a17_(a)
						}
					}
				},
				CheckboxSelectJson: function(b, g, a, h, k, l) {
					this.id = b;
					if(!a001_.a271_(b)) {
						var d = a001_.a12_(b);
						if(d) {
							var c = [];
							"string" === typeof a && (a = a001_.a103_(a));
							for(var e in a) {
								var f = {};
								f[e] = a[e];
								c[c.length] = f
							}
							d.innerHTML = "";
							a001_.a52_.a60_(b, !1, g, h || "152px", k || "22px", c, l)
						}
					}
				},
				getCheckboxOptionValues: function(a) {
					return a001_.a12_(a001_.a25_(a, 1)[a001_.a005_[8]][0]).value || ""
				},
				getCheckboxOptionTexts: function(a) {
					var b = a001_.a12_(a001_.a25_(a, 1)[a001_.a005_[8]][2]).value || "";
					b == a001_.a25_(a, 0)[a001_.a005_[3]] && "" == getCheckboxOptionValues(a) && (b = "");
					return b
				},
				resetCheckboxOptionSelecteds: function(a) {
					a001_.a52_.a68_(a)
				},
				setCheckboxOptionSelecteds: function(a, b, c) {
					a001_.a52_.a636_(a, b, c)
				},
				setCheckboxOptionRadio: function(a, b) {
					b ? setCheckboxOptionMaxOptNum(a, 1) : setCheckboxOptionMaxOptNum(a, 0)
				},
				setCheckboxOptionMaxOptNum: function(b, a) {
					a = parseInt(a);
					if(!isNaN(a) && 0 <= a) {
						a001_.a25_(b, 1).maxSelectCount = a;
						var c = a001_.a13_(a001_.a25_(b, 1)[a001_.a005_[9]][0])[0],
							d = a001_.a12_(a001_.a25_(b, 1)[a001_.a005_[8]][5]);
						0 == a ? !c && a001_.a25_(b, 1).selectAllButton && a001_.a52_.a550_(b, d) : c && a001_.a17_(c.parentNode.parentNode.parentNode)
					}
				},
				CheckboxSelectDisabledFalse: function(a) {
					a001_.a25_(a, 0)[a001_.a005_[4]] = !1;
					a001_.a12_(a001_.a25_(a, 1)[a001_.a005_[8]][2]).disabled = "";
					var b = a001_.a12_(a001_.a25_(a, 1)[a001_.a005_[8]][3]);
					a001_.a25_(a, 1).icoToChar ? b.style.color = "#000000" : b.getElementsByTagName("div")[0].style.opacity = "1";
					a001_.a52_.a86_(a, !1)
				},
				CheckboxSelectDisabledTrue: function(a) {
					a001_.a25_(a, 0)[a001_.a005_[4]] = !0;
					a001_.a12_(a001_.a25_(a, 1)[a001_.a005_[8]][2]).disabled = "disabled";
					var b = a001_.a12_(a001_.a25_(a, 1)[a001_.a005_[8]][3]);
					a001_.a25_(a, 1).icoToChar ? b.style.color = "#C2C0C5" : (b.getElementsByTagName("div")[0].style.opacity = "0.5", b.getElementsByTagName("div")[0].style.backgroundColor = "#FFFFFF");
					b.style.backgroundColor = "#FFFFFF";
					b.style.borderLeftColor = "#C2C0C5";
					a001_.a12_(a001_.a25_(a, 1)[a001_.a005_[8]][1]).style.borderColor = "#C2C0C5"
				},
				setCheckboxOptionDefaultWord: function(a, b) {
					a001_.a25_(a, 0)[a001_.a005_[3]] = b
				},
				setCheckboxOptionCheckAll: function(a) {
					a001_.a25_(a, 1).selectAllButton && 0 >= a001_.a25_(a, 1).maxSelectCount && (a001_.a13_(a001_.a25_(a, 1)[a001_.a005_[9]][0])[0].checked = !0, a001_.a52_.a531_(a, !0))
				},
				CheckboxSelectOnChange: function(a, b) {
					a001_.a52_.a56_(a, b)
				},
				setCheckboxOptions: function(c, a) {
					var b = [];
					"string" === typeof a && (a = a001_.a103_(a));
					for(var d in a) {
						var e = {};
						e[d] = a[d];
						b[b.length] = e
					}
					a001_.a52_.a596_(c, b);
					a001_.a52_.a68_(c)
				}
			}
		};
	a001_.a50_()
});