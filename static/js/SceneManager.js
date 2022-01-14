import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/postprocessing/UnrealBloomPass.js';

import { ShaderPass } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/shaders/FXAAShader.js';

import { GeneralLights } from './sceneSubjects/GeneralLights.js';
import { Sun } from './sceneSubjects/Sun.js';
import { Planet } from './sceneSubjects/Planet.js';
import { Galaxy } from './sceneSubjects/Galaxy.js';

export class SceneManager {
    constructor(canvas) {

        const clock = new THREE.Clock();

        const canvasSize = {
            width: canvas.width,
            height: canvas.height
        };

        let focus = 'sun';
        

        let darkMaterial = new THREE.MeshBasicMaterial({color: 0x000000});

        const scene = buildScene();
        const renderer = buildRender(canvasSize);
        const camera = buildCamera(canvasSize);
        const controls = buildOrbitControls(camera, renderer);

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const renderScene = buildRenderPass(scene,camera);
        
        const bloomPass = buildBloomPass(canvasSize);
        const bloomComposer = buildEffectComposer(renderer);
        bloomComposer.renderToScreen = false;

        const shaderPass = buildShaderPass(FXAAShader);

        bloomComposer.addPass(renderScene);
        //bloomComposer.addPass(shaderPass);
        bloomComposer.addPass(bloomPass);

        const finalPass = buildFinalPass(bloomComposer);
        const finalComposer = buildEffectComposer(renderer);
        finalComposer.addPass(renderScene);
        finalComposer.addPass(shaderPass);
        finalComposer.addPass(finalPass);

        const sceneSubjects = createSceneSubjects(scene);

        // buildGUI();

        // showHelpers();
        init();

        function init() {




            camera.position.set( 0, 20, 50 );
            camera.lookAt(sceneSubjects[5].mesh.position);
            controls.update();
            bloomComposer.render();




            document.addEventListener('pointerdown', onPointerDown);



        }

        function onPointerDown(event) {
            mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
            raycaster.setFromCamera( mouse, camera );
            var intersects = raycaster.intersectObjects( scene.children );
            if ( intersects.length > 1 ) {
                focus = intersects[0].object.name;
            }
        }

        function buildGUI() {

            // const gui = new GUI();
            // const focusFolder = gui.addFolder('Focus');
            // focusFolder.add(controls.target)


            let btnEarth = document.getElementById('focusEarth');
            let btnSun = document.getElementById('focusSun');

            btnEarth.addEventListener('click', () => {
                console.log('Earth focus !');
                focus = 'earth';
            });

            btnSun.addEventListener('click', () => {
                focus = 'sun';
            });
        }

        function buildFinalPass(bloomComposer) {
            let finalPass = new ShaderPass(
                new THREE.ShaderMaterial( {
                  uniforms: {
                    baseTexture: { value: null },
                    bloomTexture: { value: bloomComposer.renderTarget2.texture }
                  },
                  vertexShader: document.getElementById( 'vertexshader' ).textContent,
                  fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
                  defines: {}
                } ), "baseTexture"
              );
              finalPass.needsSwap = true;
              return finalPass;
        }

        function buildShaderPass(shader) {
            return new ShaderPass(shader);
        }

        function buildRenderPass(scene, camera) {
            return new RenderPass(scene, camera);
        }

        function buildEffectComposer(renderer) {

            let effectComposer = new EffectComposer(renderer);
            effectComposer.setSize(1920, 1080);
            effectComposer.renderToScreen = true;

            return effectComposer;
        }


        function buildBloomPass({width, height}) {


            let bloom_params = {
                exposure: 1,
                bloomStrength: 1.5,
                bloomThreshold: 0,
                bloomRadius: 1.1
            }

            let bloomPass = new UnrealBloomPass(
                new THREE.Vector2(width, height),
                1.5,
                0.4,
                0.85
            );
            bloomPass.threshold = bloom_params.bloomThreshold;
            bloomPass.strength = bloom_params.bloomStrength;
            bloomPass.radius = bloom_params.bloomRadius;
            return bloomPass;
        }


        function buildScene() {
            const scene = new THREE.Scene();
            scene.background = new THREE.Color("#000");

            return scene;
        }

        function buildRender({ width, height }) {
            const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false });
            const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
            renderer.setPixelRatio(DPR);
            renderer.setSize(width, height);
            renderer.setClearColor(0x000000,0.0);

