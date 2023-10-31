<main>
    <div bind:this={end} class="gopage">終了</div>
</main> 

<style>
    .gopage{
        text-align:center;
        line-height: 14vh;
        background-color: azure;
        color: darkblue;
        width: 16vw;
        height: 14vh;
        border-radius: 10%;
    }
</style>

<script lang="ts">
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";

    export let score:number;
    let end:HTMLDivElement;

    function results(){
        console.log(score);
        navigate("/gameover", {replace:true,state:{"score":score}});
    }

    onMount(()=>{
        end.addEventListener("touchstart",results);
    });
</script>