<script>
	import EmailList from "$lib/components/EmailList.svelte";
import appState from "../../stores/appState";
</script>

<EmailList items = {$appState.sent}/>