import React, { Component } from 'react';
import { Page } from '@components';
import Content from './components/content';

export default class Index extends Component {
  render() {
    return (
      <Page
        pathtitles={[{
          title: '拖拽排序',
          icon: 'retweet'
        }]}
        style={{ backgroundColor: 'transparent' }}
        title={'使用插件：sortablejs'}
      >
        <Content />
      </Page>
    )
  }
}
