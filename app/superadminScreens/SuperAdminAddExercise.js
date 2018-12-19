import React, { Component } from 'react';
import { Avatar } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
var width = Dimensions.get('window').width;
import CONFIG from '../config/config'
export default class SuperAdminAddExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  static navigationOptions = {
    title: 'Add Exercise',
    header:null
  };
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

  addExercise(){
    var exercise = {
      name: this.state.name
    }
    if(!exercise.name){
      alert("Name of the exercise is mandatory.")
    } else{ 
      this.setState({showLoader: true})
      axios.post(CONFIG.base_url + 'exercises/', exercise)
      .then((response) => {
        var partsTargeted = [];
        var muscles = this.state.muscleGroups 
        for(var i=0; i<muscles.length; i++){
            if(muscles[i].included==true){
              partsTargeted.push(muscles[i]);
            }
          }
        var exerciseWithParts = {
          name: this.state.name,
          partsTargeted: partsTargeted
        }
          axios.put(CONFIG.base_url + 'exercises/'+response.data.id, exerciseWithParts)
          .then((response) => {
              alert("Exercise Created.")
              const { navigate } = this.props.navigation;
              navigate('SuperAdminHome')
              this.setState({showLoader: false})
          })
          .catch((error) => {
              console.log(error)
              this.setState({showLoader: false})
          })
      })
      .catch((error) => {
          console.log(error)
          this.setState({showLoader: false})
      })
    }
    
  }
  updateMuscleGroups(i){
    var muscleGroups = this.state.muscleGroups;
    muscleGroups[i].included = !muscleGroups[i].included;
    this.setState({muscleGroups:muscleGroups})
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
              onPress={() => navigate('SuperAdminHome')}
              containerStyle={{margin: 30}}
            />
            <Text style={{
              fontSize:24,
              color:'white',
              marginLeft:30,
              marginTop:-10
            }}>Add Exercise</Text>
          </LinearGradient>
          <ScrollView>
          <View style={styles.inputForm}>
          <Text style={styles.label}>Name</Text>
              <TextInput
                maxLength={30}
                style={styles.inputStyle}
                placeholder="Enter exercise name"
                onChangeText={(name) => this.setState({name:name})}
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
            <TouchableHighlight onPress={() => this.addExercise()} underlayColor="transparent">
                  <View style={styles.login}>
                    <Text style={styles.loginText}>Add Exercise</Text>
                  </View>
              </TouchableHighlight>
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
    backgroundColor: '#F5FCFF',
  },
  headDesign:{
    width:width,
    height:140
  },
  inputContainer1: {
    backgroundColor: '#ededed',
    padding:5,
    marginTop: 15,
    paddingLeft:5,
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
  },
});