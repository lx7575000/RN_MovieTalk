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
  TextInput
} from 'react-native';


import SearchResult from './SearchResult';
import styles from '../Style/MovieList';

/*
  该组件分为两部分
    搜算栏 --- TextInput
    搜索历史栏 --- ListView
*/
export default class SearchPage extends Component{
  constructor(props){
    super(props);

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      query: '',
      loaded: true,
      opacity: 0,
      searchHistory: ['lost', 'matrix', 'fargo', 'hangover'],
    }
  }

  /*
    获取搜索电影的数据
  */

  fetchData(){
    this.setState({
      loaded: false,
      opacity: 1,
    });
    const REQUEST_URL = `http://api.douban.com/v2/movie/search?q=${this.state.query}`;
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        /*
          搜索到影片数据后跳转到显示内容页面
        */
        this.props.navigator.push({
          title: responseData.title,
          component: SearchResult,
          passProps: {
            results: responseData.subjects
          }
        });
        this.setState({
          loaded: true,
          opacity: 0,
        });
      })
      .done();
  }

  /*
    具体的各个搜索历史单元页面
  */
  renderSearchHistoryList(item){
    return(
      <TouchableHighlight
        underlayColor='rgba(34, 26, 38, 0.1)'
        onPress={ () => {}}
        >
        <View style={styles.item}>
          <View style={styles.itemContent}>
            <Text style={[styles.itemHeader, styles.searchContent]}>
              {item}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  /*
    通过使用 loaded设定 ActivityIndicatorIOS中的animating状态，
    然后设定opacity属性值设定ActivityIndicatorIOS组件是否可见

  */
  render(){
    return (
      <View style={[styles.us_container, {paddingTop: 60}]}>
        <View style={styles.loading, { padding: 7, borderColor: 'rgba(100, 53, 201, 0.2)', borderBottomWidth: 1}}>
        {/*
            第一部分  --- 搜索框
          */}
          <TextInput
            style={{height: 50}}
            placeholder="搜索..."
            autoFocus={true}
            editable={true}
            returnKeyType="search"
            placeholderTextColor="#6435c9"
            clearButtonMode="while-editing"
            onChangeText={ (query) => {
              this.setState({
                query
              });
            }}
            onSubmitEditing={this.fetchData.bind(this)}
          />
          <ActivityIndicatorIOS
            size="small"
            color="#6435c9"
            animating={!this.state.loaded}
            style={{
              position: 'absolute',
              right: 10,
              top: 20,
              opacity: this.state.opacity
            }}
          />

        </View>
        {/*
            第二部分  --- 搜索历史列表
          */}
        <Text style={styles.searchHeader}>
          搜索历史
        </Text>
        <ListView
          dataSource={this.dataSource.cloneWithRows(
            this.state.searchHistory
          )}
          renderRow={this.renderSearchHistoryList.bind(this)}
        />
      </View>
    )
  }
}
