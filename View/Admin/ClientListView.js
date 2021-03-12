import React from 'react';
import { StyleSheet, Text, View, FlatList,TouchableOpacity, Alert } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ShippingStatus from '../../Controller/Admin/ShippingStatus';
import Notification from '../../Controller/Admin/NotificationCont';

export default class ClientListView extends React.Component{
    doneHandler = async (UserID, Token, Name) => {
		Alert.alert('배송상태', '완료하시겠습니까?', [
			{ text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
			{
				text    : 'OK',
				onPress : () => {
					ShippingStatus(UserID, '완료', '배송완료'), 
                    Notification(UserID, Token, Name, '배송완료'), 
                    this.props.onRefresh();
				}
			}
		]);
		//onPress 'OK'인 경우 사용자 테이블 내의 배송상태값 완료로 변경
	};
	doneAllHandler = async (building) => {
		Alert.alert('배송상태', '전체완료하시겠습니까?', [
			{ text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
			{
				text    : 'OK',
				onPress : () => {
					ShippingStatus(0, building, '배송완료'),
					Notification(0, this.props.clientData, '', '배송완료'),
					this.props.onRefresh();
				}
			}
		]);
		//onPress 'OK'인 경우 사용자 테이블 내의 배송상태값 완료로 변경
	};
    cancelAllHandler = async (building) => {
		Alert.alert(
			'배송상태',
			'전체취소하시겠습니까?',
			[
				{ text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
				{
					text    : 'OK',
					onPress : () => {
						ShippingStatus(0, building, '배송취소'),
							Notification(0, this.props.clientData, '', '배송취소'),
							this.props.onRefresh();
					}
				}
			],
			{ cancelable: false }
		);

		//onPress 'OK'인 경우 사용자 테이블 내의 배송상태값 취소로 변경
	};
	cancelHandler = async (UserID, Token, Name) => {
		Alert.alert(
			'배송상태',
			'취소하시겠습니까?',
			[
				{ text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
				{
					text    : 'OK',
					onPress : () => {
						ShippingStatus(UserID, '취소', '배송취소'),
						Notification(UserID, Token, Name, '배송취소'),
						this.props.onRefresh();
					}
				}
			],
			{ cancelable: false }
		);
		//onPress 'OK'인 경우 사용자 테이블 내의 배송상태값 취소로 변경
	};
    Item = ({ item }) => {
        const { building } = this.props;
        if(item.건물명 == building){
            return (
            <View style={styles.text}>
                <TouchableOpacity 
                    style={styles.data}
                    onPress={() => {
                        this.props.navigation.navigate('ClientDetail', {
                            clientKey : item.주문자번호
                        });
                    }}>
                    <Text style={styles.name}>{item.이름}</Text>
                    <Text style={styles.number}>{item.주문자번호}</Text>
                </TouchableOpacity>
                <View style={styles.status}>
                    <Text
                        style={{ 
                            flex : 1,
                            textAlign : 'center',
                            color: condition[item.배송현황].okColor }}
                        onPress={() => this.doneHandler(item.주문자번호, item.알림코드, item.이름)}
                    >
                        완료
                    </Text>
                    <Text
                        style={{ 
                            flex : 1,
                            textAlign : 'center',
                            color: condition[item.배송현황].noColor }}
                        onPress={() => this.cancelHandler(item.주문자번호, item.알림코드, item.이름)}
                    >
                        취소
                    </Text>
                </View>
            </View>
            );
        };
    }   
    render() {
        const { clientData } = this.props;
        return(
            <View style={styles.container}>
                <View style={{ flex : 1 }}>
                    <View style={styles.barTop}></View>
                    <View style={styles.bar}>
                        <Text style={styles.barText}>이름</Text>
                        <Text style={styles.barText}>주문자번호</Text>
                        <Text style={styles.barText}>배송상태</Text>
                    </View>
                    <View style={styles.barBottom}></View>
                </View>
                <View style={{ flex : 10 }}>
                    <FlatList 
                        data={this.props.clientData} 
                        renderItem={ this.Item } 
                        keyExtractor={(item) => item.주문자번호.toString()} 
                    />
                </View>
                <View style={styles.bottom}>   
                    <TouchableHighlight 
                        style={styles.button}
                        onPress={() => this.doneAllHandler(clientData[0].건물명)}
                    >
                        <Text>전체완료</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => this.cancelAllHandler(clientData[0].건물명)}
                    >
                        <Text>전체취소</Text>
                    </TouchableHighlight>
				</View>
            </View>
        );
    }
}
const condition = {
    배송완료  : {
        okColor : 'red',
        noColor : 'grey'
    },
    배송취소  : {
        okColor : 'grey',
        noColor : 'red'
    },
    배송중   : {
        okColor : 'black',
        noColor : 'black'
    },
    배송준비중 : {
        //팀원한테 추가하라고 말하기
        okColor : 'black',
        noColor : 'black'
    }
}; 
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff7e0'
    },
    barTop : {
        flex : 1,
        backgroundColor : '#f1bbba'
    },
    bar : {
      flex : 5,
      flexDirection : 'row',
      justifyContent : 'space-around',
      backgroundColor : '#fcf2d4'
    },
    barText : {
      paddingVertical   : 15,
      fontWeight : 'bold'
    },
    barBottom : {
      flex : 1,
      backgroundColor : '#f1bbba',
      borderBottomWidth : 1,
      borderBottomColor : '#dbcebd'
    },
    data : {
      flex : 2,
      flexDirection : 'row'
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
    name : {
      flex : 1,
      textAlign : 'center',
    },
    number : {
        flex : 1,
        textAlign : 'center',
    },
    status : {
      flex : 1,
      flexDirection : 'row',
      justifyContent : 'center'
    },
    bottom : {
        flex : 1,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-around',
        marginHorizontal : 90,
        marginBottom : 40
    },
    button : {
		borderColor : '#a79c8e',
		borderWidth : 1,
		padding     : 10,
		borderRadius: 20,
        backgroundColor : '#ccc0b1'
	}
  });