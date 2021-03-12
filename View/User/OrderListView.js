import React from 'react';
import { StyleSheet, Text, View, FlatList,TouchableOpacity, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default class OrderListView extends React.Component{
  mapAvailable(deliveryStatus) {
		if (deliveryStatus == '배송중') {
			this.props.navigation.navigate('Map');
		} else if (deliveryStatus == '배송완료') {
			Alert.alert('배송이 완료되었습니다.');
		} else if (deliveryStatus == '배송취소') {
			Alert.alert('배송이 취소되었습니다.');
		} else {
			Alert.alert('배송 준비중 입니다.');
		}
	}
      Item = ({ item }) => {
        const { IdentityKey } = this.props;
        if(item.전화번호 == IdentityKey){
            return (
            <TouchableOpacity 
              onPress={() => {
                this.props.navigation.navigate('Detail', {
                  list : item
                });
              }}>
                <View style={styles.text}>
                    <Text style={styles.building}>{item.건물명}</Text>
                    <View style={styles.location}>
                        <Entypo name="location" size={24} color="black" 
                                onPress={() => this.mapAvailable(item.배송현황)}/>
                    </View>
                    <Text style={styles.status}>{item.배송현황}</Text>
                </View>
            </TouchableOpacity>
            );
        };
    }
    
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.barcontain}>
                    <View style={styles.barTop}></View>
                    <View style={styles.bar}>
                        <Text style={styles.barText}>  배송지    </Text>
                        <Text style={styles.barText}>   배송현황   </Text>
                        <Text style={styles.barText}>   배송상태   </Text>
                    </View>
                    <View style={styles.barBottom}></View>
                </View>
                <View style={styles.content}>
                    <FlatList 
                        data={this.props.data} 
                        renderItem={ this.Item } 
                        keyExtractor={(item) => item.주문자번호.toString()} 
                    />
                </View>
            </View>
        );
    }
}

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
      justifyContent : 'space-evenly'
    },
    barText : {
      textAlign : 'center',
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
      alignItems : 'center',
      backgroundColor: '#fcf2d4',
      paddingVertical   : 20,
      borderBottomWidth : 1,
      borderBottomColor : '#dbcebd'
    },
    building : {
      flex : 1,
      textAlign : 'center',
    },
    status : {
      flex : 1,
      textAlign : 'center'
    },
    location : {
        flex : 1,
        alignItems     : 'center',
        justifyContent : 'center'
      }
  });