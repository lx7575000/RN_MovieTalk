import React, {
  Text,
  View,
  StyleSheet,
  Component
} from 'react-native';

export default class NoteScreen extends Component{
  render(){
    return (
      <View style={styles.container}>
        <Text>
          Create Note Screen !
        </Text>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
