import React from 'react';
import axios from 'axios';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ipCode from '../../ipcode';

class AdminCode extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			code  : '',
			num   : []
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
		this.setState({ code: text });
		console.log(this.state.code);
    };
    getData = async () => {
		let ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/Admin`);
		this.setState({ num: data });
		console.log(this.state.num);
    };
    login = (inputnum) => {
		let check = 0;
		for (let i = 0; i < this.state.num.length; i++) {
			if (inputnum == this.state.num[i].관리자번호) {
                this.props.navigation.navigate('Situation', { adminKey: this.state.num[i].건물명 });
				check = 1;
			} else if (inputnum == 2020000) {
				this.props.navigation.navigate('Status', { adminKey: this.state.num[i].건물명 });
			}
		}
		if (check == 0) alert('잘못된 코드번호 입니다.');
    };
    componentDidMount() {
		this.getData();
	}
     render() {
         return(
			this.setHeaderOptions(this.props.navigation),			 
			<View style={styles.container}>
				<View style={styles.top}>
		            <Text style={styles.text}>코드 번호를 입력해주세요</Text>
				</View>
				<View style={styles.center}>
					<TextInput
						style={styles.textbox}
						placeholder="code number"
						placeholderTextColor="#696969"
						backgroundColor = "#f1bbba"
						onChangeText={this.handlePassword}
					/>
				</View>
				<View style={styles.bottom}>
					<TouchableOpacity 
						style={styles.button}
						onPress={() => this.login(this.state.code)}>
						<Text>확인</Text>
					</TouchableOpacity>
				</View>
            </View>
        );
    }
}
export default AdminCode;

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