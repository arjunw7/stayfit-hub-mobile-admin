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
export default class DropdownInput extends Component {
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
    this.optionsList.push("Cancel")
    this.setState({
        optionsList:this.optionsList,
        optionsListID: this.optionsListID
    })
  }

  render() {
    return (
        <View>
        <Text style={styles.label}>{this.props.label}</Text>
        <TouchableHighlight onPress={this.showActionSheet} underlayColor="transparent">
            <View style={styles.row}>
                <Text style={styles.centerText} >{this.props.fieldValue}</Text> 
                <Icon
                name='chevron-small-down'
                color='#E62221'
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
      }
});