<script>
	import EmailList from "$lib/components/EmailList.svelte";
import appState from "../../stores/appState";

let starred = $appState.allMail.filter(el => el.isStarred === true)

$: $appState.starred = starred

</script>

<EmailList items={$appState.starred}/>