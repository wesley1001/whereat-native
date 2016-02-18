import React, {Component, Text, DeviceEventEmitter, NativeModules} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {locationChanged} from '../redux/modules/location';

const LOSTLocationProvider = NativeModules.LOSTLocationProvider;

export default class App extends Component {
	componentWillMount() {
		LOSTLocationProvider.startLocationPolling(500, 0.1, LOSTLocationProvider.HIGH_ACCURACY);

		this.locationChangedListener = DeviceEventEmitter.addListener(
			'location_changed',
			(location) => this.props.locationChanged({
				...location,
				lastUpdatedTime: new Date().getTime()
			})
		);
	}

	render() {
		return (
			<Text>
				<Text>{'\n' + this.props.location.latitude + '\n'}</Text>
				<Text>{this.props.location.longitude + '\n'}</Text>
				<Text>{this.props.location.lastUpdatedTime}</Text>
			</Text>
		);
	}
}

function mapStateToProps(state) {
	return {
		location: state.location.currentLocation
	};
}

function mapDispatchToProps(dispatch) {
	return {
		locationChanged: bindActionCreators(locationChanged, dispatch)
	};
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);
