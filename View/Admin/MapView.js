import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';

export default class Map extends React.Component {
	componentDidMount() {
		//console.log('ViewMount');
	}
	render() {
		//console.log('ViewRender');
		const { lat, lon } = this.props;
		var Lat = parseFloat(lat);
		var Lon = parseFloat(lon);
		//console.log('>>>>>>', Lat, typeof Lat);
		return (
			<View style={styles.container}>
				<MapView
					style={styles.mapStyle}
					provider="google"
					initialRegion={{
						latitude       : 36.690952,
						longitude      : 126.580483,
						latitudeDelta  : 0.005,
						longitudeDelta : 0.002
					}}
				>
					<Marker
						coordinate={{ latitude: Lat, longitude: Lon }}
						title={'his is a map'}
						description={'testing'}
					>
						<Image style={{ width: 40, height: 40 }} source={require('./dron.png')} />
						{/*console.log('ViewIcon', Lat, '+', Lon)*/}
					</Marker>
				</MapView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container : {
		flex            : 1,
		backgroundColor : '#fff',
		alignItems      : 'center',
		justifyContent  : 'center'
	},
	mapStyle  : {
		width  : Dimensions.get('window').width,
		height : Dimensions.get('window').height
	}
});
