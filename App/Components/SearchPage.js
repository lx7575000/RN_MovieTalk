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

export default class SearchPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      query: '',
      loaded: true,
      opacity: 0,
    }
  }

  fetchData(){
    this.setState({
      loaded: false,
      opacity: 1,
    });
    const REQUEST_URL = `http://api.douban.com/v2/movie/search?q=${this.state.query}`;
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
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

  render(){
    return (
      <View style={[styles.us_container, {paddingTop: 60}]}>
        <View style={styles.loading, { padding: 7, borderColor: 'rgba(100, 53, 201, 0.2)', borderBottomWidth: 1}}>

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
      </View>
    )
  }
}
