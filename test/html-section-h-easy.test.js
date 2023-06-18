const fs = require( 'fs' );
const { JSDOM } = require( 'jsdom' );

describe( 'Easy section HTML Structure', () => {
	let htmlContent;
	let dom;
	let document;

	beforeAll( () => {
		htmlContent = fs.readFileSync( './index.html', 'utf8' );
		dom = new JSDOM( htmlContent );
		document = dom.window.document;
	} );

	test( 'should have a section with class "easy" with container', () => {
		const easySection = document.querySelector( 'section.easy' );
		expect( easySection ).not.toBeNull();

		const classList = Array.from( easySection.classList );
		expect( classList ).toContain( 'container' );
		expect( classList.length ).toBe( 2 );
	} );

	test( 'should have an h2 element with the correct text', () => {
		const h2 = document.querySelector( 'section.easy h2' );
		expect( h2 ).not.toBeNull();
		expect( h2.textContent ).toBe(
			'Creating Form Landing Pages Made Easy with WPForms!'
		);
	} );

	test( 'should have a lead paragraph with the correct text', () => {
		const leadParagraph = document.querySelector( 'section.easy p.lead' );
		expect( leadParagraph ).not.toBeNull();
		const formattedActualText = leadParagraph.textContent
			.trim()
			.split( '\n' )
			.map( ( line ) => line.trim() )
			.join( ' ' );
		expect( formattedActualText ).toBe(
			'We took the pain out of creating form landing pages and made it easy.'
		);
	} );

	test( 'should have a regular paragraph with a link', () => {
		const paragraph = document.querySelector( 'section.easy p:not(.lead)' );
		expect( paragraph ).not.toBeNull();

		const link = paragraph.querySelector( 'a' );
		expect( link ).not.toBeNull();
		expect( link.getAttribute( 'href' ) ).toBe(
			'https://wpforms.com/pricing/'
		);
		expect( link.textContent ).toBe(
			'Create custom form landing pages with WPForms today!'
		);
	} );
} );
