<script>
	import MdAdd from "svelte-icons/md/MdAdd.svelte"
	import MdChevronRight from 'svelte-icons/md/MdChevronRight.svelte'
	import Tasks from "../../assets/icons/tasks.svg"
	import Calendar from "../../assets/icons/calendar.svg"
	import Keep from "../../assets/icons/keep.svg"
	import Contacts from "../../assets/icons/contacts.svg"


</script>

<aside class="aside--right">
	<div class="aside--right__icons__container">
		<button class="icon-box"><img src={Calendar} alt="google tasks"/></button>
		<button class="icon-box"><img src={Keep} alt="google tasks"/></button>
		<button class="icon-box"><img src={Tasks} alt="google tasks"/></button>
		<button class="icon-box"><img src={Contacts} alt="google tasks"/></button>
		<div class="linediv"></div>
		<button class="icon-box"> <MdAdd/> </button>
		<button class="icon-box aside--right__toggle"> <MdChevronRight/> </button>
	</div>
</aside>

<style lang="scss">

.aside{
		&--right{
				 height:100%;
				 max-height: 91vh;
				 position: relative;
				 user-select: none;
				 &__icons__container{
					padding: 2rem 1rem;
					display: flex;
					flex-direction: column;

					.icon-box{
						:global(svg){
							height: 2rem;
							width: 2rem;
						}
						img {
							height: 2.4rem;
							width: 2.4rem;
						}
						margin-bottom: 1.6rem;
					}
				 }
				 &__toggle{
			position: absolute;
			bottom: 0;
			left: 1rem;
		}
		}
		
	}
	.linediv{
		border-bottom: .01rem solid rgba(0,0,0,.2);
		width: 50%;
		margin: 0 auto 4rem;
	}

</style>