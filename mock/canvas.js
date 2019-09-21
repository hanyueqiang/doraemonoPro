const Mock = require('mockjs');

const { Random } = Mock;
const info = Mock.mock({
    data: {
      info: '姓名：XXX     科别：XXX科     病区：0001     床号：0001     住院号：012345678',
      date: '日期：2019-09-09 09:09',
      content: '患者今入科第N天，APACHE II评分50分，预计病死率5%，SOFA评分2分，目前主要问题：'+
        '1、肺部感染 I型呼吸衰竭: 患者入科后体温在37℃左右，仍有胸闷气喘主诉，不能平卧，鼻导管吸氧5L/min指脉氧波动在95%以上，<span class="key_10002">可自主可出中到大量带血丝黄脓痰</span>，听诊双肺呼吸音粗，双肺可及广泛湿性啰音，左肺为著。今晨复查感染指标：血常规：白细胞计数:11.52×10^9/L;中性粒细胞比率:89.81%;降钙素原:0.043ng/mL;超敏C反应蛋白:98.6mg/L，今晨动脉血气分析示：pH:7.394 ;pCO2:29.3mmHg;氧分压（测定）:80.1mmHg;氧饱和度（测量）:96.4;氧合指数:200.3mmHg，目前予奥司他韦抗病毒联合莫西沙星抗感染治疗。    2、心律失常 室性早搏：患者无胸痛心悸主诉，入科后心率波动在90-110次/分，呈窦性心律偶见室性早搏，患者无创血压在120-130/90-100mmHg,心肌酶学：<span class="key_10001">N端-前脑钠钛测定</span>:2140pg/mL;肌钙蛋白I:0.033ng/mL，监测内环境：钾离子:3.36mmol/L;钙离子:0.98mmol/L;镁离子:0.39mmol/L，已予补充，继续监测生命体征。'+
        '主任医师查看病人后指出：患者目前病情仍危重。',
      auth: '李四'
    },
    status: 0
});
const defectList = [
  {
    id: 1,
    name: 'N端-前脑钠钛测定应该写为：N端-前脑钠肽测定',
    lightKey: 'key_10001'
  },
  {
    id: 2,
    name: '可自主可出中到大量带血丝黄脓痰应该写为：可自主咳出中到大量带血丝黄脓痰',
    lightKey: 'key_10002'
  }
];
module.exports = {
    [`POST /getCanvasContent`](req, res) {
        res.status(200).json(info);
    },
    [`GET /getDefects`](req, res) {
        res.status(200).json({
            data: {
              list: defectList
            },
            status: 0
        });
    },
};