const fs = require( 'fs' );
const { JSDOM } = require( 'jsdom' );

describe( 'Screenshots section HTML Structure', () => {
	let htmlContent;
	let dom;
	let document;

	beforeAll( () => {
		htmlContent = fs.readFileSync( './index.html', 'utf8' );
		dom = new JSDOM( htmlContent );
		document = dom.window.document;
	} );

	test( 'should have a section with class "screenshots" with container', () => {
		const screenshotsSection = document.querySelector(
			'section.screenshots'
		);
		expect( screenshotsSection ).not.toBeNull();

		const classList = Array.from( screenshotsSection.classList );
		expect( classList ).toContain( 'container' );
		expect( classList.length ).toBe( 2 );
	} );

	test( 'should have a row div inside the screenshots', () => {
		const rowDiv = document.querySelector( 'section.screenshots div.row' );
		expect( rowDiv ).not.toBeNull();
	} );

	test( 'should have two col divs inside the row', () => {
		const colDivs = document.querySelectorAll(
			'section.screenshots div.row div.col'
		);
		expect( colDivs.length ).toBe( 2 );
	} );

	test( 'the first col div should contain an image with correct attributes', () => {
		const firstColDiv = document.querySelector(
			'section.screenshots div.row div.col:first-child'
		);
		expect( firstColDiv ).not.toBeNull();

		const image = firstColDiv.querySelector( 'img' );
		expect( image ).not.toBeNull();
		expect( image.getAttribute( 'src' ) ).toBe(
			'images/resized/suggestion-form-template-455x284.png'
		);
		expect( image.getAttribute( 'alt' ) ).toBe(
			'Suggestion Form Template'
		);
		expect( parseInt( image.getAttribute( 'width' ) ) ).toBe( 455 );
		expect( parseInt( image.getAttribute( 'height' ) ) ).toBe( 284 );
		expect( image.getAttribute( 'loading' ) ).toBe( null );
	} );

	test( 'the second col div should contain an image with correct attributes', () => {
		const secondColDiv = document.querySelector(
			'section.screenshots div.row div.col:last-child'
		);
		expect( secondColDiv ).not.toBeNull();

		const image = secondColDiv.querySelector( 'img' );
		expect( image ).not.toBeNull();
		expect( image.getAttribute( 'src' ) ).toBe(
			'images/resized/form-pages-not-enabled-455x284.png'
		);
		expect( image.getAttribute( 'alt' ) ).toBe( 'Form Pages not enabled' );
		expect( parseInt( image.getAttribute( 'width' ) ) ).toBe( 455 );
		expect( parseInt( image.getAttribute( 'height' ) ) ).toBe( 284 );
		expect( image.getAttribute( 'loading' ) ).toBe( null );
	} );
} );
