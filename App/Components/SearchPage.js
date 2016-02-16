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

import icons from '../Assets/Icons';
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
    添加新的搜索记录
  */
  searchHistory(){
    /*
      1. 将查询元素放入新数组，
      2. 然后通过创建新Set去掉数组内重复元素，
      3. 最后再通过spread操作符将元素再转化为数组
    */
    let newSearchHistory = [...new Set([this.state.query, ...this.state.searchHistory])];

    this.setState({
      searchHistory: newSearchHistory
    });
  }


  /*
    获取搜索电影的数据
  */
  fetchData(){
    //调用添加新搜索记录
    this.searchHistory();

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
    搜索电影具体信息
      此处用于重新查询搜索历史内容
    应用ES7的async实现异步
  */
  async search(item){
    try{
      //当await的内容执行完成后才会继续执行后面操作
      await this.setState({
        query: item
      });
      this.fetchData();
    }catch(e){
      console.log(e);
    }
  }
  /*
    删除历史记录中的项目
  */
  deleteSearchHistoryItem(item){
    let newSearchHistory = new Set(this.state.searchHistory);
    newSearchHistory.delete(item);

    this.setState({
      searchHistory: [...newSearchHistory]
    });
  }

  /*
    具体的各个搜索历史单元页面
  */
  renderSearchHistoryList(item){
    return(
      <TouchableHighlight
        underlayColor='rgba(34, 26, 38, 0.1)'
        onPress={ () => this.search(item)}
        >
        <View style={styles.item}>
          <TouchableHighlight
            underlayColor='rgba(34, 26, 38, 0.1)'
            onPress={ () => {
              this.deleteSearchHistoryItem(item)
            }}
          >
             <Image
                source={{uri: icons.deleteIcon}}
                style={styles.deleteIcon}
             />
          </TouchableHighlight>
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
            value={this.state.query}
            style={{height: 50}}
            placeholder="搜索..."
            autoFocus={true}
            editable={true}
            returnKeyType="search"
            placeholderTextColor="#6435c9"
            clearButtonMode="while-editing"
            clearTextOnFocus={true}
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
