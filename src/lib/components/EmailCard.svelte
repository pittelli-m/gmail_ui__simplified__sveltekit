<script>
	import appState from "../../stores/appState"
	export let content = {};
	let isSelected = false;
	let isLabeled = false;
	let isHovered = false;
	import CheckBox from "../../assets/icons/checkbox--blank.svg"
	import CheckboxChecked from "../../assets/icons/checkbox--checked.svg"
	import Star from "../../assets/icons/star.svg"
	import Starred from "../../assets/icons/starred.svg"
	import Label from "../../assets/icons/label.svg"
	import Labeled from "../../assets/icons/labeled.svg"

	const handleStar = (id) => {
		content.isStarred = !content.isStarred
	}	

</script>
<article class={`email__card ${isSelected && "email__card--selected"}`}>
	<div class="email__card__left">
		<button class=icon-box on:click = {	() => isSelected = !isSelected	}>
			<img src={isSelected ? CheckboxChecked : CheckBox} alt="">
		</button>
		<button class=icon-box on:click = {	()=> handleStar(content?.id)}>
			<img src={content?.isStarred ? Starred : Star} alt="">
		</button>
		<button class=icon-box on:click = {	() => isLabeled = !isLabeled	}>
			<img src={isLabeled ? Labeled : Label} alt="">
		</button>
		<p class={`counterpart ${content.isDraft && "counterpart--draft"}`}>{content.isDraft ? "(Bozza)" : content?.from || ""}</p>	
	</div>
	<div class="email__card__center">
		<p> <strong>{content?.object || ""}</strong> - {`${content?.body.slice(0,70)}...` || ""}</p>
	</div>
	{#if !isHovered}
		<p>{content?.date.toString().slice(4,10)}</p>
		{:else}
		<div class="icons__container">
			<button class=icon-box>
				<img src="" alt="">		
			</button>
			<button class=icon-box>
				<img src="" alt="">
			</button>
			<button class=icon-box>
				<img src="" alt="">
			</button>
			<button class=icon-box>
				<img src="" alt="">
			</button>
		</div>
	{/if}
	
</article>
<style lang="scss">
	.email__card{
		display: flex;
		align-items: center;
		gap: 1rem;
		height: 4.4rem;
		cursor: pointer;
		padding: 0 1rem;
		border-bottom: .2rem solid rgba(0,0,0,.1);
		transition: all .1s ease;
		&:hover{
			box-shadow: 0 .1rem .4rem 0 rgba(0,0,0, .5	);
			border-bottom: .2rem solid transparent;
		}
		&--selected{
			background-color: var(--color-card-selected);
		}
		&__left{
		display: flex;
		align-items: center;
		margin-right: 5rem;
		width: 35rem;
		p{
			font-weight: 700;
		}
		
		}
		&__center{
			display: flex;
			align-items: center;
			margin-right: 5rem;
			gap: 1rem;
			width: 65rem;
		}
	}
	.counterpart{
		margin-right: 6rem;
		&--draft{
			font-weight: 300 !important;
			color: var(--color-red)
		}
	}
	.icon-box{
		height: 3rem;
			width: 3rem;
		img{
			height: 2rem;
			width: 2rem;
		}
	}
</style>