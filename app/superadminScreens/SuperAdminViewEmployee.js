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
var width = Dimensions.get('window').width;
import CONFIG from '../config/config'
const optionsGender = [
  "Male",
  "Female",
  "Cancel"
]
export default class SuperAdminViewEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: this.props.navigation.state.params.employee,
      empType: this.props.navigation.state.params.employeeType
    }
  }
  static navigationOptions = {
    title: 'Member Details',
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
  optionsFitnessCenterList = []
  optionsFitnessCenterListID = []
  optionsHeadTrainerList = []
  optionsHeadTrainerListID = []
  componentDidMount(){
    this.getHeadTrainer();
    this.getFitnessCenter();
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

  getHeadTrainer(){
    this.setState({showLoader: false})
    if(this.state.employee._links.headTrainer){
      var headTrainersUrl = this.state.employee._links.headTrainer.href
    axios.get(headTrainersUrl)
    .then((response) => {
        this.setState({headTrainer:response.data, showLoader:false})

    })
    .catch((error) => {
        console.log(error)
        this.setState({showLoader: false})
    })
    }
  }
  getFitnessCenter(){
    this.setState({showLoader: true})
    var fitnessCentersUrl = this.state.employee._links.fitnessCenter.href
    axios.get(fitnessCentersUrl)
    .then((response) => {
        this.setState({fitnessCenter:response.data, showLoader:false})
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
        var centerURL = this.state.employee._links.fitnessCenter.href
        axios({ 
          method: 'PUT', 
          url: centerURL,
          headers: {
            "Content-Type": "text/uri-list"},
          data: updatedCenter
         })
        .then((response) => {
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
  updateHeadTrainer(itemIndex){
    this.setState({showLoader: true})
    axios.get(CONFIG.base_url + 'headTrainers/'+itemIndex)
    .then((response) => {
        var updatedHT = response.data._links.self.href
        var empHeadTrainerURL = this.state.employee._links.headTrainer.href
        axios({ 
          method: 'PUT', 
          url: empHeadTrainerURL,
          headers: {
            "Content-Type": "text/uri-list"},
          data: updatedHT
         })
        .then((response) => {
           this.getHeadTrainer()
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
  updateName(itemValue){
    var tempEmployee = this.state.employee;
    tempEmployee.name = itemValue
    this.setState({employee:tempEmployee})
  }
  updatePhone(itemValue){
    var tempEmployee = this.state.employee;
    tempEmployee.phone = itemValue
    this.setState({employee:tempEmployee})
  }
  updateEmail(itemValue){
    var tempEmployee = this.state.employee;
    tempEmployee.email = itemValue
    this.setState({employee:tempEmployee})
  }
  updateGender(itemValue){
    var tempEmployee = this.state.employee;
    tempEmployee.gender = itemValue
    this.setState({employee:tempEmployee})
  }
  updateDob(itemValue){
    var tempEmployee = this.state.employee;
    tempEmployee.dob = itemValue;
    this.setState({employee:tempEmployee})
  }
  updateEmployee(){
    var employee = this.state.employee;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!employee.name || !employee.email){
      alert("Name and email are mandatory.")
    }
    else if(reg.test(employee.email) === false){
      alert("Please enter a valid email address")
    } 
    else if(employee.phone && employee.phone.length<10){
      alert("Please enter a valid Mobile Number")
    }
    else{
      if(this.state.empType=='trainer'){
        this.setState({showLoader: true})
        axios.put(CONFIG.base_url + 'trainers/'+this.state.employee.id, this.state.employee)
        .then((response) => {
            axios.get(CONFIG.base_url + 'trainers/'+this.state.employee.id)
            .then((response) => {
                this.setState({employee:response.data, showLoader:false})
                alert("Trainer details updated.")
            })
            .catch((error) => {
                console.log(error)
                alert(error)
                this.setState({showLoader: false})
            })
        })
        .catch((error) => {
            console.log(error)
            alert(error)
            this.setState({showLoader: false})
        })
      } else if(this.state.empType=='headTrainer'){
        this.setState({showLoader: true})
        axios.put(CONFIG.base_url + 'headTrainers/'+this.state.employee.id, this.state.employee)
        .then((response) => {
            axios.get(CONFIG.base_url + 'headTrainers/'+this.state.employee.id)
            .then((response) => {
                this.setState({employee:response.data, showLoader:false})
                alert("Head trainer details updated.")
            })
            .catch((error) => {
                console.log(error)
                alert(error)
                this.setState({showLoader: false})
            })
        })
        .catch((error) => {
            console.log(error)
            alert(error)
            this.setState({showLoader: false})
        })
      }
      else if(this.state.empType=='frontdesk'){
        this.setState({showLoader: true})
        axios.put(CONFIG.base_url +'frontdeskAdmins/'+this.state.employee.id, this.state.employee)
        .then((response) => {
            axios.get(CONFIG.base_url + 'frontdeskAdmins/'+this.state.employee.id)
            .then((response) => {
                this.setState({employee:response.data, showLoader:false})
                alert("Frontdesk admin details updated.")
            })
            .catch((error) => {
                console.log(error)
                alert(error)
                this.setState({showLoader: false})
            })
        })
        .catch((error) => {
            console.log(error)
            alert(error)
            this.setState({showLoader: false})
        })
      }
    }
    
  }
  showActionSheetFitnessCenters = () => {
    this.ActionSheetFitnessCenter.show()
  }
  showActionSheetHeadTrainer = () => {
    this.ActionSheetTrainer.show()
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
  renderHeadTrainer(){
    return(
      <View>
      <Text style={styles.label}>Head Trainer</Text>
      <TouchableHighlight onPress={this.showActionSheetHeadTrainer} underlayColor="transparent">
          <View style={styles.row}>
              <Text style={styles.centerText} >{this.state.headTrainer? this.state.headTrainer.name: "Select trainer"}</Text> 
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
  renderHeader(empType){
    const {navigate} = this.props.navigation;
    return(
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
                }}>Add {empType}</Text>
            </LinearGradient>
        )
}
  onDobPress = () => {
    this.refs.dobDialog.open({
    date: new Date(this.state.employee.dob),
    maxDate: new Date()
    });
  }

  onDobPicked = (date) => {
    var tempMember = this.state.employee;
    tempMember.dob = date;
    this.setState({employee:tempMember})
  }
showGenderActionSheet = () => {
  this.GenderActionSheet.show()
}
  render() {
    const { navigate } = this.props.navigation;
    if(this.state.headTrainersList && this.state.fitnessCentersList && this.state.empType=='trainer'){
      return(
        <KeyboardAvoidingView style={styles.container}>
        {this.showLoader()}
        {this.renderHeader("Trainer Details")}
        <ScrollView>
         <View style={styles.inputForm}>
           <Text style={styles.label}>Name</Text>
           <TextInput
              maxLength={50}
              style={styles.inputStyle}
              placeholder="Enter name"
              value={this.state.employee.name}
              onChangeText={(name) => this.updateName(name)}
            />
            <Text style={styles.label}>Email</Text>
           <TextInput
              maxLength={50}
              style={styles.inputStyle}
              placeholder="Enter email"
              value={this.state.employee.email}
              onChangeText={(email) => this.updateEmail(email)}
            />
            <Text style={styles.label}>Gender</Text>
            <TouchableHighlight onPress={this.showGenderActionSheet} underlayColor="transparent">
            <View style={styles.row}>
              <Text style={styles.centerText}>{this.state.employee.gender}</Text> 
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
                        this.updateGender(optionsGender[index])
                      }
              }}
              />
               <Text style={styles.label}>Phone</Text>
              <TextInput
                  maxLength={10}
                  style={styles.inputStyle}
                  keyboardType="decimal-pad"
                  placeholder="Enter mobile number"
                  value={this.state.employee.phone}
                  onChangeText={(phone) => this.updatePhone(phone)}
                />
          <Text style={styles.label}>Date of birth</Text>
          <TouchableHighlight onPress={this.onDobPress.bind(this)} underlayColor="transparent">
            <View style={styles.row}>
                <Text style={styles.centerText}>{this.state.employee.dob?Moment(this.state.employee.dob).format('DD MMM, YYYY'): "Select date of birth"}</Text> 
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
            <TouchableHighlight onPress={() => this.updateEmployee()} underlayColor="transparent">
                <View style={styles.login}>
                  <Text style={styles.loginText}>Update Employee Details</Text>
                </View>
            </TouchableHighlight>
         </View>
         </ScrollView>
       
      </KeyboardAvoidingView>
      )
    }
    else if(this.state.headTrainersList && this.state.fitnessCentersList && this.state.empType=='headTrainer'){
      return(
        <KeyboardAvoidingView style={styles.container}>
        {this.showLoader()}
        {this.renderHeader("Head Trainers Details")}
        <ScrollView>
         <View style={styles.inputForm}>
         <Text style={styles.label}>Name</Text>
           <TextInput
              maxLength={30}
              style={styles.inputStyle}
              placeholder="Enter name"
              value={this.state.employee.name}
              onChangeText={(name) => this.updateName(name)}
            />
            <Text style={styles.label}>Email</Text>
           <TextInput
              maxLength={50}
              style={styles.inputStyle}
              placeholder="Enter email"
              value={this.state.employee.email}
              onChangeText={(email) => this.updateEmail(email)}
            />
            <Text style={styles.label}>Gender</Text>
            <TouchableHighlight onPress={this.showGenderActionSheet} underlayColor="transparent">
            <View style={styles.row}>
              <Text style={styles.centerText}>{this.state.employee.gender}</Text> 
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
                        this.updateGender(optionsGender[index])
                      }
              }}
              />
               <Text style={styles.label}>Phone</Text>
              <TextInput
                  maxLength={10}
                  style={styles.inputStyle}
                  keyboardType="decimal-pad"
                  placeholder="Enter mobile number"
                  value={this.state.employee.phone}
                  onChangeText={(phone) => this.updatePhone(phone)}
                />
          <Text style={styles.label}>Date of birth</Text>
          <TouchableHighlight onPress={this.onDobPress.bind(this)} underlayColor="transparent">
            <View style={styles.row}>
                <Text style={styles.centerText}>{this.state.employee.dob?Moment(this.state.employee.dob).format('DD MMM, YYYY'): "Select date of birth"}</Text> 
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
            <TouchableHighlight onPress={() => this.updateEmployee()} underlayColor="transparent">
                <View style={styles.login}>
                  <Text style={styles.loginText}>Update Employee Details</Text>
                </View>
            </TouchableHighlight>
         </View>
         </ScrollView>
       
      </KeyboardAvoidingView>
      )
    }
    else if(this.state.headTrainersList && this.state.fitnessCentersList && this.state.empType=='frontdesk'){
      return(
        <KeyboardAvoidingView style={styles.container}>
        {this.showLoader()}
         {this.renderHeader("Frontdesk Admin Details")}
        <ScrollView>
         <View style={styles.inputForm}>
         <Text style={styles.label}>Name</Text>
           <TextInput
              maxLength={30}
              style={styles.inputStyle}
              placeholder="Enter name"
              value={this.state.employee.name}
              onChangeText={(name) => this.updateName(name)}
            />
            <Text style={styles.label}>Email</Text>
           <TextInput
              maxLength={30}
              style={styles.inputStyle}
              placeholder="Enter email"
              value={this.state.employee.email}
              onChangeText={(email) => this.updateEmail(email)}
            />
            <Text style={styles.label}>Gender</Text>
            <TouchableHighlight onPress={this.showGenderActionSheet} underlayColor="transparent">
            <View style={styles.row}>
              <Text style={styles.centerText}>{this.state.employee.gender}</Text> 
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
                        this.updateGender(optionsGender[index])
                      }
              }}
              />
               <Text style={styles.label}>Phone</Text>
              <TextInput
                  maxLength={10}
                  style={styles.inputStyle}
                  keyboardType="decimal-pad"
                  placeholder="Enter mobile number"
                  value={this.state.employee.phone}
                  onChangeText={(phone) => this.updatePhone(phone)}
                />
          <Text style={styles.label}>Date of birth</Text>
          <TouchableHighlight onPress={this.onDobPress.bind(this)} underlayColor="transparent">
            <View style={styles.row}>
                <Text style={styles.centerText}>{this.state.employee.dob?Moment(this.state.employee.dob).format('DD MMM, YYYY'): "Select date of birth"}</Text> 
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
            <TouchableHighlight onPress={() => this.updateEmployee()} underlayColor="transparent">
                <View style={styles.login}>
                  <Text style={styles.loginText}>Update Employee Details</Text>
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