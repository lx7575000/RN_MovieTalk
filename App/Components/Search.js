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
  NavigatorIOS
} from 'react-native';

import SearchPage from './SearchPage';

export default class Search extends Component{
  render(){
    return(
      <NavigatorIOS
              style={{
                flexDirection: 'row',
                flex: 1
              }}
              initialRoute={{
                title: '电影搜索',
                component: SearchPage
              }}
              shadowHidden={true}
              barTintColor="darkslateblue"
              titleTextColor="rgba(255,255,255, 0.8)"
              tintColor="rgba(255, 255, 255, 0.8)"
              translucent={true}
      />
    );
  }
}
