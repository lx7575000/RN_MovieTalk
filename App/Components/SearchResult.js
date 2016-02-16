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

import styles from '../Style/MovieDetail';
import MovieDetail from './MovieDetail.js';


export default class SearchResult extends Component{
  constructor(props){
    super(props);

    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      movies: dataSource.cloneWithRows(this.props.results)
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
          dataSource={this.state.movies}
          renderRow={this._renderMovieList.bind(this)}
        />
      </View>
    );
  }
}
