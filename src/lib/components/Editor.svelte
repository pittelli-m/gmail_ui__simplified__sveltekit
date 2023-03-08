<script>
	let isOpen = true;
	let focusShow = false;
	import appState from "../../stores/appState";
	import Close from "../../assets/icons/close.svg";
	import Minimize from "../../assets/icons/minimize.svg";
	import Dots from "../../assets/icons/more-vert.svg";
	import Lock from "../../assets/icons/lock-clock.svg";
	import Attachment from "../../assets/icons/attachment.svg";
	import Link from "../../assets/icons/link.svg";
	import Image from "../../assets/icons/image.svg";
	import Color from "../../assets/icons/color-text.svg";
	import Drive from "../../assets/icons/drive.svg";
	import Sign from "../../assets/icons/pen.svg";
	import Smile from "../../assets/icons/mood.svg";
	import Trash from "../../assets/icons/trash.svg";
	import MdArrowDropDown from 'svelte-icons/md/MdArrowDropDown.svelte';
	import MdClose from 'svelte-icons/md/MdClose.svelte';
	import { update } from "../../stores/appState";

	 let newMail = $appState.openDraft || {
		to:"",	
		object:"",
		body:"",
		date: new Date(),
		isDraft: true,
		isSent: false,
		files:{},
		id: Math.round(Math.random()*99999)
	}

	$:if (newMail.body || newMail.object || newMail.to) $appState.isDirty=true

	const handleCloseEditor = () => {
		if ($appState.isDirty && newMail.isDraft === true && newMail.id !== $appState.openDraft?.id){
			$appState.drafts = [...$appState.drafts, newMail];
			
			}
		else if($appState.isDirty && newMail.isDraft === true);
		{	
			let original = $appState.drafts.findIndex(el => el.id === newMail.id);
			$appState.drafts.splice(original, 1, newMail);
			$appState.drafts = [...$appState.drafts];
			
		}
		
		$appState.isWriting = false;
		$appState.openDraft =null;
		$appState.isDirty=false;
		$appState.draftsSorted = $appState.sortByDate($appState.drafts.slice());
		update({...$appState});
		
	}

	const handleSubmit = e => {
		e.preventDefault();
		if(!newMail.body || !newMail.to) return
		$appState.sent.push({...newMail, isDraft:false});
		$appState.sentSorted = $appState.sortByDate($appState.sent.slice());
		
		

		setTimeout(()=> {
			$appState.isWriting = false;
			$appState.isDirty=false;
			$appState.openDraft = null;
			handleClear(newMail.id);
			update({...$appState});
			
		 }, 1000)	
	}
	const handleDelete = () => {
		let target = $appState.drafts.findIndex(el => el.id === newMail.id);
		$appState.drafts.splice(target, 1);
		$appState.drafts = [...$appState.drafts];
		$appState.draftsSorted = $appState.sortByDate($appState.drafts.slice());
		$appState.isWriting = false;
		$appState.isDirty=false;
		$appState.openDraft =null;

		update({...$appState});
	}

	const onFocus = () => focusShow = true;
	const onBlur =() => focusShow =false;

	const handleClear = (id) => {
		let target = $appState.drafts.findIndex(el => el.id === id);
		$appState.drafts.splice(target, 1);
		$appState.drafts = [...$appState.drafts];
		$appState.draftsSorted = $appState.sortByDate($appState.drafts.slice());
		update({...$appState});
	}	
	
