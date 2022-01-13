import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';

export class GeneralLights {
	constructor(scene) {

		const light = new THREE.PointLight("#2222ff", 1);
		scene.add(light);

		this.update = function (time) {

		};
	}
}