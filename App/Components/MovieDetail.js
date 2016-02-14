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

    const REQUEST_URL = `https://api.douban.com/v2/movie/subject/${this.props.movie.id}`

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
    return(
      <View style={styles.summary}>
          <Text>
            {this.state.movieDetail.summary}
          </Text>
      </View>
    )
  }
}
