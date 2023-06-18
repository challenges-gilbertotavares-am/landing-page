const fs = require( 'fs' );
const { JSDOM } = require( 'jsdom' );

describe( 'Features section HTML Structure', () => {
	let htmlContent;
	let dom;
	let document;

	beforeAll( () => {
		htmlContent = fs.readFileSync( './index.html', 'utf8' );
		dom = new JSDOM( htmlContent );
		document = dom.window.document;
	} );

	test( 'should have a section with class "features" and "container"', () => {
		const featuresSection = document.querySelector( 'section.features' );
		expect( featuresSection ).not.toBeNull();

		const classList = Array.from( featuresSection.classList );
		expect( classList ).toContain( 'container' );
		expect( classList.length ).toBe( 2 );
	} );

	test( 'should have a h3', () => {
		const h2 = document.querySelector( 'section.features h2' );
		expect( h2 ).not.toBeNull();
		expect( h2.textContent ).toBe( 'Features' );

		expect( Array.from( h2.classList ).length ).toBe( 0 );
	} );

	test( 'should have a grid container div with appropriate classes', () => {
		const gridContainer = document.querySelector(
			'section.features div.grid'
		);
		expect( gridContainer ).not.toBeNull();

		const classList = Array.from( gridContainer.classList );
		expect( classList ).toContain( 'grid-md-2' );
		expect( classList ).toContain( 'grid-lg-3' );
		expect( classList.length ).toBe( 3 );
	} );

	test( 'should have feature divs with correct structure and content', () => {
		const expectedFeatures = [
			{
				falFa: 'eye',
				h3: 'Distraction Free Landing Pages',
				p: 'Create distraction-free landing pages that provide a seamless user experience. Streamline the focus on your forms without any unnecessary distractions.',
			},
			{
				falFa: 'paint-brush',
				h3: 'Multiple Styles to Choose From',
				p: "Select from a range of appealing styles that suit your brand and design preferences. Customize your form landing pages to align with your website's aesthetics.",
			},
			{
				falFa: 'swatchbook',
				h3: 'Pre-made & Custom Color Schemes',
				p: 'Choose from a variety of pre-made color schemes or create your own custom color scheme. Ensure that your form landing pages visually align with your brand identity.',
			},
			{
				falFa: 'image',
				h3: 'Custom Logo Support',
				p: 'Showcase your brand and professionalism by adding your own logo into your form landing pages. Enhance brand recognition and build trust among your visitors.',
			},
			{
				falFa: 'smile-beam',
				h3: 'No Coding Knowledge Required',
				p: 'No coding skills? No problem! Form Pages Pro simplifies the process, enabling anyone to create professional form landing pages without coding expertise.',
			},
			{
				falFa: 'check-circle',
				h3: 'Quick & Easy Setup',
				p: 'Set up your form landing pages quickly and effortlessly. Form Pages Pro provides a user-friendly interface, enabling smooth and efficient setup.',
			},
		];

		const actualFeatures = document.querySelectorAll(
			'section.features div.feature'
		);
		expect( actualFeatures.length ).toBe( expectedFeatures.length );

		let expectedFeature = null;
		actualFeatures.forEach( ( feature, index ) => {
			expectedFeature = expectedFeatures[ index ];

			// Only one class.
			const featureClassList = Array.from( feature.classList );
			expect( featureClassList.length ).toBe( 2 );

			// Icon.
			const icon = feature.querySelector( 'div.icon i.fal' );
			expect( icon.getAttribute( 'aria-hidden' ) ).toBe( 'true' );
			expect( icon ).not.toBeNull();
			const iconClassList = Array.from( icon.classList );
			expect( iconClassList ).toContain(
				`fa-${ expectedFeature.falFa }`
			);
			expect( iconClassList.length ).toBe( 2 );

			// Heading.
			const h3 = feature.querySelector( 'h3' );
			expect( h3 ).not.toBeNull();
			const h3ExpectedText = expectedFeature.h3;
			const h3FormattedActualText = h3.innerHTML
				.replace( /<br\s*\/?>/, '\n' )
				.replace( /&amp;/, '&' );
			expect( h3FormattedActualText ).toBe( h3ExpectedText );
			const h3ClassList = Array.from( h3.classList );
			expect( h3ClassList.length ).toBe( 0 );

			// Paragraph.
			const p = feature.querySelector( 'p' );
			expect( p ).not.toBeNull();
			const pExpectedText = expectedFeature.p;
			const pFormattedActualText = p.textContent
				.trim()
				.split( '\n' )
				.map( ( line ) => line.trim() )
				.join( ' ' );
			expect( pFormattedActualText ).toBe( pExpectedText );
			const pClassList = Array.from( p.classList );
			expect( pClassList.length ).toBe( 0 );
		} );
	} );
} );
