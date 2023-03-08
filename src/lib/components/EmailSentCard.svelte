<script>
	import appState from "../../stores/appState"
	import { update } from "../../stores/appState";
	export let content = {};
	let isSelected = false;
	let isLabeled = false;
	let isHovered = false;
	export let itemID;

	import CheckBox from "../../assets/icons/checkbox--blank.svg";
	import CheckboxChecked from "../../assets/icons/checkbox--checked.svg";
	import Star from "../../assets/icons/star.svg";
	import Label from "../../assets/icons/label.svg";
	import Snooze from "../../assets/icons/snoozed.svg";
	import Mail from "../../assets/icons/mail.svg";
	import Trash from "../../assets/icons/trash.svg";
	import Archive from "../../assets/icons/archive.svg";


	const handleOpen = (e) => {
		if(e.target.classList.contains("icon-box") || e.target.classList.contains("icon-img")) return

		let id = itemID;

		$appState.displayedMail = $appState.sent.find( el => el.id === id);
		update({...$appState});
	}

	const handleDelete = () => {

		if (!$appState.sent.find(el => el.id === itemID)) return 
			
		let target = $appState.sent.findIndex(el => el.id === itemID)

		$appState.sent.splice(target, 1);

		$appState.sent = [...$appState.sent ]
		$appState.sentSorted = $appState.sent.slice();
		update({...$appState});
		
		
}

</script>
<li>
<article class={`email__card ${isSelected && "email__card--selected"}`} on:click|stopPropagation={(e) => handleOpen(e)} on:mouseenter={() => isHovered = true} on:mouseleave={()=> isHovered=false}>
	<div class="email__card__left">
		<button class=icon-box on:click = {	() => isSelected = !isSelected	}>
			<img src={isSelected ? CheckboxChecked : CheckBox} alt="" class="icon-img">
		</button>
		<button class=icon-box>
			<img src={Star} alt="" class="icon-img">
		</button>
		<button class=icon-box>
			<img src={Label} alt="" class="icon-img">
		</button>
		<p class={"counterpart"}>{content?.to || ""}</p>	
	</div>
	<div class="email__card__center">
		<p> <strong >{content?.object || ""}</strong> - {content?.body?.length>=70? `${content?.body.slice(0,70)}...` : content?.body || ""}</p>
	</div>
	{#if !isHovered}
		<p>{new Date(content?.date).toDateString().slice(4,10)}</p>
		{:else}
		<div class="icons__container">
			<button class=icon-box>
				<img src={Archive} alt="" class="icon-img">		
			</button>
			<button class=icon-box on:click={handleDelete}>
				<img src={Trash} alt="" class="icon-img" on:click={handleDelete}>
			</button>
			<button class=icon-box>
				<img src={Mail} alt="" class="icon-img">
			</button>
			<button class=icon-box>
				<img src={Snooze} alt="" class="icon-img">
			</button>
		</div>
	{/if}
	
</article>
</li>

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
		position: relative;
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
	}
	.icon-box{
		height: 3rem;
			width: 3rem;
		img{
			height: 2rem;
			width: 2rem;
		}
	}
	.icons__container{
		display: flex;
		align-items: center;
		position: absolute;
		right: 1.6rem;
		top: 50%;
		transform: translateY(-50%);
	}
</style>