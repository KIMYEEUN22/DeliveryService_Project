import React, { Component } from 'react';
import axios from 'axios';
import ClientListView from '../../View/Admin/ClientListView';
import ipCode from '../../ipcode';
import { AntDesign, Ionicons } from '@expo/vector-icons';

export default class ClientList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userdata : [],
			clientList       : [],
			refreshing : false,
			counting   : 1
		};
	}
	onRefresh = () => {
		this.setState({ refreshing: true });
		setTimeout(() => {
			this.FetchData().then(() => {
				this.setState({ refreshing: false });
			});
		}, 2000);
	};
	FetchData = async () => {
		let ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/User`);
		this.setState({ userdata : data });
		this.getData();
	};
	getData() {
		const { building } = this.props.route.params;
		const { userdata } = this.state;
		const clientList = [];
		let index = 0;

		for (let i = 0; i < userdata.length ; i++) {
			if (userdata[i].건물명 === building) {
				clientList[index] = userdata[i];
				index++;
			}
		}
		this.setState({ clientList : clientList });
	}

	componentDidMount() {
		this.FetchData();
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
	render() {
		const { clientList } = this.state;
		const { navigation } = this.props;
		const { building } = this.props.route.params;
		return (
			this.setHeaderOptions(this.props.navigation),
			(
				<ClientListView 
						building ={building}
						clientData={clientList} 
						navigation={navigation} 
						onRefresh={this.onRefresh} 
				/>
			)
		);
	}
}
