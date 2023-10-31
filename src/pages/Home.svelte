<script lang="ts">
    let game:HTMLDivElement;
    import { onMount } from "svelte";
    import {navigate} from "svelte-routing";
    window.oncontextmenu = (event)=>{
            event.preventDefault();
            event.stopPropagation();
            return false;
    };
    document.addEventListener('touchstart', (event)=>{event.preventDefault();event.stopPropagation();return false;}, {passive: false});
    onMount(()=>{
        game.addEventListener("touchstart",toGame);
        function toGame(){
            navigate("/game",{replace:true});
        }
    })
</script>

<style>
    .gopage{
        text-align:center;
        line-height: 14vh;
        background-color: gray;
        color: darkblue;
        width: 16vw;
        height: 14vh;
        border-radius: 10%;
    }
</style>


<main>
    <div bind:this={game} class="gopage">Play game</div>
    <h1>Home page</h1>
</main>