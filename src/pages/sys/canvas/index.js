import React, { Component } from 'react';
import { Page } from '@components';
import Content from './components/content';

export default class index extends Component {
  render() {
    return (
      <Page
        pathtitles={[{
          title: 'canvas',
          icon: 'fund'
        }]}
        style={{ backgroundColor: 'transparent' }}
        title={'canvas绘图'}
      >
        <Content />
      </Page>
    )
  }
}
