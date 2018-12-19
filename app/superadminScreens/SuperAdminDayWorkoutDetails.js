import React, { Component } from 'react';
import { Avatar, Icon, ListItem } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import CONFIG from '../config/config'
var width = Dimensions.get('window').width;

export default class SuperAdminDayWorkoutDetails extends Component {
  static navigationOptions = {
    title: 'Day Workout Details',
    header:null
  };
  constructor(props) {
    super(props);
    this.state = {
      workoutPlan: JSON.parse(this.props.navigation.state.params.workoutPlan),
      day:this.props.navigation.state.params.day
    }
}
showLoader(){
    if(this.state.showLoader){
        return(
          <View style={styles.ploader}>
              <ActivityIndicator size="large" color="white" />
          </View>
        )
    }
}

componentDidMount(){
    axios.get(CONFIG.base_url + 'exercises')
    .then((response) => {
        exerciseMap = new Object();
        var exercises = response.data._embedded.exercises;
        for(var i=0; i<exercises.length; i++){
            exerciseMap[exercises[i].id] = exercises[i];
        }
        this.setState({exerciseMap:exerciseMap})
    })
    .catch((error) => {
        alert(error)
    })
}
getExerciseName(item){
    return this.state.exerciseMap[item.exId].name
}
deleteExercise(index, id){
    this.setState({showLoader: true})
    axios.delete(CONFIG.base_url + 'workoutExercises/' + id)
    .then((response) => {
        var workoutPlan = this.state.workoutPlan
        workoutPlan.workoutExercises.splice(index, 1);
        this.setState({workoutPlan: workoutPlan})
        alert("Workout plan Updated.")
        const { navigate } = this.props.navigation;
        navigate("SuperAdminWorkoutHome")
        this.setState({showLoader: false})
    })
    .catch((error) => {
        alert("Error modifying exercises.")
        this.setState({showLoader: false})
    })
}

  render() {
    const { navigate } = this.props.navigation;
    if(this.state.workoutPlan && this.state.day && this.state.exerciseMap){
      return (
        <View style={styles.container}>
        {this.showLoader()}
          <LinearGradient colors={['#b24d2e', '#b23525', '#E62221']} style={styles.headDesign}>
             <Avatar
                 size="small"
                 rounded
                 icon={{name: 'arrow-back'}}
                 onPress={() => navigate("SuperAdminViewWorkout")}
                 containerStyle={{margin: 30}}
             />
             <Text style={{
                 fontSize:24,
                 color:'white',
                 marginLeft:30,
                 marginTop:-10
             }}>{this.state.workoutPlan.name + ' (' + this.state.day + ')'} </Text>
         </LinearGradient>
         <Icon raised reverse name='add' color='#E62221'
            containerStyle={{
              position:'absolute', 
              bottom:10,
              zIndex:2,
              right:10,
              shadowColor: '#7f7f7f',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 5
            }}
            onPress={() => navigate('SuperAdminAddDayExercise', {workoutPlan: JSON.stringify(this.state.workoutPlan), day: this.state.day})}
          />
         <ScrollView>
         {
            this.state.workoutPlan.workoutExercises
            .filter(item => item.dayOfWeek==this.state.day)
            .map((item, i) => (
              <ListItem
                key={i}
                title={this.getExerciseName(item)}
                subtitle={item.sets + ' sets'}
                rightTitle = {item.repititions + ' reps'}
                containerStyle={{width:width}}
                leftIcon={
                    <Icon
                    name='delete-sweep'
                    color='#f50'
                    onPress={() => this.deleteExercise(i, item.id)} />
                }
                titleStyle={{fontSize:14, marginLeft:10}}
                subtitleStyle={{fontSize:12, marginLeft:10}}
              />
            ))
          }
          </ScrollView>
        </View>
      );
    }
    return(
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="black" />
      </View>
    )
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  headDesign:{
    width:width,
    height:140
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
  inputContainer1: {
    backgroundColor: '#ededed',
    padding:5,
    paddingTop: 8,
    marginTop: 15,
  },
  inputContainer2: {
    backgroundColor: '#ededed',
    padding:8,
    paddingTop: 8,
    marginTop: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#ededed',
    height:40,
    paddingLeft:5,
    marginTop: 15,
  },
  inputStyle1: {
    paddingLeft: 12,
    fontSize:16,
  },
  inputStyle3: {
    paddingLeft: 12,
    fontSize:12,
    paddingTop: 5,
    height:40
  },
  inputStyle2: {
    marginTop: -6,
  },
  login:{
    width:width-60,
    height:50,
    backgroundColor: '#E62221',
    borderRadius: 50,
    marginBottom: 30,
    alignItems: 'center',
    padding:8,
    paddingTop:15,
    marginTop: 20,
  },
  loginText:{
    color:'white'
  },
  inputForm:{
    margin:20,
    padding:10,
    paddingTop:0,
    width:width-40,
    backgroundColor:'white'
  },
  inputText:{
    width:width-80,
    borderWidth:0,
    borderBottomColor: '#E62221',
    borderBottomWidth: 1,
    marginTop: 5,
    marginBottom: 5,
    height:30
  },
  inputLabel:{
    marginTop: 20,
  },
  loader:{
    marginTop:'100%',
  }, 
  exercises:{
    flexDirection: 'row',
    marginTop: 8,
    height:30
  },
  exerciseItem:{
    marginTop: -7,
    fontSize:10
  },
  exerciseItemContainer:{
    width:130,
    backgroundColor:'white'
  },
  repsContainer:{
    width:30,
    marginLeft: 5,
    backgroundColor:'white'
  },
  setsContainer:{
    width:30,
    marginLeft: 5,
    backgroundColor:'white'
  },
  dayContainer:{
    width:110,
    marginLeft: 5,
    backgroundColor:'white'
  },
  listTitle:{
    width:width-100
  },
  addRowButton:{
    backgroundColor: '#E62221',
    borderRadius:30,
    padding:5,
    width:70,
    alignContent: 'center',
    marginTop: 10,
  },
  addRowText:{
    color:'white',
    alignSelf: 'center',
  },
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
  targetMuscles:{
    padding:10,
    flexWrap:'wrap',
    flexDirection:'row'
  }, 
  deselected:{
    borderWidth:1,
    borderColor:'#E62221',
    padding:4,
    paddingLeft:10,
    paddingRight:10,
    borderRadius:30,
    marginRight:5,
    marginBottom:10
  },
  selected:{
    borderWidth:1,
    borderColor:'#E62221',
    backgroundColor:'#E62221',
    padding:4,
    paddingLeft:10,
    paddingRight:10,
    borderRadius:30,
    marginRight:5,
    marginBottom:10
  },
  selectedText:{
    color:'white'
  },
  deselectedText:{
    color:'grey'
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