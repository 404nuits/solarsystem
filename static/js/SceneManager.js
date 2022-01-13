import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { GeneralLights } from './sceneSubjects/GeneralLights.js';
import { Sun } from './sceneSubjects/Sun.js';
import { Planet } from './sceneSubjects/Planet.js';

export class SceneManager {
    constructor(canvas) {

        const clock = new THREE.Clock();

        const screenDimensions = {
            width: canvas.width,
            height: canvas.height
        };

        const scene = buildScene();
        const renderer = buildRender(screenDimensions);
        const camera = buildCamera(screenDimensions);
        const controls = buildOrbitControls(camera, renderer);

        const sceneSubjects = createSceneSubjects(scene);


        showHelpers();
        init();

        function init() {
            camera.position.set( 0, 20, 50 );
            controls.update();
        }

        function buildScene() {
            const scene = new THREE.Scene();
            scene.background = new THREE.Color("#000");

            return scene;
        }

        function buildRender({ width, height }) {
            const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
            const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
            renderer.setPixelRatio(DPR);
            renderer.setSize(width, height);

            renderer.gammaInput = true;
            renderer.gammaOutput = true;

            return renderer;
        }

        function buildCamera({ width, height }) {
            const aspectRatio = width / height;
            const fieldOfView = 60;
            const nearPlane = 1;
            const farPlane = 1000;
            const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

            return camera;
        }

        function createSceneSubjects(scene) {

            let mercury = new Planet(scene,new THREE.TextureLoader().load('assets/erwan.png'), 0.8, 25, 0.008);
            let venus = new Planet(scene,new THREE.TextureLoader().load('assets/erwan.png'), 0.9, 28, 0.0059);
            let earth = new Planet(scene,new THREE.TextureLoader().load('assets/erwan.png'), 1, 31, 0.005);
            let mars = new Planet(scene,new THREE.TextureLoader().load('assets/erwan.png'), 0.8, 34, 0.004);
            let jupiter = new Planet(scene,new THREE.TextureLoader().load('assets/erwan.png'), 3.5, 42, 0.0022);
            let saturn = new Planet(scene,new THREE.TextureLoader().load('assets/erwan.png'), 2.9, 50, 0.0016);
            let uranus = new Planet(scene,new THREE.TextureLoader().load('assets/erwan.png'), 1.7, 56, 0.0011);
            let neptune = new Planet(scene,new THREE.TextureLoader().load('assets/erwan.png'), 1.65, 60, 0.0009);



            const sceneSubjects = [
                new GeneralLights(scene),
                new Sun(scene),
                mercury,
                venus,
                earth,
                mars,
                jupiter,
                saturn,
                uranus,
                neptune
            ];

            return sceneSubjects;
        }

        function buildOrbitControls(camera, renderer) {
            return new OrbitControls(camera, renderer.domElement);
        }

        this.update = function () {
            const elapsedTime = clock.getElapsedTime();

            for (let i = 0; i < sceneSubjects.length; i++)
                sceneSubjects[i].update(elapsedTime);

            controls.update();
            renderer.render(scene, camera);
        };

        this.onWindowResize = function () {
            const { width, height } = canvas;

            screenDimensions.width = width;
            screenDimensions.height = height;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);
        };

        function showHelpers() {
            const gridHelper = new THREE.GridHelper(200,50);
            scene.add(gridHelper);
        }
    }
}