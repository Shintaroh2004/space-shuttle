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
    <h1>Your score is</h1>
    <h1> {score} </h1>

    <h2>See you again</h2>

    <div class="gopage" bind:this={home}>Back to Home</div>

</main>