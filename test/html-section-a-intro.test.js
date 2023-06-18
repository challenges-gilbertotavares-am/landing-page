const fs = require( 'fs' );
const { JSDOM } = require( 'jsdom' );

describe( 'Intro section HTML Structure', () => {
	let htmlContent;
	let dom;
	let document;

	beforeAll( () => {
		htmlContent = fs.readFileSync( './index.html', 'utf8' );
		dom = new JSDOM( htmlContent );
		document = dom.window.document;
	} );

	test( 'should have a section with class "intro"', () => {
		const introSection = document.querySelector( 'section.intro' );
		expect( introSection ).not.toBeNull();
	} );

	test( 'should have a container div inside the intro section', () => {
		const containerDiv = document.querySelector(
			'section.intro .container'
		);
		expect( containerDiv ).not.toBeNull();
	} );

	test( 'should have a title', () => {
		expect( document.title ).toBe(
			'Form Landing Pages for WordPress by WPForms (Simple & Easy)'
		);
	} );

	test( 'should have an h1 element with text "Form Pages"', () => {
		const h1 = document.querySelector( 'h1' );
		const expectedText = 'Form Pages ';
		const h1Text = h1.textContent.replace(
			h1.querySelector( '.badge' ).textContent,
			''
		);
		expect( h1Text ).toBe( expectedText );
	} );

	test( 'should have a badge in h1 element with text "Pro"', () => {
		const badge = document.querySelector( 'h1 sup.badge' );
		expect( badge.textContent ).toBe( 'Pro' );
	} );

	test( 'should have a description div with a paragraph', () => {
		const descriptionDiv = document.querySelector(
			'section.intro .container div.description'
		);
		expect( descriptionDiv ).not.toBeNull();

		const p = descriptionDiv.querySelector( 'p' );
		const expectedText =
			'Want to improve your form conversions? Form Pages by WPForms allows you to create completely custom "distraction-free" form landing pages to boost conversions (without writing any code).';
		const formattedActualText = p.textContent
			.trim()
			.split( '\n' )
			.map( ( line ) => line.trim() )
			.join( ' ' );
		expect( formattedActualText ).toBe( expectedText );
	} );

	test( 'should have a paragraph with class "btns"', () => {
		const ctaParagraph = document.querySelector( 'section.intro p.btns' );
		expect( ctaParagraph ).not.toBeNull();
	} );

	test( 'should have a "Try the Demo" button', () => {
		const tryDemoButton = document.querySelector(
			'section.intro .btns .btn.btn-lg.btn-soft-secondary'
		);
		expect( tryDemoButton ).not.toBeNull();

		expect( Array.from( tryDemoButton.classList ).length ).toBe( 3 );

		expect( tryDemoButton.textContent ).toBe( 'Try the Demo' );
		expect( tryDemoButton.target ).toBe( '_blank' );
		expect( tryDemoButton.href ).toBe(
			'https://wpforms.com/form-pages-demo/'
		);
		expect( tryDemoButton.getAttribute( 'role' ) ).toBe( 'button' );
	} );

	test( 'should have a "Get WPForms Now" button', () => {
		const getWPFormsButton = document.querySelector(
			'section.intro .btns .btn.btn-lg.btn-primary'
		);
		expect( getWPFormsButton ).not.toBeNull();

		expect( Array.from( getWPFormsButton.classList ).length ).toBe( 3 );

		expect( getWPFormsButton.textContent ).toBe( 'Get WPForms Now' );
		expect( getWPFormsButton.getAttribute( 'target' ) ).toBeFalsy();
		expect( getWPFormsButton.href ).toBe( 'https://wpforms.com/pricing/' );
		expect( getWPFormsButton.getAttribute( 'role' ) ).toBe( 'button' );
	} );

	test( 'should have two CTA buttons', () => {
		const ctaButtons = document.querySelectorAll(
			'section.intro p.btns a.btn'
		);
		expect( ctaButtons.length ).toBe( 2 );
	} );
} );
