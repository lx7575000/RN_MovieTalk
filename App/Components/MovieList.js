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

const REQUEST_URL = 'https://api.douban.com/v2/movie/top250';

export default class MovieList extends Component{
  constructor(props){
    super(props);
    console.log('movielist is runing ...');
    this.state = {
      movies: new ListView.DataSource({
        rowHasChanged: (row1, row2)  => row1 !== row2
      }),
      loaded: false
    };

    this.fetchData();
  }


  _renderMovieList(movie){
    return(
      <TouchableHighlight
        onPress={() =>{
          console.log(`《${movie.title}》被点了`)
        }}
        underlayColor='rgba(34, 26, 38, 0.1)'>
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
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.movies}
          renderRow = {this._renderMovieList}
        />
      </View>
    )
  }
}
