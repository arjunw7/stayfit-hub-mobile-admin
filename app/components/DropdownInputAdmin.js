import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import CONFIG from '../config/config'
import ActionSheet from 'react-native-actionsheet';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableHighlight
} from 'react-native';
var width = Dimensions.get('window').width;
export default class DropdownInputAdmin extends Component {
  constructor(props) {
    super(props);
    this.state ={
    }
  }
  showActionSheet = () => {
    this.ActionSheet.show()
  }
  optionsList = []
  optionsListID = []
  
  componentDidMount = () => {
      this.setState({showLoader: true})
      if(this.props.endpoint){
        axios.get(CONFIG.base_url + this.props.endpoint)
        .then((response) => {
          this.setState({showLoader: false})
          this.setOptions(response.data._embedded[this.props.endpoint])
        })
        .catch((error) => {
            alert(error)
        })
      }
  };
  setOptions(list){
    for(var i=0; i<list.length; i++){
        this.optionsList.push(list[i].name)
        this.optionsListID.push(list[i].id)
    }
    this.optionsList.push("All")
    this.optionsList.push("Cancel")
    this.optionsListID.push(-1)
    this.setState({
        optionsList:this.optionsList,
        optionsListID: this.optionsListID
    })
  }

  render() {
    return (
        <View>
        <TouchableHighlight onPress={this.showActionSheet} underlayColor="transparent">
            <View style={styles.row}>
                <Text style={styles.centerText} >{this.props.fieldValue}</Text> 
                <Icon
                name='chevron-small-down'
                color='white'
                type='entypo'
                containerStyle={{
                    position:'absolute',
                    right:5
                }} />
            </View>
            </TouchableHighlight>
            <ActionSheet
                ref={o => this.ActionSheet = o}
                title={this.props.sheetLabel}
                options={this.props.options?this.props.options:this.optionsList}
                cancelButtonIndex={this.props.options?this.props.options.length-1:this.optionsList.length-1}
                destructiveButtonIndex={this.props.options?this.props.options.length-1:this.optionsList.length-1}
                onPress={(index) => { 
                        if(this.props.options){
                            {this.props.pressEvent(this.props.options[index])}
                        }
                        else
                        if(index!=this.optionsList.length-1){
                         {this.props.pressEvent(this.optionsListID[index])}
                        }
                }}
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    row:{
        flexWrap: 'wrap',
        flexDirection: 'row',
        width:width-40,
        marginTop:15,
        paddingBottom: 10,
        marginRight:-10
      },
      centerText:{
        color:'white',
        fontSize:14,
        width:width-80,
        textAlign:'right',
        marginTop:2
      },
      inputStyle:{
        width:width-80,
        height:40,
        marginLeft: 10,
        paddingLeft: 5,
        borderBottomColor:'white',
        borderBottomWidth: 1,
        color:'white'
      }
});