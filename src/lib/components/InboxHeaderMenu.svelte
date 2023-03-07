<script>
	import appState from "../../stores/appState";
	import ChevRight from "../../assets/icons/chevron-right.svg"
	import ChevLeft from "../../assets/icons/chevron-left.svg"
	import ArrDD from "../../assets/icons/arrow-drop-down.svg"
	import Sort from "../../assets/icons/sort.svg"
	import CheckBox from "../../assets/icons/checkbox--blank.svg"
	import CheckboxChecked from "../../assets/icons/checkbox--checked.svg"
	import Refresh from "../../assets/icons/refresh.svg"
	import Dots from "../../assets/icons/more-vert.svg"

	let checked = false

	const handleSort = () => {
	 $appState.isSorted = !$appState.isSorted
	}
</script>


<div class="inbox__header__menu">
	<div class="inbox__header__menu--left">
		<button class="icon-box icon-box--square" aria-label="select all" on:click={() => checked = !checked}> <img src={checked ? CheckboxChecked : CheckBox} alt=""> <img src={ArrDD} alt="" class="double"></button>
		<button class="icon-box" >
			<img src={Refresh} alt="">
		</button>
		<button class="icon-box">
			<img src={Dots} alt="">
		</button>
	</div>
	<div class="inbox__header__menu--right">
		<p class="inbox__header__menu__count">1 - {$appState.allMail.length > 50 ? "50" : $appState.allMail.length} di {$appState.allMail.length}</p>
		<div class="inbox__header__menu__btn-box">
			<button class="icon-box" disabled>
				<img src={ChevLeft} alt="">
			</button>
			<button class="icon-box">
				<img src={ChevRight} alt="">
			</button>
		</div>
		<button class="icon-box" aria-label="sort" on:click={handleSort}><img src={Sort} alt="sort"></button>
	</div>
</div>


<style lang="scss">
	.inbox__header__menu{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;

		&--left{
			height: 100%;
			display: flex;
			align-items: center;
			padding-left: 1.6rem;

			.icon-box{
				img{
				height: 2rem;
				width: 2rem;}
			}
		}
		&--right{
			height: 100%;
	
			display: flex;
			align-items: center;
			justify-content: flex-end;
			margin-right: 2rem;

		}
		&__count{
			font-size: 1.2rem;
			color: var(--color-text-light);
		}
		&__btn-box{
			display: flex;
			button{
				&:disabled{
					opacity: .5;
					background-color: transparent;
					cursor: auto;
				}
			}
		}
	}
</style>