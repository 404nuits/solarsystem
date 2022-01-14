import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';

export class Sun {
	constructor(scene) {

        let texture = new THREE.TextureLoader().load('assets/sun.jpg');
		let geometry = new THREE.SphereGeometry(1,32,32);
		let color = new THREE.Color("#FDB813");
        let material = new THREE.MeshBasicMaterial({map: texture, color: color, vertexColors: true, transparent: true, opacity: 1});

		material.depthWrite = false;

        this.mesh = new THREE.Mesh(geometry, material);

		this.mesh.name = "sun";

		// this.mesh.callback = function() {
		// 	console.log('clicked !');
		// }
		
		this.mesh.position.set(0, 0, 0);
		
		this.mesh.scale.setScalar(10);
	
		scene.add(this.mesh);
		

		this.update = function (time) {
			this.mesh.rotation.y += 0.005;
		};
	}
}