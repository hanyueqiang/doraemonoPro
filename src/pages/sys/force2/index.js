import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import $ from '$';
//import { jsondata } from './components/config';
let svg;
let linkGroup;
let selectnodeid = 0;
let nodebuttonAction = '';
let selectlinkname = '';
let isdeletelink;
let linktextGroup;
let nodebuttonGroup;
let nodeGroup;
let value;
let nodetextGroup;
let nodesymbolGroup;
let simulation;
const jsondata = {
	node: [
		{ "filter": [], "showstyle": "0", "entitytype": "0", "name": "云知声", "uuid": "18147394" },
		{ "filter": [], "showstyle": "0", "entitytype": "0", "name": "IoT行业应用", "uuid": "18147395" },
		{ "filter": [], "showstyle": "0", "entitytype": "0", "name": "AI Labs", "uuid": "18147401" },
		{ "filter": [], "showstyle": "0", "entitytype": "1", "name": "病历质控", "uuid": "18147424" },
		{ "filter": [], "showstyle": "0", "entitytype": "1", "name": "Kar机器人", "uuid": "18147425" },
		{ "filter": [], "showstyle": "0", "entitytype": "1", "name": "Hello Kitty", "uuid": "18147426" },
		{ "filter": [], "showstyle": "0", "entitytype": "1", "name": "波比机器人", "uuid": "18147427" },
		{ "filter": [], "showstyle": "0", "entitytype": "1", "name": "HR", "uuid": "18147428" },
		{ "filter": [], "showstyle": "0", "entitytype": "1", "name": "云平台", "uuid": "18147429" },
		{ "filter": [], "showstyle": "0", "entitytype": "1", "name": "云计算", "uuid": "18147430" },
		{ "filter": [], "showstyle": "0", "entitytype": "1", "name": "审计处", "uuid": "18147431" },
		{ "filter": [], "showstyle": "0", "entitytype": "1", "name": "导医机器人", "uuid": "18147432" },
		{ "filter": [], "showstyle": "0", "entitytype": "1", "name": "财务处", "uuid": "18147433" },
		{ "filter": [], "showstyle": "0", "entitytype": "1", "name": "语义", "uuid": "18147434" },
		{ "filter": [], "showstyle": "0", "entitytype": "1", "name": "MOP", "uuid": "18147435" },
		{ "filter": [], "showstyle": "0", "entitytype": "0", "name": "TTS", "uuid": "18147402" },
		{ "filter": [], "showstyle": "0", "entitytype": "0", "name": "哆啦A梦", "uuid": "18147403" },
		{ "filter": [], "showstyle": "0", "entitytype": "0", "name": "大数据", "uuid": "18147378" },
		{ "filter": [], "showstyle": "0", "entitytype": "0", "name": "瓦力", "uuid": "18147406" },
		{ "filter": [], "showstyle": "0", "entitytype": "0", "name": "萨曼莎", "uuid": "18147407" },
		{ "filter": [], "showstyle": "0", "entitytype": "0", "name": "语音识别", "uuid": "18147409" },
		{ "filter": [], "showstyle": "0", "entitytype": "1", "name": "N6", "uuid": "18147420" },
		{ "filter": [], "showstyle": "0", "entitytype": "1", "name": "N5", "uuid": "18147421" },
    ],
    relationship:[
        {"sourceid":"18147394","targetid":"18147395","name":"","uuid":"48723709"},
        {"sourceid":"18147394","targetid":"18147401","name":"","uuid":"48723710"}
    ]
};

export default class index extends Component {

    componentDidMount() {
        // var token = $("meta[name='_csrf']").attr("content");
        // var header = $("meta[name='_csrf_header']").attr("content");
        // var str = '{ "' + header + '": "' + token + '"}';
        // this.headers = eval('(' + str + ')');
        this.initgraph();
        this.updategraph();
    }

