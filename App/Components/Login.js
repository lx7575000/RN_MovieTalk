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

    this.api = {
      key: '05b2e24806124f0f1118a6d81236ed2d',
      secret: '132f022db4330578',
    }

    this.oAuth = {
      authBaseUrl: 'https://www.douban.com/service/auth2/auth',
      tokenBaseUrl: 'https://www.douban.com/service/auth2/token',
      redirectUri: 'http://ninghao.net',
      responseType: 'code',
      grantType: 'authorization_code',
      scope: 'douban_basic_common,movie_basic,movie_basic_r,movie_basic_w',
    }

    this.state = {
      authCode: '',
    }
    this.authUrl = `${this.oAuth.authBaseUrl}
      ?client_id=${this.api.key}
      &redirect_uri=${this.oAuth.redirectUri}
      &response_type=${this.oAuth.responseType}
      &scope=${this.oAuth.scope}`.replace(/(\r\n|\n|\r| )/gm, '');
  }

  /*
    getToken
      获取Token，请求token
  */
  getToken(){
    let tokenUrl = `${this.oAuth.authBaseUrl}
      ?client_id=${this.api.key}
      &client_secret=${this.api.secret}
      &redirect_uri=${this.oAuth.redirectUri}
      &response_type=${this.oAuth.responseType}
      &code=${this.state.authCode}`.replace(/(\r\n|\n|\r| )/gm, '');

      fetch(tokenUrl, {
        method: 'POST',
        body: `client_id=${this.api.key}`
      })
        .then(response => response.json())
        .then(responseData){
          console.log(responseData);
        }
  }

  /*
    onNavigationStateChange
      获取登陆第三方网站返回的 code值
      使用ES7的 async异步申请数据
        只有在await的setState成功再继续执行方法内的后续操作
  */
  async onNavigationStateChange(state){
    if(state.url.includes('?code=') && state.navigationType === 1){
      let code = state.url.split('code=')[1];
      await this.setState({
        authCode: code
      });
      console.log('code ' + this.state.authCode);

      this.getToken();
    }
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
        url={this.authUrl}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
      />
    );
  }
}
