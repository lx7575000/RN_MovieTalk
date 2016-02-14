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

import styles from '../Style/index';

export default class MovieDetail extends Component{
  render(){
    return(
      <View style={styles.container}>
        <View styles.loading>
          <Text>
              MovieDetail
          </Text>
        </View>
      </View>
    )
  }
}
