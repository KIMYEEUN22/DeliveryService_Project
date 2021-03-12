import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

class Home extends React.Component{
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.icon}>
                    <Image style={{ width: 240, height: 240 }} source={require('./JUEUN.png')} />
                </View>
                <View style={styles.text}>
                    <Text style={styles.booking} onPress={() => this.props.navigation.navigate('User')}>
                      Booking
                    </Text>
                    <Text style={styles.admin} onPress={() => this.props.navigation.navigate('AdminCode')}>
                      Admin</Text>
                </View>
            </View>
        );
    }
}
export default Home;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8ecc9'
    },
    icon:{
      flex: 2,
      backgroundColor: '#f8ecc9',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text:{
      flex: 1,
      backgroundColor: '#f8ecc9',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    booking:{
      fontSize : 30,
      color    : '#a79c8e',
      fontWeight : 'bold'
    },
    admin:{
      fontSize : 30,
      color    : '#a79c8e',
      lineHeight: 150,
      fontWeight : 'bold'
    }
  });