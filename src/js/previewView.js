import {Component, default as React} from 'react'
import ReactDOM from 'react-dom'
import Mime from 'mime'
import QueryString from 'querystring'
import URL from 'url'

class PreviewView extends Component {
	constructor(props) {
		super(props)

		this.state = {
			type: null
		}
	}

	componentDidMount() {
		this.updatePreview(this.props.src)
	}

	componentWillReceiveProps(props) {
		if (props.src != this.props.src) {
			this.updatePreview(props.src)
		}
	}

	updatePreview(source) {
		var mimeType = Mime.lookup(source)

		console.log('Update preview')

		var newState = {
			type: ''
		}

		if (mimeType.indexOf('image') === 0) {
			console.log('We have an image')
			newState.type = 'image'
		} else if (mimeType.indexOf('video') === 0) {
			console.log('We have a video')
			newState.type = 'video'
		} else if (mimeType.indexOf('/pdf') > 0) {
			newState.type = 'pdf'
		} else {
			var parsedURL = URL.parse(source)
			var query = QueryString.parse(parsedURL.query)
			var lowerCaseHost = parsedURL.host.toLowerCase()

			if (lowerCaseHost.indexOf('youtube.com') >= 0) {
				newState.type = 'youtube'
				newState.ytID = query.v
			} else if (lowerCaseHost.indexOf('youtu.be') >= 0) {
				newState.type = 'youtube'
				newState.ytID = parsedURL.path.substring(1)
			} else if (lowerCaseHost.indexOf('vimeo.com') >= 0) {
				var pathSplit = parsedURL.path.split('/')

				if (pathSplit.length > 0) {
					newState.type = 'vimeo'
					newState.ytID = pathSplit[pathSplit.length - 1]
				}
			} else {
				console.log('Unknown type: ' + mimeType)
			}
		}

		this.setState(newState)
	}

	render() {
		var style = {
			width: this.props.width,
			height: this.props.height,
			overflow: 'hidden',
			background: this.props.background || 'black'
		}

		var internalView = null

		if (this.state.type === 'image') {
			internalView = <img src={ this.props.src } width='100%'/>
		} else if (this.state.type === 'video') {
			var videoStyle = {
				width: '100%',
				height: '100%',
				padding: '0px'
			}
			internalView = <video controls src={ this.props.src } style={ videoStyle }/>
		} else if (this.state.type === 'pdf') {
			var iframeStyle = {
				width: '100%',
				height: '100%'
			}

			var iframeURL = "http://docs.google.com/gview?url=" + this.props.src + "&embedded=true"

			internalView = <iframe src={ iframeURL } style={ iframeStyle } frameBorder="0"></iframe>
		} else if (this.state.type === 'youtube') {
			console.log("Embed youtube")

			var youTubeSource = "http://www.youtube.com/embed/" + this.state.ytID + "?autoplay=0"
			internalView = <iframe type="text/html" width={ this.props.width } height={ this.props.height } src={ youTubeSource } frameBorder="0"/>
		} else if (this.state.type === 'vimeo') {
			var vimeoSource = "http://player.vimeo.com/video/" + this.state.ytID

			return <iframe src={ vimeoSource } width={ this.props.width } height={ this.props.height } frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>
		}

		return <div className="preview-view" style={ style }>
			{ internalView }
		</div>
	}
}

export default PreviewView