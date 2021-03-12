import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';

class QRCode extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasPermission : null,
			scanned       : false
		};
	}
	getPermission = async () => {
		try {
			await BarCodeScanner.requestPermissionsAsync();
			this.setState({ hasPermission: 'granted' });
		} catch (error) {
			Alert.alert('사용자 설정에서 허가를 확인해주세요.');
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
	handleBarCodeScanned = ({ type, data }) => {
		const { building } = this.props.route.params;
		this.setState({ scanned: true });
		if (data == 'https://qrco.de/bbVpz7') {
			this.props.navigation.navigate('Booking', { building: building });
		} else {
			Alert.alert(
				"code is wrong. Tap to Scan Again",
				"",
				[
					{
						text : "retry",
						onPress : () => this.setState({ scanned: false })
					}
				]
			);
		};
	};
	componentDidMount() {
		this.getPermission();
	}
	render() {
		return (
			this.setHeaderOptions(this.props.navigation),
			<View style={{ flex : 1}}>
				<BarCodeScanner
					onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
					style={styles.container}>
					<View style={styles.layerVertical} />
					<View style={styles.layerCenter}>
						<View style={styles.layerHorizon} />
						<View style={styles.focused} />
						<View style={styles.layerHorizon} />
					</View>
					<View style={styles.layerVertical} />
				</BarCodeScanner>
			</View>
		);
	}
}
export default QRCode;
const opacity = 'rgba(0, 0, 0, .7)';
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  layerVertical: {
    flex: 1,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row'
  },
  layerHorizon: {
    flex: 2,
    backgroundColor: opacity
  },
  focused: {
    flex: 8
  }
});