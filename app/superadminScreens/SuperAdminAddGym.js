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
  KeyboardAvoidingView
} from 'react-native';
var width = Dimensions.get('window').width;
import CONFIG from '../config/config'

export default class SuperAdminAddGym extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  static navigationOptions = {
    title: 'Fitness Center Details',
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
  addFitnessCenter(){
    this.setState({showLoader: true})
    var fitnessCenter = {
      name: this.state.name,
      location:this.state.location,
      address: this.state.address
    }
    if(!this.state.name || !this.state.location || !this.state.address){
      alert("Please enter all the details.")
      this.setState({showLoader: false})
    }
    else{
      axios.post(CONFIG.base_url + 'fitnessCenters', fitnessCenter)
      .then((response) => {
          alert("Fitness center added successfully.")
          this.setState({showLoader: false})
      })
      .catch((error) => {
          console.log(error)
          alert(error)
          this.setState({showLoader: false})
      })
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView style={styles.container}>
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
          }}>Add Fitness Center</Text>
        </LinearGradient>
        <ScrollView>  
          <View style={styles.inputForm}>
          <Text style={styles.label}>Name</Text>
          <TextInput
              maxLength={50}
              style={styles.inputStyle}
              placeholder="Enter name"
              onChangeText={(name) => this.setState({name:name})}
            />
            <Text style={styles.label}>Location</Text>
            <TextInput
                maxLength={100}
                style={styles.inputStyle}
                placeholder="Enter location"
                onChangeText={(location) => this.setState({location:location})}
              />
          <Text style={styles.label}>Address</Text>
          <TextInput
              maxLength={200}
              style={styles.inputStyle}
              placeholder="Enter name"
              onChangeText={(address) => this.setState({address:address})}
            />
          <TouchableHighlight onPress={() => this.addFitnessCenter()} underlayColor="transparent">
                <View style={styles.login}>
                  <Text style={styles.loginText}>Add Fitness Center</Text>
                </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  inputLabel:{
    marginTop: 20,
  },
    loader:{
      marginTop:'100%',
    }
});