    initgraph = () => {
        var graphcontainer = d3.select(".graphcontainer");
        //var width = graphcontainer._groups[0][0].offsetWidth;
        var width = 1250;
        var height = window.screen.height - 154;//
        svg = graphcontainer.append("svg");
        svg.attr("width", width);
        svg.attr("height", height);
        simulation = d3.forceSimulation()
            .force("link", d3.forceLink().distance(function (d) {
                return Math.floor(Math.random() * (700 - 200)) + 200;
            }).id(function (d) {
                return d.uuid
            }))
            .force("charge", d3.forceManyBody().strength(-400))
            .force("collide", d3.forceCollide().strength(-30))
            .force("center", d3.forceCenter(width / 2, (height - 200) / 2));
        linkGroup = svg.append("g").attr("class", "line");
        linktextGroup = svg.append("g").attr("class", "linetext");
        nodeGroup = svg.append("g").attr("class", "node");
        nodetextGroup = svg.append("g").attr("class", "nodetext");
        nodesymbolGroup = svg.append("g").attr("class", "nodesymbol");
        nodebuttonGroup = svg.append("g").attr("class", "nodebutton");
        this.addmaker(svg);
        this.addnodebutton();
        svg.on('click', function () {
            d3.selectAll("use").classed("circle_opreate", true);
        }, 'false');
    }
    addmaker = () => {
        var arrowMarker = svg.append("marker")
            .attr("id", "arrow")
            .attr("markerUnits", "strokeWidth")
            .attr("markerWidth", "20")//
            .attr("markerHeight", "20")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", "22")// 13
            .attr("refY", "0")
            .attr("orient", "auto");
        var arrow_path = "M0,-5L10,0L0,5";// 定义箭头形状
        arrowMarker.append("path").attr("d", arrow_path).attr("fill", "#fce6d4");
    }

