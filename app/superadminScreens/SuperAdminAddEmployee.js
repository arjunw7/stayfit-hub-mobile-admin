import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-datepicker';
import { Picker } from 'react-native-picker-dropdown'
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
  ScrollView
} from 'react-native';
var width = Dimensions.get('window').width;
import CONFIG from '../config/config'
const optionsGender = [
  "Male",
  "Female",
  "Cancel"
]
export default class SuperAdminAddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: this.props.navigation.state.params.employee,
      empType: this.props.navigation.state.params.empType,
      gender: 'Male'
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
  showActionSheetFitnessCenters = () => {
    this.ActionSheetFitnessCenter.show()
  }
  showActionSheetHeadTrainer = () => {
    this.ActionSheetTrainer.show()
  }
  static navigationOptions = {
    title: 'Member Details',
    header:null
  };
  optionsFitnessCenterList = []
  optionsFitnessCenterListID = []
  optionsHeadTrainerList = []
  optionsHeadTrainerListID = []
  componentDidMount(){
    axios.get(CONFIG.base_url + 'fitnessCenters')
    .then((response) => {
        this.setState({fitnessCentersList:response.data._embedded.fitnessCenters})
        this.setOptions(response.data._embedded.fitnessCenters)
    })
    .catch((error) => {
        alert(error)
    })
    axios.get(CONFIG.base_url + 'headTrainers')
        .then((response) => {
            this.setState({headTrainersList:response.data._embedded.headTrainers})
            this.setOptionsHeadTrainers(response.data._embedded.headTrainers)
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

  setOptionsHeadTrainers(headTrainerList){
    for(var i=0; i<headTrainerList.length; i++){
        this.optionsHeadTrainerList.push(headTrainerList[i].name)
        this.optionsHeadTrainerListID.push(headTrainerList[i].id)
    }
    this.optionsHeadTrainerList.push("Cancel")
    this.setState({
      optionsHeadTrainerList:this.optionsHeadTrainerList,
      optionsHeadTrainerListID: this.optionsHeadTrainerListID
    })
  }

renderHeader(empType){
  const {navigate} = this.props.navigation;
  return(
          <LinearGradient colors={['#b24d2e', '#b23525', '#E62221']} style={styles.headDesign}>
              <Avatar
                  size="small"
                  rounded
                  icon={{name: 'arrow-back'}}
                  onPress={() => navigate('SuperAdminEmployeeHome')}
                  containerStyle={{margin: 30}}
              />
              <Text style={{
                  fontSize:24,
                  color:'white',
                  marginLeft:30,
                  marginTop:-10
              }}>Add {empType}</Text>
          </LinearGradient>
      )
}
addTrainer(){
  const { navigate } = this.props.navigation;
  var trainer = {
    name:this.state.name,
    email:this.state.email,
    gender:this.state.gender,
    phone:this.state.phone,
    dob:this.state.dob,
    password: "master",
    designation:"trainer"
  }
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(!trainer.name || !trainer.email || !trainer.gender || !trainer.phone || !trainer.dob || !this.state.fitnessCenter || !this.state.headTrainer){
    alert("All fields are mandatory.")
  }
  else if(reg.test(trainer.email) === false){
    alert("Please enter a valid email address")
  } 
  else if(trainer.phone && trainer.phone.length<10){
    alert("Please enter a valid Mobile Number")
  }
  else{
    this.setState({showLoader: true})
    axios.post(CONFIG.base_url+'trainers', trainer)
    .then((response) => {
        axios({ 
          method: 'PUT', 
          url: response.data._links.fitnessCenter.href,
          headers: {
            "Content-Type": "text/uri-list"},
          data: CONFIG.base_url + 'fitnessCenters/'+this.state.fitnessCenter.id
        })
        .then((response1) => {
          axios({ 
            method: 'PUT', 
            url: response.data._links.headTrainer.href,
            headers: {
              "Content-Type": "text/uri-list"},
            data: CONFIG.base_url + 'headTrainers/'+this.state.headTrainer.id
          })
          .then((response) => {
            alert("Trainer created successfully.")
            this.setState({showLoader: false})
          })
          .catch((error) => {
              console.log(error)
              alert(JSON.stringify(error))
              this.setState({showLoader: false})
          })
        })
        .catch((error) => {
            console.log(error)
            alert(JSON.stringify(error))
            this.setState({showLoader: false})
        })
    })
    .catch((error) => {
        alert(error)
        this.setState({showLoader: false})
    })
  }
}
addHeadTrainer(){
  var headTrainer = {
    name:this.state.name,
    email:this.state.email,
    gender:this.state.gender,
    phone:this.state.phone,
    dob:this.state.dob,
    password: "master",
    designation:"headTrainer"
  }
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(!headTrainer.name || !headTrainer.email || !headTrainer.gender || !headTrainer.phone || !headTrainer.dob || !this.state.fitnessCenter){
    alert("All fields are mandatory.")
  }
  else if(reg.test(headTrainer.email) === false){
    alert("Please enter a valid email address")
  } 
  else if(headTrainer.phone && headTrainer.phone.length<10){
    alert("Please enter a valid Mobile Number")
  }
  else{
    this.setState({showLoader: true})
    axios.post(CONFIG.base_url+'headTrainers', headTrainer)
      .then((response) => {
          axios({ 
            method: 'PUT', 
            url: response.data._links.fitnessCenter.href,
            headers: {
              "Content-Type": "text/uri-list"},
            data: CONFIG.base_url + 'fitnessCenters/'+this.state.fitnessCenter.id
          })
          .then((response) => {
            alert("Head Trainer Created Successfully.")
            this.setState({showLoader: false})
          })
          .catch((error) => {
              console.log(error)
              alert(JSON.stringify(error))
              this.setState({showLoader: false})
          })
      })
      .catch((error) => {
          alert(error)
          this.setState({showLoader: false})
      })
  }  
}
addFrontdeskAdmin(){
  var frontdeskAdmin = {
    name:this.state.name,
    email:this.state.email,
    gender:this.state.gender,
    phone:this.state.phone,
    dob:this.state.dob,
    password: "master",
    designation:"frontdeskAdmin"
  }
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(!frontdeskAdmin.name || !frontdeskAdmin.email || !frontdeskAdmin.gender || !frontdeskAdmin.phone || !frontdeskAdmin.dob || !this.state.fitnessCenter){
    alert("All fields are mandatory.")
  }
  else if(reg.test(frontdeskAdmin.email) === false){
    alert("Please enter a valid email address")
  } 
  else if(frontdeskAdmin.phone && frontdeskAdmin.phone.length<10){
    alert("Please enter a valid Mobile Number")
  }
  else{
    this.setState({showLoader: true})
    axios.post(CONFIG.base_url+'frontdeskAdmins', frontdeskAdmin)
      .then((response) => {
          axios({ 
            method: 'PUT', 
            url: response.data._links.fitnessCenter.href,
            headers: {
              "Content-Type": "text/uri-list"},
            data: CONFIG.base_url + 'fitnessCenters/'+this.state.fitnessCenter.id
          })
          .then((response) => {
            alert("Frontdesk Admin Created Successfully.")
            this.setState({showLoader: false})
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
}
showGenderActionSheet = () => {
  this.GenderActionSheet.show()
}
onDobPress = () => {
  this.refs.dobDialog.open({
  date: new Date(),
  maxDate: new Date()
  });
}
updateFitnessCenter(itemIndex){
  this.setState({showLoader: true})
  axios.get(CONFIG.base_url + 'fitnessCenters/'+itemIndex)
  .then((response) => {
    this.setState({showLoader: false})
     this.setState({fitnessCenter: response.data})
  })
  .catch((error) => {
    this.setState({showLoader: false})
      console.log(error)
  })
}
updateHeadTrainer(itemIndex){
  this.setState({showLoader: true})
  axios.get(CONFIG.base_url + 'headTrainers/'+itemIndex)
  .then((response) => {
     this.setState({headTrainer:response.data})
     this.setState({showLoader: false})
  })
  .catch((error) => {
      console.log(error)
      alert(JSON.stringify(error))
      this.setState({showLoader: false})
  })
}

onDobPicked = (date) => {
  this.setState({dob:date})
}
renderFitnessCenter(){
  return(
    <View>
  <Text style={styles.label}>Fitness Center</Text>
  <TouchableHighlight onPress={this.showActionSheetFitnessCenters} underlayColor="transparent">
      <View style={styles.row}>
          <Text style={styles.centerText} >{this.state.fitnessCenter? this.state.fitnessCenter.name : "Select fitness center"}</Text> 
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
renderHeadTrainer(){
  return(
    <View>
    <Text style={styles.label}>Head Trainer</Text>
    <TouchableHighlight onPress={this.showActionSheetHeadTrainer} underlayColor="transparent">
        <View style={styles.row}>
            <Text style={styles.centerText} >{this.state.headTrainer? this.state.headTrainer.name: "Select head trainer"}</Text> 
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
            title={'Head Traine?'}
            options={this.optionsHeadTrainerList}
            cancelButtonIndex={this.optionsHeadTrainerList.length-1}
            destructiveButtonIndex={this.optionsHeadTrainerList.length-1}
            onPress={(index) => { 
                    if(index!=this.optionsHeadTrainerList.length-1){
                      this.updateHeadTrainer(this.optionsHeadTrainerListID[index])
                    }
            }}
        />
      </View>
  )
}
  render() {
    const { navigate } = this.props.navigation;
    if(this.state.headTrainersList && this.state.fitnessCentersList && this.state.empType=='trainer'){
      return(
        <View style={styles.container}>
        {this.showLoader()}
        {this.renderHeader("Trainer Details")}
        <ScrollView>
         <View style={styles.inputForm}>
           <Text style={styles.label}>Name</Text>
           <TextInput
              maxLength={50}
              style={styles.inputStyle}
              placeholder="Enter name"
              onChangeText={(name) => this.setState({name:name})}
            />
            <Text style={styles.label}>Email</Text>
           <TextInput
              maxLength={50}
              style={styles.inputStyle}
              placeholder="Enter email"
              onChangeText={(email) => this.setState({email:email})}
            />
            <Text style={styles.label}>Gender</Text>
            <TouchableHighlight onPress={this.showGenderActionSheet} underlayColor="transparent">
            <View style={styles.row}>
              <Text style={styles.centerText}>{this.state.gender}</Text> 
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
              cancelButtonIndex={2}
              destructiveButtonIndex={2}
              onPress={(index) => { 
                      if(index!=2){
                        this.setState({gender:optionsGender[index]})
                      }
              }}
              />
          <Text style={styles.label}>Phone</Text>
          <TextInput
            maxLength={10}
            style={styles.inputStyle}
            keyboardType="decimal-pad"
            placeholder="Enter mobile number"
            onChangeText={(phone) => this.setState({phone:phone})}
          />
          <Text style={styles.label}>Date of birth</Text>
          <TouchableHighlight onPress={this.onDobPress.bind(this)} underlayColor="transparent">
            <View style={styles.row}>
                <Text style={styles.centerText}>{this.state.dob?Moment(this.state.dob).format('DD MMM, YYYY'): "Select date of birth"}</Text> 
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
          {this.renderHeadTrainer()}
            <TouchableHighlight onPress={() => this.addTrainer()} underlayColor="transparent">
                <View style={styles.login}>
                  <Text style={styles.loginText}>Add Trainer</Text>
                </View>
            </TouchableHighlight>
         </View>
         </ScrollView>
       
      </View>
      )
    }
    else if(this.state.headTrainersList && this.state.fitnessCentersList && this.state.empType=='headTrainer'){
      return(
        <View style={styles.container}>
        {this.renderHeader("Head Trainers Details")}
        <ScrollView>
         <View style={styles.inputForm}>
         <Text style={styles.label}>Name</Text>
           <TextInput
              maxLength={50}
              style={styles.inputStyle}
              placeholder="Enter name"
              onChangeText={(name) => this.setState({name:name})}
            />
            <Text style={styles.label}>Email</Text>
           <TextInput
              maxLength={50}
              style={styles.inputStyle}
              placeholder="Enter email"
              onChangeText={(email) => this.setState({email:email})}
            />
            <Text style={styles.label}>Gender</Text>
            <TouchableHighlight onPress={this.showGenderActionSheet} underlayColor="transparent">
            <View style={styles.row}>
              <Text style={styles.centerText}>{this.state.gender}</Text> 
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
              cancelButtonIndex={2}
              destructiveButtonIndex={2}
              onPress={(index) => { 
                      if(index!=2){
                        this.setState({gender:optionsGender[index]})
                      }
              }}
              />
          <Text style={styles.label}>Phone</Text>
          <TextInput
            maxLength={10}
            style={styles.inputStyle}
            keyboardType="decimal-pad"
            placeholder="Enter mobile number"
            onChangeText={(phone) => this.setState({phone:phone})}
          />
          <Text style={styles.label}>Date of birth</Text>
          <TouchableHighlight onPress={this.onDobPress.bind(this)} underlayColor="transparent">
            <View style={styles.row}>
                <Text style={styles.centerText}>{this.state.dob?Moment(this.state.dob).format('DD MMM, YYYY'): "Select date of birth"}</Text> 
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
            <TouchableHighlight onPress={() => this.addHeadTrainer()} underlayColor="transparent">
                <View style={styles.login}>
                  <Text style={styles.loginText}>Add Head Trainer</Text>
                </View>
            </TouchableHighlight>
         </View>
         </ScrollView>
       
      </View>
      )
    }
    else if(this.state.headTrainersList && this.state.fitnessCentersList && this.state.empType=='frontdesk'){
      return(
        <View style={styles.container}>
         {this.renderHeader("Frontdesk Admin Details")}
        <ScrollView>
         <View style={styles.inputForm}>
         <Text style={styles.label}>Name</Text>
           <TextInput
              maxLength={50}
              style={styles.inputStyle}
              placeholder="Enter name"
              onChangeText={(name) => this.setState({name:name})}
            />
            <Text style={styles.label}>Email</Text>
           <TextInput
              maxLength={50}
              style={styles.inputStyle}
              placeholder="Enter email"
              onChangeText={(email) => this.setState({email:email})}
            />
            <Text style={styles.label}>Gender</Text>
            <TouchableHighlight onPress={this.showGenderActionSheet} underlayColor="transparent">
            <View style={styles.row}>
              <Text style={styles.centerText}>{this.state.gender}</Text> 
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
              cancelButtonIndex={2}
              destructiveButtonIndex={2}
              onPress={(index) => { 
                      if(index!=2){
                        this.setState({gender:optionsGender[index]})
                      }
              }}
              />
          <Text style={styles.label}>Phone</Text>
          <TextInput
            maxLength={10}
            style={styles.inputStyle}
            keyboardType="decimal-pad"
            placeholder="Enter mobile number"
            onChangeText={(phone) => this.setState({phone:phone})}
          />
          <Text style={styles.label}>Date of birth</Text>
          <TouchableHighlight onPress={this.onDobPress.bind(this)} underlayColor="transparent">
            <View style={styles.row}>
                <Text style={styles.centerText}>{this.state.dob?Moment(this.state.dob).format('DD MMM, YYYY'): "Select date of birth"}</Text> 
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
            <TouchableHighlight onPress={() => this.addFrontdeskAdmin()} underlayColor="transparent">
                <View style={styles.login}>
                  <Text style={styles.loginText}>Add Frontdesk Admin</Text>
                </View>
            </TouchableHighlight>
         </View>
         </ScrollView>
       
      </View>
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