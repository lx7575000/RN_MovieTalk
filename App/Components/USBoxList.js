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

const REQUEST_URL = 'https://api.douban.com/v2/movie/us_box';

export default class USBoxList extends Component{
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

  _handleGenres(arr){
    let genres = '';
    for(let i = 0; i < arr.length; i++){
      genres = genres + ' ' + arr[i];
    }
    return genres;
  }

  _renderMovieList(movie){
    return(
      <TouchableHighlight
        onPress={() => this.showMovieDetail(movie.subject)}
        underlayColor='rgba(34, 26, 38, 0.1)'>
        <View style={styles.item}>
          <View style={styles.itemImage}>
            <Image
              source={{uri: movie.subject.images.large}}
              style={styles.image}/>
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemHeader}>
              {movie.subject.title}
            </Text>
            <Text style={styles.itemMeta}>
              {movie.subject.original_title} ({movie.subject.year})
            </Text>
            <Text style={styles.redText}>
              {movie.subject.rating.average}
            </Text>
            <Text style={styles.genres}>
              { movie.subject.genres.length === 3 ? `${movie.subject.genres[0]}, ${movie.subject.genres[1]}, ${movie.subject.genres[2]}` : `${movie.subject.genres[0]}, ${movie.subject.genres[1]}`}
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

  showMovieDetail(movie){
    this.props.navigator.push({
      title: movie.title,
      component: MovieDetail,
      passProps: {movie},
    });
  }

  render(){
    if(!this.state.loaded){
      return (
        <View style={[styles.us_container, styles.radius]}>
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
          style={{flex: 1}}
          dataSource={this.state.movies}
          renderRow = {this._renderMovieList.bind(this)}
        />
      </View>
    )
  }
}
