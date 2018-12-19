import React, { Component } from 'react';
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import { Icon } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableHighlight
} from 'react-native';
var width = Dimensions.get('window').width;
export default class DateInputBox extends Component {
  onDatePress = () => {
    this.refs.dobDialog.open({
    date: this.props.selectedDate,
    maxDate: this.props.maxDate
    });
  }
  render() {
    return (
         <View>
            <Text style={styles.label}>{this.props.label}</Text>
              <TouchableHighlight onPress={this.onDatePress.bind(this)} underlayColor="transparent">
                <View style={styles.row}>
                    <Text style={styles.centerText}>{this.props.fieldValue}</Text> 
                    <Icon
                    name='chevron-small-down'
                    color='#E62221'
                    type='entypo'
                    containerStyle={{
                        position:'absolute',
                        right:5
                    }} />
                    <DatePickerDialog ref="dobDialog" onDatePicked={this.props.pickEvent} />
                </View>
              </TouchableHighlight>
         </View>
    );
  }
}

const styles = StyleSheet.create({
    row:{
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderBottomWidth:1,
        borderBottomColor: '#E62221',
        width:width-80,
        marginLeft:10,
        marginRight: 10,
        marginTop:15,
        paddingBottom: 10,
      },
      centerText:{
        color:'black',
        fontSize:14,
        marginLeft: 5,
      },
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