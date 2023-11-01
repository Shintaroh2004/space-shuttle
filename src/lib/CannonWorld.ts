import type { ThreeWorld } from "./ThreeWorld";
import * as CANNON from "cannon";

export class CannonWorld{

    touch;
    direction;
    boost_gage;
    point;

    world;
    threejs;

    player_collider;
    playerMat;
    meteo_collider_list;
    meteoMat;
    hayabusa_collider_list;
    hayabusaMat;

    constructor(threejs:ThreeWorld){


        this.threejs=threejs;
        this.point=0;
        this.boost_gage=100;
        this.direction=0;
        this.touch=false;
        this.world=new CANNON.World();
        this.world.gravity.set(0, 0, 0);
        //正確さを増すための反復計算回数
        this.world.solver.iterations = 5;
        this.meteo_collider_list=new Array<CANNON.Body>();
        this.hayabusa_collider_list=new Array<CANNON.Body>();

        //playerのボディ
        this.playerMat = new CANNON.Material("player");
        this.player_collider = new CANNON.Body({mass: 70,material:this.playerMat});
        this.player_collider.addShape(new CANNON.Box(new CANNON.Vec3(0.1,0.1,0.1)));
        this.player_collider.angularDamping = 0.1;
        this.world.addBody(this.player_collider);

        //meteoのボディ
        this.meteoMat = new CANNON.Material("meteo");
        for(let i=0;i<8;i+=1){
            let meteo_collider = new CANNON.Body({mass: 0,material:this.meteoMat});
            meteo_collider.addShape(new CANNON.Box(new CANNON.Vec3(0.2,0.2,0.2)));
            meteo_collider.position.set(10*(Math.random()-0.5),10*(Math.random()-0.5),10*(Math.random()-0.5));
            meteo_collider.angularDamping = 0.1;
            meteo_collider.addEventListener("collide",()=>{
                meteo_collider.position.set(10*(Math.random()-0.5),10*(Math.random()-0.5),10*(Math.random()-0.5));
                this.point+=10;
            })
            this.meteo_collider_list.push(meteo_collider);
            this.world.addBody(meteo_collider);
        }

        //hayabusaのボディ
        this.hayabusaMat = new CANNON.Material("hayabusa");
        for(let i=0;i<4;i+=1){
            let hayabusa_collider = new CANNON.Body({mass: 0,material:this.hayabusaMat});
            hayabusa_collider.addShape(new CANNON.Box(new CANNON.Vec3(0.2,0.2,0.2)));
            hayabusa_collider.position.set(10*(Math.random()-0.5),10*(Math.random()-0.5),10*(Math.random()-0.5));
            hayabusa_collider.angularDamping = 0.1;
            hayabusa_collider.addEventListener("collide",()=>{
                hayabusa_collider.position.set(10*(Math.random()-0.5),10*(Math.random()-0.5),10*(Math.random()-0.5));
                this.point+=30;
            })
            this.hayabusa_collider_list.push(hayabusa_collider);
            this.world.addBody(hayabusa_collider);
        }

        let player1meteoCM = new CANNON.ContactMaterial(
            this.playerMat,  //ひとつ目のマテリアル
            this.meteoMat, //ふたつ目のマテリアル
            {
              contactEquationRelaxation: 3, // 接触式の緩和性
              contactEquationStiffness: 1, // 接触式の剛性
              friction: 0.3, //摩擦係数
              frictionEquationRelaxation: 3, // 摩擦式の剛性
              frictionEquationStiffness: 1, // 摩擦式の緩和性
              restitution: 0.3 // 反発係数
            }
          );
          // 生成したContactMaterialをworldに追加
        this.world.addContactMaterial(player1meteoCM);

        let player1hayabusaCM = new CANNON.ContactMaterial(
            this.playerMat,  //ひとつ目のマテリアル
            this.hayabusaMat, //ふたつ目のマテリアル
            {
              contactEquationRelaxation: 3, // 接触式の緩和性
              contactEquationStiffness: 1, // 接触式の剛性
              friction: 0.3, //摩擦係数
              frictionEquationRelaxation: 3, // 摩擦式の剛性
              frictionEquationStiffness: 1, // 摩擦式の緩和性
              restitution: 0.3 // 反発係数
            }
          );
          // 生成したContactMaterialをworldに追加
        this.world.addContactMaterial(player1hayabusaCM);

        let step_world=()=>{
            requestAnimationFrame(step_world);
            if(this.boost_gage<100){
                this.boost_gage+=0.5;
                console.log()
            }
            if(this.touch){
                let force=this.threejs.player.position.sub(this.threejs.camera.position).normalize();
                this.player_collider.force.set(this.direction*force.x,this.direction*force.y,this.direction*force.z);
            }
            this.world.step(1/60);
            this.pos_update();
            this.threejs.animation()
        }
    }

    add_acc(touch:boolean,direction:number) {
        this.touch=touch;
        this.direction=direction;
    }

    boost(direction:number) {
        this.direction=direction;
        let force=this.threejs.player.position.sub(this.threejs.camera.position).normalize();
        this.player_collider.velocity.set(this.direction*force.x,this.direction*force.y,this.direction*force.z);
    }

    pos_update(){
        this.threejs.player.position.copy(this.player_collider.position as any);
        this.threejs.meteo_list.map((element,index)=>{
            element.position.copy(this.meteo_collider_list[index].position as any);
            return element;
        });
        this.threejs.hayabusa_list.map((element,index)=>{
            element.position.copy(this.hayabusa_collider_list[index].position as any);
            return element;
        });
    }
}