    addnodebutton = () => {
        var nodebutton = svg.append("defs").append("g")
            .attr("id", "out_circle")
        var database = [1, 1, 1, 1, 1];
        var pie = d3.pie();
        var piedata = pie(database);
        var buttonEnter = nodebutton.selectAll(".buttongroup")
            .data(piedata)
            .enter()
            .append("g")
            .attr("class", function (d, i) {
                return "action_" + i;
            });
        var arc = d3.arc()
            .innerRadius(30)
            .outerRadius(60);
        buttonEnter.append("path")
            .attr("d", function (d) {
                return arc(d)
            })
            .attr("fill", "#D2D5DA")
            .style("opacity", 0.6)
            .attr("stroke", "#f0f0f4")
            .attr("stroke-width", 2);
        buttonEnter.append("text")
            .attr("transform", function (d, i) {
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("text-anchor", "middle")
            .text(function (d, i) {
                var zi = new Array()
                zi[0] = "编辑";
                zi[1] = "展开";
                zi[2] = "追加";
                zi[3] = "连线";
                zi[4] = "删除";
                return zi[i]
            })
            .attr("font-size", 10);
    }

    updategraph = () => {
        var _this = this;
        //var lks = this.graph.links;
        var lks = jsondata.relationship;
        var nodes = jsondata.node;
        var links = [];
        lks.forEach(function (m) {
            var sourceNode = nodes.filter(function (n) {
                return n.uuid === m.sourceid;
            })[0];
            if (typeof (sourceNode) == 'undefined') return;
            var targetNode = nodes.filter(function (n) {
                return n.uuid === m.targetid;
            })[0];
            if (typeof (targetNode) == 'undefined') return;
            links.push({ source: sourceNode.uuid, target: targetNode.uuid, lk: m });
        });
        if (links.length > 0) {
            _.each(links, function (link) {
                var same = _.filter(links, _.matches({
                    'source': link.source,
                    'target': link.target
                }));
                var sameAlt = _.filter(links,  _.matches({
                    'source': link.target,
                    'target': link.source
                }));
                var sameAll = same.concat(sameAlt);
                _.each(sameAll, function (s, i) {
                    s.sameIndex = (i + 1);
                    s.sameTotal = sameAll.length;
                    s.sameTotalHalf = (s.sameTotal / 2);
                    s.sameUneven = ((s.sameTotal % 2) !== 0);
                    s.sameMiddleLink = ((s.sameUneven === true) && (Math.ceil(s.sameTotalHalf) === s.sameIndex));
                    s.sameLowerHalf = (s.sameIndex <= s.sameTotalHalf);
                    s.sameArcDirection = 1;
                    //s.sameArcDirection = s.sameLowerHalf ? 0 : 1;
                    s.sameIndexCorrected = s.sameLowerHalf ? s.sameIndex : (s.sameIndex - Math.ceil(s.sameTotalHalf));
                });
            });
            var maxSame = _.chain(links)
                .sortBy(function (x) {
                    return x.sameTotal;
                })
                .last()
                .value().sameTotal;

            _.each(links, function (link) {
                link.maxSameHalf = Math.round(maxSame / 2);
            });
        }
        // 更新连线 links
        var link = linkGroup.selectAll(".line >path").data(links, function (d) {
            return d.uuid;
        });
        link.exit().remove();
        var linkEnter = _this.drawlink(link);
        link = linkEnter.merge(link);
        // 更新连线文字
        var linktext = linktextGroup.selectAll("text").data(links, function (d) {
            return d.uuid;
        });
        linktext.exit().remove();
        var linktextEnter = _this.drawlinktext(linktext);
        linktext = linktextEnter.merge(linktext).text(function (d) {
            return d.lk.name;
        });
        // 更新节点按钮组
        d3.selectAll(".nodebutton  >g").remove();
        var nodebutton = nodebuttonGroup.selectAll(".nodebutton").data(nodes, function (d) {
            return d
        });
        nodebutton.exit().remove();
        var nodebuttonEnter = _this.drawnodebutton(nodebutton);
        nodebutton = nodebuttonEnter.merge(nodebutton);
        // 更新节点
        var node = nodeGroup.selectAll("circle").data(nodes, function (d) {
            return d
        });
        node.exit().remove();
        var nodeEnter = _this.drawnode(node);
        node = nodeEnter.merge(node).text(function (d) {
            return d.name;
        });
        // 更新节点文字
        var nodetext = nodetextGroup.selectAll("text").data(nodes, function (d) {
            return d.uuid
        });
        nodetext.exit().remove();
        var nodetextEnter = _this.drawnodetext(nodetext);
        nodetext = nodetextEnter.merge(nodetext).text(function (d) {
            return d.name;
        });
        nodetext.append("title")// 为每个节点设置title
            .text(function (d) {
                return d.name;
            });
        // 更新节点标识
        var nodesymbol = nodesymbolGroup.selectAll("path").data(nodes, function (d) {
            return d.uuid;
        });
        nodesymbol.exit().remove();
        var nodesymbolEnter = _this.drawnodesymbol(nodesymbol);
        nodesymbol = nodesymbolEnter.merge(nodesymbol);
        nodesymbol.attr("fill", "#e15500");
        nodesymbol.attr("display", function (d) {
            if (typeof (d.hasfile) != "undefined" && d.hasfile > 0) {
                return "block";
            }
            return "none";
        })
        simulation.nodes(nodes).on("tick", ticked);
        simulation.force("link").links(links);
        simulation.alphaTarget(0).restart();
        function linkArc(d) {
            var dx = (d.target.x - d.source.x),
                dy = (d.target.y - d.source.y),
                dr = Math.sqrt(dx * dx + dy * dy),
                unevenCorrection = (d.sameUneven ? 0 : 0.5);
            var curvature = 2,
                arc = (1.0 / curvature) * ((dr * d.maxSameHalf) / (d.sameIndexCorrected - unevenCorrection));
            if (d.sameMiddleLink) {
                arc = 0;
            }
            var dd = "M" + d.source.x + "," + d.source.y + "A" + arc + "," + arc + " 0 0," + d.sameArcDirection + " " + d.target.x + "," + d.target.y;
            return dd;
        }

        function ticked() {
            // 更新连线坐标
            /*link.attr("x1", function (d) {
                return d.source.x;
               })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });*/
            link.attr("d", linkArc)
            // 刷新连接线上的文字位置
            /* linktext.attr("x", function (d) {
                 return (d.source.x + d.target.x) / 2;
             })
                 .attr("y", function (d) {
                     return (d.source.y + d.target.y) / 2;
                 })*/


            // 更新节点坐标
            node.attr("cx", function (d) {
                return d.x;
            })
                .attr("cy", function (d) {
                    return d.y;
                });
            // 更新节点操作按钮组坐标
            nodebutton.attr("cx", function (d) {
                return d.x;
            })
                .attr("cy", function (d) {
                    return d.y;
                });
            nodebutton.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ") scale(1)";
            })

            // 更新文字坐标
            nodetext.attr("x", function (d) {
                return d.x;
            })
                .attr("y", function (d) {
                    return d.y;
                });
            // 更新回形针坐标
            nodesymbol.attr("transform", function (d) {
                return "translate(" + (d.x + 8) + "," + (d.y - 30) + ") scale(0.015,0.015)";
            })
        }
        // 鼠标滚轮缩放
        //_this.svg.call(d3.zoom().transform, d3.zoomIdentity);//缩放至初始倍数
        svg.call(d3.zoom().on("zoom", function () {
            d3.selectAll('.node').attr("transform", d3.event.transform);
            d3.selectAll('.nodetext').attr("transform", d3.event.transform);
            d3.selectAll('.line').attr("transform", d3.event.transform);
            d3.selectAll('.linetext').attr("transform", d3.event.transform);
            d3.selectAll('.nodesymbol').attr("transform", d3.event.transform);
            d3.selectAll('.nodebutton').attr("transform", d3.event.transform);
            //_this.svg.selectAll("g").attr("transform", d3.event.transform);
        }));
        svg.on("dblclick.zoom", null); // 静止双击缩放
        //按钮组事件
        svg.selectAll(".buttongroup").on("click", function (d, i) {
            console.log(nodebuttonAction);
            console.log(d);
            if (nodebuttonAction) {
                switch (nodebuttonAction) {
                    case "EDIT":
                        _this.isedit = true;
                        _this.propactiveName = 'propedit';
                        _this.txx = d.x;
                        _this.tyy = d.y;
                        break;
                    case "MORE":
                        _this.getmorenode();
                        break;
                    case "CHILD":
                        _this.operatetype = 2;
                        _this.isbatchcreate = true;
                        _this.isedit = false;
                        break;
                    case "LINK":
                        _this.isaddlink = true;
                        _this.selectsourcenodeid = d.uuid;
                        break;
                    case "DELETE":
                        selectnodeid = d.uuid;
                        var out_buttongroup_id = '.out_buttongroup_' + i;
                        _this.deletenode(out_buttongroup_id);
                        break;
                }
                //ACTION = '';//重置 ACTION
            }

        });
        //按钮组事件绑定
        svg.selectAll(".action_0").on("click", function (d) {
            nodebuttonAction = 'EDIT';
        });
        svg.selectAll(".action_1").on("click", function (d) {
            nodebuttonAction = 'MORE';
        });
        svg.selectAll(".action_2").on("click", function (d) {
            nodebuttonAction = 'CHILD';
        });
        svg.selectAll(".action_3").on("click", function (d) {
            nodebuttonAction = 'LINK';
        });
        svg.selectAll(".action_4").on("click", function (d) {
            nodebuttonAction = 'DELETE';
        });
    }
    drawlink = (link) => {
        var _this = this;
        var linkEnter = link.enter().append("path")
            .attr("stroke-width", 1)
            .attr("stroke", "#fce6d4")
            .attr("fill", "none")
            .attr("id", function (d) {
                return "invis_" + d.lk.sourceid + "-" + d.lk.name + "-" + d.lk.targetid;
            })
            .attr("marker-end", "url(#arrow)")
            ;// 箭头
        linkEnter.on("dblclick", function (d) {
            selectnodeid = d.lk.uuid;
            if (isdeletelink) {
                _this.deletelink();
            } else {
                _this.updatelinkName();
            }
        });
        linkEnter.on("contextmenu", function (d) {
            var cc = $(this).offset();
            selectnodeid = d.lk.uuid;
            selectlinkname = d.lk.name;
            d3.select('#link_menubar')
                .style('position', 'absolute')
                .style('left', cc.left + "px")
                .style('top', cc.top + "px")
                .style('display', 'block');
            d3.event.preventDefault();// 禁止系统默认右键
            d3.event.stopPropagation();// 禁止空白处右键
        });
        linkEnter.on("mouseenter", function (d) {
            d3.select(this).style("stroke-width", "6").attr("stroke", "#ff9e9e").attr("marker-end", "url(#arrow2)");
        });
        linkEnter.on("mouseleave", function (d) {
            d3.select(this).style("stroke-width", "1").attr("stroke", "#fce6d4").attr("marker-end", "url(#arrow)");
        });
        return linkEnter;
    }

