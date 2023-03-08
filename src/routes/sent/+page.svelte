<script>
	import EmailList from "$lib/components/EmailList.svelte";
	import appState from "../../stores/appState";

	$appState.sentSorted = $appState.sortByDate($appState.sent.slice());
	
</script>

<EmailList items = {!$appState.isSorted ? $appState.sent : $appState.sentSorted}/>