import React, {
  Text,
  View,
  ListView,
  StyleSheet,
  Image,
  Component,
  ActivityIndicatorIOS,
  TouchableHighlight
} from 'react-native';

import styles from '../Style/MovieList';

import MovieDetail from './MovieDetail';


const REQUEST_URL = 'https://api.douban.com/v2/movie/top250';

export default class MovieList extends Component{

  constructor(props){
    super(props);
    this.state = {
      movies: new ListView.DataSource({
        rowHasChanged: (row1, row2)  => row1 !== row2
      }),
      loaded: false
    };

    this.fetchData();
  }

  /*showMovieDetail
        通过使用使用上层父组件给其传递(NavigatorIOS默认传递) this.props.navigator属性中的push方法，
        向后进入下一层 MovieDetail 组件构建的页面

        title 下层页面导航栏的标题
        component 构建页面的组件
        passProps 传递给下层页面的参数
    */

  showMovieDetail(movie){
    this.props.navigator.push({
      title: movie.title,
      component: MovieDetail,
      passProps: {movie},
    });
  }


  /*
    _renderMovieList 方法 返回ListView中各个单元的具体构造结构和样式
      TouchableHighlight 组件用于包裹各个单元组件，当组件被点击时，会产生阴影效果
        underlayColor 属性用于设定具体阴影颜色
        onPress 属性用于返回点击反应的方法
  */

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

  /*
    fetchData 用于获得想要得到的数据
      使用fetch方法获得数据
        this.state.movies 是ListView.DataSource 类型数据，
        通过对其使用cloneWithRows方法将获得到的 responseData.subjects数组内元素按照 ListView.DataSource要求形式存储
        loaded属性，是用于判断加载状态是否完成，并在之前提供加载显示页面
  */

  fetchData(){
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        // console.log(responseData);
        this.setState({
          movies: this.state.movies.cloneWithRows(responseData.subjects),
          loaded: true
        })
      });
  }

  /*
    render()方法中共分两个情况
    --当页面仍在加载中会显示加载页面
    ---加载结束，setState({loaded : false})
    --然后页面调转为具体显示页面
  */
  render(){
    if(!this.state.loaded){
      return (
        <View style={[styles.container, styles.radius]}>
          <View style={styles.loading}>
            <ActivityIndicatorIOS
              size="large"
              color='#6435c9'
            />
            <Text style={{marginTop: 10, color: 'rgba(0, 0, 0, 0.5)'}}>
              努力加载中...
            </Text>
          </View>
        </View>
      )
    }
    /*
      ListView 用于显示以列表形式显示的内容
        dataSource属性用于传入数据，其类型为ListView.DataSource
        renderRow 中传入各个列单元想要显示的内容
    */
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.movies}
          renderRow = {this._renderMovieList.bind(this)}
        />
      </View>
    );
  }
}