            return renderer;
        }

        function buildCamera({ width, height }) {
            const aspectRatio = width / height;
            const fieldOfView = 60;
            const nearPlane = 0.1;
            const farPlane = 1000;
            const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

            return camera;
        }

        function createSceneSubjects(scene) {

            let mercury = new Planet('mercury',scene,new THREE.TextureLoader().load('assets/erwan.png'), 0.8, 25, 0.008);
            let venus = new Planet('venus',scene,new THREE.TextureLoader().load('assets/erwan.png'), 0.9, 28, 0.0059);
            let earth = new Planet('earth',scene,new THREE.TextureLoader().load('assets/erwan.png'), 1, 31, 0.005);
            let mars = new Planet('mars',scene,new THREE.TextureLoader().load('assets/erwan.png'), 0.8, 34, 0.004);
            let jupiter = new Planet('jupiter',scene,new THREE.TextureLoader().load('assets/erwan.png'), 3.5, 42, 0.0022);
            let saturn = new Planet('saturn',scene,new THREE.TextureLoader().load('assets/erwan.png'), 2.9, 50, 0.0016);
            let uranus = new Planet('uranus',scene,new THREE.TextureLoader().load('assets/erwan.png'), 1.7, 56, 0.0011);
            let neptune = new Planet('neptune',scene,new THREE.TextureLoader().load('assets/erwan.png'), 1.65, 60, 0.0009);

            const sceneSubjects = [
                new GeneralLights(scene),
                new Galaxy(scene),
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
            let controls = new OrbitControls(camera, renderer.domElement);

            controls.minDistance = 30;
            controls.maxDistance = 200;
            controls.enablePan = true;
            controls.enableDamping = true;
            controls.dampingFactor = 0.1;
            controls.rotateSpeed = 0.5;

            return controls;
        }

        function followObject() {

            let x,y,z = 0;
            let index = 2;

            if (focus == 'sun') {
                index = 2;
            } else if (focus == 'mercury') {
                index = 3;
            }else if (focus == 'venus') {
                index = 4;
            }else if (focus == 'earth') {
                index = 5;
            }else if (focus == 'mars') {
                index = 6;
            }else if (focus == 'jupiter') {
                index = 7;
            }else if (focus == 'saturn') {
                index = 8;
            }else if (focus == 'uranus') {
                index = 9;
            }else if (focus == 'neptune') {
                index = 10;
            }
  

            x = sceneSubjects[index].mesh.position.x
            y = sceneSubjects[index].mesh.position.y
            z = sceneSubjects[index].mesh.position.z

            controls.target.set(x,y,z);
        }

        this.update = function () {
            const elapsedTime = clock.getElapsedTime();

            for (let i = 0; i < sceneSubjects.length; i++) {
                sceneSubjects[i].update(elapsedTime);
            }

            followObject();
            controls.update();


            
            for (let i = 0; i < sceneSubjects.length; i++) {
                if (sceneSubjects[i] instanceof Planet) {
                    sceneSubjects[i].mesh.material = darkMaterial;
                }
            }
            bloomComposer.render();
            for (let i = 0; i < sceneSubjects.length; i++) {
                if (sceneSubjects[i] instanceof Planet) {
                    sceneSubjects[i].mesh.material = sceneSubjects[i].material;
                }
            }
            finalComposer.render();


            //renderer.render(scene, camera);

        };

        this.onWindowResize = function () {
            const { width, height } = canvas;

            canvasSize.width = width;
            canvasSize.height = height;

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