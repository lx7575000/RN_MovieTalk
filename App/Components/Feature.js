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
import MovieList from './MovieList';


export default class Featured extends Component{
  render(){
    return(
      <NavigatorIOS
              style={{
                flexDirection: 'row',
                flex: 1
              }}
              initialRoute={{
                title: '电影推荐',
                component: MovieList
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
