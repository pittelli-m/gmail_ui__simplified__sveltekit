<script>
	export let items = [];
	import appState from "../../stores/appState";
	import EmailCard from "./EmailCard.svelte";
	import EmailSentCard from "./EmailSentCard.svelte";
	
	
</script>
<div>
	
		{#if items !== $appState.sent}
			{#each items as item}
			<EmailCard content={item}/>
			{/each}
			{:else}
			{#each items as item}
			<EmailSentCard content={item}/>
			{/each}
		{/if}

	
</div>
<style lang="scss"></style>