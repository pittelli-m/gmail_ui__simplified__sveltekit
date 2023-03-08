<script>
	import appState from "../../stores/appState"
	import { update } from "../../stores/appState";
	export let content = {};
	export let draggable;
	export let dragstart;
	export let dragover;
	export let drop;
	export let itemID;
	let items;

	let isSelected = false;
	let isLabeled = false;
	let isHovered = false;
	import CheckBox from "../../assets/icons/checkbox--blank.svg";
	import CheckboxChecked from "../../assets/icons/checkbox--checked.svg";
	import Star from "../../assets/icons/star.svg";
	import Starred from "../../assets/icons/starred.svg";
	import Label from "../../assets/icons/label.svg";
	import Labeled from "../../assets/icons/labeled.svg";
	import Snooze from "../../assets/icons/snoozed.svg";
	import Mail from "../../assets/icons/mail.svg";
	import Trash from "../../assets/icons/trash.svg";
	import Archive from "../../assets/icons/archive.svg";

	const handleStar = () => {
		content.isStarred = !content.isStarred
		$appState.starred = [...$appState.allMail.filter(el => el.isStarred === true), ...$appState.drafts.filter(el => el.isStarred === true)];
		update({...$appState});
		
	}	

	const handleOpen = (e) => {
		if(e.target.classList.contains("icon-box") || e.target.classList.contains("icon-img")) return
		
		content.isRead = true
		
		let id = itemID;

		$appState.displayedMail = $appState.allMail.find( el => el.id === id);

		
		if (!content.isDraft) return

		$appState.isWriting = true
		$appState.openDraft = content;
		update({...$appState});
	}


	const handleDelete = () => {
		let value;
		if ( $appState.allMail.find(el => el.id === itemID)){ items = $appState.allMail;  value = 1}
		if ($appState.drafts.find(el => el.id === itemID)) {items = $appState.drafts; value = 2}
			
		let target = items.findIndex(el => el.id === itemID)
		items.splice(target, 1);

		value === 1  ? $appState.allMail = [...items] : $appState.drafts = [...items]
		$appState.allMailSorted = $appState.allMail.slice();
		$appState.draftsSorted = $appState.drafts.slice();
		update({...$appState});

	}


	

</script>

<li draggable={draggable} on:dragstart={dragstart} on:drop={drop} on:dragover={dragover}>
<article class={`email__card ${isSelected && "email__card--selected"} ${content.isRead && "email__card--read"}`} on:click|stopPropagation={(e) => handleOpen(e)}  on:mouseenter={() => isHovered = true} on:mouseleave={()=> isHovered=false}>
	<div class="email__card__left">
		<button class=icon-box on:click = {	() => isSelected = !isSelected	}>
			<img src={isSelected ? CheckboxChecked : CheckBox} alt="" class="icon-img">
		</button>
		<button class=icon-box on:click = {	handleStar}>
			<img src={content?.isStarred ? Starred : Star} alt="" class="icon-img">
		</button>
		<button class=icon-box on:click = {	() => isLabeled = !isLabeled	}>
			<img src={isLabeled ? Labeled : Label} alt="" class="icon-img">
		</button>
		<p class={`counterpart ${content.isDraft && "counterpart--draft"} ${content.isRead && "lightText"}`}>{content.isDraft ? "(Bozza)" : content?.from || ""} <span> { content.isDraft && content?.to || ""} </span>
		</p>	
	</div>
	<div class="email__card__center">
		<p> <strong class={content.isRead && "lightText"}>{content?.object || ""}</strong> - {content?.body?.length>=70? `${content?.body.slice(0,70)}...` : content?.body || ""}</p>
	</div>
	{#if !isHovered}
		<p>{new Date(content?.date).toDateString().slice(4,10)}</p>
		{:else}
		<div class="icons__container">
			<button class=icon-box>
				<img src={Archive} alt="" class="icon-img">		
			</button>
			<button class=icon-box on:click={handleDelete}>
				<img src={Trash} alt="" class="icon-img">
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
		&--selected, &--read.email__card--selected {
			background-color: var(--color-card-selected);
		}
		&--read{
			background-color: var(--color-background);
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
		span {
			color:var(--color-text-main);
			font-weight: 700 !important;
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

	.icons__container{
		display: flex;
		align-items: center;
		position: absolute;
		right: 1.6rem;
		top: 50%;
		transform: translateY(-50%);
	}

	.lightText{
		font-weight: 400 !important;
	}
</style>