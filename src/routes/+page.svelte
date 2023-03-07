<script>
import EmailList from "$lib/components/EmailList.svelte";
import appState from "../stores/appState";


</script>

{#if $appState.inboxShown === "inbox"}
<EmailList items={$appState.allMail}/>
{:else if $appState.inboxShown === "promo"}
<div class="empty-inbox__container">
	<div class="empty-inbox__msg">
	<h3>La scheda Promozioni è vuota.</h3>
	<p>Marketing, interessi, cause politiche e sociali e altre email promozionali verranno visualizzate qui.</p>
	<p>Per aggiungere o rimuovere le schede fai clic su <span>Impostazioni della casella di posta.</span> </p>
</div>
</div>

{:else if $appState.inboxShown === "social"}
<div class="empty-inbox__container">
	<div class="empty-inbox__msg">
	<h3>La scheda Social è vuota.</h3>
	<p>Le email provenienti da social network, siti di media-sharing, servizi di incontri e altri social media verranno visualizzate qui.</p>
	<p>Per aggiungere o rimuovere le schede fai clic su <span>Impostazioni della casella di posta.</span> </p>
</div>
</div>
{/if}

<style lang="scss">
	.empty-inbox{
		
	&__msg{
		display: flex;
		flex-direction: column;
		gap: 2rem;
		width: 50%;
		color: var(--color-text-light);
		h3{
			font-weight: 400;
		}
		span{
			color: var(--color-primary);
			text-decoration: underline;
		}
	}
	
	&__container{
		width: 100%;
		height: 60%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	}
</style>