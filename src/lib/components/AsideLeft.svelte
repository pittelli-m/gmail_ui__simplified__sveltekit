<script>
	import appState from "../../stores/appState";
	let isOpen = true;
	import Edit from "../../assets/icons/edit.svg";
	import Inbox from "../../assets/icons/inbox.svg";
	import InboxSelected from "../../assets/icons/inbox--selected.svg";
	import Star from "../../assets/icons/star.svg";
	import StarSelected from "../../assets/icons/star--selected.svg";
	import Draft from "../../assets/icons/draft.svg";
	import DraftSelected from "../../assets/icons/draft--selected.svg";
	import Snoozed from "../../assets/icons/snoozed.svg";
	import SnoozedSelected from "../../assets/icons/snoozed--selected.svg";
	import Sent from "../../assets/icons/sent.svg";
	import SentSelected from "../../assets/icons/sent--selected.svg";
	import Expand from "../../assets/icons/chevron-down.svg";
	import MdAdd from 'svelte-icons/md/MdAdd.svelte'

	// TODO ADD TOREAD ARRRAY

</script>


<aside class={`aside--left ${isOpen && "aside--left--open"}`}>
	<div class="aside--left__btn-box">
		<button class="aside--left__btn" on:click={()=> $appState.isWriting=true}><img src={Edit} alt=""/> Scrivi </button>
	</div>
	<div class="aside--left__menu">
		<a class={`aside--left__menu__item ${$appState.menuSelected === "inbox" ? "aside--left__menu__item--selected" : "" }`} id="inbox" on:click={()=>{$appState.menuSelected="inbox"; $appState.displayedMail=null}} href="/">
			<img src={$appState.menuSelected === "inbox" ? InboxSelected : Inbox} alt=""/>
			<h4>Posta in Arrivo</h4>
			<p>{$appState.allMail.map(el => el.isRead === false).length>0 ?$appState.allMail.map(el => el.isRead === false).length : ""}</p>
		</a>
		<a class={`aside--left__menu__item ${$appState.menuSelected === "starred" ? "aside--left__menu__item--selected" : "" }`} id="starred" on:click={()=>{$appState.menuSelected="starred"; $appState.displayedMail=null}} href="/starred">
			<img src={$appState.menuSelected === "starred" ? StarSelected : Star} alt=""/>
			<h4>Speciali</h4>
			<p>{$appState.starred.length>0 ? $appState.starred.length : ""}</p>
			
		</a>	
		<a class={`aside--left__menu__item ${$appState.menuSelected === "snoozed" ? "aside--left__menu__item--selected" : "" }`} id="snoozed" on:click={()=>{$appState.menuSelected="snoozed"; $appState.displayedMail=null}} href="/snoozed">
			<img src={$appState.menuSelected === "snoozed" ? SnoozedSelected : Snoozed} alt=""/>
			<h4>Posticipati</h4>
		</a>
		<a class={`aside--left__menu__item ${$appState.menuSelected === "sent" ? "aside--left__menu__item--selected" : "" }`} id="sent" on:click={()=>{$appState.menuSelected="sent"; $appState.displayedMail=null}} href="/sent">
			<img src={$appState.menuSelected === "sent" ? SentSelected : Sent} alt=""/>
			<h4>Inviati</h4>
			<p>{$appState.sent.length > 0? $appState.sent.length : ""}</p>
			
		</a>
		<a class={`aside--left__menu__item ${$appState.menuSelected === "drafts" ? "aside--left__menu__item--selected" : "" }`} id="drafts" on:click={()=>{$appState.menuSelected="drafts"; $appState.displayedMail=null}} href="/drafts">
			<img src={$appState.menuSelected === "drafts" ? DraftSelected : Draft} alt=""/>
			<h4>Bozze</h4>
			<p>{$appState.drafts.length > 0 ? $appState.drafts.length : ""}</p>
		</a>
		<div class="aside--left__menu__item" id="altro">
			<img src={Expand} alt=""/>
			<h4>Altro</h4>
		</div>

	</div>
	<div class="aside--left__tags">
		<p>Etichette</p> <div class="icon-box"><MdAdd/></div>
	</div>
</aside>

<style lang="scss">

	@import "@fontsource/lexend-deca";
	@import "@fontsource/roboto/500.css";
	.aside{
		&--left{
				 height:100%;
				 grid-column: 1;
				 width: 30%;
				 display: flex;
				flex-direction: column;
			
			&--open{
				width: 100%;
			}
			
			&__btn{
				border: none;
				background-color: var(--color-write);
				color: var(--color-text-selected);
				font-size: inherit;
				font-family: "Lexend Deca", sans-serif;
				font-weight: inherit;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				gap: 1.2rem;
				margin-left: 1rem;
				width: 12rem;
				height: 5.4rem;
				padding: 1.6rem;
				border-radius: 1.6rem;
				transition: all .1s ease-in-out;
				img{
					height: 2.4rem;
					width: 2.4rem;
				}

				&:hover{
					box-shadow: 0 .15rem .5rem 0 rgba(0,0,0,.3)
				}
			}
			&__menu{
				
				margin-top: 2rem;
				padding-right: 1.4rem;
				display: flex;
				flex-direction: column;

				&__item{
					display: flex;
					align-items: center;
					justify-content: flex-start;
					padding: .5rem 1rem .6rem 3rem;
					gap: 2rem;
					cursor: pointer;
					border-radius: 0 50rem 50rem 0;
					color: var(--color-text-light);
					user-select: none;
					position: relative;
					

					img{
						height: 2rem;
					width: 2rem;
					}
					 h4{
						margin-right: 3rem;
						font-weight: 500;
					 }
					 p{
						font-size: 1.2rem;
						position: absolute;
						left: 90%;
						top: 50%;
						transform: translate(-50%,-50%);
					 }

					 &:hover{
						background-color: var(--color-icon--hover);
					 }

					 &--selected{
						color: var(--color-text-selected);
						background-color: var(--color-menu-selected);
						font-weight: 700;
						h4{
							font-weight: 700;
						}
						

						&:hover{
							background-color: var(--color-menu-selected);;
					 }
					 }
				}
			}
			&__tags{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 3rem;
				margin-top: 4rem;
				p{
					font-size: 1.6rem	;
				}
				div{
					:global(svg){
						height: 2rem;
						width: 2rem;
					}
				}
			}
		}
		
	}
</style>