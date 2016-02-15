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

import styles from '../Style/MovieList';
import USBoxList from './USBoxList';


export default class USBox extends Component{
  render(){
    return(
        <NavigatorIOS
                style={{
                  flexDirection: 'row',
                  flex: 1
                }}
                initialRoute={{
                  title: '北美电影排行',
                  component: USBoxList
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
