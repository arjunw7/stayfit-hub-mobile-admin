import React, { Component } from 'react'
import HomeScreen from './memberScreens/HomeScreen'
import LoginScreen from './memberScreens/LoginScreen'
import SuperAdminAddDiet from './superadminScreens/SuperAdminAddDiet'
import SuperAdminAddEmployee from './superadminScreens/SuperAdminAddEmployee'
import SuperAdminAddExercise from './superadminScreens/SuperAdminAddExercise'
import SuperAdminAddGym from './superadminScreens/SuperAdminAddGym'
import SuperAdminAddMeal from './superadminScreens/SuperAdminAddMeal'
import SuperAdminAddMember from './superadminScreens/SuperAdminAddMember'
import SuperAdminAddWorkout from './superadminScreens/SuperAdminAddWorkout'
import SuperAdminHome from './superadminScreens/SuperAdminHome'
import SuperAdminViewDiet from './superadminScreens/SuperAdminViewDiet'
import SuperAdminViewEmployee from './superadminScreens/SuperAdminViewEmployee'
import SuperAdminViewExercise from './superadminScreens/SuperAdminViewExercise'
import SuperAdminViewGym from './superadminScreens/SuperAdminViewGym'
import SuperAdminViewMeal from './superadminScreens/SuperAdminViewMeal'
import SuperAdminViewMember from './superadminScreens/SuperAdminViewMember'
import SuperAdminViewWorkout from './superadminScreens/SuperAdminViewWorkout'
import SuperAdminGymHome from './superadminScreens/SuperAdminGymHome'
import SuperAdminMemberHome from './superadminScreens/SuperAdminMemberHome'
import SuperAdminEmployeeHome from './superadminScreens/SuperAdminEmployeeHome'
import SuperAdminExerciseHome from './superadminScreens/SuperAdminExerciseHome'
import SuperAdminWorkoutHome from './superadminScreens/SuperAdminWorkoutHome'
import SuperAdminMealHome from './superadminScreens/SuperAdminMealHome'
import SuperAdminDietHome from './superadminScreens/SuperAdminDietHome'
import SuperAdminWorkoutAssignment from './superadminScreens/SuperAdminWorkoutAssignment'
import SuperAdminDayWorkoutDetails from './superadminScreens/SuperAdminDayWorkoutDetails'
import SuperAdminAddDayExercise from './superadminScreens/SuperAdminAddDayExercise'
import {
    StackNavigator,
} from 'react-navigation';
import SplashScreen from 'react-native-splash-screen'
const Router = StackNavigator({
    Home: { screen: HomeScreen },
    Login: { screen: LoginScreen },
    SuperAdminAddDiet: { screen: SuperAdminAddDiet },
    SuperAdminAddEmployee: { screen: SuperAdminAddEmployee },
    SuperAdminAddExercise: { screen: SuperAdminAddExercise },
    SuperAdminAddGym: { screen: SuperAdminAddGym },
    SuperAdminAddMeal: { screen: SuperAdminAddMeal },
    SuperAdminAddMember: { screen: SuperAdminAddMember },
    SuperAdminAddWorkout: { screen: SuperAdminAddWorkout },
    SuperAdminHome: { screen: SuperAdminHome },
    SuperAdminViewDiet: { screen: SuperAdminViewDiet },
    SuperAdminViewEmployee: { screen: SuperAdminViewEmployee },
    SuperAdminViewExercise: { screen: SuperAdminViewExercise },
    SuperAdminViewGym: { screen: SuperAdminViewGym },
    SuperAdminViewMeal: { screen: SuperAdminViewMeal },
    SuperAdminViewMember: { screen: SuperAdminViewMember },
    SuperAdminViewWorkout: { screen: SuperAdminViewWorkout },
    SuperAdminGymHome: { screen: SuperAdminGymHome },
    SuperAdminMemberHome: { screen: SuperAdminMemberHome },
    SuperAdminEmployeeHome: { screen: SuperAdminEmployeeHome },
    SuperAdminExerciseHome: { screen: SuperAdminExerciseHome },
    SuperAdminWorkoutHome: { screen: SuperAdminWorkoutHome },
    SuperAdminMealHome: { screen: SuperAdminMealHome },
    SuperAdminDietHome: { screen: SuperAdminDietHome },
    SuperAdminWorkoutAssignment: { screen: SuperAdminWorkoutAssignment },
    SuperAdminDayWorkoutDetails: {screen: SuperAdminDayWorkoutDetails},
    SuperAdminAddDayExercise: {screen: SuperAdminAddDayExercise}
});

export default class App extends Component {
    componentDidMount() {
        SplashScreen.hide();
    }
    render() {
        return <Router/> ;
    }
}