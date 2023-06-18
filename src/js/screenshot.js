import 'magnific-popup/dist/jquery.magnific-popup.js';

import * as jQuery from 'jquery';
window.jQuery = jQuery;

jQuery.noConflict();
( function ( $ ) {
	$( function () {
		$( '.screenshot' ).magnificPopup( { type: 'image' } );
	} );
} )( jQuery );
