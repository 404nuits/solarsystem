import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';

export class GeneralLights {
	constructor(scene) {

		const pointLight = new THREE.PointLight("#2222ff", 1);
		
		const ambientLight = new THREE.AmbientLight(0xffffff,0.1);

		pointLight.position.set(0,0,0)

		scene.add(pointLight,ambientLight);

		this.update = function (time) {

		};
	}
}