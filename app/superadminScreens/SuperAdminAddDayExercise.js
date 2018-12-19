import React, { Component } from 'react';
import { Avatar, Icon, ListItem } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import ActionSheet from 'react-native-actionsheet'
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import CONFIG from '../config/config'
var width = Dimensions.get('window').width;
export default class SuperAdminAddDayExercise extends Component {
  static navigationOptions = {
    title: 'Add Day Exercise',
    header:null
  };
  constructor(props) {
    super(props);
    this.state = {
        workoutPlan: JSON.parse(this.props.navigation.state.params.workoutPlan),
        day:this.props.navigation.state.params.day
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
        this.setState({exerciseMap:exerciseMap, exercisesList:response.data._embedded.exercises})
        this.setOptionsExercise(response.data._embedded.exercises)
    })
    .catch((error) => {
        alert(error)
    })
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

optionsExerciseList = []
optionsExerciseListID = []

showActionSheetExercise = () => {
  this.ActionSheetExercise.show()
}
setOptionsExercise(exList){
    for(var i=0; i<exList.length; i++){
        this.optionsExerciseList.push(exList[i].name)
        this.optionsExerciseListID.push(exList[i].id)
    }
    this.optionsExerciseList.push("Cancel")
    this.setState({
        optionsExerciseList:this.optionsExerciseList,
        optionsExerciseListID: this.optionsExerciseListID
    })
}

updateSelectedExercise(index){
    this.setState({selectedExercise: this.state.exerciseMap[index]})
}


updateWorkout(){
    var wex = {}
    this.setState({showLoader: true})
    axios.post(CONFIG.base_url + 'workoutExercises', wex)
    .then((response) => {
        var workoutExercise = response.data;
        workoutExercise.dayOfWeek = this.state.day
        workoutExercise.exId = this.state.selectedExercise.id
        workoutExercise.repititions = this.state.reps
        workoutExercise.sets = this.state.sets
        var workoutPlan = this.state.workoutPlan
        var exercises = workoutPlan.workoutExercises
        exercises.push(workoutExercise)
        workoutPlan.workoutExercises = exercises;

        axios.put(CONFIG.base_url + 'workoutPlans/'+this.state.workoutPlan.id, workoutPlan)
        .then((response) => {
            alert("Workout plan Updated.")
            const { navigate } = this.props.navigation;
            this.setState({showLoader: false})
            navigate("SuperAdminWorkoutHome")
        })
        .catch((error) => {
            console.log(error)
            this.setState({showLoader: false})
        })    
    })
    .catch((error) => {
        alert(error)
        this.setState({showLoader: false})
    })
   
}
  render() {
    const { navigate } = this.props.navigation;
    if(this.state.exercisesList){
      return (
        <View style={styles.container}>
        {this.showLoader()}
          <LinearGradient colors={['#b24d2e', '#b23525', '#E62221']} style={styles.headDesign}>
             <Avatar
                 size="small"
                 rounded
                 icon={{name: 'arrow-back'}}
                 onPress={() => navigate("SuperAdminHome")}
                 containerStyle={{margin: 30}}
             />
             <Text style={{
                 fontSize:24,
                 color:'white',
                 marginLeft:30,
                 marginTop:-10
             }}>{this.state.workoutPlan.name + ' (' + this.state.day + ')'}</Text>
         </LinearGradient>
         <ScrollView>
         <View style={styles.inputForm}>
              <Text style={styles.label}>Exercise</Text>
                <TouchableHighlight onPress={this.showActionSheetExercise} underlayColor="transparent">
                <View style={styles.row}>
                <Text style={styles.centerText}>{this.state.selectedExercise?this.state.selectedExercise.name:'Select Exercise'}</Text> 
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
                ref={o => this.ActionSheetExercise = o}
                title={'Exercise?'}
                options={this.optionsExerciseList}
                cancelButtonIndex={this.optionsExerciseList.length-1}
                destructiveButtonIndex={this.optionsExerciseList.length-1}
                onPress={(index) => { 
                        if(index!=this.optionsExerciseList.length-1){
                            this.updateSelectedExercise(this.optionsExerciseListID[index])
                        }
                }}
                />
                <Text style={styles.label}>Number of sets</Text>
                <TextInput
                    maxLength={1}
                    style={styles.inputStyle}
                    placeholder="sets"
                    onChangeText={(sets) => this.setState({sets: sets})}
                />
              <Text style={styles.label}>Number of reps</Text>
              <TextInput
                maxLength={2}
                style={styles.inputStyle}
                placeholder="reps"
                onChangeText={(reps) => this.setState({reps: reps})}
              />
              <TouchableHighlight onPress={() => this.updateWorkout()} underlayColor="transparent">
                  <View style={styles.login}>
                    <Text style={styles.loginText}>Add exercise</Text>
                  </View>
              </TouchableHighlight>
          </View>
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