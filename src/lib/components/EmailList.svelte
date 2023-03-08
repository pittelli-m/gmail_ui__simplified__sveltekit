<script>
	export let items = [];
	export let isDraggable = false
	import appState from "../../stores/appState";
	import EmailCard from "./EmailCard.svelte";
	import EmailSentCard from "./EmailSentCard.svelte";

	let dragIndex = null;
	let dropIndex = null;

	
	const handleDragOver= (e, index)=> {
		e.preventDefault()
		e.dataTransfer.dropEffect = "move";
    	dropIndex = index;
	}
	const handleDragStart= (e, index) => {
		dragIndex = index;
   		e.dataTransfer.effectAllowed = "move";
    	e.dataTransfer.setData("text/plain", dragIndex);
			
	}
	const handleDrop= (e) => {
		e.preventDefault();
		const data = e.dataTransfer.getData("text/plain");
		const dragItem = items.splice(data, 1)[0];
		items.splice(dropIndex, 0, dragItem);
		
		items = [...items]
		
		dragIndex = null;
		dropIndex = null;
		
	}


</script>
<ul>
	
		{#if items !== $appState.sent && items !== $appState.sentSorted}
			{#each items as item, index}
			<EmailCard content={item} draggable={isDraggable} itemID={item.id} dragstart={(e)=>handleDragStart(e, index)} drop={handleDrop} dragover={(e) => handleDragOver(e, index)}/>
			{/each}
			{:else}
			{#each items as item}
			<EmailSentCard content={item} itemID={item.id}/>
			{/each}
		{/if}

	
</ul>
<style lang="scss">
	ul{
		list-style: none;
	}
</style>
