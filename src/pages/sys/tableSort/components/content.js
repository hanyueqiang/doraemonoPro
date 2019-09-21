import React, { Component } from 'react';
import Sortable from 'sortablejs';
import { Spin } from 'antd';
import styles from '../index.less';

const dataSource = [
  {
    id: 1,
    doctorId: '12254',
    empNo: 'NM102554',
    name: '张三',
    headImage: '',
    epartmenename: '呼吸内科',
    jobTitle: '主任',
    introduction: '主治各种疾病'
  },
  {
    id: 2,
    doctorId: '18494',
    empNo: 'NM187954',
    name: '李四',
    epartmenename: '心内科',
    headImage: '',
    jobTitle: '副主任',
    introduction: '主治各种疑难杂症'
  },
  {
    id: 3,
    doctorId: '12254',
    empNo: 'NM102554',
    epartmenename: '外科',
    name: '王XX',
    headImage: '',
    jobTitle: '专家',
    introduction: '的方式是的发生的分为'
  },
];
export default class content extends Component {
  state = {
    loading: false
  }

  componentDidMount() {
    this.draftSort();
  }

  draftSort = () => {
    // const { dispatch } = this.props;
    let el = document.getElementById('doctor-drag-items');
    let self = this;

    let sortable = Sortable.create(el, {
      animation: 100, //动画参数
      onEnd: function (evt) { //拖拽完毕之后发生该事件
        let id_arr = '';
        let len = evt.from.children.length;
        for (let i = 0; i < len; i++) {
          id_arr += ',' + evt.from.children[i].getAttribute('drag-id');
        }
        id_arr = id_arr.substr(1);
        //然后请求后台ajax 这样就完成了拖拽排序
        console.log(id_arr);
        let sortIds = id_arr.split(',');
        console.log(sortIds)
        // dispatch({
        //   type: 'doctorSortManager/sort',
        //   value: {
        //     doctorIds,
        //     epartmeneId
        //   }
        // });
        self.setState({
          loading: true
        });
        setTimeout(()=>{
          self.setState({
            loading: false
          });
        },500)
      }
    });
  }
  render() {
    const { loading } = this.state;
    return (
      <div className={styles.tableSorts}>
        <Spin spinning={loading}>
          <div className="doctor-drag-table">
            <table>
              <thead>
                <tr>
                  <td>医生编号</td>
                  <td>职工编号</td>
                  <td>医生名称</td>
                  <td>所属科室</td>
                  <td>头像</td>
                  <td>职称</td>
                  <td>简介</td>
                </tr>
              </thead>
              <tbody id='doctor-drag-items'>
                {dataSource.length > 0 ?
                  dataSource.map((item, index) => {
                    return <tr drag-id={item.id} style={{ cursor: 'move' }} key={index}>
                      <td><span style={{ maxWidth: 140, display: 'inline-block' }} className="text-hidden" title={item.doctorId}>{item.doctorId || '-'}</span></td>
                      <td><span style={{ maxWidth: 140, display: 'inline-block' }} className="text-hidden" title={item.empNo}>{item.empNo || '-'}</span></td>
                      <td><span title={item.name}>{item.name || '-'}</span></td>
                      <td><span style={{ maxWidth: 140, display: 'inline-block' }} className="text-hidden" title={item.epartmenename}>{item.epartmenename || '-'}</span></td>
                      <td>{item.headImage ? <img src={item.headImage} width="80" height="80" /> : '-'}</td>
                      <td><span style={{ maxWidth: 140, display: 'inline-block' }} className="text-hidden" title={item.jobTitle}>{item.jobTitle || '-'}</span></td>
                      <td><span style={{ maxWidth: 160, display: 'inline-block' }} className="text-hidden" title={item.introduction}>{item.introduction || '-'}</span></td>
                    </tr>
                  })
                  :
                  <tr><td colSpan='10' style={{ textAlign: 'center' }}>暂无数据</td></tr>
                }
              </tbody>
            </table>
          </div>
        </Spin>
      </div>
    )
  }
}
