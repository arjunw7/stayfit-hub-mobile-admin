import React, { Component } from 'react';
import { Avatar, Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import ActionSheet from 'react-native-actionsheet'
import { Picker } from 'react-native-picker-dropdown'
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
const optionsGender = [
  "Men",
  "Women",
  "Men & Women",
  "Cancel"
]
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]
export default class SuperAdminAddWorkout extends Component {
  static navigationOptions = {
    title: 'Workout Details',
    header:null
  };
  constructor(props) {
    super(props);
    this.state = {
      workoutExercises:[],
      selectedItems:[],
      suitableFor:'Men'
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
  axios.get(CONFIG.base_url + 'muscleGroups/')
  .then((response) => {
    var muscleGroups = response.data._embedded.muscleGroups;
    for(var i=0; i<muscleGroups.length; i++){
      muscleGroups[i].included = false;
    }
    this.setState({muscleGroups:muscleGroups})
  })
  .catch((error) => {
      alert(error)
  })
}

updateMuscleGroups(i){
  var muscleGroups = this.state.muscleGroups;
  muscleGroups[i].included = !muscleGroups[i].included;
  this.setState({muscleGroups:muscleGroups})
}

showGenderActionSheet = () => {
  this.GenderActionSheet.show()
}

addWorkout(){
  this.setState({showLoader: true})
    var workoutPlan = {
      name:this.state.name,
      description: this.state.description,
      suitableFor: this.state.suitableFor,
      muscleGroups: this.state.muscleGroups,
      workoutExercises: []
    }
    if(!workoutPlan.name || !workoutPlan.description || !workoutPlan.suitableFor){
      alert("All fields are mandatory")
    }
    else{
      axios.post(CONFIG.base_url + 'workoutPlans/', workoutPlan)
    .then((response) => {
        alert("Workout plan created.")
        this.setState({showLoader: false})
    })
    .catch((error) => {
        console.log(error)
        alert("Error creating workout plan.")
        this.setState({showLoader: false})
    })
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    if(this.state.muscleGroups){
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
             }}>Add Workout Plan</Text>
         </LinearGradient>
         <ScrollView>
         <View style={styles.inputForm}>
              <Text style={styles.label}>Plan Name</Text>
              <TextInput
                maxLength={30}
                style={styles.inputStyle}
                placeholder="Enter workout name"
                onChangeText={(name) => this.setState({name:name})}
              />
              <Text style={styles.label}>Description</Text>
              <TextInput
                maxLength={200}
                style={styles.inputStyle}
                placeholder="Enter description"
                onChangeText={(description) => this.setState({description:description})}
              />
               <Text style={styles.label}>Gender</Text>
                <TouchableHighlight onPress={this.showGenderActionSheet} underlayColor="transparent">
                <View style={styles.row}>
                  <Text style={styles.centerText}>{this.state.suitableFor=='both'?'Men & Women':this.state.suitableFor}</Text> 
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
                  ref={o => this.GenderActionSheet = o}
                  title={'gender?'}
                  options={optionsGender}
                  cancelButtonIndex={3}
                  destructiveButtonIndex={3}
                  onPress={(index) => { 
                          if(index!=2){
                            this.setState({suitableFor: optionsGender[index]})
                          }
                  }}
                  />
              <Text style={styles.label}>Targeted Muscle Groups</Text>
              <View style={styles.targetMuscles}>
              {
                this.state.muscleGroups
                .map((item, i) => (
                  <TouchableHighlight key={i} onPress={() => this.updateMuscleGroups(i)} style={item.included==true?styles.selected:styles.deselected} underlayColor="transparent">
                      <Text style={item.included==true?styles.selectedText:styles.deselectedText}>{item.name}</Text>
                  </TouchableHighlight>
                ))
              }
              </View>
              <TouchableHighlight onPress={() => this.addWorkout()} underlayColor="transparent">
                  <View style={styles.login}>
                    <Text style={styles.loginText}>Add Workout Plan</Text>
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

  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#ededed',
    height:40,
    paddingLeft:5,
    marginTop: 15,
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
  exerciseItem:{
    marginTop: 5,
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