import {Component, default as React} from 'react'
import ReactDOM from 'react-dom'
import Preview from './previewView.js'

var testMedia = {
	pdf: "http://infolab.stanford.edu/pub/papers/google.pdf",
	image: "http://images.apple.com/v/supplier-responsibility/m/overview/images/overview_hero_new_medium_2x.jpg",
	video: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
	youtube: "https://www.youtube.com/watch?v=XNdNLNFZBmk",
	"youtube-short": "https://youtu.be/1mXMnn_VvBQ",
	"vimeo": "https://vimeo.com/channels/staffpicks/150531350"
}

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			src: props.src,
			srcText: props.src
		}
	}

	updateSource() {
		this.setState({
			src: this.state.srcText
		})
	}

	onChange(event) {
		console.log('On Change')
		
		this.setState({
			srcText: event.target.value
		})
	}

	test(mediaKey) {
		return (event) => {
			var mediaSource = testMedia[mediaKey]

			this.setState({
				src: mediaSource,
				srcText: mediaSource
			})
		}
	}

	render() {
		var updateButtonClass = 'btn btn-primary disabled'

		return <div style={{width: '600px', marginLeft: 10, marginTop: 10}}>
			<Preview background='white' width='600px' height='330px' src={ this.state.src } />
			<div className="form-group form-inline" style={{marginTop: 10}}>
				<input ref='sourceInput' className='form-control' type='text' value={ this.state.srcText } style={{width:'80%'}} onChange={ this.onChange.bind(this) } />
				<button className='btn btn-primary' onClick={ this.updateSource.bind(this) } style={{marginLeft: 10}}>Update</button>
			</div>
			<div className="form-group">
				<button className="btn btn-default" style={{marginRight: 10}} onClick={ this.test('image') }>Image</button>
				<button className="btn btn-default" style={{marginRight: 10}} onClick={ this.test('video') }>Video</button>
				<button className="btn btn-default" style={{marginRight: 10}} onClick={ this.test('pdf') }>PDF</button>
				<button className="btn btn-default" style={{marginRight: 10}} onClick={ this.test('youtube') }>YouTube</button>
				<button className="btn btn-default" style={{marginRight: 10}} onClick={ this.test('youtube-short') }>YouTube Short</button>
				<button className="btn btn-default" style={{marginRight: 10}} onClick={ this.test('vimeo') }>Vimeo</button>
			</div>
		</div>
	}
}

// Test Video
// ReactDOM.render(<App src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"/>, document.getElementById('content'))

// Test Image
// ReactDOM.render(<App src="http://images.apple.com/v/supplier-responsibility/m/overview/images/overview_hero_new_medium_2x.jpg"/>, document.getElementById('content'))

// Test PDF
ReactDOM.render(<App src={ testMedia.pdf }/>, document.getElementById('content'))

// <iframe src="http://docs.google.com/gview?url=http://infolab.stanford.edu/pub/papers/google.pdf&embedded=true" style="width:600px; height:500px;" frameborder="0"></iframe>