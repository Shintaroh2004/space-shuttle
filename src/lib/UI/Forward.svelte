<main>
    <div bind:this={forward} class="triangle"></div>
</main>

<style>
.triangle {
  background-color: gray;
  width: 10vw;
  height: 10vh;
  clip-path: polygon(50% 0%,0% 100%,100% 100%);
}
</style>

<script lang="ts">
  import { onMount } from "svelte";
  import type { CannonWorld } from "../CannonWorld";

  export let cannonjs:CannonWorld;
  let forward:HTMLDivElement;

  onMount(()=>{
    forward.addEventListener("touchstart",(event:any)=>{
      cannonjs.add_acc(true,18);
    });
    forward.addEventListener("touchend",(event:any)=>{
      cannonjs.add_acc(false,0);
    });
  });

</script>