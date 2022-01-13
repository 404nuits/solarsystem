import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';

export class Sun {
	constructor(scene) {

        let texture = new THREE.TextureLoader().load('assets/moi.png');
		let geometry = new THREE.SphereGeometry(1,32,32);
        let material = new THREE.MeshBasicMaterial({
        map: texture
        });
        let mesh = new THREE.Mesh(geometry, material);

		mesh.position.set(0, 0, 0);

		mesh.scale.setScalar(10);

		scene.add(mesh);

		this.update = function (time) {
			mesh.rotation.y += 0.005;
		};
	}
}