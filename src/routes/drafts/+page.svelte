<script>
		import EmailList from "$lib/components/EmailList.svelte";
import appState from "../../stores/appState";

</script>

{#if $appState.drafts.length > 0 }
<EmailList items={$appState.drafts}/>
{:else}
<div></div>
{/if}
