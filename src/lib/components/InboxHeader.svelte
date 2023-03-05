<script>
	import appState from "../../stores/appState";
	import InboxHeaderNav from "./InboxHeaderNav.svelte";
</script>


{#if  $appState.menuSelected === "inbox"}
	<InboxHeaderNav/>
	{:else if $appState.menuSelected === "snoozed"}
		<p></p>
	{:else if $appState.menuSelected === "drafts" && $appState.drafts.length > 0}
		<p></p>
	{:else if $appState.menuSelected === "drafts"}
		<div class="empty-msg"><p>Non ci sono bozze salvate. </p>
			<p>Il salvataggio delle bozze consente di conservare i messaggi non ancora pronti per essere inviati.</p></div>	
	{:else if $appState.menuSelected === "starred" && $appState.starred.length > 0}
		<p></p>
	{:else if $appState.menuSelected === "starred"}
		<div class="empty-msg"> <p>Nessun messaggio speciale. La funzione Speciali ti permette di assegnare uno stato speciale a un messaggio per renderlo più facile da trovare. Fai clic sulla stella accanto a ciascuna conversazione o messaggio per contrassegnarlo come speciale.</p></div>
	{:else if $appState.menuSelected === "sent" && $appState.sent.length > 0}
			<p></p>
	{:else if $appState.menuSelected === "sent"}
		<div class="empty-msg"><p>Nessun messaggio inviato. <span on:click={() => $appState.isWriting=true}>Inviane</span> uno adesso!</p></div>
{/if}

<style lang="scss">
	.empty-msg{
		text-align: center;
		span {
			color: var(--color-primary);
			text-decoration: underline;
			cursor: pointer;
		}
	}
</style>