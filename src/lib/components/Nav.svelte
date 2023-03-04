
<script>
	import Searchbar from "./Searchbar.svelte";
	import MdMenu from 'svelte-icons/md/MdMenu.svelte'
	import MdHelpOutline from 'svelte-icons/md/MdHelpOutline.svelte'
	import MdSettings from 'svelte-icons/md/MdSettings.svelte'
	import MdApps from 'svelte-icons/md/MdApps.svelte'
	import GmailLogo from "../../assets/icons/gmail.svg"
	import "@fontsource/lexend-deca"

	let isOpen = true
	const handleToggle =  () => isOpen = !isOpen

</script>

<nav class="header__nav"> 
	<div class="nav__left">
		<button class="nav__toggle-box icon-box icon-box--lg" on:click={handleToggle}><MdMenu/></button>
		<div class="nav__logo-box"> <img src={GmailLogo} alt="gmail company logo"/> Gmail</div>
	</div>
	
	<div class="nav__searchbar">
		<Searchbar/>
	</div>
	<div class="nav__icons-box">
		<button class="icon-box"><MdHelpOutline/></button>
		<button class="icon-box"><MdSettings/></button>
		<button class="icon-box"><MdApps/></button>
		<div class="icon-box icon-box--md">
			<button class="icon-box user__icon">U</button>
		</div>

	</div>
</nav>

<style lang="scss">
	.header__nav{
		padding: 1rem;
		padding-right: 1.6rem;
		grid-column: span 3;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 1rem;
	}
	.nav{
		&__left{
			width: 16vw;
			display: flex;
			align-items: center;
			gap: 1rem;
		}
		&__logo-box{
			img{
				display: inline-block;
				height: 3.6rem;
				widows: 3.6rem;
			}
			display: flex;
			align-items: center;
			font-size: 2.4rem;
			font-family: "Lexend Deca", sans-serif;
			color: rgba(0,0,0,.7);
			cursor: pointer;
			gap: .875rem;

		}
		&__icons-box{
			display: flex;
			align-items: center;
			gap: 1rem;
			flex: 1;
			justify-content: flex-end;

			.user__icon{
				color: #fff;
				background-color: var(--color-text-main);
				font-size: 1.8rem;
			}
		}
		&__toggle-box{
		border: none; 
		:global(svg) {
		height: 2.4rem;
		width: 2.4rem;
		fill-opacity: .7;}
	}
	&__searchbar{
		flex: 1.3;
	}
	}
	.icon-box{
		:global(svg) {
		height: 2.4rem;
		width: 2.4rem;
		fill-opacity: .7;
	}
	
	}
		
</style>