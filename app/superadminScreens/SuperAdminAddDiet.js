import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import GradientHeader from '../components/GradientHeader'
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
var width = Dimensions.get('window').width;
import CONFIG from '../config/config'
export default class SuperAdminAddDiet extends Component {
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <GradientHeader title="Add Diet Plan" navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  ploader:{
    flex:1,
    width:width,
    height:"100%",
    position:'absolute',
    zIndex:100,
    backgroundColor:"rgba(0,0,0,0.7)",
    paddingTop:"100%"
  }
});