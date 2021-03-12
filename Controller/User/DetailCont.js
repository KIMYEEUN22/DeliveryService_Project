import React, { Component } from 'react';
import { Alert } from 'react-native';
import { AntDesign,Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import ipCode from '../../ipcode';
import DetailsView from '../../View/User/DetailView';

export default class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
            time: '', 
            disable: false 
		};
    }
	getData = async (building) => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/Delivery`);
		for (var i = 0; i < data.length; i++) {
			if (data[i].건물명 == building) this.setState({ time: data[i].배송시간 });
		}
		this.checkTime();
	};
	checkTime() {
		var { time } = this.state;
		var hours = new Date().getHours();
		var min = new Date().getMinutes();
		var hoursU = parseInt(time[0]) * 10 + parseInt(time[1]);
		var minU = parseInt(time[3]) * 10 + parseInt(time[4]);
        console.log(hours, hoursU,min,minU);
		if (minU == 0) {
			if (hours >= hoursU) {
				this.setState({ disable: true });
			} else if ((hours == hoursU - 1) && (min >= 50)) {
				this.setState({ disable: true });
			}
		} else {
			if (hours > hoursU || ((hours == hoursU) && (min >= 20))) {
				this.setState({ disable: true });
			}
		}
    }
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
	handleDelete(UserID, doc, building, navigation) {
		var check = 0;
		var ip = ipCode();

		Alert.alert('예약취소', '진행하시겠습니끼?', [
			{ text: 'Cancel' },
			{
				text    : 'OK',
				onPress : () => {
					fetch(`http://${ip}:3000/delete`, {
						method  : 'POST',
						headers : {
							Accept         : 'application/json',
							'Content-Type' : 'application/json'
						},
						body    : JSON.stringify({
							UserID   : UserID,
							doc      : doc,
							building : building
						})
					});
					Alert.alert('배송취소', '완료되었습니다', [
						{
							text    : 'OK',
							onPress : () => {
								navigation.navigate('OrderList');
							}
						}
					]);
				}
			}
		]);
	}
	componentDidMount() {
		const { list } = this.props.route.params;
		this.getData(list.건물명);
	}
	render() {
		const { list } = this.props.route.params;
		return (
			this.setHeaderOptions(this.props.navigation),
			(
				<DetailsView
					list={list}
					time={this.state.time}
					disable={this.state.disable}
					navigation={this.props.navigation}
					handleDelete={this.handleDelete}
				/>
			)
		);
	}
}
