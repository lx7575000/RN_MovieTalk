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


/*
  NavigatorIOS组件用于包装需要用到导航栏的组件
  initialRoute 设定该导航栏用到的组件 component 和相应的标题 title
  */

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
