import React from 'react';
import { StyleSheet, Text, View, FlatList,TouchableOpacity, } from 'react-native';

class UserView extends React.Component{
      Item = ({ item }) => {
        return (
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('QRCode', { building: item.건물명 });
          }}>
            <View style={styles.text}>
                <Text style={styles.name}>{item.건물명} </Text>
                <Text style={styles.time}>{item.배송시간}</Text>
                <Text style={styles.paper}>{100-item.서류현황}/100</Text>
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
                    <Text style={styles.barText}>목적지(예약수)</Text>
                    <Text style={styles.barText}>출발시간</Text>
                    <Text style={styles.barText}>가능수량</Text>
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
export default UserView;

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
      flexDirection : 'row'
    },
    barText : {
      paddingVertical   : 15,
      paddingHorizontal : 35,
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
      backgroundColor: '#fcf2d4',
      paddingVertical   : 20,
      borderBottomWidth : 1,
      borderBottomColor : '#dbcebd'
    },
    name        : {
      flex           : 2,
      paddingHorizontal : 25
    },
    time        : {
      flex           : 1,
      alignItems     : 'center',
      justifyContent : 'center'
    },
    paper       : {
      flex           : 1,
      alignItems     : 'center',
      justifyContent : 'center'
    }
  });