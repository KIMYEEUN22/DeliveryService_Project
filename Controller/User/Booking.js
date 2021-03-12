import React, { Component } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import { Notifications } from 'expo';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import BookingView from '../../View/User/BookingView';
import ipCode from '../../ipcode';

class Book extends Component {
	constructor(props) {
		super(props);
		this.state = {
			delivery : '',
			expoPushToken : ''
		};
	}
	getData = async () => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/Delivery`);
		this.getPaperInform(data);
		this.setState({ delivery : data });
	};
	getPaperInform(data) {
		const { building } = this.props.route.params;
		let paper;
		for (var i = 0; i < data.length; i++){
			if (data[i].건물명 == building)
				paper = data[i].서류현황
		}
		paper = `${100-paper}/100`;
		
	}
	checkPaper(building, doc) {
		console.log('checking', building, doc);
		var check;
		const totalPaper = this.state.delivery;
		for (var i = 0; i < totalPaper.length; i++) {
			if (totalPaper[i].건물명 == building) {
				check = parseInt(doc) + parseInt(totalPaper[i].서류현황);
				console.log('checking value', check);
			}
		}
		if (doc <= 50 && check <= 100) {
			return 1;
		} else {
			return 0;
		}
	}
	checkInfo(name, phone, desti_1, doc) {
		if (name != null && phone != null && desti_1 != null && doc != null) return true;
		else return false;
	}
	saveButton = async (name, phone, desti_1, doc) => {
		console.log('saving..');
		var ip = ipCode();
		const { building } = this.props.route.params;
		let token = await Notifications.getExpoPushTokenAsync();
		var checkInfo = this.checkInfo(name, phone, desti_1, doc);
		var check = this.checkPaper(building, doc);
		if (checkInfo) {
			if (check == 1) {
				fetch(`http://${ip}:3000/booking`, {
					method  : 'POST',
					headers : {
						Accept         : 'application/json',
						'Content-Type' : 'application/json'
					},
					body    : JSON.stringify({
						Name          : name,
						Phone         : phone,
						desti_1       : desti_1,
						doc           : doc,
						building      : building,
						expoPushToken : token
					})
				});
				Alert.alert(
					'예약진행',
					'완료되었습니다',
					[
						{
							text    : 'OK',
							onPress : () => {
								this.props.navigation.navigate('Confirm', {
									name       : name,
									phone      : phone,
									desti      : desti_1,
									doc        : doc,
									navigation : 'User'
								});
							}
						}
					],
					{ cancelable: false }
				);
			} else {
				Alert.alert('서류수량초과', '가능한 서류수량을 초과하였습니다. 확인 부탁드립니다.');
			}
		} else {
			Alert.alert('정보 입력 오류', '필수 정보를 모두 입력해주세요!');
		}
	};

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
		  headerRight : () => (
			<Ionicons 
			name="arrow-back-circle-outline" 
			size={35} 
			color="#a79c8e"
			onPress={() => navigation.goBack()}
			style={{ paddingRight: 20 }}
		/>
		)
		});
	  }
	componentDidMount() {
		this.getData();
	}
	render() {
		const {building, paper } = this.state;
		return (
			this.setHeaderOptions(this.props.navigation),
			<BookingView saveButton={this.saveButton} building={building} paper ={paper} />
		);
	}
}
export default Book;