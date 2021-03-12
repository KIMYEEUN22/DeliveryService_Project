import React, { Component } from 'react';
import { Alert } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import ipCode from '../../ipcode';
import axios from 'axios';
import UpdateView from '../../View/User/UpdateView';

export default class Update extends Component {
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
		this.setState({ delivery : data });
	};
	checkPaper(building, prevPaper, updatePaper) {
		var checking;
		const data = this.state.delivery;
		for (var i = 0; i < data.length; i++) {
			if (data[i].건물명 == building) {
				checking = parseInt(updatePaper) + parseInt(data[i].서류현황) - parseInt(prevPaper);
			}
		}
		console.log(">>>>>>>",updatePaper,prevPaper,data);
		if (updatePaper <= 50 && checking <= 100) {
			return checking;
		} else {
			return 0;
		}
	}
	saveButton = async (list, name, phone, desti_1, doc) => {
		this.setState({ check: false });
		if (name == null) name = list.이름;
		if (phone == null) phone = list.전화번호;
		if (desti_1 == null) desti_1 = list.배송지;
		if (doc == null) doc = list.서류수량;

		var UserID = list.주문자번호;
		var building = list.건물명;
		var prevPaper = list.서류수량;
		var ip = ipCode();
		var checking = this.checkPaper(building, prevPaper, doc);
		console.log(doc);
		if (checking != 0) {
			fetch(`http://${ip}:3000/update`, {
				method  : 'POST',
				headers : {
					Accept         : 'application/json',
					'Content-Type' : 'application/json'
				},
				body    : JSON.stringify({
					UserID   : UserID,
					Name     : name,
					Phone    : phone,
					desti_1  : desti_1,
					doc      : doc,
					finalDoc : checking,
					building : building
				})
			});
			Alert.alert(
				'예약정보수정',
				'완료되었습니다',
				[
					{
						text    : 'OK',
						onPress : () => {
							list.이름 = null;
							this.props.navigation.navigate('Confirm', {
								name       : name,
								phone      : phone,
								desti      : desti_1,
								doc        : doc,
								navigation : 'OrderList'
							});
						}
					}
				],
				{ cancelable: false }
			);
		} else {
			Alert.alert('서류수량초과', '예약가능한 서류수량 초과하였습니다.', [
				{
					text    : 'OK',
					onPress : () => {}
				}
			]);
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
		this._unsubscribe = this.props.navigation.addListener('focus', () => {
			this.onRefresh();
		});
    }
    onRefresh = () => {
		this.setState({ refreshing: true });
		this.getData().then(() => {
			this.setState({ refreshing: false });
		});
    }; 
	componentWillUnmount() {
		this._unsubscribe();
	}
	render() {
		const { list } = this.props.route.params;
		return (
			this.setHeaderOptions(this.props.navigation),
			<UpdateView list={list} navigation={this.props.navigation} saveButton={this.saveButton} />
		);
	}
}
