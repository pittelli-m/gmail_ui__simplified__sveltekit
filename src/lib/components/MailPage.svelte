<script>
	export let mail;
	let items;
	import appState from "../../stores/appState";
	import ChevRight from "../../assets/icons/chevron-right.svg";
	import ChevLeft from "../../assets/icons/chevron-left.svg";
	import Keyboard from "../../assets/icons/keyboard.svg";
	import Dots from "../../assets/icons/more-vert.svg"	;
	import Back from "../../assets/icons/back.svg";
	import Archive from "../../assets/icons/archive.svg";
	import Report from "../../assets/icons/report.svg";
	import Trash from "../../assets/icons/trash.svg";
	import Mail from "../../assets/icons/mail.svg";
	import Snoozed from "../../assets/icons/snoozed.svg";
	import AddTask from "../../assets/icons/add-task.svg";
	import Label from "../../assets/icons/label.svg";
	import FileMove from "../../assets/icons/file-move.svg";
	import Print from "../../assets/icons/print.svg";
	import NewWindow from "../../assets/icons/new-window.svg";
	import ArrDD from "../../assets/icons/arrow-drop-down.svg"
	import Star from "../../assets/icons/star.svg";
	import Starred from "../../assets/icons/starred.svg";
	import Undo from "../../assets/icons/undo.svg";
	import Forward from "../../assets/icons/forward.svg";
	import MdClose from 'svelte-icons/md/MdClose.svelte'

	const handleStar = () => {
		mail.isStarred = !mail.isStarred
		$appState.starred = $appState.allMail.filter(el => el.isStarred === true);
		
		
	}	

	const handleDelete = () => {
		if ($appState.allMail.find(el => el.id === mail.id)) {
			items = $appState.allMail;
		}
		if( $appState.sent.find(el => el.id === mail.id)){
			items = $appState.sent;
		}

		let target = items.findIndex(el => el.id === mail.id);
		

		items.splice(target, 1);
		items = [...items];

		$appState.displayedMail = null;
		

	}
</script>

