<script lang="ts">
    import { navigate } from "svelte-routing";
    import { onMount } from "svelte";
    let home:HTMLDivElement;
    export let score:number; 
    onMount(()=>{
        score=history.state["score"];
        home.addEventListener("touchstart",toGame);
        function toGame(){
            navigate("/",{replace:true});
        }
    })
</script>

<style>
    .gopage{
        line-height:10vh;
        background-color: gray;
        color: darkblue;
    }
</style>


<main>
    <h1>Your score is</h1>
    <h1> {score} </h1>
    <div class="gopage" bind:this={home}>Back to Home</div>

</main>