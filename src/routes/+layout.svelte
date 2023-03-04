<script>
	import "../main.scss"
	import Nav from "$lib/components/Nav.svelte"
	import AsideLeft from "$lib/components/AsideLeft.svelte";
	import AsideRight from "$lib/components/AsideRight.svelte";

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
				<div class="app__header__menu"></div>
				<div class="app__header__nav"></div>
			</div>
			<div class="app__body">
				<slot/>
			</div>
		</div>
	</main>
	<AsideRight/>
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
		grid-row: 2;
		grid-column: 2;
		padding-bottom: 1rem;
		position: relative;
	}
	&__app{
		width:100%;
		height: 100%;
		border-radius: 15px;
		background-color: white;
	
	}

}
</style>