import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import classnames from 'classnames';
import Logger from '../Logger';
import utils from '../utils';
import UserChip from './UserChip';
import settingsManager from '../settingsManager';

const logger = new Logger('Dialer');

export default class Dialer extends React.Component {
	constructor(props) {
		super(props);

		this.state =
		{
			uri: props.callme || ''
		};
	}

	render() {
		const state = this.state;
		const props = this.props;
		const settings = props.settings;

		return (
			<div data-component='Dialer'>
				<div className='userchip-container'>
					<UserChip
						name={settings.display_name}
						uri={settings.uri || ''}
						status={props.status}
						fullWidth
					/>
				</div>

				<form
					className={classnames('uri-form', { hidden: props.busy && utils.isMobile() })}
					action=''
					onSubmit={this.handleSubmit.bind(this)}
				>
					<div className='uri-container'>
						<TextField
							hintText='SIP URI or username'
							fullWidth
							disabled={!this._canCall()}
							value={state.uri}
							onChange={this.handleUriChange.bind(this)}
						/>
					</div>

					<RaisedButton
						label='Call'
						primary
						disabled={!this._canCall() || !state.uri}
						onClick={this.handleClickCall.bind(this)}
					/>

					<RaisedButton
						label='VRS'
						primary
						disabled={!this._canCall() || !state.uri}
						onClick={this.handleVRSClickCall.bind(this)}
					/>
				</form>
			</div>
		);
	}

	handleUriChange(event) {
		this.setState({ uri: event.target.value });
	}

	handleSubmit(event) {
		logger.debug('handleSubmit()');

		event.preventDefault();

		if (!this._canCall() || !this.state.uri)
			return;

		this._doCall();
	}

	handleClickCall() {
		logger.debug('handleClickCall()');

		this._doCall();
	}

	handleVRSClickCall() {
		logger.debug('handleClickCall()');

		this._doVRSCall();
	}

	_doCall() {
		var uri = this.state.uri;

		logger.debug('_doCall() [uri:"%s"]', uri);

		if (!uri.includes("sip:")) {
			uri = "sip:" + uri;
			logger.debug('Bye: ', uri);
		} else if (!uri.includes("@")) {
			uri = uri + "@" + settingsManager.getDefaultDomain()
		}

		if (uri.includes("@undefined")) {
			uri = uri.replace("@undefined", "") + "@" + settingsManager.getDefaultDomain()
		}



		logger.debug('Calling URI: ' + uri);

		this.setState({ uri: '' });
		this.props.onCall(uri);
	}

	_doVRSCall() {
		var uri = this.state.uri;

		logger.debug('_doVRSCall() [uri:"%s"]', uri);
		var tempURI = uri;

		tempURI = "sip:" + uri + "@" + settingsManager.getDefaultVRSDomain();
		uri = tempURI;
		logger.debug('_doVRSCall() [uri:"%s"]', tempURI);

		if (!uri.includes("sip:")) {
			uri = "sip:" + uri;
		}

		if (uri.includes("@undefined")) {
			uri = uri.replace("@undefined", "") + "@" + settingsManager.getDefaultVRSDomain();
		}

		logger.debug('Calling URI: ' + uri);

		this.setState({ uri: '' });
		this.props.onCall(tempURI);
	}

	_canCall() {
		const props = this.props;

		return (
			!props.busy &&
			(props.status === 'connected' || props.status === 'registered')
		);
	}
}

Dialer.propTypes =
{
	settings: PropTypes.object.isRequired,
	status: PropTypes.string.isRequired,
	busy: PropTypes.bool.isRequired,
	callme: PropTypes.string,
	onCall: PropTypes.func.isRequired
};
