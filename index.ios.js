/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  ListView,
  View,
  TabBarIOS,
  NavigatorIOS
} from 'react-native';

import styles from './App/Style/index';

import MovieList from './App/Components/MovieList';
import USBoxList from './App/Components/USBoxList';
import Featured from './App/Components/Feature';


import icons from './App/Assets/Icons';


class MovieTalk extends Component {
  constructor(props){
    super(props);
    // console.log('Hello start RN');
    this.state = {
      selectedTab: 'us_box',
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TabBarIOS barTintColor={'darkslateblue'} tintColor={'white'}>
          <TabBarIOS.Item
            icon={{uri: icons.hollow_star, scale: 4.6}}
            title="推荐电影"
            selectedIcon={{uri: icons.filled_star, scale: 4.6}}
            selected={this.state.selectedTab === 'featured'}
            onPress={() => {this.setState({selectedTab: 'featured'})
          }}>
            <Featured styles={{marginTop: 20}} />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            icon={{uri: icons.menu, scale: 4.6}}
            title="北美最新上映"
            selectedIcon={{uri: icons.menu_active, scale: 4.6}}
            selected={this.state.selectedTab === 'us_box'}
            onPress={() => {this.setState({selectedTab: 'us_box'})
          }}>
            <USBoxList />
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    );
  }
}

AppRegistry.registerComponent('MovieTalk', () => MovieTalk);
