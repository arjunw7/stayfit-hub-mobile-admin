import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
  View
} from 'react-native';
var width = Dimensions.get('window').width;
export default class SubmitButton extends Component {
  render() {
    return (
        <TouchableHighlight onPress={this.props.pressEvent} underlayColor="transparent">
            <View style={styles.button}>
            <Text style={styles.buttonText}>{this.props.buttonName}</Text>
            </View>
        </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
    button:{
        width:width-60,
        height:50,
        backgroundColor: '#E62221',
        borderRadius: 50,
        marginBottom: 30,
        alignItems: 'center',
        padding:8,
        paddingTop:15,
        marginTop: 20,
      },
      buttonText:{
        color:'white'
      },
});