<script lang="ts">
	import SuperDebug, { superForm, dateProxy, filesProxy } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { defectSchema, schema } from './schema.js';

	export let data;

	const pageForm = superForm(data.form, {
		validators: zod(schema),
		resetForm: true,
		dataType: 'json',
		taintedMessage: "You've made changes. Are you sure you want to leave?"
	});
	const { form, message, enhance, errors, tainted } = pageForm;


	const addReport = () => {
		$form.reports = [...$form.reports, {} as typeof defectSchema._type];
	};

</script>

tainted
<SuperDebug data={$tainted} />
form
<SuperDebug data={$form} />

<div class="flex flex-col items-center m-2">
	{#if $message}<h4>"{$message}"</h4>{/if}

	<form method="POST" enctype="multipart/form-data" use:enhance class="space-y-8 w-full max-w-md">
		
		{#each $form.reports as _, i}
			<div class=" border border-solid border-gray-100 p-4 rounded-lg">
				<span class="text-lg font-bold">Report {i + 1}</span>
				
				<!-- reportDate -->
				<label class="form-control">
					<div class="label">Report Date:</div>
					<input
						type="date"
						placeholder=""
						class="input input-bordered"
						bind:value={$form.reports[i].reportDate}
					/>
					{#if $errors.reports?.[i]?.reportDate}
						<br />
						<span class="invalid">{$errors.reports[i].reportDate}</span>
					{/if}
				</label>

				<!-- images -->
				<label class="form-control">
					<div class="label">Upload images:</div>
					<input
						type="file"
						multiple
						name="images"
						accept="image/png, image/jpeg"
						bind:files={$form.reports[i].images}
						class="file-input file-input-bordered"
					/>
					<ul class="invalid">
						{#if $errors.reports?.[i]?.images?._errors}
							{#each $errors.reports?.[i]?.images?._errors as error, i}
								{#if error}
									<li>Image {i + 1}: {error}</li>
								{/if}
							{/each}
						{/if}
					</ul>
				</label>
			</div>
		{/each}

		<button type="button" class="btn w-full" on:click={addReport}>Add report</button>
		<!-- submit -->
		<button type="submit" class="btn w-full">Submit</button>
	</form>
</div>
