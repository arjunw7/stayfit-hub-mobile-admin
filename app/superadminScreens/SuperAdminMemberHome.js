import React, { Component } from 'react';
import { Avatar, SearchBar, ListItem, Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import DropdownInputAdmin from '../components/DropdownInputAdmin';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator
} from 'react-native';
var width = Dimensions.get('window').width;
import CONFIG from '../config/config'
export default class SuperAdminMemberHome extends Component {
    constructor(props) {
        super(props);
        this.state ={
          memberInput:''
        }
        axios.get(CONFIG.base_url + 'members')
        .then((response) => {
          var members = response.data._embedded.members
            var activeMembers = 0;
            for(var i=0; i<members.length; i++){
              if(members[i].isMembershipActive==true){
                activeMembers++
              }
            }
           

            members.sort(this.dynamicSort("name"));
            this.setState({members:members, activeMembers:activeMembers})
        })
        .catch((error) => {
            alert(error)
        })
    }
    static navigationOptions = {
        title: 'Members',
        header: null
    }
    filterMembers(){
      this.setState({
        memberInput: this.search,
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
    setFitnessCenter(id){
      this.setState({showLoader: true})
      if(id!=-1){
        axios.get(CONFIG.base_url + 'fitnessCenters/'+ id )
        .then((response) => {
            axios.get(CONFIG.base_url + 'fitnessCenters/'+id + '/members')
            .then((res) => {
              var members = res.data
              var activeMembers = 0;
              for(var i=0; i<members.length; i++){
                if(members[i].isMembershipActive==true){
                  activeMembers++
                }
              }
              members.sort(this.dynamicSort("name"));
              this.setState({members: members, activeMembers:activeMembers, fitnessCenter:response.data, showLoader:false})
            })
            .catch((error) => {
              this.setState({showLoader: false})
                console.log(error)
            })
            
        })
        .catch((error) => {
            console.log(error)
            this.setState({showLoader: false})
        })
     }
     else if(id==-1){
      axios.get(CONFIG.base_url + 'members')
      .then((response) => {
        var members = response.data._embedded.members
          var activeMembers = 0;
          for(var i=0; i<members.length; i++){
            if(members[i].isMembershipActive==true){
              activeMembers++
            }
          }
          members.sort(this.dynamicSort("name"));
          var fc = {
            id:-1,
            name:'All'
          }
          this.setState({showLoader: false, fitnessCenter: fc, members:members, activeMembers:activeMembers})
      })
      .catch((error) => {
          alert(error)
          this.setState({showLoader: false})
      })
     }
    }
    dynamicSort(property) {
          var sortOrder = 1;
          if(property[0] === "-") {
              sortOrder = -1;
              property = property.substr(1);
          }
      
          return function (a,b) {
              if(sortOrder == -1){
                  return b[property].toLowerCase().localeCompare(a[property].toLowerCase());
              }else{
                  return a[property].toLowerCase().localeCompare(b[property].toLowerCase());
              }        
          }
      }
  render() {
    const { navigate } = this.props.navigation;
    if(this.state.members){
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
          }}>Members</Text>
          <View style={styles.headStats}>
            <Text style={{color:'white'}}>
              Total members - {this.state.members.length}
            </Text>
            <Text style={{color:'white'}}>
              Active members - {this.state.activeMembers}
            </Text>
            <DropdownInputAdmin
                fieldValue={this.state.fitnessCenter? this.state.fitnessCenter.name: "Filter by fitness center"}
                sheetLabel="Fitness Center"
                endpoint="fitnessCenters"
                pressEvent={this.setFitnessCenter.bind(this)}
              />
          </View>
          
        </LinearGradient>
        {this.showLoader()}
       <Icon raised reverse name='add' color='#E62221'
            containerStyle={{
              position:'absolute', 
              bottom:10,
              zIndex:2,
              right:10,
              shadowColor: '#7f7f7f',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 5
            }}
            onPress={() => navigate('SuperAdminAddMember')}
          />
        <SearchBar
          round
          lightTheme
          searchIcon={{ size: 24 }}
          containerStyle={{width:width, backgroundColor:'#f7f7f7'}}
          inputStyle={{backgroundColor:'white'}}
          inputContainerStyle={{backgroundColor:'white'}}
          onChangeText={(memberInput) => this.setState({memberInput})}
          placeholder='Search member...' />
          <ScrollView>
          {
            this.state.members
            .filter(i => this.state.members === '' || i.name.includes(this.state.memberInput))
            .map((item, i) => (
              <ListItem
                key={i}
                title={item.name}
                subtitle={item.email}
                containerStyle={{width:width}}
                leftIcon={
                  <Icon
                    name={item.isMembershipActive==true?'done-all': 'remove-circle'}
                    color={item.isMembershipActive==true?'#31a32f':'#E62221'} />
                }
                titleStyle={{fontSize:14, marginLeft:10}}
                subtitleStyle={{fontSize:12, marginLeft:10}}
                onPress={() => navigate('SuperAdminViewMember', {member: JSON.stringify(item)})}
              />
            ))
          }
          </ScrollView>
     </View>
    )
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
      width:width
    },
    headDesign:{
      width:width,
      height:140
    },
    mainIcons:{
      width:width-40,
      margin:10,
      marginLeft: 5,
      flex:1,
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
    mainIcon:{
      width:width/3-20,
      margin:10,
      paddingTop:20,
      paddingBottom:20,
      borderRadius:7,
      shadowOffset:{  width: 0,  height: 0,  },
      shadowColor: 'grey',
      shadowOpacity: 0.5,
      shadowRadius: 5,
      backgroundColor:'white',
      height:100
    },
    iconText:{
      fontSize:12,
      color:'#E62221',
      alignSelf:'center',
      alignItems:'center',
      marginTop:10
    },
    loader:{
      marginTop:'100%',
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
    headStats:{
      position: 'absolute',
      right:30,
      bottom:25,
      alignItems:'flex-end'
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