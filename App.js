import React from 'react';
import { Text, View, Image } from 'react-native';
import Home from './Home';
import Loading from './Loading';
import QRCode from './Controller/User/QRCode';
import User from './Controller/User/UserCont';
import Booking from './Controller/User/Booking';
import Confirm from './View/User/Confirm';
import Identity from './Controller/User/Identity';
import OrderList from './Controller/User/OrderListCont';
import Map from './Controller/Admin/MapCont';
import Detail from './Controller/User/DetailCont';
import Update from './Controller/User/UpdateCont';
import AdminCode from './Controller/Admin/Code';
import Situation from './Controller/Admin/Situation';
import ClientList from './Controller/Admin/ClientListCont';
import ClientDetail from './Controller/Admin/ClientDetailCont';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Permissions from 'expo-permissions';

const Stack = createStackNavigator();
export default class extends React.Component {
	state = {
		isLoading : true
	};
	registerForPushNotificationsAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS); //접근허용묻는 함수
		if (status !== 'granted') {
			Alert.alert('not granted! you should change the mood');
			return;
		}
	};
	createStack = () => (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />		
			<Stack.Screen name="User" component={User} 
				options={{
					title            : '예약현황',
					headerStyle      : { backgroundColor: '#fff7e0' },
					headerTitleStyle : {
					fontSize : 20,
					color : '#a79c8e' 
					},
					headerTitleAlign : 'center',
					gestureEnabled   : false
				}} />		
			<Stack.Screen
				name="QRCode" component={QRCode}
				options={{
					title            : 'QR코드',
					headerStyle      : {},
					headerTitleStyle : {
						fontSize : 20
					},
					headerTitleAlign : 'center',
					gestureEnabled   : false
				}}
			/>
			<Stack.Screen
				name="Booking" component={Booking}
				options={{
					title            : '예약하기',
					headerStyle      : { backgroundColor: '#fff7e0' },
					headerTitleStyle : {
						fontSize : 20,
						color : '#a79c8e'
					},
					headerTitleAlign : 'center',
					gestureEnabled   : false
				}}
			/>
			<Stack.Screen
				name="Confirm" component={Confirm}
				options={{
					title            : '예약이 완료되었습니다',
					headerStyle      : { backgroundColor: '#fff7e0' },
					headerTitleStyle : {
						fontSize : 20,
						color : '#a79c8e'
					},
					headerTitleAlign : 'center',
					gestureEnabled   : false
				}}
			/>
			<Stack.Screen name="Identity" component={Identity} 
				options={{
					title            : '전화번호 입력',
					headerStyle      : { backgroundColor: '#fff7e0' },
					headerTitleStyle : {
					fontSize : 20,
					color : '#a79c8e' 
					},
					headerTitleAlign : 'center',
					gestureEnabled   : false
				}} />
				<Stack.Screen name="OrderList" component={OrderList} 
				options={{
					title            : '주문내역',
					headerStyle      : { backgroundColor: '#fff7e0' },
					headerTitleStyle : {
					fontSize : 20,
					color : '#a79c8e' 
					},
					headerTitleAlign : 'center',
					gestureEnabled   : false
				}} />
				<Stack.Screen name="Map" component={Map} 
				options={{
					title            : '배송추적',
					headerStyle      : { backgroundColor: '#fff7e0' },
					headerTitleStyle : {
					fontSize : 20,
					color : '#a79c8e' 
					},
					headerTitleAlign : 'center',
					gestureEnabled   : false
				}} />
				<Stack.Screen name="Detail" component={Detail} 
				options={{
					title            : '상세 주문내역',
					headerStyle      : { backgroundColor: '#fff7e0' },
					headerTitleStyle : {
					fontSize : 20,
					color : '#a79c8e' 
					},
					headerTitleAlign : 'center',
					gestureEnabled   : false
				}} />
				<Stack.Screen name="Update" component={Update} 
				options={{
					title            : '예약 수정',
					headerStyle      : { backgroundColor: '#fff7e0' },
					headerTitleStyle : {
					fontSize : 20,
					color : '#a79c8e' 
					},
					headerTitleAlign : 'center',
					gestureEnabled   : false
				}} />
			<Stack.Screen
				name="AdminCode" component={AdminCode}
				options={{
					title            : '관리자코드 입력',
					headerStyle      : { backgroundColor: '#fff7e0' },
					headerTitleStyle : {
						fontSize : 20,
						color : '#a79c8e'
					},
					headerTitleAlign : 'center',
					gestureEnabled   : false
				}}
			/>
			<Stack.Screen name="Situation" component={Situation} 
				options={{
					title            : '예약현황',
					headerStyle      : { backgroundColor: '#fff7e0' },
					headerTitleStyle : {
					fontSize : 20,
					color : '#a79c8e' 
					},
					headerTitleAlign : 'center',
					gestureEnabled   : false
			}} />
			<Stack.Screen name="ClientList" component={ClientList} 
				options={{
					title            : '예약자 리스트',
					headerStyle      : { backgroundColor: '#fff7e0' },
					headerTitleStyle : {
					fontSize : 20,
					color : '#a79c8e' 
					},
					headerTitleAlign : 'center',
					gestureEnabled   : false
			}} />
			<Stack.Screen name="ClientDetail" component={ClientDetail} 
				options={{
					title            : '예약자 상세정보',
					headerStyle      : { backgroundColor: '#fff7e0' },
					headerTitleStyle : {
					fontSize : 20,
					color : '#a79c8e' 
					},
					headerTitleAlign : 'center',
					gestureEnabled   : false
			}} />	

		</Stack.Navigator>
	);

	changeLoading = async () => {
		setTimeout(() => {
			this.setState({ isLoading: false });
		}, 2000);
	};
	componentDidMount() {
		this.changeLoading();
		this.registerForPushNotificationsAsync();
	}
	render() {
		return this.state.isLoading ? <Loading /> : <NavigationContainer>{this.createStack()}</NavigationContainer>;
	}
}