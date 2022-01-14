import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';

export class Galaxy {
	constructor(scene) {

        let texture = new THREE.TextureLoader().load('assets/galaxy.png');
		let geometry = new THREE.SphereGeometry(80,64,64);
        let material = new THREE.MeshBasicMaterial({map: texture, side: THREE.BackSide, transparent: true});

        let mesh = new THREE.Mesh(geometry, material);

		mesh.position.set(0, 0, 0);

		mesh.scale.setScalar(10);

		scene.add(mesh);

		this.update = function (time) {
			mesh.rotation.y -= 0.001;
		};
	}
}