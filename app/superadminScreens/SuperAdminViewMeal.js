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
  TouchableHighlight
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
  addFitnessCenter(){
    var fitnessCenter = {
      name: this.state.name,
      location:this.state.location,
      address: this.state.address
    }
    if(!this.state.name || !this.state.location || !this.state.address){
      alert("Please enter all the details.")
    }
    else{
      axios.post(CONFIG.base_url + 'fitnessCenters', fitnessCenter)
      .then((response) => {
          alert("Fitness center added successfully.")
      })
      .catch((error) => {
          console.log(error)
          alert(error)
      })
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
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
          }}>Add Meal</Text>
        </LinearGradient>
        <ScrollView>  
          <View style={styles.inputForm}>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
            <TextInput
                maxLength={30}
                style={styles.inputStyle1}
                placeholder="Enter meal name"
                onChangeText={(name) => this.setState({name:name})}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
            <TextInput
                maxLength={30}
                style={styles.inputStyle1}
                placeholder="Enter recipe for the meal"
                onChangeText={(location) => this.setState({location:location})}
              />
          </View>
          <View style={styles.inputContainer}>
              <Icon name='rename-box' type='material-community' color="#595959"/>
            <TextInput
                maxLength={30}
                style={styles.inputStyle1}
                placeholder="Enter address"
                onChangeText={(address) => this.setState({address:address})}
              />
          </View>
          <TouchableHighlight onPress={() => this.addFitnessCenter()} underlayColor="transparent">
                <View style={styles.login}>
                  <Text style={styles.loginText}>Add Fitness Center</Text>
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
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#ededed',
    height:40,
    padding:5,
    paddingTop: 8,
    marginTop: 15,
  },
  inputStyle: {
    flex: 1,
    fontSize:12
  },
  inputStyle1: {
    flex: 1,
    paddingLeft: 7,
    fontSize:12
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
    }
});