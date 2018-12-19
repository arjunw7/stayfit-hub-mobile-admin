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
export default class SuperAdminAddMeal extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return ( <View style = { styles.container } >
            <GradientHeader title = "Add Meal"
            navigation = { this.props.navigation }
            /> </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});