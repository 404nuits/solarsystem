import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';

export class Galaxy {
	constructor(scene) {

        this.texture = new THREE.TextureLoader().load('assets/galaxy.png');

        // let video = document.getElementById('video');
        // video.load();
        // video.play();
        // let this.texture = new THREE.VideoTexture(video);

		this.geometry = new THREE.SphereGeometry(80,64,64);
        this.material = new THREE.MeshBasicMaterial({map: this.texture, side: THREE.BackSide, transparent: true});

        this.mesh = new THREE.Mesh(this.geometry, this.material);

		this.mesh.position.set(0, 0, 0);

		this.mesh.scale.setScalar(10);

		scene.add(this.mesh);

		this.update = function (time) {
			this.mesh.rotation.y -= 0.001;
		};
	}
}