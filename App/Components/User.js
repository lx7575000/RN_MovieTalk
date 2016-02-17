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

import UserProfile from './UserProfile';

export default class User extends Component{
  render(){
    return (
      <NavigatorIOS
              style={{
                flexDirection: 'row',
                flex: 1
              }}
              initialRoute={{
                title: '账户',
                component: UserProfile,
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
