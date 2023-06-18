const fs = require( 'fs' );
const { JSDOM } = require( 'jsdom' );

describe( 'Hero section HTML Structure', () => {
	let htmlContent;
	let dom;
	let document;

	beforeAll( () => {
		htmlContent = fs.readFileSync( './index.html', 'utf8' );
		dom = new JSDOM( htmlContent );
		document = dom.window.document;
	} );

	test( 'should have a section with class "hero"', () => {
		const heroSection = document.querySelector( 'section.hero' );
		expect( heroSection ).not.toBeNull();
	} );

	test( 'should have a container div inside the hero section', () => {
		const containerDiv = document.querySelector(
			'section.hero div.container'
		);
		expect( containerDiv ).not.toBeNull();
	} );

	test( 'should have a video div inside the container div', () => {
		const videoDiv = document.querySelector(
			'section.hero div.container div.video'
		);
		expect( videoDiv ).not.toBeNull();
	} );

	test( 'should have an anchor tag inside the video div', () => {
		const anchorTag = document.querySelector(
			'section.hero div.container div.video a'
		);
		expect( anchorTag ).not.toBeNull();
		expect( anchorTag.href ).toBe(
			'https://www.youtube.com/watch?v=mUGYPlAgJPw'
		);
		expect( anchorTag.target ).toBe( '_blank' );
	} );

	test( 'should have an image inside the anchor tag', () => {
		const image = document.querySelector(
			'section.hero div.container div.video a img'
		);
		expect( image ).not.toBeNull();
		expect( image.src ).toBe( 'images/full/video-thumbnail.png' );
		expect( image.alt ).toBe( 'Form Pages in WordPress' );
		expect( parseInt( image.width ) ).toBe( 960 );
		expect( parseInt( image.height ) ).toBe( 540 );
		expect( image.getAttribute( 'loading' ) ).toBe( null );
		expect( image.classList.length ).toBe( 0 );
	} );

	test( 'should have a play button div inside the anchor tag', () => {
		const playButtonDiv = document.querySelector(
			'section.hero div.container div.video a div.play'
		);
		expect( playButtonDiv ).not.toBeNull();

		const playButtonInner = playButtonDiv.querySelectorAll( '*' );
		expect( playButtonInner.length ).toBe( 1 );

		const playButtonIcon = playButtonDiv.querySelectorAll( 'i' );
		const classList = Array.from( playButtonIcon[ 0 ].classList );
		expect( classList ).toContain( 'fas' );
		expect( classList ).toContain( 'fa-play' );
		expect( classList.length ).toBe( 2 );
		expect( playButtonIcon[ 0 ].getAttribute( 'aria-hidden' ) ).toBe(
			'true'
		);
	} );
} );
