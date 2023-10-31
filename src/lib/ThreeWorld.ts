import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class ThreeWorld{

    //Threejsの設定
    scene;
    light;
    camera;
    renderer;
    orbitControls;
    loader;

    //モデル
    player;
    station;;
    meteo_list;
    hayabusa_list;

    constructor(appElement:HTMLDivElement){

        this.scene = new THREE.Scene();
        this.loader= new GLTFLoader();
        this.player=new THREE.Object3D();
        this.station=new THREE.Object3D();
        this.meteo_list=new Array<THREE.Object3D>();
        this.hayabusa_list=new Array<THREE.Object3D>();
        this.light= new THREE.AmbientLight(0xFFFFFF, 1.0);
        this.scene.add(this.light);
    
        new RGBELoader().load("./PlanetaryEarth4k.hdr", (texture)=> {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          this.scene.background = texture;
        });

        this.loader.load("./egent.glb",(glb)=>{
          let player=glb.scene;
          player.scale.set(0.1,0.1,0.1);
          player.rotation.set(0,0,0);
          player.position.set(0,-0.3,0);
          this.player.add(player);
        });
        
        this.loader.load("./spacestation.glb",(glb)=>{
          let station=glb.scene;
          station.scale.set(0.3,0.3,0.3);
          station.rotation.set(-1,0,0);
          station.position.set(0,-0.3,-3);
          this.station.add(station);
        });

        for(let i=0;i<8;i+=1){
          let meteo=new THREE.Object3D();
          this.loader.load("./Meteo.glb",(glb)=>{
            let meteo2=glb.scene;
            meteo2.position.set(0,0,0);
            meteo2.scale.set(0.2,0.2,0.2);
            meteo.add(meteo2);
          });
          this.meteo_list.push(meteo);
          this.scene.add(meteo);
        }

        for(let i=0;i<4;i+=1){
          let hayabusa=new THREE.Object3D();
          this.loader.load("./Hayabusa2.glb",(glb)=>{
            let hayabusa2=glb.scene;
            hayabusa2.position.set(0,0,0);
            hayabusa2.scale.set(0.6,0.6,0.6);
            hayabusa.add(hayabusa2);
          });
          this.hayabusa_list.push(hayabusa);
          this.scene.add(hayabusa);
        }

        this.scene.add(this.player);
        this.scene.add(this.station);
    
        // カメラを初期化
        this.camera = new THREE.PerspectiveCamera(50, appElement.offsetWidth / appElement.offsetHeight);
        let pos=this.player.position;
        this.player.position.setZ(this.player.position.z-0.3);
        this.camera.position.copy(this.player.position);
        this.camera.lookAt(pos as any);
    
        // レンダラーの初期化
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor(0xffffff, 1.0); // 背景色
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(appElement.offsetWidth, appElement.offsetHeight);
    
        // レンダラーをDOMに追加
        appElement.appendChild(this.renderer.domElement);
    
        // カメラコントローラー設定
        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
        this.orbitControls.maxPolarAngle = Math.PI
        this.orbitControls.minDistance = 1.6;
        this.orbitControls.maxDistance = 1.6;
    }

    player_look(){
      this.player.rotation.copy(this.camera.rotation);
      this.orbitControls.target.copy(this.player.position);
      this.orbitControls.update();
    }

    animation(){
      this.renderer.render(this.scene, this.camera);
      this.player_look();
    }
}
