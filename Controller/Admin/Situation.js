import React from 'react';
import axios from 'axios';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import ipcode from '../../ipcode';
import SituationView from '../../View/Admin/SituationView';

class Situation extends React.Component{
    constructor(props) {
		super(props);
		this.state = {
            delivery  : ''
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
    FetchData = async() => {
        let ip = ipcode();
        const { data } = await axios.get(`http://${ip}:3000/Delivery`);
        this.setState({ delivery : data });
      };
    componentDidMount() {
		this.FetchData();
		this._unsubscribe = this.props.navigation.addListener('focus', () => {
			this.onRefresh();
		});
    }
    onRefresh = () => {
		this.setState({ refreshing: true });
		this.FetchData().then(() => {
			this.setState({ refreshing: false });
		});
    }; 
	componentWillUnmount() {
		this._unsubscribe();
	}
    render() {
        const { adminKey } = this.props.route.params;
        return(
          this.setHeaderOptions(this.props.navigation),
          <SituationView 
            data={this.state.delivery} 
            adminKey={adminKey}
            navigation={this.props.navigation} />
        );
    }
}
export default Situation;