<div>
	<div class="mail__header">
		<div class="mail__header--left">
			<button class="icon-box btn-back" on:click={() => $appState.displayedMail = null }> <img src={Back} alt=""></button>
			<button class="icon-box"> 
				<img src={Archive} alt="">
			</button>
			<button class="icon-box"> 
				<img src={Report} alt="">
			</button>
			<button class="icon-box" on:click={handleDelete}> 
				<img src={Trash} alt="">
			</button>
			<div class="linediv"></div>
			<button class="icon-box"> 
				<img src={Mail} alt="">
			</button>
			<button class="icon-box"> 
				<img src={Snoozed} alt="">
			</button>
			<button class="icon-box"> 
				<img src={AddTask} alt="">
			</button>
			<div class="linediv"></div>
			<button class="icon-box"> 
				<img src={FileMove} alt="">
			</button>
			<button class="icon-box"> 
				<img src={Label} alt="">
			</button>
			<button class="icon-box"> 
				<img src={Dots} alt="">
			</button>
		</div>
		<div class="mail__header--right">
			<p class="mail__header__count">1 - {$appState.allMail.length > 50 ? "50" : $appState.allMail.length} di {$appState.allMail.length}</p>
			<div class="mail__header__btn-box">
				<button class="icon-box" disabled>
					<img src={ChevLeft} alt="">
				</button>
				<button class="icon-box">
					<img src={ChevRight} alt="">
				</button>
			</div>
			<button class="icon-box" ><img src={Keyboard} alt=""></button>
		</div>
	</div>
	<div class="mail__content">
		<div class="mail__content__head">
			<div class="mail__content__head__title">
				<p>{$appState.displayedMail.object ? $appState.displayedMail.object : ""}</p>
				<button class="icon-box"> 
					<img src={Print} alt="">
				</button>
				<button class="icon-box"> 
					<img src={NewWindow} alt="">
				</button>
			</div>
			<div class="mail__content__head__sender">
				<div class="mail__content__head__sender--left">
					<button class="icon-box icon-box--lg user__icon">{$appState.displayedMail.from?.slice(0,1).toUpperCase() || $appState.displayedMail.to.slice(0,1).toUpperCase()}</button>
					<div>
						<p> <strong> {$appState.displayedMail.from ||$appState.displayedMail.to}</strong> { $appState.displayedMail.email ? `<${$appState.displayedMail.email}>` : ""} </p>

						<div class="mail__content__head__sender--left--bottom" ><p>a me</p>
						<button class="icon-box">
							<img src={ArrDD} alt="">
						</button></div>
					</div>
				</div>
				<div class="mail__content__head__sender--right">
					<p class="mail__content__head__date"> {new Date($appState.displayedMail.date).toDateString()}</p>
					<button class="icon-box" on:click={handleStar}> 
						<img src={mail.isStarred ? Starred : Star} alt="">
					</button>
					<button class="icon-box"> 
						<img src={Undo} alt="">
					</button>
					<button class="icon-box"> 
						<img src={Dots} alt="">
					</button>
				</div>
			</div>
			
		</div>
		<div class="mail__content__body">
			<p>	{$appState.displayedMail.body} </p> 

			{#if mail.files?.length > 0}
				<div class="mail__content__attachments__container">
					{#each mail.files as file}
					<div class="mail__content__attachments__item">
						<p>{file.name}</p>
						<button type="button" class="icon-box icon-box--square"> 
							<MdClose/>
						</button>
					</div>	
					{/each}
				</div>
			{/if}
			
		</div>
		<div class="mail__content__footer">
			<button>
				<img src={Undo} alt="">
				Rispondi
			</button>
			<button>
				<img src={Forward} alt="">
				Inoltra
			</button>
		</div>
		
	</div>
</div>

<style lang="scss">
	.mail__header{
		padding: 1rem 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;

		&--left{
			height: 100%;
			display: flex;
			align-items: center;
			padding-left: 1rem;

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
			margin-right: 1.4rem;

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
		.btn-back{
			margin-right: 1.6rem;
		}
		.linediv{
		border-left: .01rem solid rgba(0,0,0,.2);
		height: 2rem;
		margin: 0 1rem;
	}

	.mail__content{
		padding: 1.4rem;
		&__head{
			margin-bottom: 3rem;

			&__title{
			display: flex;
			align-items: center;
			margin-bottom: 3rem;
			

			p{
				flex: 1;
				font-size: 2.4rem;
				padding-left: 5.4rem;
			}}

			&__sender{
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
				&--left{
					display: flex;
					align-items: center;
					p{
						color: var(--color-text-light)
						strong{
							color: var(--color-text-main)
						}
					};

					&--bottom{
						display: flex;
					align-items: center;
					font-size: 1.2rem;
			color: var(--color-text-light);
					.icon-box{
						height: 2rem;
						width: 2rem;
					img{
					height: 1.8rem;
					width: 1.8rem;}
			}

					}

				}
				&--right{
					display: flex;
					align-items: center;

				}
			}
			&__date{
				font-size: 1.2rem;
			color: var(--color-text-light);
			}
		}
		&__body{
			width: 80%;
			max-width: 80%;
			overflow-wrap: break-word;
			margin: 0 auto 3rem;

			p{
				line-height: 1.5;
			}
		}
		&__footer{
			display: flex;
			align-items: center;
			gap: 1.2rem;
			button{
				display: flex;
				align-items: center;
				justify-content: center;
				font-family: inherit;
				font-size: inherit;
				font-weight: 500;
				color: var(--color-text-light);
				width: 10rem;
				height: 3.5rem;
				border-radius: 300rem;
				border: .01rem solid var(--color-text-main);
				background-color: #fff;

				img {
					height: 2rem;
					width: 2rem;
				}
			}

		}
		.icon-box{
				img{
				height: 2rem;
				width: 2rem;}
			}
		&__attachments{
		&__container{
			margin-top: 2rem;
			display: flex;
			flex-wrap: wrap;
			gap: .4rem;
		}
		&__item{
			display: flex;
			align-items: center;
			justify-content: space-between;
			cursor: pointer;
			color: var(--color-primary);
			text-decoration: underline;
			background-color: var(--color-input);
			padding-left: 1rem;

			button{
				:global(svg){
					height: 1.4rem;
					width: 1.4rem;
					fill: var(--color-primary);
				}
			}
		}
	}
	}
	.user__icon{
				color: #fff;
				background-color: var(--color-primary);
				font-size: 1.8rem;
				margin-right: 2rem;
			}
</style>