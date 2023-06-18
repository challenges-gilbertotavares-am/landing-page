// Function to extract YouTube video ID from the URL
function extractYouTubeVideoId( url ) {
	const protocol = '(?:https?:\\/\\/)?';
	const www = '(?:www\\.)?';
	const domain = '(?:youtube\\.com\\/watch\\?v=|youtu\\.be\\/)';
	const videoId = '[\\w-]{11}';

	const patternString = `^${ protocol }${ www }${ domain }(${ videoId })`;
	// Regular expression pattern to match YouTube video URLs
	const pattern = new RegExp( patternString );

	// Extract the video ID using the pattern
	const match = url.match( pattern );

	// Return the video ID or null if no match was found
	return match ? match[ 1 ] : null;
}

document.addEventListener( 'DOMContentLoaded', function () {
	const videoLinks = document.querySelectorAll( '.video > a' );

	videoLinks.forEach( function ( videoLink ) {
		videoLink.addEventListener( 'click', function ( event ) {
			const videoContainer = videoLink.parentElement;

			event.preventDefault();

			// Get the href value of the clicked link
			const href = videoLink.href;

			// Extract the YouTube video ID from the href
			const videoId = extractYouTubeVideoId( href );

			if ( videoId ) {
				const videoHolder = document.createElement( 'div' );
				videoHolder.classList.add( 'video-holder' );

				const iframe = document.createElement( 'iframe' );
				iframe.setAttribute(
					'src',
					`https://www.youtube.com/embed/${ videoId }?autoplay=1`
				);
				iframe.setAttribute( 'allowfullscreen', '' );
				iframe.setAttribute( 'frameborder', 0 );
				iframe.setAttribute( 'allow', 'autoplay' );

				videoHolder.appendChild( iframe );

				videoContainer.appendChild( videoHolder );
			}
		} );
	} );
} );
