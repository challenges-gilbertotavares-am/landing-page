const fs = require( 'fs' );
const { JSDOM } = require( 'jsdom' );

describe( 'Alternative section HTML Structure', () => {
	let htmlContent;
	let dom;
	let document;

	beforeAll( () => {
		htmlContent = fs.readFileSync( './index.html', 'utf8' );
		dom = new JSDOM( htmlContent );
		document = dom.window.document;
	} );

	test( 'should have a section with class "alternative" with container', () => {
		const alternativeSection = document.querySelector(
			'section.alternative'
		);
		expect( alternativeSection ).not.toBeNull();

		const classList = Array.from( alternativeSection.classList );
		expect( classList ).toContain( 'container' );
		expect( classList.length ).toBe( 2 );
	} );

	test( 'should have an h2 element with the correct text', () => {
		const heading = document.querySelector( 'section.alternative h2' );
		expect( heading ).not.toBeNull();
		const formattedActualText = heading.textContent
			.trim()
			.split( '\n' )
			.map( ( line ) => line.trim() )
			.join( ' ' );
		expect( formattedActualText ).toBe(
			'Form Pages: An Exceptional Google Forms Alternative for WordPress!'
		);
	} );

	test( 'should have a lead paragraph with the correct text', () => {
		const leadParagraph = document.querySelector(
			'section.alternative p.lead'
		);
		expect( leadParagraph ).not.toBeNull();
		const formattedActualText = leadParagraph.textContent
			.trim()
			.split( '\n' )
			.map( ( line ) => line.trim() )
			.join( ' ' );
		expect( formattedActualText ).toBe(
			'Form Pages by WPForms is an exceptional Google Forms alternative for WordPress, and you can use it to create custom landing pages for:'
		);
	} );

	test( 'should have a grid div inside the container', () => {
		const gridDiv = document.querySelector(
			'section.alternative div.grid'
		);
		expect( gridDiv ).not.toBeNull();
	} );

	test( 'should have three feature divs inside the grid', () => {
		const featureDivs = document.querySelectorAll(
			'section.alternative div.grid div.feature'
		);
		expect( featureDivs.length ).toBe( 3 );
	} );

	test( 'each feature div should have the correct icon, heading, and paragraph', () => {
		const expectedFeatures = [
			{
				fal: 'fa-envelope',
				heading: 'Lead Generation',
				p: 'Make subscribing to your email list super simple for users by creating a webpage dedicated solely to signing up.',
			},
			{
				fal: 'fa-poll',
				heading: 'Surveys',
				p: 'Whether it be a survey to gauge customer loyalty, an employee satisfaction survey, or an event feedback form, having a webpage.',
			},
			{
				fal: 'fa-id-badge',
				heading: 'Membership Sites',
				p: 'Create a form landing web page on your site with user registration and login forms, making it easier on people to sign up and login to your.',
			},
		];

		const featureDivs = document.querySelectorAll(
			'section.alternative div.grid div.feature'
		);
		expect( featureDivs.length ).toBe( expectedFeatures.length );

		featureDivs.forEach( ( featureDiv, index ) => {
			const expectedFeature = expectedFeatures[ index ];

			// Icon.
			const icon = featureDiv.querySelector( 'div.icon i.fal' );
			expect( icon ).not.toBeNull();
			expect( icon.getAttribute( 'aria-hidden' ) ).toBe( 'true' );
			expect( icon.classList ).toContain( expectedFeature.fal );

			// Heading.
			const heading = featureDiv.querySelector( 'h3' );
			expect( heading ).not.toBeNull();
			expect( heading.textContent.trim() ).toBe(
				expectedFeature.heading
			);

			// Paragraph.
			const paragraph = featureDiv.querySelector( 'p' );
			expect( paragraph ).not.toBeNull();
			const formattedActualText = paragraph.textContent
				.trim()
				.split( '\n' )
				.map( ( line ) => line.trim() )
				.join( ' ' );
			expect( formattedActualText ).toBe( expectedFeature.p );
		} );
	} );
} );
