import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  View
} from 'react-native';
var width = Dimensions.get('window').width;
export default class InputBox extends Component {
  render() {
    return (
         <View>
             <Text style={styles.label}>{this.props.fieldName}</Text>
                <TextInput
                    maxLength={30}
                    style={styles.inputStyle}
                    placeholder={this.props.placeholder}
                    value={this.props.fieldValue}
                    maxLength={this.props.maxLength? this.props.maxLength:100}
                    keyboardType={this.props.keyboardType?this.props.keyboardType:'default'}
                    onChangeText={this.props.changeEvent}
                />
         </View>
    );
  }
}

const styles = StyleSheet.create({
  label:{
    color:'#E62221',
    marginTop: 15,
    marginLeft: 10,
  },
  inputStyle:{
    width:width-80,
    height:40,
    marginLeft: 10,
    paddingLeft: 5,
    borderBottomColor:'#E62221',
    borderBottomWidth: 1,
  },
});