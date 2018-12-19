import React, { Component } from 'react';
import { Avatar, SearchBar, ListItem, Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import GradientHeader from '../components/GradientHeader'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView
} from 'react-native';
import CONFIG from '../config/config'
var width = Dimensions.get('window').width;
export default class SuperAdminDietHome extends Component {
    constructor(props) {
        super(props);
        this.state ={
          dietInput: ''
        }
        axios.get('http://sf-servicesapp.screqvrs8e.us-east-2.elasticbeanstalk.com/diets')
        .then((response) => {
            this.setState({dietList:response.data._embedded.diets})
        })
        .catch((error) => {
            alert(error)
        })
    }
    static navigationOptions = {
        title: 'Gyms',
        header: null
    }
  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
        <GradientHeader title="Diet Plans" navigation={this.props.navigation}/>
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
            onPress={() => navigate('SuperAdminAddDiet')}
          />
        <SearchBar
          round
          lightTheme
          searchIcon={{ size: 24 }}
          containerStyle={{width:width, backgroundColor:'#f7f7f7'}}
          inputStyle={{backgroundColor:'white'}}
          inputContainerStyle={{backgroundColor:'white'}}
          onChangeText={(dietInput) => this.setState({dietInput})}
          placeholder='Search diet plan...' />
          <ScrollView>
          {
            this.state.dietList
            .filter(i => this.state.dietInput === '' || i.name.includes(this.state.dietInput))
            .map((item, i) => (
              <ListItem
                key={i}
                title={item.name}
                subtitle={item.type}
                containerStyle={{width:width}}
                leftIcon={{ name: 'av-timer'}}
                titleStyle={{fontSize:14}}
                subtitleStyle={{fontSize:12}}
              />
            ))
          }
          </ScrollView>
     </View>
    );
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
    }
  });