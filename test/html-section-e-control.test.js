const fs = require( 'fs' );
const { JSDOM } = require( 'jsdom' );

describe( 'Screenshot section HTML Structure', () => {
	let htmlContent;
	let dom;
	let document;

	beforeAll( () => {
		htmlContent = fs.readFileSync( './index.html', 'utf8' );
		dom = new JSDOM( htmlContent );
		document = dom.window.document;
	} );

	test( 'should have a section with class "control"', () => {
		const controlSection = document.querySelector( 'section.control' );
		expect( controlSection ).not.toBeNull();
	} );

	test( 'should have a container div inside the control section', () => {
		const containerDiv = document.querySelector(
			'section.control div.container'
		);
		expect( containerDiv ).not.toBeNull();
	} );

	test( 'should have a row div inside the container', () => {
		const rowDiv = document.querySelector(
			'section.control div.container div.row'
		);
		expect( rowDiv ).not.toBeNull();
	} );

	test( 'should have two col divs inside the row', () => {
		const colDivs = document.querySelectorAll(
			'section.control div.container div.row div.col'
		);
		expect( colDivs.length ).toBe( 2 );
	} );

	test( 'the first col div should contain an image with correct attributes', () => {
		const firstColDiv = document.querySelector(
			'section.control div.container div.row div.col:first-child'
		);
		expect( firstColDiv ).not.toBeNull();

		const image = firstColDiv.querySelector( 'img' );
		expect( image ).not.toBeNull();
		expect( image.getAttribute( 'src' ) ).toBe(
			'images/resized/form-pages-settings-panel-content-457x608.png'
		);
		expect( image.getAttribute( 'alt' ) ).toBe(
			'Panel Content of Form Pages Setting'
		);
		expect( parseInt( image.getAttribute( 'width' ) ) ).toBe( 457 );
		expect( parseInt( image.getAttribute( 'height' ) ) ).toBe( 608 );
		expect( image.getAttribute( 'loading' ) ).toBe( null );
	} );

	test( 'the second col div should contain a heading and a paragraph', () => {
		const secondColDiv = document.querySelector(
			'section.control div.container div.row div.col:last-child'
		);
		expect( secondColDiv ).not.toBeNull();

		const heading = secondColDiv.querySelector( 'h2' );
		expect( heading ).not.toBeNull();
		expect( heading.textContent.trim() ).toBe(
			'Gain Control of Your Forms'
		);

		const paragraph = secondColDiv.querySelector( 'p' );
		expect( paragraph ).not.toBeNull();
		const expectedText =
			'The biggest challenge with WordPress forms until now ' +
			'has been that all form layouts are controlled by ' +
			"WordPress themes, and most themes simply don't " +
			'prioritize form layouts. And worst, a lot of them ' +
			'lack the ability to create custom landing ' +
			'pages. WPForms Form Pages addon fixes this problem, ' +
			"so you don't have to settle for mediocre form layouts " +
			'and low form conversions… With Form Pages, you can ' +
			'instantly create a custom landing page for any of ' +
			'your WordPress forms by simply enabling the Form ' +
			'Page Mode from your Form Settings. You can add your ' +
			'logo, choose from two different high-converting form ' +
			"styles, pick a color scheme and that's it. Your " +
			'distraction-free custom form landing page is ready to ' +
			'be shared.';
		const formattedActualText = paragraph.textContent
			.trim()
			.split( '\n' )
			.map( ( line ) => line.trim() )
			.join( ' ' );
		expect( formattedActualText ).toBe( expectedText );
	} );
} );
