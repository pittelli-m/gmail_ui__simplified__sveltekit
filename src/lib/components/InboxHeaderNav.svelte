<script>
	import appState from "../../stores/appState"
	import Inbox from "../../assets/icons/inbox.svg"
	import InboxSelected from "../../assets/icons/inbox_selected.svg"
	import Social from "../../assets/icons/social.svg"
	import SocialSelected from "../../assets/icons/social_selected.svg"
	import Tag from "../../assets/icons/tag.svg"
	import TagSelected from "../../assets/icons/tag_selected.svg"

</script>


<div class="inbox__header__nav">
	<div class="inbox__header__nav__tab" on:click={() => $appState.inboxShown = "inbox"}>
		<div class={`inbox__header__nav__tab__inner ${$appState.inboxShown === "inbox" && "inbox__header__nav__tab__inner--selected"}` }>
			<img src={$appState.inboxShown === "inbox" ? InboxSelected: Inbox} alt="">
			<p>Principale</p>	
		</div>
	</div>
	<div class="inbox__header__nav__tab" on:click={() => $appState.inboxShown = "promo"}>
		<div class={`inbox__header__nav__tab__inner ${$appState.inboxShown === "promo" && "inbox__header__nav__tab__inner--selected"}`}>
			<img src={$appState.inboxShown === "promo" ?TagSelected:Tag} alt="">
			<p>Promozioni</p>	
		</div>
	</div>
	<div class="inbox__header__nav__tab" on:click={() => $appState.inboxShown = "social"}>
		<div class={`inbox__header__nav__tab__inner ${$appState.inboxShown === "social" && "inbox__header__nav__tab__inner--selected"}`}>
			<img src={$appState.inboxShown === "social" ? SocialSelected: Social} alt="">
			<p>Social</p>	
		</div>
	</div>
	<div class="filler"></div>
</div>

<style lang="scss">
	.inbox__header__nav{
		display: grid;
		grid-template-columns: repeat(3, 1fr) 1.3fr;
		&__tab{
			height: 5rem;
			padding: 1.4rem;
			padding-bottom: 0;
			cursor: pointer;
			&:hover{
				background-color: var(--color-background-tab);
			}
			&__inner{
				height: 100%;
				display: flex;
				align-items: center;
				gap: 2rem;
				border-bottom: .4rem solid transparent;
				letter-spacing: .04rem;
				p, img{
					margin-bottom: 2rem;
				}
				img{
					height: 2rem;
					width: 2rem;
				}
				&--selected{
					border-bottom: .4rem solid var(--color-primary);
					color:var(--color-primary);
					font-weight: 500;
					
				}
			}
		}
	}	
</style>