<script>
	let isOpen = true;
	import appState from "../../stores/appState";
	import Close from "../../assets/icons/close.svg";
	import Minimize from "../../assets/icons/minimize.svg";
	let newMail = {
		to:"",
		object:"",
		body:"",
		date: new Date(),
		isDraft: true,
	}
	;

	$:if (newMail.body || newMail.object || newMail.to) $appState.isDirty=true
	$:console.log($appState.drafts)
	

	const handleCloseEditor = () => {
		
		if ($appState.isDirty && newMail.isDraft === true) $appState.drafts = [...$appState.drafts, newMail]
		$appState.isWriting = false
		$appState.isDirty=false

	}

	const handleSubmit = e => {
		e.preventDefault();
		if(!newMail.body || !newMail.to) return
		$appState.sent.push({...newMail, isDraft:false});
		setTimeout(()=> {$appState.isWriting = false;$appState.isDirty=false; }, 1000)	
		
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
<div class="editor__input__item">
	<input type="text" class="editor__input__field" bind:value={newMail.to}>
</div>
<div class="editor__input__item">
	<input type="text" class="editor__input__field" bind:value={newMail.object}>
</div>
<div class="editor__textarea">
	<textarea name="" id="" bind:value={newMail.body}></textarea>
	<!-- TODO text editor w/ iframe -->
</div>
<div class="editor__footer">
	<button type="submit">Send</button>
</div>
{/if}
</form>

<style lang="scss">
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
			background-color: var(--color-input);
			border-radius: 1.2rem 1.2rem 0 0;

			h4 {
				color: var(--color-text-selected);
				font-weight: 500;
				margin-right: 2rem;
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
				border: 2px solid red;
				width: 100%;
			}
			&__field{
				height: 4rem;
				width: 100%;
			}
		}
		&__textarea{
			flex: 1;
			border: 2px solid yellow;
			outline: none;
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
			border: 2px solid black;
		}

	}
</style>


