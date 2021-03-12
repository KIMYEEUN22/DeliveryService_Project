import React, { Component } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, View, Image, Text, ImageBackground } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class MyPageView extends Component{
    setHeaderOptions(navigation) {
		navigation.setOptions({
            headerLeft  : () => (
                <AntDesign 
                  name="home"  
                  size={30} 
                  color="#a79c8e"
                  onPress={() => navigation.navigate('Home')}
                  style={{ paddingLeft: 20 }} />
              ),
		});
    }
    render(){
        const {name, phone, desti, doc, navigation} = this.props.route.params;
        this.setHeaderOptions(this.props.navigation)
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
						<Text style={styles.data}>{name}</Text>
                    </View>
                    <View style={styles.parts}>
                        <Text style={styles.text}>전화번호</Text>
                        <Text style={styles.data}>{phone}</Text>
                    </View>
                    <View style={styles.parts}>
                        <Text style={styles.text}>최종목적지</Text>
                        <Text style={styles.data}>{desti}</Text>
                    </View>
                    <View style={styles.parts}>
                        <Text style={styles.text}>서류수량</Text>
                        <Text style={styles.data}>{doc}</Text>
                    </View>
                    <View style={styles.parts}>
					<TouchableHighlight
                        style={styles.button}
						onPress={() => this.props.navigation.navigate(`${navigation}`)}
					>
						<Text>확인</Text>
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
	}
});