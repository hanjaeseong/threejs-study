import * as THREE from "../../../lib/three.module.js";
import {Controller} from "./Controller.js";
import {Gui} from "./Gui.js";
import {RectAreaLightHelper} from "../../../lib/RectAreaLightHelper.js";
import { RectAreaLightUniformsLib } from '../../../lib/RectAreaLightUniformsLib.js';
import { OrbitControls } from '../../../lib/OrbitControls.js';

class App{
    constructor(){
        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        const rendererDiv = document.createElement("div");
        rendererDiv.appendChild(this.renderer.domElement);
        document.body.appendChild(rendererDiv);

        RectAreaLightUniformsLib.init();

        this.setObject();
        this.setLight();
        this.setCamera();
        this.setHelper();

        this.orbitControls = new OrbitControls( this.camera, this.renderer.domElement );
        this.orbitControls.update();

        window.requestAnimationFrame(this.render.bind(this));

        this.ctrl = new Controller();
        new Gui(this.ctrl);
    }

    render(){

        this.renderer.setClearColor(new THREE.Color(this.ctrl.renderClearColor));

        debugger;

        this.plane.material.roughness = this.ctrl.rectLight_roughness;        
        this.plane.material.metalness = this.ctrl.rectLight_metalness;
        
        this.rectAreaLight1.intensity = this.ctrl.rectLight_intensity;
        this.rectAreaLight2.intensity = this.ctrl.rectLight_intensity;
        this.rectAreaLight3.intensity = this.ctrl.rectLight_intensity;

        this.rectAreaLight1.color = new THREE.Color(this.ctrl.rectLight1_color)
        this.rectAreaLight2.color = new THREE.Color(this.ctrl.rectLight2_color);
        this.rectAreaLight3.color = new THREE.Color(this.ctrl.rectLight3_color);

        // this.rectAreaLight1.rotateY(0.01);
        // this.rectAreaLight2.rotateY(0.01);
        // this.rectAreaLight3.rotateY(0.01);

        this.rectAreaLight1.width = this.ctrl.rectLight_width;
        this.rectAreaLight1.height = this.ctrl.rectLight_height;

        this.rectAreaLight2.width = this.ctrl.rectLight_width;
        this.rectAreaLight2.height = this.ctrl.rectLight_height;

        this.rectAreaLight3.width = this.ctrl.rectLight_width;
        this.rectAreaLight3.height = this.ctrl.rectLight_height;

        this.rectLight1Helper.update();
        this.rectLight2Helper.update();
        this.rectLight3Helper.update();

        if(this.ctrl.rectLight_helper){
            this.rectLight1Helper.visible = true;
            this.rectLight2Helper.visible = true;
            this.rectLight3Helper.visible = true;
        }
        else{
            this.rectLight1Helper.visible = false;
            this.rectLight2Helper.visible = false;
            this.rectLight3Helper.visible = false;
        }

        this.orbitControls.update();        

        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this.render.bind(this));
    }

    setObject(){
        //plane
        this.planeGeo = new THREE.PlaneGeometry(1000,1000,30,30);
        this.planeMat = new THREE.MeshStandardMaterial( { color: 0x808080, roughness: 0, metalness: 0 } );
        
        this.plane = new THREE.Mesh(this.planeGeo, this.planeMat);
        this.plane.rotateX(-90*Math.PI/180);
        this.scene.add(this.plane);

    }

    setLight(){
        const ambient = new THREE.AmbientLight( 0xffffff, 0.1 );
		this.scene.add( ambient );

        this.rectAreaLight1 = new THREE.RectAreaLight(0xff0000,1,10,20);
        this.rectLight1Helper = new RectAreaLightHelper( this.rectAreaLight1 );
        this.rectAreaLight1.position.set(-20,15,-50);
        this.rectAreaLight1.rotation.y = (180*Math.PI/180);
        this.rectAreaLight1.add( this.rectLight1Helper );

        this.scene.add(this.rectAreaLight1);     
        
        
        this.rectAreaLight2 = new THREE.RectAreaLight(0x00ff00,3,10,20);
        this.rectLight2Helper = new RectAreaLightHelper( this.rectAreaLight2 );
        this.rectAreaLight2.position.set(0,15,-50);
        this.rectAreaLight2.rotation.y = (180*Math.PI/180);
        this.rectAreaLight2.add( this.rectLight2Helper );

        this.scene.add(this.rectAreaLight2);       


        this.rectAreaLight3 = new THREE.RectAreaLight(0x0000ff,3,10,20);
        this.rectLight3Helper = new RectAreaLightHelper( this.rectAreaLight3 );
        this.rectAreaLight3.position.set(20,15,-50);
        this.rectAreaLight3.rotation.y = (180*Math.PI/180);
        this.rectAreaLight3.add( this.rectLight3Helper );

        this.scene.add(this.rectAreaLight3);       
    }

    setCamera(){
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/ window.innerHeight, 0.5, 1000);
        this.camera.position.copy(new THREE.Vector3(0,40,80)) ;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
    }

    setHelper(){
        this.axesHelper = new THREE.AxesHelper(20);
        this.axesHelper.position.y = 0.001;
        this.scene.add(this.axesHelper);

    }
}

window.onload = function(){
    new App();
}