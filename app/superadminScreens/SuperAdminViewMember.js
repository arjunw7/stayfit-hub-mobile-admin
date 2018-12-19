import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import ActionSheet from 'react-native-actionsheet'
import Moment from 'moment';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import CONFIG from '../config/config'
var width = Dimensions.get('window').width;
const optionsGender = [
  "Male",
  "Female",
  "Cancel"
]
export default class SuperAdminViewMember extends Component {
  static navigationOptions = {
    title: 'Member Details',
    header:null
  };
  constructor(props) {
    super(props);
    this.state = {
      member: JSON.parse(this.props.navigation.state.params.member)
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
optionsFitnessCenterList = []
optionsFitnessCenterListID = []
optionsTrainerList = []
optionsTrainerListID = []
componentDidMount(){
  this.getTrainer();
  this.getFitnessCenter();
  axios.get(CONFIG.base_url + 'fitnessCenters')
  .then((response) => {
      this.setState({fitnessCentersList:response.data._embedded.fitnessCenters})
      this.setOptions(response.data._embedded.fitnessCenters)
  })
  .catch((error) => {
      alert(error)
  })
  axios.get(CONFIG.base_url + 'trainers')
      .then((response) => {
          this.setState({trainersList:response.data._embedded.trainers})
          this.setOptionsTrainer(response.data._embedded.trainers)
      })
      .catch((error) => {
          alert(error)
      })
  axios.get(CONFIG.base_url + 'members/' + this.state.member.id)
    .then((response) => {
        this.setState({member:response.data})
    })
    .catch((error) => {
        alert(error)
    })
}
setOptions(fcList){
  for(var i=0; i<fcList.length; i++){
      this.optionsFitnessCenterList.push(fcList[i].name)
      this.optionsFitnessCenterListID.push(fcList[i].id)
  }
  this.optionsFitnessCenterList.push("Cancel")
  this.setState({
      optionsFitnessCenterList:this.optionsFitnessCenterList,
      optionsFitnessCenterListID: this.optionsFitnessCenterListID
  })
}
setOptionsTrainer(trainerList){
  for(var i=0; i<trainerList.length; i++){
      this.optionsTrainerList.push(trainerList[i].name)
      this.optionsTrainerListID.push(trainerList[i].id)
  }
  this.optionsTrainerList.push("Cancel")
  this.setState({
    optionsTrainerList:this.optionsTrainerList,
    optionsTrainerListID: this.optionsTrainerListID
  })
}

getTrainer(){
  this.setState({showLoader: true})
  var trainersUrl = this.state.member._links.trainer.href
  axios.get(trainersUrl)
  .then((response) => {
      this.setState({trainer:response.data, showLoader:false})
  })
  .catch((error) => {
      console.log(error)
      this.setState({showLoader: false})
  })
}
getFitnessCenter(){
  var fitnessCentersUrl = this.state.member._links.fitnessCenter.href
  axios.get(fitnessCentersUrl)
  .then((response) => {
      this.setState({fitnessCenter:response.data, showLoader:false})
  })
  .catch((error) => {
      console.log(error)
      this.setState({showLoader: false})
  })
}
updateTrainer(itemIndex){
  this.setState({showLoader: true})
  axios.get(CONFIG.base_url + 'trainers/'+itemIndex)
  .then((response) => {
      var updatedTrainer = response.data._links.self.href
      var trainerURL = this.state.member._links.trainer.href
      axios({ 
        method: 'PUT', 
        url: trainerURL,
        headers: {
          "Content-Type": "text/uri-list"},
        data: updatedTrainer
       })
      .then((response) => {
         this.getTrainer()
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

updateFitnessCenter(itemIndex){
  this.setState({showLoader: true})
  axios.get(CONFIG.base_url + 'fitnessCenters/'+itemIndex)
  .then((response) => {
      var updatedCenter = response.data._links.self.href
      var centerURL = this.state.member._links.fitnessCenter.href
      axios({ 
        method: 'PUT', 
        url: centerURL,
        headers: {
          "Content-Type": "text/uri-list"},
        data: updatedCenter
       })
      .then((response) => {
         console.log(response)
         this.getFitnessCenter()
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
renderTrainer(){
  return(
    <View>
    <Text style={styles.label}>Trainer</Text>
    <TouchableHighlight onPress={this.showActionSheetTrainer} underlayColor="transparent">
        <View style={styles.row}>
            <Text style={styles.centerText} >{this.state.trainer? this.state.trainer.name: "Select trainer"}</Text> 
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
            ref={o => this.ActionSheetTrainer = o}
            title={'Trainer?'}
            options={this.optionsTrainerList}
            cancelButtonIndex={this.optionsTrainerList.length-1}
            destructiveButtonIndex={this.optionsTrainerList.length-1}
            onPress={(index) => { 
                    if(index!=this.optionsTrainerList.length-1){
                      this.updateTrainer(this.optionsTrainerListID[index])
                    }
            }}
        />
      </View>
  )
}
renderFitnessCenter(){
  return(
    <View>
    <Text style={styles.label}>Fitness Center</Text>
    <TouchableHighlight onPress={this.showActionSheetFitnessCenters} underlayColor="transparent">
        <View style={styles.row}>
            <Text style={styles.centerText} >{this.state.fitnessCenter? this.state.fitnessCenter.name: "Select fitness center"}</Text> 
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
            ref={o => this.ActionSheetFitnessCenter = o}
            title={'Fitness Center?'}
            options={this.optionsFitnessCenterList}
            cancelButtonIndex={this.optionsFitnessCenterList.length-1}
            destructiveButtonIndex={this.optionsFitnessCenterList.length-1}
            onPress={(index) => { 
                    if(index!=this.optionsFitnessCenterList.length-1){
                      this.updateFitnessCenter(this.optionsFitnessCenterListID[index])
                    }
            }}
        />
      </View>
  )
}
  
updateName(itemValue){
  var tempMember = this.state.member;
  tempMember.name = itemValue
  this.setState({member:tempMember})
}
updatePhone(itemValue){
  var tempMember = this.state.member;
  tempMember.phone = itemValue
  this.setState({member:tempMember})
}
updateEmail(itemValue){
  var tempMember = this.state.member;
  tempMember.email = itemValue
  this.setState({member:tempMember})
}
updateGender(itemValue){
  var tempMember = this.state.member;
  tempMember.gender = itemValue
  this.setState({member:tempMember})
}
updateDob(itemValue){
  var tempMember = this.state.member;
  tempMember.dob = itemValue;
  this.setState({member:tempMember})
}
updateMember(){
  console.log(this.state.member)
  var member = this.state.member;
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(!member.name || !member.email){
    alert("Name and email are mandatory.")
  }
  else if(reg.test(member.email) === false){
    alert("Please enter a valid email address")
  } 
  else if(member.phone && member.phone.length<10){
    alert("Please enter a valid Mobile Number")
  }
  else{
    this.setState({showLoader: true})
    axios.put(CONFIG.base_url + 'members/' + member.id, member)
    .then((response) => {
        axios.get(CONFIG.base_url + 'members/' +member.id)
        .then((response) => {
            this.setState({member:response.data, showLoader:false})
            alert("Member details updated.")
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
  showGenderActionSheet = () => {
    this.GenderActionSheet.show()
  }
  onDobPress = () => {
    let dobDate = new Date();
    this.refs.dobDialog.open({
    date: new Date(this.state.member.dob),
    maxDate: new Date()
    });
  }

  onDobPicked = (date) => {
    var tempMember = this.state.member;
    tempMember.dob = date;
    this.setState({member:tempMember})
  }

  showActionSheetFitnessCenters = () => {
    this.ActionSheetFitnessCenter.show()
  }
  showActionSheetTrainer = () => {
    this.ActionSheetTrainer.show()
  }
  render() {
    const { navigate } = this.props.navigation;
    if(this.state.member && this.state.trainersList && this.state.fitnessCentersList){
      return(
        <KeyboardAvoidingView style={styles.container}>
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
           }}>Member Details</Text>
       </LinearGradient>
        <ScrollView>
         <View style={styles.inputForm}>
          <Text style={styles.label}>Name</Text>
          <TextInput
              maxLength={30}
              style={styles.inputStyle}
              placeholder="Enter name"
              value={this.state.member.name}
              onChangeText={(name) => this.updateName(name)}
            />
            <Text style={styles.label}>Email</Text>
          <TextInput
              maxLength={30}
              style={styles.inputStyle}
              placeholder="Enter email"
              value={this.state.member.email}
              onChangeText={(email) => this.updateEmail(email)}
            />
           <Text style={styles.label}>Gender</Text>
            <TouchableHighlight onPress={this.showGenderActionSheet} underlayColor="transparent">
            <View style={styles.row}>
              <Text style={styles.centerText}>{this.state.member.gender}</Text> 
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
              title={'Your gender?'}
              options={optionsGender}
              cancelButtonIndex={2}
              destructiveButtonIndex={2}
              onPress={(index) => { 
                      if(index!=2){
                        var tempMember = this.state.member;
                        tempMember.gender = optionsGender[index]
                        this.setState({member:tempMember})
                      }
              }}
              />
          <Text style={styles.label}>Mobile</Text>
          <TextInput
              maxLength={10}
              style={styles.inputStyle}
              keyboardType="phone-pad"
              placeholder="Enter mobile"
              value={this.state.member.phone}
              onChangeText={(phone) => this.updatePhone(phone)}
          />
          <Text style={styles.label}>Date of birth</Text>
          <TouchableHighlight onPress={this.onDobPress.bind(this)} underlayColor="transparent">
            <View style={styles.row}>
                <Text style={styles.centerText}>{this.state.member.dob?Moment(this.state.member.dob).format('DD MMM, YYYY'): "Select date of birth"}</Text> 
                <Icon
                name='chevron-small-down'
                color='#E62221'
                type='entypo'
                containerStyle={{
                    position:'absolute',
                    right:5
                }} />
                <DatePickerDialog ref="dobDialog" onDatePicked={this.onDobPicked.bind(this)} />
            </View>
          </TouchableHighlight>
          {this.renderFitnessCenter()}
          {this.renderTrainer()}
            <TouchableHighlight onPress={() => this.updateMember()} underlayColor="transparent">
                <View style={styles.login}>
                  <Text style={styles.loginText}>Update Member Details</Text>
                </View>
            </TouchableHighlight>
         </View>
         </ScrollView>
       
      </KeyboardAvoidingView>
      )
    }
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
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
  inputStyle1: {
    flex: 1,
    paddingLeft: 12,
    fontSize:16,
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
  headDesign:{
    width:width,
    height:140
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