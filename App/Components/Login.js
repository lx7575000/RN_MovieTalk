'use strict';

import React, {
  Text,
  View,
  ListView,
  StyleSheet,
  Image,
  Component,
  ActivityIndicatorIOS,
  TouchableHighlight,
  NavigatorIOS,
  WebView,
} from 'react-native';

import styles from '../Style/MovieDetail';

export default class Login extends Component{
  constructor(props){
    super(props);
  }

  /*
    onNavigationStateChange
  */
  onNavigationStateChange(state){
    console.log(state);
  }

  /*
    WebView 内属性介绍
      startInLoadingState 数据接收到前是否显示加载页面
      bounces 网页上下拉是否有回弹效果
      scrollEnabled 是否支持滚动
      contentInset 在页面内的位置，和页面大小
      html 属性其中为html代码
  */
  render(){
    return (
      <WebView
        startInLoadingState={true}
        url='http://www.douban.com'
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
      />
    );
  }
}
