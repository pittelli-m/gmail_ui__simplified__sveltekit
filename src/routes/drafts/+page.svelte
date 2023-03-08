 <script>
	import EmailList from "$lib/components/EmailList.svelte";
	import appState from "../../stores/appState";
	
	$appState.draftsSorted = $appState.sortByDate($appState.drafts.slice());
</script>	


{#if $appState.isSearching }
	
<EmailList items={!$appState.isSorted ? $appState.filtered : $appState.filteredSorted}/>

{:else}
<EmailList items={!$appState.isSorted ? $appState.drafts : $appState.draftsSorted}/>
{/if} 