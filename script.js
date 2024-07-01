import "./lib/addons/OrbitControls.js"
import { GLTFLoader } from "./lib/addons/GLTFLoader.js"

function main() {
    // Configuração da cena
    var width = window.innerWidth - 150;
    var height = window.innerHeight - 150;
    var scene = new THREE.Scene();

    // Fonte de luz
    var pointLight = generatePointLight(0xffffff, 1);
    pointLight.name = "light";
    pointLight.position.y = 5;
    scene.add(pointLight);

    // Modelos 3D 
    var loader = new GLTFLoader();
    // Ilhas
    loader.load("models/Island.glb", function(gltf) {
        var model = gltf.scene;
        applyPhongShading(model);
        scene.add(model);
    });
    loader.load("models/Medium Island.glb", function(gltf) {
        var model = gltf.scene;
        applyPhongShading(model);
        model.position.z = -5;
        scene.add(model);
    });
    loader.load("models/Large Island.glb", function(gltf) {
        var model = gltf.scene;
        applyPhongShading(model);
        model.position.x = -5;
        scene.add(model);
    });
    loader.load("models/Medium Island.glb", function(gltf) {
        var model = gltf.scene;
        applyPhongShading(model);
        model.position.z = 5;
        model.rotation.y = Math.PI/2;
        scene.add(model);
    });
    loader.load("models/Large Island.glb", function(gltf) {
        var model = gltf.scene;
        applyPhongShading(model);
        model.position.x = 5;
        model.rotation.y = Math.PI/2;
        scene.add(model);
    });
    // Ilha inferior direita
    loader.load("models/Tree.glb", function(gltf) {
        var model = gltf.scene;
        applyPhongShading(model);
        model.position.set(5.3, 1.4, 0.2);
        scene.add(model);
    });
    loader.load("models/Tree.glb", function(gltf) {
        var model = gltf.scene;
        applyPhongShading(model);
        model.position.set(4.7, 1.4, -0.3);
        model.rotation.y = Math.PI/4;
        model.scale.set(0.8, 0.8, 0.8);
        scene.add(model);
    });
    loader.load("models/Small Rock.glb", function(gltf) {
        var model = gltf.scene;
        applyPhongShading(model);
        model.position.set(4.8, 1.4, 0);
        model.scale.set(0.5, 0.5, 0.3);
        scene.add(model);
    });
    loader.load("models/Large Rock.glb", function(gltf) {
        var model = gltf.scene;
        applyPhongShading(model);
        model.position.set(5, 1.4, -0.1);
        model.scale.set(0.5, 0.5, 0.5);
        scene.add(model);
    });
    loader.load("models/Large Rock.glb", function(gltf) {
        var model = gltf.scene;
        applyPhongShading(model);
        model.position.set(5.3, 1.4, -0.3);
        model.scale.set(0.4, 0.4, 0.5);
        model.rotation.y = Math.PI/2;
        scene.add(model);
    });
    // Ilha inferior esquerda
    loader.load("models/Tree.glb", function(gltf) {
        var model = gltf.scene;
        applyPhongShading(model);
        model.position.set(-0.3, 1.5, 5.3);
        model.scale.set(1.5, 1.5, 1.5);
        scene.add(model);
    });
    loader.load("models/Large Rock.glb", function(gltf) {
        var model = gltf.scene;
        applyPhongShading(model);
        model.position.set(0.3, 1.5, 4.8);
        model.scale.set(0.7, 0.7, 0.7);
        scene.add(model);
    });
    loader.load("models/Small Rock.glb", function(gltf) {
        var model = gltf.scene;
        applyPhongShading(model);
        model.position.set(0.3, 1.5, 5.3);
        model.scale.set(0.7, 0.6, 0.4);
        scene.add(model);
    });
    // Ilha superior esquerda
    loader.load("models/Tree.glb", function(gltf) {
        var model = gltf.scene;
        applyPhongShading(model);
        model.position.set(-5, 1.4, 0.3);
        model.scale.set(1.5, 1.5, 1.5);
        model.rotation.y = Math.PI/2;
        scene.add(model);
    });
    loader.load("models/Tree.glb", function(gltf) {
        var model = gltf.scene;
        applyPhongShading(model);
        model.position.set(-4.8, 1.4, -0.4);
        model.scale.set(1.3, 1.3, 1.3);
        scene.add(model);
    });
    loader.load("models/Tree.glb", function(gltf) {
        var model = gltf.scene;
        applyPhongShading(model);
        model.position.set(-5.2, 1.4, -0.2);
        model.rotation.y = Math.PI/2;
        scene.add(model);
    });
    // Ilha superior direita
    loader.load("models/Small Rock.glb", function(gltf) {
        var model = gltf.scene;
        applyPhongShading(model);
        model.position.set(0.15, 1.5, -5.3);
        model.scale.set(0.8, 0.8, 0.8);
        model.rotation.y = Math.PI/2;
        scene.add(model);
    });
    loader.load("models/Tree.glb", function(gltf) {
        var model = gltf.scene;
        applyPhongShading(model);
        model.position.set(-0.25, 1.5, -5.15);
        scene.add(model);
    });
    loader.load("models/Tree.glb", function(gltf) {
        var model = gltf.scene;
        applyPhongShading(model);
        model.position.set(0.25, 1.5, -4.8);
        model.scale.set(1.5, 1.5, 1.5);
        model.rotation.y = Math.PI/2;
        scene.add(model);
    });
    // Caminhos
    loader.load("models/Grass Platform.glb", function(gltf) {
        var model = gltf.scene;
        applyPhongShading(model);
        model.position.set(1, 1.2, -5);
        scene.add(model);
    });

    // Câmera em perspectiva
    var camera = new THREE.PerspectiveCamera(45, width/height, 1, 1000);
    camera.position.set(5, 5, 5);

    // Renderizador WebGL para gerar a cena
    var renderer = new THREE.WebGLRenderer();
    //renderer.shadowMap.enabled = true;
    renderer.setSize(width, height);
    renderer.setClearColor(0x2E86AB);
    document.getElementById("webgl").appendChild(renderer.domElement);
    renderer.domElement.id = "render";

    // Controle da câmera
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.target.set(0,0,0);
    //controls.update();
    
    update(renderer, scene, camera, controls);
    return scene;
}

function generatePointLight(color, intensity) {
    var light = new THREE.PointLight(color, intensity);
    //light.castShadow = true;
    return light;
}

// Substitui material padrão dos modelos por material com modelo de iluminação Phong
function applyPhongShading(model) {
    model.traverse(function(child) {
        if (child.isMesh) {
            var ogMaterial = child.material;
            var phongMaterial = new THREE.MeshPhongMaterial({ color: ogMaterial.color });
            child.material = phongMaterial;
        }
    });
}

function update(renderer, scene, camera, controls) {
    renderer.render(scene, camera);
    controls.update();

    requestAnimationFrame(function() {
        update(renderer, scene, camera, controls);
    });
}

var scene = main();
console.log(scene);