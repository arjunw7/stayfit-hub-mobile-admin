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
export default class SuperAdminViewDiet extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <GradientHeader title="Diet Details" navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});