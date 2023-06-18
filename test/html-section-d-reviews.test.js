const fs = require( 'fs' );
const { JSDOM } = require( 'jsdom' );

describe( 'Reviews section HTML Structure', () => {
	let htmlContent;
	let dom;
	let document;

	beforeAll( () => {
		htmlContent = fs.readFileSync( './index.html', 'utf8' );
		dom = new JSDOM( htmlContent );
		document = dom.window.document;
	} );

	test( 'should have a section with class "reviews"', () => {
		const reviewsSection = document.querySelector( 'section.reviews' );
		expect( reviewsSection ).not.toBeNull();
	} );

	test( 'should have a container div inside the reviews section', () => {
		const containerDiv = document.querySelector(
			'section.reviews div.container'
		);
		expect( containerDiv ).not.toBeNull();
	} );

	test( 'should have three review divs inside the container', () => {
		const reviewDivs = document.querySelectorAll(
			'section.reviews div.container > div.row > div.col'
		);
		expect( reviewDivs.length ).toBe( 3 );
	} );

	test( 'each review should have a figure with blockquote and figcaption', () => {
		const reviewFigures = document.querySelectorAll(
			'section.reviews div.container figure.review'
		);
		expect( reviewFigures.length ).toBe( 3 );

		reviewFigures.forEach( ( figure ) => {
			const blockquote = figure.querySelector( 'blockquote' );
			expect( blockquote ).not.toBeNull();

			const figcaption = figure.querySelector( 'figcaption' );
			expect( figcaption ).not.toBeNull();
		} );
	} );

	test( 'each review blockquote should have a paragraph with the review content', () => {
		const blockquotes = document.querySelectorAll(
			'section.reviews div.container figure.review blockquote'
		);
		expect( blockquotes.length ).toBe( 3 );

		const expectedQuotes = [
			`"The user interface is very smooth, and quite quick. It does open a separate screen for form creation and editing, but I suspect it does this to improve flow and speed."`,
			`"WPForms is by far the easiest form plugin to use. My clients love it - its one of the few plugins they can use without any training. As a developer I appreciate how fast, modern, clean and extensible it is."`,
			`"I use this plugin on several sites and it works great. It is intuitive and easy to use and I recommend it."`,
		];

		blockquotes.forEach( ( blockquote, index ) => {
			const p = blockquote.querySelector( 'p' );
			expect( p ).not.toBeNull();
			const formattedActualText = p.textContent
				.trim()
				.split( '\n' )
				.map( ( line ) => line.trim() )
				.join( ' ' );
			expect( formattedActualText ).toBe( expectedQuotes[ index ] );
		} );
	} );

	test( 'each review figcaption should have the reviewer name and star rating', () => {
		const figcaptions = document.querySelectorAll(
			'section.reviews div.container figure.review figcaption'
		);
		expect( figcaptions.length ).toBe( 3 );

		const expectedReviewers = [ 'WebEndev', 'Bill Erickson', 'cikorsky' ];
		const expectedRatings = [ '5', '5', '5' ];

		figcaptions.forEach( ( figcaption, index ) => {
			const reviewerSpan = figcaption.querySelector( 'span' );
			expect( reviewerSpan ).not.toBeNull();
			expect( reviewerSpan.textContent.trim() ).toBe(
				expectedReviewers[ index ]
			);

			const ratingStrong = figcaption.querySelector( 'strong.rating' );
			expect( ratingStrong ).not.toBeNull();
			expect( ratingStrong.textContent.trim() ).toBe(
				expectedRatings[ index ]
			);
		} );
	} );

	test( 'should have a paragraph with class "btns"', () => {
		const ctaParagraph = document.querySelector( 'p.btns' );
		expect( ctaParagraph ).not.toBeNull();
	} );

	test( 'should have two CTA buttons inside the container', () => {
		const ctaButtons = document.querySelectorAll(
			'section.reviews div.container p.btns a.btn'
		);
		expect( ctaButtons.length ).toBe( 2 );
	} );

	test( 'should have a "Try the Demo" button', () => {
		const tryDemoButton = document.querySelector(
			'section.reviews .btns .btn-soft-secondary'
		);
		expect( tryDemoButton ).not.toBeNull();
		expect( tryDemoButton.textContent ).toBe( 'Try the Demo' );
		expect( tryDemoButton.target ).toBe( '_blank' );
		expect( tryDemoButton.href ).toBe(
			'https://wpforms.com/form-pages-demo/'
		);
		expect( tryDemoButton.getAttribute( 'role' ) ).toBe( 'button' );
	} );

	test( 'should have a "Get WPForms Now" button', () => {
		const getWPFormsButton = document.querySelector(
			'section.reviews .btns .btn-primary'
		);
		expect( getWPFormsButton ).not.toBeNull();
		expect( getWPFormsButton.textContent ).toBe( 'Get WPForms Now' );
		expect( getWPFormsButton.getAttribute( 'target' ) ).toBeFalsy();
		expect( getWPFormsButton.href ).toBe( 'https://wpforms.com/pricing/' );
		expect( getWPFormsButton.getAttribute( 'role' ) ).toBe( 'button' );
	} );
} );
