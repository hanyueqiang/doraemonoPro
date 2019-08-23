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

  render() {
    const { canvasContent, defectsSource } = this.props;
    console.log(canvasContent)
    console.log(defectsSource)
    return (
      <div className={styles.canvas_content}>
        <canvas className="myCanvas" style={{ position: 'absolute', zIndex: 999, left: 0, right: 0, top: 0, bottom: 0, pointerEvents: 'none' }}></canvas>
        <Row gutter={20}>
          <Col md={24} lg={24} xl={17} >
            <Card
              title={'副主任医师查房记录'}
              style={{ marginTop: 20, height: 510 }}
            >
              <p>主任医师查房记录</p>

              asd
          </Card>
          </Col>
          <Col md={24} lg={24} xl={7} >
            <Card
              title={'缺陷列表'}
              style={{ marginTop: 20, height: 510, overflow: 'hidden' }}
            >
              qwer
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
