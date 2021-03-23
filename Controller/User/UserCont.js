import React, { useEffect } from 'react';
import axios from 'axios';
import { AntDesign, Feather } from '@expo/vector-icons';
import ipcode from '../../ipcode';
import UserView from '../../View/User/UserView';

class User extends React.Component{
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
          <Feather 
            name="user" 
            size={30} 
            color="#a79c8e"
            onPress={() => navigation.navigate('Identity')}
            style={{ paddingRight: 20 }} />
        )
      });
    }
    getData = async() => {
        let ip = ipcode();
        const { data } = await axios.get(`http://${ip}:3000/Delivery`);
        this.setState({ delivery : data });
        
      };
    componentDidMount() {
	  	this.getData();
    }

    render() {
        return(
          this.setHeaderOptions(this.props.navigation),
          <UserView data={this.state.delivery} navigation={this.props.navigation} />
        );
    }
}
export default User;