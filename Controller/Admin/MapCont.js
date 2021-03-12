import React, { Component } from 'react';
import axios from 'axios';
import Map from '../../View/Admin/MapView';
import { Ionicons } from '@expo/vector-icons';
import ipCode from '../../ipcode';
export default class MapCont extends Component {
	state = {
		lat : 0,
		lon : 0
	};
	onRefresh = () => {
		this.setState({ refreshing: true });
		setTimeout(() => {
			this.getData().then(() => {
				this.setState({ refreshing: false });
			});
		}, 1000);
	};
	getData = async () => {
		let ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3001/`);

		this.setState({ lat: data[0].lat, lon: data[1].lon });
		let hour = new Date().getHours();
		let min = new Date().getMinutes();
		let sec = new Date().getSeconds();
		let mil = new Date().getMilliseconds();

		console.log('끝', hour + '시' + min + '분' + sec + '.' + mil + '초');
	};

	setHeaderOptions(navigation) {
		navigation.setOptions({
			headerLeft  : () => (
				<Ionicons 
				name="reload-outline" 
				size={30} 
				color="#a79c8e"
				onPress={() => this.onRefresh()}
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
		let hour = new Date().getHours();
		let min = new Date().getMinutes();
		let sec = new Date().getSeconds();
		let mil = new Date().getMilliseconds();
		console.log('시작', hour + '시' + min + '분' + sec + '.' + mil + '초');
		const { lat, lon } = this.state;
		return this.setHeaderOptions(this.props.navigation), <Map lat={lat} lon={lon} refresh={this.onRefresh} />;
	}
}
