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
import Login from './Login';


export default class UserProfile extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Login />
    );
  }
}
