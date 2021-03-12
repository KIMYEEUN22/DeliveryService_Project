import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import ipCode from '../../ipcode';
import ClientDetailView from '../../View/Admin/ClientDetailView';

export default class ClientDetail extends React.Component{
    constructor(props) {
		super(props);
		this.state = {
            clientData : '' 
		};
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
		});
    }
    getData = async (orderKey) => {
		var ip = ipCode();
		const { data } = await axios.get(`http://${ip}:3000/User`);
		for (var i = 0; i < data.length; i++) {
			if (data[i].주문자번호 == orderKey) this.setState({ clientData: data[i] });
		}
	};
    componentDidMount() {
		const { clientKey } = this.props.route.params;
		this.getData(clientKey);
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
        return (
			this.setHeaderOptions(this.props.navigation),
			<ClientDetailView 
				clientData={this.state.clientData} 
                navigation={this.props.navigation} />	
        );
    }
}