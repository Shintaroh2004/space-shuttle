<main>
    <div bind:this={forward} class="circle"></div>
</main>

<style>
    .circle{
        background-color: red;
        border-radius: 100%;
        height: 10vh;
        width: 10vh;
    }
</style>

<script lang="ts">
  import { onMount } from "svelte";
  import type { CannonWorld } from "../CannonWorld";

  export let cannonjs:CannonWorld;
  let forward:HTMLDivElement;

  onMount(()=>{
    forward.addEventListener("touchstart",(event:any)=>{
      if(cannonjs.boost_gage==100){
        cannonjs.boost(1.5);
        cannonjs.boost_gage=0;
      }
    });
  });

</script>