</script>
<form class={`editor ${isOpen && "editor--open"}`} on:submit = {(e) => handleSubmit(e)}>
	<div class="editor__header">
		<h4>
			Nuovo Messagio
		</h4>
		<div class="btn-box">
			<button type="button" class="icon-box" on:click={() => isOpen = !isOpen}> 
				<img src={Minimize} alt="minimize" >
			</button>
			<button type="button" class="icon-box" on:click={handleCloseEditor}> 
				<img src={Close} alt="Close">
			</button>
		</div>
	</div>
{#if isOpen }
<div class="editor__input__item__wrapper">
	<div class="editor__input__item">
	<div class={ `editor__input__focus-show ${ focusShow && "editor__input__focus-show--to"}`}> <span>A</span></div>
	<input type="text" class= "editor__input__field" bind:value={newMail.to} on:focus={onFocus} on:blur={onBlur} placeholder={ focusShow? "" : "Destinatari"}>
	<div class={ `editor__input__focus-show ${ focusShow && "editor__input__focus-show--to"}`}> <p>Cc Ccn</p> </div>
</div>
</div>
<div class="editor__input__item__wrapper">
	<div class="editor__input__item">
	<input type="text" class=" editor__input__field" bind:value={newMail.object} placeholder="Oggetto" >
</div>
</div>
<div class="editor__textarea">
	<textarea name="" id="" bind:value={newMail.body}></textarea>
	{#if newMail.files.length > 0}
		<div class="editor__attachments__container">
			{#each newMail.files as file}
			<div class="editor__attachments__item">
				<p>{file.name}</p>
				<button type="button" class="icon-box icon-box--square"> 
					<MdClose/>
				</button>
			</div>	
			
			{/each}
		</div>
	{/if}
	<!-- TODO text editor w/ iframe -->
</div>
<div class="editor__footer">
	<button type="submit" class="editor__submit">
		<div class="editor__submit--left">Invia</div>
		<div class="editor__submit--right">
			<MdArrowDropDown/>
		</div>
	</button>

	<div class="editor__footer__btns__container">
		<button type="button" class="icon-box icon-box--square"> 
			<img src={Color} alt="">
		</button>
		<div class="icon-box icon-box--square">
			<label for="attachmentButton" class="editor__footer__attachment-upload__label">
				<img src={Attachment} alt="">
			</label>
			<input class="editor__footer__attachment-upload" type="file" accept="image/*,.doc,.docx,.xml,.pdf" id="attachmentButton" name="attachment" multiple bind:files={newMail.files}>
		</div>
		<button type="button" class="icon-box icon-box--square"> 
			<img src={Link} alt="">
		</button>
		<button type="button" class="icon-box icon-box--square"> 
			<img src={Smile} alt="">
		</button>
		<button type="button" class="icon-box icon-box--square"> 
			<img src={Drive} alt="">
		</button>
		<button type="button" class="icon-box icon-box--square"> 
			<img src={Image} alt="">
		</button>
		<button type="button" class="icon-box icon-box--square"> 
			<img src={Lock} alt="">
		</button>
		<button type="button" class="icon-box icon-box--square"> 
			<img src={Sign} alt="">
		</button>
		<button type="button" class="icon-box icon-box--square"> 
			<img src={Dots} alt="">
		</button>
	</div>
	<button type="button" class="icon-box icon-box--square" on:click={handleDelete}> 
		<img src={Trash} alt="">
	</button>
</div>
{/if}
</form>

<style lang="scss">
@import "@fontsource/lexend-deca";
	.editor{

			&--open{
			height: 75vh;
			width:35vw;
			display: flex;
			flex-direction: column;
			border-radius: 1.2rem 1.2rem 0 0;
			box-shadow:  0 .0 .3rem .2rem rgba(0,0,0,.2)
		}
		&__header{
			padding: 1rem;
			height: 4rem;
			display: flex;
			justify-content: space-between;
			background-color: var(--color-editor-header);
			border-radius: 1.2rem 1.2rem 0 0;

			h4 {
				color: var(--color-text-selected);
				font-weight: 500;
				margin-right: 2rem;
				user-select: none;
			}

			.btn-box {
				display: flex;
			}
			.icon-box{
				height: 2rem;
				width:2rem;
				img{
					height:1.6rem;
					width:1.6rem;
				}
			}
		}
		&__input{
			&__item{	
				width: 100%;
				display: flex;
				align-items: center;
				border-bottom: .01rem solid rgba(0,0,0,.2);
				font-family: "Lexend Deca", sans-serif;
				&__wrapper{
				width: 100%;
				background: #fff;
				padding: 0 1rem;
			}
			}
			
			&__field{
				height: 4rem;
				width: 100%;
				border: none;
				padding: .4rem;
				font-family: "Roboto", sans-serif;
			

				&::placeholder{
					font-size: inherit;
					font-weight: 500;
					font-family: inherit;

				}
			}
			&__focus-show{
			display: none;
				&--to {
					display: flex;
					align-items: center;
					flex-wrap: nowrap;
					p {
						width: 5rem;
					}
					span, p {
						cursor: pointer;
					}
				}
			}
		}
		&__textarea{
			flex: 1;
			outline: none;
			position: relative;
			textarea{
				height: 100%;
				width: 100%;
				border: none;
    			overflow: auto;
    			outline: none;
				-webkit-box-shadow: none;
				-moz-box-shadow: none;
				box-shadow: none;
				font-family: inherit;
				font-size: inherit;
				padding: 1rem;
    			resize: none;
			}
		}
		&__footer{
			height: 5rem;
			display: flex;
			align-items: center;
			padding: 0 1.4rem;
			gap: 1.6rem;
			background-color: #fff;
			.icon-box{
					width: 2.4rem;
					height: 2.4rem;
					img{
						height: 2rem;
						width: 2rem;
					}
				}

			&__btns__container{
				display: flex;
				align-items: center;
				flex: 1;
				gap: .4rem
			}

			&__attachment-upload{
			display: none;
			&__label{
				cursor: pointer;
			}
		}
		}
		&__submit{
			width: 10rem;
			height: 3.6rem;
			border-radius: 300rem;
			display: flex;
			align-items: center;
			background-color: var(--color-primary);
			color: #fff;
			border: none;
			&:hover{
			background-image: linear-gradient(rgba(255,255,255,0.2) 0 0);
		}
		
			&--left{
				flex:.7;
				border-right: .01rem solid #000;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-weight: 600;
			}
			&--right{
				flex:.3;
				display: flex;
				align-items: center;
				justify-content: center;
				:global(svg){
					height: 2rem;
					width: 2rem;
				}
			}
			
		}
		&__attachments{
			&__container{
			position: absolute;
			bottom: 0;
			min-height: 2rem;
			padding: 1rem;
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
			margin-bottom: .2rem;

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
	
</style>


