import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';

import { Lensflare, LensflareElement } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/objects/Lensflare.js';

export class GeneralLights {
	constructor(scene) {

		//const pointLight = new THREE.PointLight("#2222ff", 1);
		
		const ambientLight = new THREE.AmbientLight(0xffffff,0.1);



		const textureFlare0 = new THREE.TextureLoader().load('assets/lensflare0.png');
		const textureFlare3 = new THREE.TextureLoader().load('assets/lensflare3.png');

		// addLight( 0.995, 0.1, 0.1, 0, 11, 0 );


		function addLight( h, s, l, x, y, z ) {

			const light = new THREE.PointLight( 0xffffff, 0.5, 50 );
			light.color.setHSL( h, s, l );
			light.position.set( x, y, z );
			scene.add( light );

			const lensflare = new Lensflare();
			lensflare.addElement( new LensflareElement( textureFlare0, 700, 0, light.color ) );
			lensflare.addElement( new LensflareElement( textureFlare3, 60, 0.6 ) );
			lensflare.addElement( new LensflareElement( textureFlare3, 70, 0.7 ) );
			lensflare.addElement( new LensflareElement( textureFlare3, 120, 0.9 ) );
			lensflare.addElement( new LensflareElement( textureFlare3, 70, 1 ) );
			light.add( lensflare );

		}


		// pointLight.position.set(0,0,0)

		scene.add(ambientLight);

		this.update = function (time) {

		};
	}
}