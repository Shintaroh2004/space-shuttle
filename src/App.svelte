<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import Game from "./pages/Game.svelte";
  import GameOver from "./pages/GameOver.svelte";
</script>

<Router>
  <main>
    <Route path="" component={Home} />
    <Route path="game" component={Game}/>
    <Route path="gameover" component={GameOver}/>
  </main>
</Router>

