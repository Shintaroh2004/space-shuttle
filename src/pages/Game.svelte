<main>
    <body>
        <div bind:this={appElement} class="appElement">
        </div>
        <div class="forward">
            <Forward cannonjs={cannonjs}/>
        </div>
        <div class="back">
            <Back cannonjs={cannonjs}/>
        </div>
        <div class="goresults">
            <GoResult score={score}/>
        </div>
        <div class="boost">
            <Boost cannonjs={cannonjs}/>
        </div>
        <div class="score">
            <Score score={score}/>
        </div>
    </body>
</main>

<style>
    body{
      touch-action: pan-x pan-y;
      margin: 0;
      padding: 0;
    }
    .appElement {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 98vw;
      z-index: 0;
    }
    .forward{
      z-index: 1;
      position: fixed;
      top: 60%;
      left:7%;
    }
    .back{
      z-index: 1;
      position: fixed;
      top: 80%;
      left:7%;
    }
    .goresults{
        z-index: 1;
        position: fixed;
        top: 10%;
        left:80%; 
    }
    .boost{
        z-index: 1;
        position: fixed;
        top: 70%;
        left:80%; 
    }
    .score{
        z-index: 1;
        position: fixed;
        top: 10%;
        left:50%;  
    }
</style>
   
<script lang="ts">
    import { onMount } from 'svelte';
    import { ThreeWorld } from '../lib/ThreeWorld'; 
    import { CannonWorld } from "../lib/CannonWorld";
    import Forward from "../lib/UI/Forward.svelte";
    import Back from "../lib/UI/Back.svelte";
    import GoResult from '../lib/UI/GoResult.svelte';
    import Boost from '../lib/UI/Boost.svelte';
    import Score from '../lib/UI/Score.svelte';

    // フィールド
    let appElement:HTMLDivElement;
    let threejs:ThreeWorld;
    let cannonjs:CannonWorld;
    let score:number;

    onMount(()=>{
        window.oncontextmenu = (event)=>{
            event.preventDefault();
            event.stopPropagation();
            return false;
        };
        document.addEventListener('touchstart', (event)=>{event.preventDefault();event.stopPropagation();return false;}, {passive: false});

        threejs=new ThreeWorld(appElement);
        cannonjs=new CannonWorld(threejs);
        
        let step_world=()=>{
            requestAnimationFrame(step_world);
            if(cannonjs.boost_gage<100){
                cannonjs.boost_gage+=0.5;
                console.log()
            }
            if(cannonjs.touch){
                let force=cannonjs.threejs.player.position.sub(cannonjs.threejs.camera.position).normalize();
                cannonjs.player_collider.force.set(cannonjs.direction*force.x,cannonjs.direction*force.y,cannonjs.direction*force.z);
            }
            cannonjs.world.step(1/60);
            score=cannonjs.point;
            cannonjs.pos_update();
            cannonjs.threejs.animation();
        }

        step_world();
    });

</script>