import React, { Component } from 'react';
import { StyleSheet, View, Alert, Text, ImageBackground } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class DetailView extends Component{
    checkIfAvailable(check, disable, list) {
		const navigation = this.props.navigation;
		console.log('>>>', disable);
		if (check == '수정') {
			if (disable) Alert.alert('예약수정', '수정 불가합니다.');
			else this.props.navigation.navigate('Update', { list: list });
		} else {
			if (disable) Alert.alert('예약취소', '취소 불가합니다.');
			else this.props.handleDelete(list.주문자번호, list.서류수량, list.건물명, navigation);
		}
	}
    render(){
        const { list, disable } = this.props;
        return(
            <View style={styles.container}>
                <ImageBackground 
                    source={require('../../JUEUN.png')} 
                    imageStyle={{ 
                        opacity : 0.1,
                        resizeMode : 'center',
                        marginHorizontal : 40
                   }}  
                    style={styles.image}>
                    <View style={styles.parts}>
						<Text style={styles.text}>이름</Text>		
						<Text style={styles.data}>{list.이름}</Text>
                    </View>
                    <View style={styles.parts}>
                        <Text style={styles.text}>전화번호</Text>
                        <Text style={styles.data}>{list.전화번호}</Text>
                    </View>
                    <View style={styles.parts}>
                        <Text style={styles.text}>최종목적지</Text>
                        <Text style={styles.data}>{list.배송지}</Text>
                    </View>
                    <View style={styles.parts}>
                        <Text style={styles.text}>서류수량</Text>
                        <Text style={styles.data}>{list.서류수량}</Text>
                    </View>
                    <View style={styles.parts}>
                        <Text style={styles.text}>주문번호</Text>
                        <Text style={styles.data}>{list.주문자번호}</Text>
                    </View>
                    <View style={styles.bottom}>   
                        <TouchableHighlight 
                            style={styles.button}
                            onPress={() => this.checkIfAvailable('수정', disable, list)}
                        >
                            <Text>예약수정</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => this.checkIfAvailable('취소', disable, list)}
                        >
                            <Text>예약취소</Text>
                        </TouchableHighlight>
				    </View>
                </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#fff7e0'
    },
    image : {
        flex : 1
    },
    parts : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    bottom : {
        flex : 1,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-around',
        marginHorizontal : 90
    },
    text : {
        paddingVertical : 20,
        fontWeight : 'bold',
        fontSize : 20,
        color : '#eb9f9f'
    },
    data : {
        fontSize : 18,
        color : '#756b5d'
    },
    button : {
		borderColor : '#a79c8e',
		borderWidth : 1,
		padding     : 10,
		borderRadius: 20,
        backgroundColor : '#ccc0b1'
	}
});