import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-datepicker';
import DateInputBox from '../components/DateInputBox';
import axios from 'axios';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import ActionSheet from 'react-native-actionsheet'
import Moment from 'moment';
var width = Dimensions.get('window').width;
import CONFIG from '../config/config'
export default class SuperAdminWorkoutAssignment extends Component {
  constructor(props) {
    super(props);
    state={
        memberID: '',
        planID: '',
        startDate:'',
        endDate:''
    }
}

optionsPlanList = []
optionsPlanListID = []
optionsMemberList = []
optionsMemberListID = []

showActionSheetMember = () => {
  this.ActionSheetMember.show()
}
showActionSheetPlan = () => {
  this.ActionSheetPlan.show()
}
componentDidMount(){
  axios.get(CONFIG.base_url + 'members')
  .then((response) => {
      this.setState({membersList:response.data._embedded.members })
      this.setMemberOptions(response.data._embedded.members)
  })
  .catch((error) => {
      alert(error)
  })
  axios.get(CONFIG.base_url + 'workoutPlans')
      .then((response) => {
        this.setState({plansList:response.data._embedded.workoutPlans })
        this.setPlanOptions(response.data._embedded.workoutPlans)
      })
      .catch((error) => {
          alert(error)
      })
}
setMemberOptions(memberList){
  for(var i=0; i<memberList.length; i++){
      this.optionsMemberList.push(memberList[i].name)
      this.optionsMemberListID.push(memberList[i].id)
  }
  this.optionsMemberList.push("Cancel")
  this.setState({
      optionsMemberList:this.optionsMemberList,
      optionsMemberListID: this.optionsMemberListID
  })
}
setPlanOptions(planList){
  for(var i=0; i<planList.length; i++){
      this.optionsPlanList.push(planList[i].name)
      this.optionsPlanListID.push(planList[i].id)
  }
  this.optionsPlanList.push("Cancel")
  this.setState({
    optionsPlanList:this.optionsPlanList,
    optionsPlanListID: this.optionsPlanListID
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
componentWillMount = () => {
  var maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    this.setState({
        maxDate:maxDate
    })
}

static navigationOptions = {
    title: 'Workouts',
    header: null
}
addWorkoutAssignment(){
  this.setState({showLoader: true})
    var workoutAssignment = {
        workoutPlanId: this.state.planID,
        startDate:this.state.startDate,
        endDate:this.state.endDate
    }
    if(!workoutAssignment.workoutPlanId || !workoutAssignment.startDate || !workoutAssignment.endDate){
        alert("All fields are mandatory.")
        this.setState({showLoader: false})
    }
    else if(this.state.startDate==this.state.endDate){
        alert("Start date and end date cannot be same")
        this.setState({showLoader: false})
    }
    else{
         axios.put(CONFIG.base_url + 'members/'+this.state.memberID + '/workoutPlans?workoutPlanId=' + workoutAssignment.workoutPlanId + '&startDate='+ new Date(workoutAssignment.startDate).getTime() + '&endDate=' + new Date(workoutAssignment.endDate).getTime())
        .then((response) => {
            alert("Workout assigned to the user.")
            this.setState({showLoader: false})
        })
        .catch((error) => {
          console.log(error)
            this.setState({showLoader: false})
        })
    }
   

}
  render() {
    const { navigate } = this.props.navigation;
    if(this.state.membersList && this.state.plansList){
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
          }}>Workout Assignment</Text>
        </LinearGradient>
           <ScrollView>
           <View style={styles.inputForm}>
           <Text style={styles.label}>Select member</Text>
          <TouchableHighlight onPress={this.showActionSheetMember} underlayColor="transparent">
              <View style={styles.row}>
                  <Text style={styles.centerText} >{this.state.memberName? this.state.memberName: "Select member"}</Text> 
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
                  ref={o => this.ActionSheetMember = o}
                  title={'Members'}
                  options={this.optionsMemberList}
                  cancelButtonIndex={this.optionsMemberList.length-1}
                  destructiveButtonIndex={this.optionsMemberList.length-1}
                  onPress={(index) => { 
                          if(index!=this.optionsMemberList.length-1){
                            this.setState({memberID: this.optionsMemberListID[index], memberName: this.optionsMemberList[index]})
                          }
                  }}
              />
              <Text style={styles.label}>Select workout plan</Text>
              <TouchableHighlight onPress={this.showActionSheetPlan} underlayColor="transparent">
                  <View style={styles.row}>
                      <Text style={styles.centerText} >{this.state.planName? this.state.planName: "Select plan"}</Text> 
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
                      ref={o => this.ActionSheetPlan = o}
                      title={'Workout Plans'}
                      options={this.optionsPlanList}
                      cancelButtonIndex={this.optionsPlanList.length-1}
                      destructiveButtonIndex={this.optionsPlanList.length-1}
                      onPress={(index) => { 
                              if(index!=this.optionsPlanList.length-1){
                                this.setState({planID: this.optionsPlanListID[index], planName: this.optionsPlanList[index]})
                              }
                      }}
                  />

                <DateInputBox
                  label="Start Date"
                  fieldValue={this.state.startDate?Moment(this.state.startDate).format('DD MMM, YYYY'): "Select start date"}
                  selectedDate={new Date()}
                  minDate={new Date()}
                  maxDate={new Date().setMonth(new Date().getMonth()+1)}
                  pickEvent={startDate => this.setState({startDate: startDate})}
                />

                <DateInputBox
                  label="End Date"
                  fieldValue={this.state.endDate?Moment(this.state.endDate).format('DD MMM, YYYY'): "Select start date"}
                  selectedDate={new Date()}
                  minDate={new Date()}
                  maxDate={new Date().setMonth(new Date().getMonth()+1)}
                  pickEvent={(endDate) => this.setState({endDate: endDate})}
                />
              
              <TouchableHighlight onPress={() =>this.addWorkoutAssignment()} underlayColor="transparent">
                  <View style={styles.login}>
                    <Text style={styles.loginText}>Assign Workout</Text>
                  </View>
              </TouchableHighlight>
           </View>
           </ScrollView>
        </View>
      );
    }
    return (
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
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#ededed',
    height:40,
    paddingLeft:5,
    marginTop: 15,
  },
  inputStyle: {
    flex: 1,
    fontSize:16,
    height:40,
    marginTop: -5,
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
  ploader:{
    flex:1,
    width:width,
    height:"100%",
    position:'absolute',
    zIndex:100,
    backgroundColor:"rgba(0,0,0,0.7)",
    paddingTop:"100%"
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

});