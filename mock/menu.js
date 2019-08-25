const Mock = require('mockjs');
const menuData = [
    {
        title: "dashboard",
        key: "dashboard",
    },
    {
        title: "canvas",
        key: "canvas",
    },
    // {
    //     title: "gitDataV",
    //     key: "gitDataV",
    // },
    // {
    //     title: "地域分析",
    //     key: "regionalAnalysis",
    // },
    {
        title: "users",
        key: "users",
    },
    {
        title: "404",
        key: "404",
    },
    {
        title: "图表分析",
        key: "yonghuxingwei",
        children: [
            // {
            //     title: "路径分析",
            //     key: "pathAnalysis",
            // },
            {
                title: "view1",
                key: "p1",
            },
            {
                title: "view2",
                key: "p2",
            },
        ]
    },
    {
        title: "echarts组件",
        key: "echarts",
        children: [
            {
                key: 'Bar',
                title: 'Bar'
            },
            {
                key: 'line',
                title: 'Line'
            },
            // {
            //     key: 'area',
            //     title: 'Area'
            // },
            // {
            //     key: 'yBar',
            //     title: 'YBar'
            // },
            // {
            //     key: 'funnel',
            //     title: 'Funnel'
            // },
            {
                key: 'pie',
                title: 'Pie'
            },
            {
                key: 'pieDoughnut',
                title: 'PieDoughnut'
            },
            {
                key: 'sankey',
                title: 'Sankey'
            },
        ]
    },
    {
        title: "d3.js组件",
        key: "d3Chart",
        children: [
            // {
            //     title: "树图",
            //     key: "treePage",
            // },
            {
                title: "力导向图1",
                key: "force",
            },
            {
                title: "力导向图2",
                key: "force2",
            },
        ]
    },
    {
        title: "iframe",
        key: "iframe",
        children: [
            {
                title: "bing",
                key: "bing",
            }
        ]
    },
    // {
    //     title: "图形组件",
    //     key: "react-charts",
    // },
    // {
    //     title: "请给star",
    //     key: "github",
    // },
];
const data = Mock.mock({
    data: menuData,
    status: 0
});
module.exports = {
    [`POST /getMenuData`](req, res) {
        res.status(200).json(data);
    },
};