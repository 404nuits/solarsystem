import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';

export class Planet {
	constructor(scene, map, scale, distance=50, speed=0.01) {

		let geometry = new THREE.SphereGeometry(1,32,32);
        let material = new THREE.MeshBasicMaterial({
        map: map
        });
        let mesh = new THREE.Mesh(geometry, material);

        mesh.scale.setScalar(scale);
		mesh.position.set(distance, 0, 0);

		scene.add(mesh);


        let t = 0;

		this.update = function (time) {
			mesh.rotation.y += 0.03;

            t += speed;

            mesh.position.x = distance*Math.cos(t) + 0;
            mesh.position.z = distance*Math.sin(t) + 0;
		};
	}
}