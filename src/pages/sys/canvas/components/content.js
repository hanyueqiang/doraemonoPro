import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import { connect } from 'dva';
import styles from '../index.less';
let timeout;

class Content extends Component {
  state = {
    lightKey: ''
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'medical/getContent',
      payload: {
      }
    });

    dispatch({
      type: 'medical/getDefects',
      payload: {
      }
    });

  }
  clearLeftLight = () => {
    //清除之前的高亮
    let lightDoms = document.getElementsByClassName('light-active');
    Array.from(lightDoms).forEach(d => {
      let t = document.createTextNode(d.innerText);
      if (d.parentNode.tagName == 'TBODY') {
        d.classList.remove('relation-active')
      } else {
        d.parentNode.insertBefore(t, d)
        d.parentNode.removeChild(d)
      }
    });
  }

  lightHandle = async (item) => {
    this.clearLeftLight();
    this.setState({
      lightKey: item.lightKey
    }, () => {
      this.hideCanvas();
      this.findLightPosition(item.lightKey);
      this.handleLine(1);
    });
  }

  findLightPosition = (lightKey) => {
    let targetFile = document.getElementsByClassName('light-content')[0];
    let targetDom = targetFile.getElementsByClassName(lightKey)[0];
    let targetContent = targetDom.innerText;
    let targetLight = `<span class='light-active'>${targetContent}</span>`;
    targetDom.innerHTML = targetLight;
  }

  hideCanvas = () => {
    let canvas = document.getElementsByClassName('body-canvas')[0];
    canvas.style.display = 'none'
  }
  clearCanvas = () => {
    let canvas = document.getElementsByClassName('body-canvas')[0];
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  handleLine = (robotLineFlag) => {
    let doms = document.getElementsByClassName('light-active');
    let right = document.getElementsByClassName('lightRight')[0];
    let self = this;
    if (doms && right) {
      let ctx = this.createCanvas();
      doms = Array.from(doms)
      for (let dom of doms) {
        setImmediate(() => {
          self.rewire(dom, right, ctx, robotLineFlag);
        });
      }

      let flag = true;
      function handleScroll() {
        if (flag) {
          flag = false;
          self.clearCanvas();
          for (let dom of doms) {
            self.rewire(dom, right, ctx, robotLineFlag)
          }
          flag = true
        }
      }
      window.onresize = () => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        timeout = setTimeout(handleScroll, 150);
      }
      //js监听div宽度变化
      let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
      let element = document.querySelector('.ant-layout-sider-dark');
      let observer = new MutationObserver(() => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        timeout = setTimeout(handleScroll, 150);
      });
      observer.observe(element, { attributes: true, attributeFilter: ['style'], attributeOldValue: true });
    }
  }

  createCanvas = () => {
    let canvas = document.getElementsByClassName('body-canvas')[0];
    canvas.style.display = 'block'
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    return ctx;
  }

  rewire = (dom, right, ctx, robotLineFlag) => {
    if (!dom || !right) {
      return
    }
    //获取dom距离file-flag的坐标
    let domP = dom.getBoundingClientRect();
    //超出视口的做限制
    let collPos;
    let collapses = document.getElementsByClassName('ant-card-body');
    Array.from(collapses).forEach(c => {
      if (c.contains(dom)) {
        collPos = c.getBoundingClientRect();
      }
    })
    let long = collPos.right - 30;
    let { top } = domP;
    let left = domP.right;

    let rightP = right.getBoundingClientRect();
    //let rightHeight = $(right).height();
    let rightHeight = right.offsetHeight;
    if (collPos) {
      if (domP.top <= collPos.top) {
        top = collPos.top
        left = long
        console.log(55)
      }
      if (domP.top > collPos.bottom) {
        top = collPos.bottom
        left = long
      }

    }

    ctx.beginPath();
    ctx.arc(rightP.left, rightP.top + rightHeight / 2, 3, 0, 2 * Math.PI);
    ctx.arc(left, top, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "#FF3851";
    ctx.fill();
    ctx.closePath()
    ctx.beginPath();

    ctx.strokeStyle = "#FF3851"; // 红色路径
    // ctx.lineWidth = 2;
    // if (robotLineFlag) {
    //   ctx.setLineDash([5, 15]);
    // }

    ctx.lineCap = "round";
    ctx.moveTo(left, top);
    if (collPos && domP.top > collPos.top) {
      ctx.lineTo(long, top);
    }

    ctx.lineTo(long, rightP.top + rightHeight / 2);
    ctx.lineTo(rightP.left, rightP.top + rightHeight / 2);

    ctx.stroke();
  }
  componentWillUnmount() {
    this.hideCanvas();
  }

  render() {
    const { canvasContent, defectsSource } = this.props;
    const { lightKey } = this.state;
    return (
      <div className={styles.canvas_content}>
        <canvas className="myCanvas" style={{ position: 'absolute', zIndex: 999, left: 0, right: 0, top: 0, bottom: 0, pointerEvents: 'none' }}></canvas>
        <Row gutter={20}>
          <Col md={17} lg={17} xl={17} >
            <Card
              title={'副主任医师查房记录'}
              style={{ height: 410 }}
            >
              <div style={{ fontSize: 14, textAlign: 'center', marginBottom: 6 }}>{canvasContent.info}</div>
              <div style={{ fontSize: 14, lineHeight: '22px',padding:4 }} className="light-content" dangerouslySetInnerHTML={{ __html: canvasContent.content }}></div>
            </Card>
          </Col>
          <Col md={7} lg={7} xl={7} >
            <Card
              title={'缺陷列表'}
              style={{ height: 410, overflow: 'hidden' }}
            >
              {defectsSource.map(item => <div onClick={this.lightHandle.bind(this, item)} className={`${styles.rightCard} ${lightKey === item.lightKey ? 'lightRight' : ''}`} key={item.id}>{item.name}</div>)}
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
export default connect(({ medical }) => {
  return {
    ...medical
  };
})(Content);