    deletelink =() => {
        var _this = this;
        this.$confirm('此操作将删除该关系(不可恢复), 是否继续?', '三思而后行', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(function () {
            //var data = {domain: _this.domain, shipid: _this.selectnodeid};
            //$.ajax({
            //     data: data,
            //     type: "POST",
            //     url: contextRoot + "deletelink",
            //     success: function (result) {
            //         if (result.code == 200) {
            //             var j = -1;
            //             for (var i = 0; i < _this.graph.links.length; i++) {
            //                 if (_this.graph.links[i].uuid == _this.selectnodeid) {
            //                     j = i;
            //                     break;
            //                 }
            //             }
            //             if (j >= 0) {
            //                 _this.selectnodeid = 0;
            //                 _this.graph.links.splice(i, 1);
            //                 _this.updategraph();
            //                 _this.isdeletelink = false;
            //             }
            //         }
            //     }
            // });
        }).catch(function () {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });
    }
    updatelinkName =() =>{
        var _this = this;
        _this.$prompt('请输入关系名称', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputValue: selectlinkname
        }).then(function (res) {
            // value=res.value;
            // var data = {domain: _this.domain, shipid: _this.selectnodeid, shipname: value};
            // $.ajax({
            //     data: data,
            //     type: "POST",
            //     url: contextRoot + "updatelink",
            //     success: function (result) {
            //         if (result.code == 200) {
            //             var newship = result.data;
            //             _this.graph.links.forEach(function (m) {
            //                 if (m.uuid == newship.uuid) {
            //                     m.name = newship.name;
            //                 }
            //             });
            //             _this.selectnodeid = 0;
            //             _this.updategraph();
            //             _this.isaddlink = false;
            //             _this.selectlinkname = '';
            //         }
            //     }
            // });
        }).catch(function () {
            _this.$message({
                type: 'info',
                message: '取消输入'
            });
        });
    }

