import React, { Component } from 'react';
import { Avatar, FormLabel, FormInput, Icon, SocialIcon } from 'react-native-elements';
import GradientHeader from '../components/GradientHeader'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    AsyncStorage,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import CONFIG from '../config/config'
import LinearGradient from 'react-native-linear-gradient';
var width = Dimensions.get('window').width;
export default class SuperAdminHome extends Component {
  constructor(props) {
    super(props);
    this.state ={
    }
}
async userLogout() {
  const { navigate } = this.props.navigation;
    try {
      await AsyncStorage.removeItem('member');
      Alert.alert('Logout Success!');
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
    navigate("Home")
  }
componentWillMount(){
  AsyncStorage.getItem('member').then((member) => {
    this.setState({user:JSON.parse(member)})
  })
}
static navigationOptions = {
    title: 'Dashboard',
    header: null
}
  render() {
    const { navigate } = this.props.navigation;
    if(this.state.user){
      return (
        <View style={styles.container}>
            <LinearGradient colors={['#b24d2e', '#b23525', '#E62221']} style={styles.headDesign}>
                  <Avatar
                  rounded
                  icon={{name: 'ios-power', type: 'ionicon'}}
                  onPress={() => this.userLogout()}
                  containerStyle={{margin: 30}}
                />
                <Avatar
                    rounded
                    title="AW"
                    overlayContainerStyle={{backgroundColor: 'transparent'}}
                    titleStyle={{color:'grey', fontSize:36}}
                    containerStyle={{marginTop:-60, width:70, height:70, alignSelf:'center', borderRadius:35, backgroundColor:'white'}}
                  />
                  <Text style={{
                    color:'white',
                    alignSelf:'center',
                    fontSize:15,
                    marginTop:10,
                    fontWeight:'500'
                  }}>
                    {this.state.user.name}
                  </Text>
                  <Text style={{
                    color:'white',
                    alignSelf:'center',
                    fontSize:12
                  }}>
                    {this.state.user.email}
                  </Text>
              </LinearGradient>
              <ScrollView>
              <View style={styles.mainIcons}>
                <TouchableOpacity style={styles.mainIcon} onPress={() => navigate('SuperAdminMemberHome')}> 
                  <Icon
                    name='user'
                    type='font-awesome'
                    color='#E62221'/>
                    <Text style={styles.iconText}>Members</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainIcon} onPress={() => navigate('SuperAdminGymHome')}> 
                  <Icon
                    name='building'
                    type='font-awesome'
                    color='#E62221'/>
                    <Text style={styles.iconText}>Gyms</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainIcon} onPress={() => navigate('SuperAdminEmployeeHome', {employeeType: 'trainer'})}> 
                  <Icon
                    name='user-secret'
                    type='font-awesome'
                    color='#E62221'/>
                    <Text style={styles.iconText}>Trainers</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainIcon} onPress={() => navigate('SuperAdminEmployeeHome', {employeeType: 'headTrainer'})}> 
                  <Icon
                    name='verified'
                    type='material-community'
                    color='#E62221'/>
                    <Text style={styles.iconText}>Head Trainers</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainIcon} onPress={() => navigate('SuperAdminEmployeeHome', {employeeType: 'frontdesk'})}> 
                  <Icon
                    name='support'
                    type='font-awesome'
                    color='#E62221'/>
                    <Text style={styles.iconText}>Frontdesk</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainIcon} onPress={() => navigate('SuperAdminExerciseHome')}> 
                  <Icon
                    name='dumbbell'
                    type='material-community'
                    color='#E62221'/>
                    <Text style={styles.iconText}>Exercises</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainIcon} onPress={() => navigate('SuperAdminWorkoutHome')}> 
                  <Icon
                    name='paper-plane'
                    type='entypo'
                    color='#E62221'/>
                    <Text style={styles.iconText}>Workouts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainIcon} onPress={() => navigate('SuperAdminWorkoutAssignment')}> 
                  <Icon
                    name='assignment'
                    type='material-icons'
                    color='#E62221'/>
                    <Text style={styles.iconText}>Workout Assignment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainIcon1} onPress={() => navigate('SuperAdminMealHome')}> 
                  <Icon
                    name='food-variant'
                    type='material-community'
                    color='#E62221'/>
                    <Text style={styles.iconText}>Meals</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainIcon1} onPress={() => navigate('SuperAdminHome')}> 
                  <Icon
                    name='food-apple'
                    type='material-community'
                    color='#E62221'/>
                    <Text style={styles.iconText}>Diets</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainIcon1}> 
                  <Icon
                    name='rupee'
                    type='font-awesome'
                    color='#E62221'/>
                    <Text style={styles.iconText}>Payments</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainIcon1}> 
                  <Icon
                    name='md-stats'
                    type='ionicon'
                    color='#E62221'/>
                    <Text style={styles.iconText}>Stats</Text>
                </TouchableOpacity>
              </View>
              </ScrollView>
        </View>
      );
    }
    else{
      return(
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )
    }
    
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  headDesign:{
    width:width,
    height:160
  },
  mainIcons:{
    width:width-15,
    margin:10,
    flex:1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  mainIcon:{
    width:width/3-25,
    margin:10,
    paddingTop:20,
    paddingBottom:20,
    borderRadius:7,
    shadowOffset:{  width: 0,  height: 0,  },
    shadowColor: 'grey',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    backgroundColor:'white'
  },
  mainIcon1:{
    width:width/3-25,
    margin:10,
    paddingTop:20,
    paddingBottom:20,
    borderRadius:7,
    backgroundColor:'#e8e8e8'
  },
  
  iconText:{
    fontSize:12,
    color:'#E62221',
    alignSelf:'center',
    alignItems:'center',
    marginTop:10,
    textAlign:'center'
  },
  loader:{
    marginTop:'100%',
  }, 
});