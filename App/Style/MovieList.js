import React, {
  StyleSheet
} from 'react-native';


let styles = StyleSheet.create({
  itemText: {
    fontSize: 33,
    color: '#000',
    padding: 10,
  },
  container:{
    marginTop: 20,
    backgroundColor: 'rgba(73, 73, 73, 0.2)'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 6,
    paddingTop: 6,
    borderBottomWidth: 1,
    borderColor: 'rgba(100, 53, 201, 0.1)',
    marginLeft: 20
  },
  image: {
    width: 99,
    height: 136,
  },
  itemContent: {
    flex: 1,
    marginLeft: 13,
    marginTop: 6,
  },
  itemMeta:{
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: 6
  },
  itemHeader:{
    fontSize: 13,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    color: '#6435c9'
  },
  redText:{
    color: '#db2828',
    fontSize: 15
  },
  itemImage: {
    flex: 1,
    paddingLeft: 50
  },
  genres: {
    fontSize: 14,
    fontWeight: '200',
    lineHeight: 20,
  },
  radius:{
    borderRadius: 16
  }
});

export default styles;
