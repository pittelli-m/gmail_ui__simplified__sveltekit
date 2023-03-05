<script>
	import appState from "../../stores/appState";
	let focused = false
	const onFocus = () => focused = true;
	const onBlur =() => focused =false;
	import MdSearch from 'svelte-icons/md/MdSearch.svelte'
	import MdTune from 'svelte-icons/md/MdTune.svelte'

</script>

<div class={`search__input__item ${focused && "search__input__item--focused"}`}>
	<div class="search__input__icon-box icon-box">
		<MdSearch/>
	</div>
	<input bind:value={$appState.searchTerm} type="text" class="search__input__field" on:focus={onFocus} on:blur={onBlur}/>
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