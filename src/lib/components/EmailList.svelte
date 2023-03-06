<script>
	export let items = [];
	export let isDraggable = false
	import appState from "../../stores/appState";
	import EmailCard from "./EmailCard.svelte";
	import EmailSentCard from "./EmailSentCard.svelte";
	
	
</script>
<div>
	
		{#if items !== $appState.sent}
			{#each items as item}
			<EmailCard content={item} draggable={isDraggable} itemID={item.id}/>
			{/each}
			{:else}
			{#each items as item}
			<EmailSentCard content={item} itemID={item.id}/>
			{/each}
		{/if}

	
</div>
<style lang="scss"></style>