<main>
    <div bind:this={back} class="triangle"></div>
</main>

<style>
.triangle {
  background-color: gray;
  width: 10vw;
  height: 10vh;
  clip-path: polygon(50% 100%,100% 0%,0% 0%);
}
</style>

<script lang="ts">
  import { onMount } from "svelte";
  import type { CannonWorld } from "../CannonWorld";

  export let cannonjs:CannonWorld;
  let back:HTMLDivElement;

  onMount(()=>{
    back.addEventListener("touchstart",(event:any)=>{
      cannonjs.add_acc(true,-24);
    });
    back.addEventListener("touchend",(event:any)=>{
      cannonjs.add_acc(false,0);
    });
  });

</script>