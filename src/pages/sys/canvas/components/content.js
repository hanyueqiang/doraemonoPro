import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import { connect } from 'dva';
import styles from '../index.less';

class Content extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
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
  lightHandle = (item) => {
    console.log(item)
  }

  render() {
    const { canvasContent, defectsSource } = this.props;
    return (
      <div className={styles.canvas_content}>
        <canvas className="myCanvas" style={{ position: 'absolute', zIndex: 999, left: 0, right: 0, top: 0, bottom: 0, pointerEvents: 'none' }}></canvas>
        <Row gutter={20}>
          <Col md={17} lg={17} xl={17} >
            <Card
              title={'副主任医师查房记录'}
              style={{ marginTop: 20, height: 510 }}
            >
              <div style={{fontSize: 14, textAlign:'center',marginBottom: 6}}>{canvasContent.info}</div>
              <div style={{fontSize: 14,lineHeight:'22px'}}>{canvasContent.content}</div>
          </Card>
          </Col>
          <Col md={7} lg={7} xl={7} >
            <Card
              title={'缺陷列表'}
              style={{ marginTop: 20, height: 510, overflow: 'hidden' }}
            >
              {defectsSource.map(item => <div onClick={this.lightHandle.bind(this, item)} className={styles.rightCard} key={item.id}>{item.name}</div>)}
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
