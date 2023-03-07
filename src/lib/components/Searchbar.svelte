<script>
	import appState from "../../stores/appState";
	let focused = false
	const onFocus = () => focused = true;
	const onBlur =() => focused =false;
	let base;
	let disabled;
	import MdSearch from 'svelte-icons/md/MdSearch.svelte'
	import MdTune from 'svelte-icons/md/MdTune.svelte'

	$: $appState.searchTerm ? $appState.isSearching = true : $appState.isSearching = false
	$: $appState.menuSelected ==="sent" ? disabled = true : disabled = false

	const filter =() => {

	if ($appState.menuSelected === "sent"){
		$appState.searchTerm = "";
		$appState.isSearching = false;
		return
	}

	if ($appState.menuSelected === "inbox"){
		base = $appState.allMail

	}
	if($appState.menuSelected === "drafts"){
		base = $appState.drafts
	}
	if($appState.menuSelected === "starred"){
		base = $appState.starred
	}
	

		let from = base?.filter(el => el.from?.toLowerCase().includes($appState.searchTerm.toLowerCase()));
		let to = base?.filter(el => el.to?.toLowerCase().includes($appState.searchTerm.toLowerCase()));
		let object = base?.filter(el => el.object?.toLowerCase().includes($appState.searchTerm.toLowerCase()));
		let body = base?.filter(el => el.body?.toLowerCase().includes($appState.searchTerm.toLowerCase()));
		
		let filtered = Array.from(new Set([...from, ...to, ...object, ...body]));

		$appState.filtered = [...filtered];
		appState.filteredSorted = [...$appState.filtered];
		

		$: console.log(filtered);
	}
	

	

</script>

<div class={`search__input__item ${focused && "search__input__item--focused"} ${disabled && "search__input__item--disabled"}`}>
	<div class="search__input__icon-box icon-box">
		<MdSearch/>
	</div>
	<input bind:value={$appState.searchTerm} type="text" class="search__input__field" on:focus={onFocus} on:blur={onBlur} placeholder={!focused ? "Cerca nella posta" : ""} on:input={filter} disabled={disabled}/>
	<div class="search__input__icon-box icon-box">
		<MdTune/>
	</div>
</div>

<style lang="scss">
	.search__input{
		&__item{
			display: flex;
			align-items: center;
			height: 5rem;	
			padding: 0 1rem;
			border-radius: .875rem;
			background-color: var(--color-input);
			transition: all .2s ease-in-out;
			&--focused {
				background-color: white;
				box-shadow: 0 .15rem .3rem 0 rgba(0,0,0,.2)

			}
			&--disabled{
				opacity: .7;
			}
	}
		&__field{
			font-size: inherit;
			font-family: inherit;		
			border: none;	
			font-weight: inherit;
			color: inherit;
			flex: 1;
			background-color: var(--color-input);
			transition: all .2s ease-in-out;

			&:focus{
				background-color: white;
			}
			&:disabled{
				opacity: .7;
			}

		
		}
		&__icon-box{
			display: flex;
			align-items: center;
			justify-content: center;
			:global(svg){
				height: 2.4rem;
				width: 2.4rem;
				fill-opacity: .7;
			}
		}
	}
</style>