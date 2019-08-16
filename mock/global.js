const Mock = require('mockjs');

const { Random } = Mock;
const info = Mock.mock({
    data: {
        userInfo: {
            //userName: Random.name(),
            userName: 'admin',
        },
        message: {
            news: Random.cparagraph(17, 30),
            'count|18-32': 1
        },
    },
    status: 0
});
module.exports = {
    [`POST /getSysInfo`](req, res) {
        res.status(200).json(info);
    },
    [`GET /logout`](req, res) {
        res.status(200).json({
            data: {
                message: "退出登录成功！"
            },
            status: 0
        });
    },
    [`POST /getMessage`](req, res) {
        res.status(200).json({
            data: [
                {
                    title: '任务通知',
                    description: "你有一项任务待完成",
                    type: 'read'
                },
                {
                    title: '申诉通知',
                    description: "您发起的申诉已通过",
                    type: 'unread'
                },
                {
                    title: '整改通知',
                    description: "您有一项工作待整改，请及时修改",
                    type: 'unread'
                }
            ],
            status: 0
        });
    }
};