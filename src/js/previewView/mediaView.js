import React from 'react'

export default (props) => {
	const {type, src, width, height, id} = props

	switch (type) {
		case 'image': {
			return <img src={ src } width='100%' />
		}

		case 'video': {
			const videoStyle = {
				width: '100%',
				height: '100%',
				padding: '0px'
			}

			return <video controls src={ src } style={ videoStyle } />
		}

		case 'pdf': {
			const iframeStyle = {
				width: '100%',
				height: '100%'
			}

			const iframeURL = `http://docs.google.com/gview?url=${ src }&embedded=true`

			return <iframe src={ iframeURL } style={ iframeStyle } frameBorder={ 0 } />
		}

		case 'youtube': {
			const youTubeSource = `http://www.youtube.com/embed/${ id }?autoplay=0`
			return <iframe type="text/html" width={ width } height={ height } src={ youTubeSource } frameBorder={ 0 } />
		}

		case 'vimeo': {
			const vimeoSource = `http://player.vimeo.com/video/${ id }`
			const vimeoProps = {
				width, height, frameBorder: 0, webkitallowfullscreen: true, mozallowfullscreen: true, allowFullScreen: true
			}

			return <iframe src={ vimeoSource } {...vimeoProps} />
		}
	}

	return <div/>
}