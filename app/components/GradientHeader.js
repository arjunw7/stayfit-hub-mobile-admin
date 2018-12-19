import React, { Component } from 'react';
import { Avatar} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet,
  Text,
  Dimensions
} from 'react-native';
var width = Dimensions.get('window').width;
export default class GradientHeader extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
          <LinearGradient colors={['#b24d2e', '#b23525', '#E62221']} style={styles.headDesign}>
           <Avatar
               size="small"
               rounded
               icon={{name: 'arrow-back'}}
               onPress={() => navigate(this.props.route)}
               containerStyle={{margin: 30}}
           />
           <Text style={{
               fontSize:24,
               color:'white',
               marginLeft:30,
               marginTop:-10
           }}>{this.props.title}</Text>
       </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  headDesign:{
    width:width,
    height:140
  }
});