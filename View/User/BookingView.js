import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Button, Alert } from 'react-native';
import { TextInput, TouchableHighlight, ScrollView } from 'react-native-gesture-handler';

class BookingView extends React.Component {
	render() {
        const { building, paper } = this.props;
		return (
            <View style={styles.container}>
                <View style={styles.parts}>
                    <Text style={styles.text}>이름</Text>
                    <TextInput
                        style={styles.textbox}
                        placeholder="이름을 입력하세요."
                        placeholderTextColor="#696969"
                        backgroundColor = "#f1bbba"
                        onChangeText={(text) => {
                            this.Name = text;
                        }}
                        value={this.Name}
                        maxLength={10}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View style={styles.parts}>
                    <Text style={styles.text}>전화번호</Text>
                    <TextInput
                        style={styles.textbox}
                        placeholder="전화번호를 입력하세요."
                        placeholderTextColor="#696969"
                        backgroundColor = "#f1bbba"
                        onChangeText={(text) => {
                            this.Phone = text;
                        }}
                        value={this.Phone}
                        maxLength={11}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View style={styles.parts}>
                    <Text style={styles.text}>최종목적지</Text>
                    <TextInput
                        style={styles.textbox}
                        placeholder="최종목적지를 입력하세요."
                        placeholderTextColor="#696969"
                        backgroundColor = "#f1bbba"
                        onChangeText={(text) => {
                            this.desti_1 = text;
                        }}
                        value={this.desti_1}
                        maxLength={30}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View style={styles.parts}>
                    <Text style={styles.text}>서류수량</Text>
                    <TextInput
                        style={styles.textbox}
                        placeholder="서류수량을 입력하세요."
                        placeholderTextColor="#696969"
                        backgroundColor = "#f1bbba"
                        onChangeText={(text) => {
                            this.doc = text;
                        }}
                        value={this.doc}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View style={styles.parts}>
					<TouchableHighlight
                        style={styles.button}
						onPress={() => {
							this.props.saveButton(this.Name, this.Phone, this.desti_1, this.doc);
						}}
					>
						<Text>확인</Text>
					</TouchableHighlight>
				</View>
            </View>
		);
	}
}
export default BookingView;

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        backgroundColor : '#fff7e0'
    },
    parts : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    text : {
        paddingVertical : 20,
        fontWeight : 'bold',
        fontSize : 18,
        color : '#998e81'
    },
    textbox : {
		width : 250,
		height : 40,
		borderColor : '#a79c8e',
		borderWidth: 1,
		borderRadius: 20,
		textAlign: 'center'
    },
    button : {
		borderColor : '#a79c8e',
		borderWidth : 1,
		padding     : 10,
		borderRadius: 20,
	}
});