    drawlinktext =(link) =>{
        var linktextEnter = link.enter().append('text')
            .style('fill', '#e3af85')
            .append("textPath")
            .attr("startOffset", "50%")
            .attr("text-anchor", "middle")
            .attr("xlink:href", function(d) {
                return "#invis_" + d.lk.sourceid + "-" + d.lk.name + "-" + d.lk.targetid;
            })
            .style("font-size", 14)
            .text(function (d) {
                if (d.lk.name != '') {
                    return d.lk.name;
                }
            });

        linktextEnter.on("mouseover", function (d) {
            selectnodeid = d.lk.uuid;
            selectlinkname = d.lk.name;
            var cc = $(this).offset();
            d3.select('#link_menubar')
                .style('position', 'absolute')
                .style('left', cc.left + "px")
                .style('top', cc.top + "px")
                .style('display', 'block');
        });

        return linktextEnter;
    }

    drawnodebutton =(nodebutton) =>{
        var _this = this;
        var nodebuttonEnter = nodebutton.enter().append("g").append("use")//  为每个节点组添加一个 use 子元素
            .attr("r", function(d){
                return d.r;
            })
            .attr("xlink:href", "#out_circle") //  指定 use 引用的内容
            .attr('class',function(d,i){
                return 'buttongroup out_buttongroup_'+i;
            })
            .classed("circle_opreate", true);

        return nodebuttonEnter;
    }

