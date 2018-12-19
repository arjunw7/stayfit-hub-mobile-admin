import React, { Component } from 'react';
import { Avatar, Icon, SocialIcon } from 'react-native-elements';
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
export default class SuperAdminViewGym extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fitnessCenter: this.props.navigation.state.params.fitnessCenter
    }
  }
  static navigationOptions = {
    title: 'Fitness Center Details',
    header:null
  };
  showLoader(){
    if(this.state.showLoader){
        return(
          <View style={styles.loader}>
              <ActivityIndicator size="large" color="white" />
          </View>
        )
    }
}
  updateName(itemValue){
    var tempCenter = this.state.fitnessCenter;
    tempCenter.name = itemValue
    this.setState({fitnessCenter:tempCenter})
  }
  updateLocation(itemValue){
    var tempCenter = this.state.fitnessCenter;
    tempCenter.location = itemValue
    this.setState({fitnessCenter:tempCenter})
  }
  updateAddress(itemValue){
    var tempCenter = this.state.fitnessCenter;
    tempCenter.address = itemValue
    this.setState({fitnessCenter:tempCenter})
  }
  updateFitnessCenter(){
    var fitnessCenter = this.state.fitnessCenter;
    if(!fitnessCenter.name || !fitnessCenter.location || !fitnessCenter.address){
      alert("All fields are mandatory.")
    }
    else{
      this.setState({showLoader:true})
      axios.put(CONFIG.base_url + 'fitnessCenters/'+this.state.fitnessCenter.id, this.state.fitnessCenter)
      .then((response) => {
          axios.get(CONFIG.base_url + 'fitnessCenters/'+this.state.fitnessCenter.id)
          .then((response) => {
              this.setState({fitnessCenter:response.data, showLoader:false})
              alert("Fitness center details updated.")
          })
          .catch((error) => {
              this.setState({showLoader:false})
              alert(error)
          })
      })
      .catch((error) => {
        this.setState({showLoader:false})
          alert(error)
      })
    }
    
  }
  render() {
    const { navigate } = this.props.navigation;
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
          }}>Fitness Center</Text>
        </LinearGradient>
        <ScrollView>  
          <View style={styles.inputForm}>
          <Text style={styles.label}>Name</Text>
          <TextInput
              maxLength={50}
              style={styles.inputStyle}
              placeholder="Enter name"
              value={this.state.fitnessCenter.name}
              onChangeText={(name) => this.updateName(name)}
            />
          <Text style={styles.label}>Location</Text>
          <TextInput
              maxLength={100}
              style={styles.inputStyle}
              placeholder="Enter location"
              value={this.state.fitnessCenter.location}
                onChangeText={(location) => this.updateLocation(location)}
            />
          <Text style={styles.label}>Address</Text>
          <TextInput
              maxLength={200}
              style={styles.inputStyle}
              placeholder="Enter name"
              value={this.state.fitnessCenter.address}
                onChangeText={(address) => this.updateAddress(address)}
            />
          <TouchableHighlight onPress={() => this.updateFitnessCenter()} underlayColor="transparent">
                <View style={styles.login}>
                  <Text style={styles.loginText}>Update Fitness Center</Text>
                </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    );
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
  loader:{
    flex:1,
    width:width,
    height:"100%",
    position:'absolute',
    zIndex:2,
    backgroundColor:"rgba(0,0,0,0.7)",
    paddingTop:"100%"
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