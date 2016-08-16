import {Component, default as React} from 'react'
import ReactDOM from 'react-dom'
import Mime from 'mime'
import QueryString from 'querystring'
import URL from 'url'
import MediaView from './mediaView.js'

const mediaInfoFromURL = (source) => {
	const mimeType = Mime.lookup(source)

	if (mimeType.indexOf('image') === 0) {
		return { type: 'image' }
	} else if (mimeType.indexOf('video') === 0) {
		return { type: 'video' }
	} else if (mimeType.indexOf('/pdf') > 0) {
		return { type: 'pdf' }
	} else {
		const parsedURL = URL.parse(source)
		const query = QueryString.parse(parsedURL.query)
		const lowerCaseHost = parsedURL.host.toLowerCase()

		if (lowerCaseHost.indexOf('youtube.com') >= 0) {
			return {
				type: 'youtube',
				id: query.v
			}
		} else if (lowerCaseHost.indexOf('youtu.be') >= 0) {
			return {
				type: 'youtube',
				id: parsedURL.path.substring(1)
			}
		} else if (lowerCaseHost.indexOf('vimeo.com') >= 0) {
			const pathSplit = parsedURL.path.split('/')

			return {
				type: 'vimeo',
				id: pathSplit[pathSplit.length - 1]
			}
		}
	}

	return null
}

const PreviewView = (props) => {
	const {src, width, height, background} = props

	const style = {
		width: width,
		height: height,
		overflow: 'hidden',
		background: background || 'black'
	}

	let mediaInfo = mediaInfoFromURL(src)
	let mediaView = null

	if (mediaInfo) {
		mediaInfo.src = src
		mediaInfo.width = width
		mediaInfo.height = height

		mediaView = <MediaView {...mediaInfo} />
	}

	return <div className="preview-view" style={ style }>{ mediaView }</div>
}

export default PreviewView