    drawnode =(node) => {
        var _this = this;
        var nodeEnter = node.enter().append("circle");
        nodeEnter.attr("r", function (d) {
            if (typeof(d.r) != "undefined" && d.r != '') {
                return d.r
            }
            return 30;
        });
        nodeEnter.attr("fill", function (d) {
            if (typeof(d.color) != "undefined" && d.color != '') {
                return d.color
            }
            return "#ff4500";
        });
        nodeEnter.style("opacity", 0.8);
        nodeEnter.style("stroke", function (d) {
            if (typeof(d.color) != "undefined" && d.color != '') {
                return d.color
            }
            return "#ff4500";
        });
        nodeEnter.style("stroke-opacity", 0.6);
        nodeEnter.append("title")// 为每个节点设置title
            .text(function (d) {
                return d.name;
            })
        nodeEnter.on("mouseover", function (d, i) {
            _this.timer = setTimeout(function () {
                d3.select('#richContainer')
                    .style('position', 'absolute')
                    .style('left', d.x + "px")
                    .style('top', d.y + "px")
                    .style('display', 'block');
                _this.editorcontent = "";
                _this.showImageList = [];
                _this.getNodeDetail(d.uuid);
            }, 3000);
        });
        nodeEnter.on("mouseout", function (d, i) {
            clearTimeout( _this.timer);
        });
        nodeEnter.on("dblclick", function (d) {
            _this.updatenodename(d);// 双击更新节点名称
        });
        nodeEnter.on("mouseenter", function (d) {
            var aa = d3.select(this)._groups[0][0];
            if (aa.classList.contains("selected")) return;
            d3.select(this).style("stroke-width", "6");
        });
        nodeEnter.on("mouseleave", function (d) {
            var aa = d3.select(this)._groups[0][0];
            if (aa.classList.contains("selected")) return;
            d3.select(this).style("stroke-width", "2");
        });
        nodeEnter.on("click", function (d,i) {
            var out_buttongroup_id='.out_buttongroup_'+i;
            _this.svg.selectAll("use").classed("circle_opreate", true);
            _this.svg.selectAll(out_buttongroup_id).classed("circle_opreate", false);
            _this.graphEntity = d;
            _this.selectnodeid = d.uuid;
            _this.selectnodename = d.name;

            // 更新工具栏节点信息
            _this.getcurrentnodeinfo(d);

            // 添加连线状态
            if (_this.isaddlink) {
                _this.selecttargetnodeid = d.uuid;
                if (_this.selectsourcenodeid == _this.selecttargetnodeid || _this.selectsourcenodeid == 0 || _this.selecttargetnodeid == 0) return;
                _this.createlink(_this.selectsourcenodeid, _this.selecttargetnodeid, "RE")
                _this.selectsourcenodeid = 0;
                _this.selecttargetnodeid = 0;
                d.fixed = false
                d3.event.stopPropagation();
            }
        });
        nodeEnter.call(d3.drag()
            .on("start", _this.dragstarted)
            .on("drag", _this.dragged)
            .on("end", _this.dragended));
        return nodeEnter;
    }

