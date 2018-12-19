import React, { Component } from 'react';
import GradientHeader from '../components/GradientHeader'
import InputBox from '../components/InputBox';
import SubmitButton from '../components/SubmitButton';
import DateInputBox from '../components/DateInputBox';
import DropdownInput from '../components/DropdownInput'
import Moment from 'moment';
import axios from 'axios';
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
const optionsGender = [
  "Male",
  "Female",
  "Cancel"
]
var width = Dimensions.get('window').width;
import CONFIG from '../config/config'
export default class SuperAdminAddMember extends Component {
  constructor(props) {
    super(props);
    this.state ={
        name:'',
        email:'',
        phone:'',
        gender:'Male',
        dob: '',
        fitnessCenter: '',
        trainer: ''
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
}
static navigationOptions = {
    title: 'Workouts',
    header: null
}
setFitnessCenter(id){
  this.setState({showLoader: true})
  axios.get(CONFIG.base_url + 'fitnessCenters/'+ id )
  .then((response) => {
      this.setState({fitnessCenter:response.data, showLoader:false})
  })
  .catch((error) => {
      console.log(error)
      this.setState({showLoader: false})
  })
}
setGender(gender){
  this.setState({gender: gender})
}

setTrainer(id){
  this.setState({showLoader: true})
  axios.get(CONFIG.base_url + 'trainers/'+ id )
  .then((response) => {
    console.log(response)
      this.setState({trainer:response.data, showLoader: false})
  })
  .catch((error) => {
      console.log(error)
      this.setState({showLoader: false})
  })
}

addMember(){
  
  var member = {
    name: this.state.name,
    email: this.state.email,
    gender: this.state.gender,
    phone: this.state.phone,
    dob: this.state.dob,
    password: "master",
    designation:"member"
  }
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(!member.name || !member.email || !member.gender || !member.phone || !member.dob || !this.state.trainer || !this.state.fitnessCenter){
    alert("All fields are mandatory.")
  }
  else if(reg.test(member.email) === false){
    alert("Please enter a valid email address")
  } 
  else if(member.phone && member.phone.length<10){
    alert("Please enter a valid Mobile Number")
  }
  else{
    this.setState({showLoader: true})
    axios.post(CONFIG.base_url + 'members', member)
    .then((response) => {
      axios.get(CONFIG.base_url + 'members/'+response.data.id)
        .then((response1) => {
            var trainer = response1.data._links.trainer.href;
            var fitnessCenter = response1.data._links.fitnessCenter.href;
            axios({ 
              method: 'PUT', 
              url: trainer,
              headers: {
                "Content-Type": "text/uri-list"},
              data: CONFIG.base_url+'trainers/'+this.state.trainer.id
             })
            .then((response2) => {
                axios({ 
                  method: 'PUT', 
                  url: fitnessCenter,
                  headers: {
                    "Content-Type": "text/uri-list"},
                  data: CONFIG.base_url+'fitnessCenter/'+this.state.fitnessCenter.id
                })
                .then((response2) => {
                  alert("Member added successfully!")
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
  
  onDobPicked = (date) => {
    this.setState({dob:date})
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <KeyboardAvoidingView style={styles.container}>
        {this.showLoader()}
          <GradientHeader title="Add Member" route="SuperAdminMemberHome" navigation={this.props.navigation}/>
           <ScrollView>
           <View style={styles.inputForm}>
           <InputBox 
              fieldName="Name" 
              fieldValue={this.state.name} 
              placeholder="Enter name"
              changeEvent={(name) => this.setState({name: name})}
            />
            <InputBox 
              fieldName="Email" 
              fieldValue={this.state.email} 
              placeholder="Enter email"
              changeEvent={(email) => this.setState({email:email})}
            />
            <DropdownInput
                label="Gender"
                fieldValue={this.state.gender? this.state.gender: "Select gender"}
                sheetLabel="Your gender"
                options={optionsGender}
                pressEvent={this.setGender.bind(this)}
              />
            <InputBox 
                fieldName="Phone" 
                fieldValue={this.state.phone} 
                placeholder="Enter phone"
                keyboardType="phone-pad"
                maxLength={10}
                changeEvent={(phone) => this.setState({phone:phone})}
                
                />
            <DateInputBox
                label="Date of birth"
                fieldValue={this.state.dob?Moment(this.state.dob).format('DD MMM, YYYY'): "Select date of birth"}
                selectedDate={new Date()}
                maxDate={new Date()}
                pickEvent={this.onDobPicked.bind(this)}
              />
            <DropdownInput
                label="Fitness Center"
                fieldValue={this.state.fitnessCenter? this.state.fitnessCenter.name: "Select fitness center"}
                sheetLabel="Fitness Center"
                endpoint="fitnessCenters"
                pressEvent={this.setFitnessCenter.bind(this)}
              />
            <DropdownInput
                label="Trainer"
                fieldValue={this.state.trainer? this.state.trainer.name: "Select trainer"}
                sheetLabel="Trainer"
                endpoint="trainers"
                pressEvent={this.setTrainer.bind(this)}
              />
            <SubmitButton 
                pressEvent={() =>this.addMember()} 
                buttonName="Add Member"
              />
           </View>
           </ScrollView>
        </KeyboardAvoidingView>
      )
    
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
  inputForm:{
    margin:20,
    padding:10,
    paddingTop:0,
    width:width-40,
    backgroundColor:'white'
  },
  loader:{
    marginTop:'100%',
  },
  headDesign:{
    width:width,
    height:140
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