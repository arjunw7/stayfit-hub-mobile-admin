import React, {Component} from 'react';
import {
createBottomTabNavigator,
createStackNavigator,
} from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PlanScreen from '../memberScreens/PlanScreen'
import StoreScreen from '../memberScreens/StoreScreen'
import ProfileScreen from "../memberScreens/ProfileScreen";

const PlanStack = createStackNavigator({
    Plan: PlanScreen
});

const StoreStack = createStackNavigator({
    Store: StoreScreen
});

const ProfileStack = createStackNavigator({
    Profile: ProfileScreen
});

export default createBottomTabNavigator( 
{
    Plan: {
        screen:PlanStack,
        navigationOptions: ({ navigation }) => ({
            title: "Plan",
            tabBarIcon: ({ tintColor }) => <FontAwesome5 name={'calendar'} color={tintColor} size={17} solid/>,
            header:null
        })
    },
    Store: {
        screen:StoreStack,
        navigationOptions: ({ navigation }) => ({
            title: "Store",
            tabBarIcon: ({ tintColor }) => <FontAwesome5 name={'shopping-cart'}  color={tintColor}   size={17} solid/>,
            header:null
        })
    },
    Profile: {
        screen:ProfileStack,
        navigationOptions: ({ navigation }) => ({
            title: "Profile",
            tabBarIcon: ({ tintColor }) => <FontAwesome5 name={'user'}  color={tintColor} size={17} solid/>,
            header:null
        })
    }
},
{
    tabBarOptions : {
      style: {
        backgroundColor: '#f4f4f4',
        color:'white',
        paddingBottom:2,
        height: 55,
        borderWidth:0
      },
      activeTintColor:'#E62221',
      inactiveTintColor:'#a3a3a3',
      allowFontScaling:true,
      labelStyle: { fontSize: 11, fontWeight:"500" },
    }
  }
);