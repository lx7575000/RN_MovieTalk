/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  ListView,
  View,
  Image,
  Navigator
} from 'react-native';

import SimpleButton from './App/Components/SimpleButton';
import NoteScreen from './App/Components/NoteScreen';
import MovieList from './App/Components/MovieList';
import USBoxList from './App/Components/USBoxList';


class HeaderText extends Component {
  render(){
    return (
      <Text style={styles.title}>
        {this.props.children}
      </Text>
    )
  }
}

class LogoImage extends Component{
  render(){
    return (
      <View>
      <Image source={{uri: 'http://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2293405567.jpg'}}
     style={{width: 99, height: 133, margin: 6}} />
      </View>
    )
  }
}

class MovieTalk extends Component {
  constructor(props){
    super(props);
    console.log('Hello start RN');

  }

  render() {
    return (
      <View style={styles.container}>
        <USBoxList />
      </View>
    );
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eae7ff',
    margin: 20,
    padding: 6,
    overflow: 'hidden'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  title:{
    fontSize: 21,
    color: '#6435c9',
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: 2,
    lineHeight: 33,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'bold'
  },
  logo: {
    width: 99,
    height: 138,
    margin: 6,
  },
  backgroundImage:{
    flex: 1,
    resizeMode: 'cover',
    width: 360,
    height: 400
  },
  textItem:{
    fontSize: 33,
    color:'#000',
    margin: 5,
    padding: 6,
    marginBottom: 40,

  }
});

AppRegistry.registerComponent('MovieTalk', () => MovieTalk);
