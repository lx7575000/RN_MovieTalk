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
import USBox from './App/Components/USBox';
import Search from './App/Components/Search';

import icons from './App/Assets/Icons';


class MovieTalk extends Component {
  constructor(props){
    super(props);
    // console.log('Hello start RN');
    this.state = {
      selectedTab: 'search',
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
      {/*
        TarBarIOS 类似于 ol 标签，其中填充TabBarIOS.Item组件类似于 li 分别存储各个具体组件内容

        其中，barTintColor属性用于定义标签框颜色
            tintColor用于设定框内字体颜色
      */}
        <TabBarIOS barTintColor={'darkslateblue'} tintColor={'white'}>
          {/*
              icon属性用于说明使用哪个具体标签，可以自己定义，也可以使用系统自带标签
              title属性用于设定标签下显示的标题
              selectedIcon属性用于设定被选择时，标签样式
              selected属性用于判定，当前该标签是否被选定
              onPress中传递回调函数，当该元素被选择需要做的回应
            */}
          <TabBarIOS.Item
            icon={{uri: icons.hollow_star, scale: 4.6}}
            title="推荐电影"
            selectedIcon={{uri: icons.filled_star, scale: 4.6}}
            selected={this.state.selectedTab === 'featured'}
            onPress={() => {this.setState({selectedTab: 'featured'})
          }}>
          {/*标签页1 --- 豆瓣经典250部电影*/}
            <Featured />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            icon={{uri: icons.menu, scale: 4.6}}
            title="北美最新上映"
            selectedIcon={{uri: icons.menu_active, scale: 4.6}}
            selected={this.state.selectedTab === 'us_box'}
            onPress={() => {this.setState({selectedTab: 'us_box'})
          }}>
          {/*标签页2 --- 北美最新电影排行榜*/}
            <USBox />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            icon={{uri: icons.search, scale: 4.6}}
            title="搜索"
            selected={this.state.selectedTab === 'search'}
            onPress={() => {this.setState({selectedTab: 'search'})
          }}>
          {/*标签页2 --- 电影、电视剧搜索页面*/}
            <Search />
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    );
  }
}

AppRegistry.registerComponent('MovieTalk', () => MovieTalk);
