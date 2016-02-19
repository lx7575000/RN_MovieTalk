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


import styles from '../Style/MovieDetail';

export default class MovieDetail extends Component{
  constructor(props){
    super(props);

    this.state = {
      movieDetail: '',
      loaded: false,
    };

    const REQUEST_URL = `https://api.douban.com/v2/movie/subject/${this.props.movie.id}`;
  }
  /*
    组件加载完成再开始传入数据
  */
  componentDidMount(){
    this.fetchData(REQUEST_URL);
  }

  fetchData(REQUEST_URL){
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          loaded: true,
          movieDetail: responseData,
        })
      });
  }

  render(){
    if(!this.state.loaded){
      return(
        <View style={styles.container}>
          <View style={styles.loading}>
            <ActivityIndicatorIOS
              size="large"
              color='#6435c9'
            />
            <Text>
              正在努力加载 《{this.props.movie.title}》 内容
            </Text>
          </View>
        </View>
      )
    }

    let movie = this.state.movieDetail;
    /*
      通过使用split将获得的文字内容按`\n`分割成数组内的多份，然后将它们包装成多个View块元素
    */
    let summary = movie.summary.split(/\n/).map( p => {
      return (
        <View style={{marginBottom: 16, paddingLeft: 6, paddingRight: 6}}>
          <Text style={styles.description}>
              {p}
          </Text>
        </View>
      )
    })

    return(
      <View style={styles.summary}>
        <View style={styles.item}>
              {summary}
        </View>
      </View>
    )
  }
}