    updatenodename =(d) =>{
        var _this = this;
        _this.$prompt('编辑节点名称', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputValue: d.name
        }).then(function (res) {
            value=res.value;
            var data = {domain: _this.domain, nodeid: d.uuid, nodename: value};
            // $.ajax({
            //     data: data,
            //     type: "POST",
            //     url: contextRoot + "updatenodename",
            //     success: function (result) {
            //         if (result.code == 200) {
            //             if (d.uuid != 0) {
            //                 for (var i = 0; i < _this.graph.nodes.length; i++) {
            //                     if (_this.graph.nodes[i].uuid == d.uuid) {
            //                         _this.graph.nodes[i].name = value;
            //                     }
            //                 }
            //             }
            //             _this.updategraph();
            //             _this.$message({
            //                 message: '操作成功',
            //                 type: 'success'
            //             });
            //         }
            //     }
            // });
        }).catch(function () {
            _this.$message({
                type: 'info',
                message: '取消操作'
            });
        });
    }

    drawnodetext =(nodetext) =>{
        var _this = this;
        var nodetextenter = nodetext.enter().append("text")
            .style("fill", "#fff")
            .attr("dy", 4)
            .attr("font-family", "微软雅黑")
            .attr("text-anchor", "middle")
            .text(function (d) {
                var length = d.name.length;
                if (d.name.length > 4) {
                    var s = d.name.slice(0, 4) + "...";
                    return s;
                }
                return d.name;
            });
        nodetextenter.on("mouseover", function (d, i) {
            _this.timer = setTimeout(function () {
                d3.select('#richContainer')
                    .style('position', 'absolute')
                    .style('left', d.x + "px")
                    .style('top', d.y + "px")
                    .style('display', 'block');
                _this.editorcontent = "";
                _this.showImageList = [];
                _this.getNodeDetail(d.uuid);
            }, 3000);
        });

        nodetextenter.on("dblclick", function (d) {
            _this.updatenodename(d);// 双击更新节点名称
        });
        nodetextenter.on("click", function (d) {
            $('#link_menubar').hide();// 隐藏空白处右键菜单
            _this.graphEntity = d;
            _this.selectnodeid = d.uuid;
            // 更新工具栏节点信息
            _this.getcurrentnodeinfo(d);
            // 添加连线状态
            if (_this.isaddlink) {
                _this.selecttargetnodeid = d.uuid;
                if (_this.selectsourcenodeid == _this.selecttargetnodeid || _this.selectsourcenodeid == 0 || _this.selecttargetnodeid == 0) return;
                _this.createlink(_this.selectsourcenodeid, _this.selecttargetnodeid, "RE")
                _this.selectsourcenodeid = 0;
                _this.selecttargetnodeid = 0;
                d.fixed = false
                d3.event.stopPropagation();
            }
        });

        return nodetextenter;
    }
    drawnodesymbol =(nodesymbol)=> {
        var _this = this;
        var symnol_path = "M566.92736 550.580907c30.907733-34.655573 25.862827-82.445653 25.862827-104.239787 0-108.086613-87.620267-195.805867-195.577173-195.805867-49.015467 0-93.310293 18.752853-127.68256 48.564907l-0.518827-0.484693-4.980053 4.97664c-1.744213 1.64864-3.91168 2.942293-5.59104 4.72064l0.515413 0.484693-134.69696 133.727573L216.439467 534.8352l0 0 137.478827-136.31488c11.605333-10.410667 26.514773-17.298773 43.165013-17.298773 36.051627 0 65.184427 29.197653 65.184427 65.24928 0 14.032213-5.33504 26.125653-12.73856 36.829867l-131.754667 132.594347 0.515413 0.518827c-10.31168 11.578027-17.07008 26.381653-17.07008 43.066027 0 36.082347 29.16352 65.245867 65.184427 65.245867 16.684373 0 31.460693-6.724267 43.035307-17.07008l0.515413 0.512M1010.336427 343.49056c0-180.25472-145.882453-326.331733-325.911893-326.331733-80.704853 0-153.77408 30.22848-210.418347 79.0528l0.484693 0.64512c-12.352853 11.834027-20.241067 28.388693-20.241067 46.916267 0 36.051627 29.16352 65.245867 65.211733 65.245867 15.909547 0 29.876907-6.36928 41.192107-15.844693l0.38912 0.259413c33.624747-28.030293 76.301653-45.58848 123.511467-45.58848 107.99104 0 195.549867 87.6544 195.549867 195.744427 0 59.815253-27.357867 112.71168-69.51936 148.503893l0 0-319.25248 317.928107 0 0c-35.826347 42.2912-88.654507 69.710507-148.340053 69.710507-107.956907 0-195.549867-87.68512-195.549867-195.805867 0-59.753813 27.385173-112.646827 69.515947-148.43904l-92.18048-92.310187c-65.69984 59.559253-107.700907 144.913067-107.700907 240.749227 0 180.28544 145.885867 326.301013 325.915307 326.301013 95.218347 0 180.02944-41.642667 239.581867-106.827093l0.13312 0.129707 321.061547-319.962453-0.126293-0.13312C968.69376 523.615573 1010.336427 438.71232 1010.336427 343.49056L1010.336427 343.49056 1010.336427 343.49056zM1010.336427 343.49056";// 定义回形针形状
        var nodesymbolEnter = nodesymbol.enter().append("path").attr("d", symnol_path);
        nodesymbolEnter.call(d3.drag()
            .on("start", _this.dragstarted)
            .on("drag", _this.dragged)
            .on("end", _this.dragended));
        return nodesymbolEnter;
    }

    render() {
        return (
            <div id="app1" className="mind-con">
                <div id="graphcontainer" className="graphcontainer" style={{width: '100%'}}></div>
                <div className="svg-set-box"></div>
            </div>
        )
    }
}
