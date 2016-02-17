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

import styles from '../Style/MovieList';
import MovieDetail from './MovieDetail';


export default class SearchResult extends Component{
  constructor(props){
    super(props);

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      movies: this.props.results.subjects,
      total: this.props.results.total,
      count: this.props.results.count,
      start: this.props.results.count,
      query: this.props.query,
    }

    this.REQUEST_URL = 'http://api.douban.com/v2/movie/search';
  }

  /*
    renderFooter 加载的页脚，用于在列表加载等待时间内让用户有个可见的加载动画
  */
  renderFooter(){
    if(this.state.total > this.state.start){
      return(
        <View style={{
          marginVertical: 20,
          paddingBottom: 50,
          alignSelf: 'center',
        }}>
          <ActivityIndicatorIOS/>
        </View>
      );
      }else{
        return(
          <View style={{
            marginVertical: 20,
            paddingBottom: 50,
            alignSelf: 'center',
          }}>
            <Text style={{color: 'rgba(0,0,0, 0.3)'}}>
              没有可以显示的内容了: )
            </Text>
          </View>
        );
    }
  }
  /*
    获取各种类型的URL
  */
  requestURL(
    url=this.REQUEST_URL,
    count=this.state.count,
    start=this.state.start,
    query=this.state.query
  ){
    return(
      `${url}?q=${query}&count=${count}&start=${start}`
    );
  }

  /*
    loadMore 加载更多内容
  */
  loadMore(){
    // console.log('loadMore ...');
    fetch(this.requestURL())
      .then(response => response.json())
      .then(responseData => {
        let newStart = responseData.start + responseData.count;
        this.setState({
          movies: [...this.state.movies, ...responseData.subjects],
          start: newStart,
        });
      })
      .done();
  }


  /*
    onEndReached 函数用于处理列表到底端时应相对应的动作
  */
  onEndReached(){
    console.log(`到底了！开始: ${this.state.start}, 总共： ${this.state.total}`);
    if(this.state.total > this.state.start){
      this.loadMore();
    }
  }


  showMovieDetail(movie){
    this.props.navigator.push({
      title: movie.title,
      component: MovieDetail,
      passProps: {movie},
    });
  }


  _renderMovieList(movie){
    return(
      <TouchableHighlight
        underlayColor='rgba(34, 26, 38, 0.1)'
        onPress={ () =>this.showMovieDetail(movie)}
        >
        <View style={styles.item}>
          <View style={styles.itemImage}>
            <Image
              source={{uri: movie.images.large}}
              style={styles.image}/>
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemHeader}>
              {movie.title}
            </Text>
            <Text style={styles.itemMeta}>
              {movie.original_title} ({movie.year})
            </Text>
            <Text style={styles.redText}>
              {movie.rating.average}
            </Text>
            <Text style={styles.genres}>
              { movie.genres.length === 3 ? `${movie.genres[0]}, ${movie.genres[1]}, ${movie.genres[2]}` : `${movie.genres[0]}, ${movie.genres[1]}`}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render(){
    return(
      <View style={styles.container}>
        <ListView
          renderFooter={this.renderFooter.bind(this)}
          pageSize={this.state.count}
          onEndReached={this.onEndReached.bind(this)}
          initialListSize={this.state.count}
          dataSource={this.dataSource.cloneWithRows(this.state.movies)}
          renderRow={this._renderMovieList.bind(this)}
        />
      </View>
    );
  }
}
