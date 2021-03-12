import React from 'react';
import axios from 'axios';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import ipcode from '../../ipcode';
import OrderListView from '../../View/User/OrderListView';

export default class OrderList extends React.Component{
    constructor(props) {
		super(props);
		this.state = {
			userData  : ''
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
    getData = async() => {
        var ip = ipcode();
        const { data } = await axios.get(`http://${ip}:3000/User`);
        this.setState({ userData : data });
      };
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
      const { IdentityKey } = this.props.route.params;
        return(
          this.setHeaderOptions(this.props.navigation),
          <OrderListView 
            data={this.state.userData}
            IdentityKey={IdentityKey} 
            navigation={this.props.navigation} />
        );
    }
}