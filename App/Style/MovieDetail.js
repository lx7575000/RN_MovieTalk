import React, {
  StyleSheet
} from 'react-native';


let styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 60,
    backgroundColor: '#ccc'
  },
  summary: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 70,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',

  },
  loading:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  item: {
    paddingBottom: 6,
    paddingTop: 6,
    borderBottomWidth: 1,
    borderColor: 'rgba(100, 53, 201, 0.1)',
  },
  description:{
    fontWeight: '300',
    color: 'rgba(0, 0, 0, 0.8)',
    lineHeight: 26,
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
  }
})

export default styles;
