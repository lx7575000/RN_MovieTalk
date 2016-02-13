import React, {
  Component,
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default class SimpleButton extends Component{
  constructor(props){
    super(props);
    this.state = {
      title: this.props.title || 'Button'
    };
  }
  render(){
    return (
      <TouchableOpacity onPress={this.props._onPress}
        style={styles.button}
      >
        <View>
          <Text>
            {this.state.title}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}


let styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    backgroundColor: '#ccc',
    borderRadius: 10
  }
})

SimpleButton.propTypes ={
    _onPress: React.PropTypes.func.isRequired,
    title: React.PropTypes.string
};
