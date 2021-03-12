import React from 'react';
import { StyleSheet, Text, View, FlatList,TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

class SituationView extends React.Component{
      Item = ({ item }) => {
        const { adminKey } = this.props;
        return (
          <TouchableOpacity 
            onPress={() => {
            if (item.건물명 == adminKey) {
                this.props.navigation.navigate('ClientList', { building : adminKey });
            } else alert('담당 건물이 아닙니다.');
            }}
           >
            <View style={styles.text}>
                <Text style={styles.name}>{item.건물명}({item.예약수}) </Text>
                <Text style={styles.time}>{item.배송시간}</Text>
                <View style={styles.location}>
                    <Entypo name="location" size={24} color="black" 
                            onPress={() => this.props.navigation.navigate('Map')}/>
                </View>
            </View>
           </TouchableOpacity>
         );
       };
    
    render() {
        return(
            <View style={styles.container}>
              <View style={styles.barcontain}>
                <View style={styles.barTop}></View>
                  <View style={styles.bar}>
                    <Text style={styles.barText_desti}>목적지(예약수)</Text>
                    <Text style={styles.barText_time}>출발시간</Text>
                    <Text style={styles.barText_place}>위치</Text>
                  </View>
                <View style={styles.barBottom}></View>
              </View>
              <View style={styles.content}>
                <FlatList data={this.props.data} renderItem={ this.Item } keyExtractor={(item) => item.건물명} />
              </View>
            </View>
        );
    }
}
export default SituationView;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff7e0'
    },
    barcontain : {
      flex : 1
    },
    bar : {
      flex : 5,
      flexDirection : 'row',
      justifyContent : 'space-around'
    },
    barText_desti : {
      flex : 3,
      textAlign : 'center',
      paddingVertical   : 15,
      fontWeight : 'bold',
      backgroundColor : '#fcf2d4'
    },
    barText_time : {
      flex : 3,
      textAlign : 'center',
      paddingVertical   : 15,
      fontWeight : 'bold',
      backgroundColor : '#fcf2d4'
    },
    barText_place : {
      flex : 2,
      textAlign : 'center',
      paddingVertical   : 15,
      fontWeight : 'bold',
      backgroundColor : '#fcf2d4'
    },
    barTop : {
      flex : 1,
      backgroundColor : '#f1bbba'
    },
    barBottom : {
      flex : 1,
      backgroundColor : '#f1bbba',
      borderBottomWidth : 1,
      borderBottomColor : '#dbcebd'
    },
    content : {
      flex : 10
    },
    text : {
      flex : 1,
      flexDirection : 'row',
      alignItems : 'center',
      backgroundColor: '#fcf2d4',
      paddingVertical   : 20,
      borderBottomWidth : 1,
      borderBottomColor : '#dbcebd'
    },
    name        : {
      flex           : 2,
      textAlign : 'center'
    },
    time        : {
      flex           : 3,
      alignItems     : 'center',
      textAlign : 'center'
    },
    location       : {
      flex           : 1,
      alignItems     : 'center',
      justifyContent : 'flex-end',
      paddingRight :20
    }
  });