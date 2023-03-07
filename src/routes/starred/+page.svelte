<script>
	import EmailList from "$lib/components/EmailList.svelte";
	import appState from "../../stores/appState";

	$appState.starredSorted = $appState.sortByDate($appState.starred.slice());
</script>

{#if !$appState.isSearching}
<EmailList items={!$appState.isSorted ? $appState.starred : $appState.starredSorted} isDraggable={true}/>
{:else}
<EmailList items={!$appState.isSorted ? $appState.filtered : $appState.filteredSorted} isDraggable={true}/>
{/if}