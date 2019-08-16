import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { sysName } from '@platformConfig';
import styles from './index.less';
import logo from '../../assets/logo.png';
class Index extends PureComponent {
    render() {
        const { collapsed } = this.props;
        const imgLogo = <img src={logo} alt="pro" style={{ height: '28px' }} />;
        let logoPage;
        if (collapsed) {
            logoPage = imgLogo;
        } else {
            logoPage = (
                <Row style={{ height: 44, lineHeight: '44px', textAlign: 'center' }}>
                    <Col span={7}>
                        {imgLogo}
                    </Col>
                    <Col span={17} >
                        <div className={styles.animation} style={{ height: '44px', lineHeight: '44px', textAlign: 'left', fontSize: '18px', color: '#efefef' }}>
                            {sysName}
                        </div>
                    </Col>
                </Row>
            );
        }
        return <div style={{ height: 44, lineHeight: '44px', textAlign: 'center' }} className={styles.logoPage}>
            {logoPage}
        </div>
    }
}

Index.propTypes = {
    collapsed: PropTypes.bool
};

export default Index;
