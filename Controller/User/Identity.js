import React from 'react';
import axios from 'axios';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ipCode from '../../ipcode';

export default class Identity extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			access : '',
			phoneNum   : []
		};
    }
    setHeaderOptions(navigation) {
		navigation.setOptions({
			headerLeft  : () => (
				<Ionicons 
                name="arrow-back-circle-outline" 
                size={35} 
                color="#a79c8e"
				onPress={() => navigation.goBack()}
				style={{ paddingLeft: 20 }}
				/>
			)
		});
    }
    handlePassword = (text) => {
		this.setState({ access : text });
		console.log(this.state.access);
    };
    getData = async () => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/User`);
		this.setState({ phoneNum : data });
    };
    login = (inputnum) => {
		var check = 0;
		for (var i = 0; i < this.state.phoneNum.length; i++) {
            if (inputnum == this.state.phoneNum[i].전화번호) {
                this.props.navigation.navigate('OrderList', { IdentityKey : this.state.phoneNum[i].전화번호 });
				check = 1;
			} 
		}
		if (check == 0) alert('해당 번호가 존재하지 않습니다.');
    };
    componentDidMount() {
		this.getData();
	}
     render() {
         return(
			this.setHeaderOptions(this.props.navigation),			 
			<View style={styles.container}>
				<View style={styles.top}>
		            <Text style={styles.text}>전화번호를 입력해주세요</Text>
				</View>
				<View style={styles.center}>
					<TextInput
						style={styles.textbox}
						placeholder="phone number"
						placeholderTextColor="#696969"
						backgroundColor = "#f1bbba"
						onChangeText={this.handlePassword}
					/>
				</View>
				<View style={styles.bottom}>
					<TouchableOpacity 
						style={styles.button}
						onPress={() => this.login(this.state.access)}>
						<Text>확인</Text>
					</TouchableOpacity>
				</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
	container : {
		flex: 1,
		alignItems : "center",
		justifyContent : "center",
        backgroundColor: '#fff7e0'
	},
	top : {
		flex : 1,
		justifyContent : "flex-end"
	},
	text : {
		color : '#998e81',
		fontSize : 20,
		fontWeight : 'bold'
	},
	center : {
		flex : 1,
		justifyContent : "flex-start",
		paddingTop : 30
	},
	textbox : {
		width       : 250,
		height : 50,
		borderColor : '#a79c8e',
		borderWidth: 1,
		borderRadius: 20,
		textAlign: 'center'
	},
	bottom : {
		flex : 1
	},
	button : {
		borderColor : '#a79c8e',
		borderWidth : 1,
		padding     : 10,
		borderRadius: 20,
	}
});