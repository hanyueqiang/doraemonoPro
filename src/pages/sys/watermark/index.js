import React, { Component } from 'react';
import { Page } from '@components';
import Mark from './mark';

export default class Index extends Component {
  render() {
    return (
      <Page
        pathtitles={[{
          title: 'watermark',
          icon: 'file-image'
        }]}
        style={{ backgroundColor: 'transparent' }}
        title={'图片加水印,主要用途: 在各种证件上添加“仅用于办理XXXX，他用无效。”，防止证件被他人盗用！'}
      >
        <Mark />
      </Page>
    )
  }
}
