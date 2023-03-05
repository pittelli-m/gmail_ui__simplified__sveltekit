<script>
	import appState from "../stores/appState";
	import "../main.scss"
	import Nav from "$lib/components/Nav.svelte"
	import AsideLeft from "$lib/components/AsideLeft.svelte";
	import AsideRight from "$lib/components/AsideRight.svelte";
	import Editor from "$lib/components/Editor.svelte";
	import InboxHeader from "$lib/components/InboxHeader.svelte";
	import InboxHeaderMenu from "$lib/components/InboxHeaderMenu.svelte";

</script>

<svelte:head> 
	<title> Gmail Clone </title>
</svelte:head>
<div class="wrapper">
	<Nav/>
	<AsideLeft/>
	<main class="main__container">
		<div class="main__app">
				<div class="app__header">
					<div class="app__header__menu">
						<InboxHeaderMenu/>
					</div>
					<div class="app__header__nav">
					<InboxHeader/>
					</div>
				</div>
				<div class="app__body">
					<slot/>
				</div>
		</div>
	</main>
	<AsideRight/>

	{#if $appState.isWriting}
	<div class="mail__editor">
		<Editor/>
	</div>
	{/if}
</div>


<style lang="scss">
	.wrapper {
		display: grid;
		grid-template-columns: 17vw 79vw 4vw;
		grid-template-rows: 9vh 91vh;
		max-height: 100vh;
	}

	.main{
	&__container{
		height: 91vh;
		max-height: 91vh;
		grid-row: 2;
		grid-column: 2;
		padding-bottom: 1rem;
		position: relative;
	}
	&__app{
		width:100%;
		max-height: 100%;
		border-radius: 15px;
		background-color: white;
		position: relative;
	
	}


}
.mail__editor {
		position: absolute;
		right: 4vw;
		bottom: 0;
		z-index: 5000;
	}
	.app{
		&__header{
			border-bottom: .2rem solid rgba(0,0,0,.1);
			max-height: 10rem;

			
			&__menu{
				height: 5rem;
				/* border: 2px solid red; */

			}
			&__nav{
				height: 5rem;
		
			}
		}
		&__body{
			height: 75vh;
			max-height: 75vh;
			overflow-y: auto;
		}
	}
</style>