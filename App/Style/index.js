import React, {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eae7ff',
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
  },
});

export default styles;
