<script lang="ts">
  import SuperDebug, { superForm } from "sveltekit-superforms";
  import { zod } from "sveltekit-superforms/adapters";
  import { reportSchema, schema } from "./schema.js";

  import ReportForm from "./ReportForm.svelte";
  import { onMount } from "svelte";

  export let data;

  const pageForm = superForm(data.form, {
    validators: zod(schema),
    resetForm: true,
    dataType: "json",
    taintedMessage: "You've made changes. Are you sure you want to leave?",
  });
  const { form, message, enhance, errors, tainted } = pageForm;

  const addReport = () => {
    $form.reports = [...$form.reports, {} as typeof reportSchema._type];
  };

  onMount(() => {
    form.update(($form) => {
      $form.name = "test";
      $form.reports = [
        {
          reportDate: new Date("01-01-1988"),
          images: [new File(["1234566"], "test.txt", { type: "text/plain" })],
        },
      ];
      return $form;
    });
  });
</script>

<div class="flex flex-col items-center m-2">
  {#if $message}<h4>"{$message}"</h4>{/if}

  <form
    method="POST"
    enctype="multipart/form-data"
    class="space-y-8 w-full max-w-md"
    use:enhance
  >
    <!-- name -->
    <!-- description -->
    <label class="form-control">
      <div class="label">Name</div>
      <input
        type="text"
        name="name"
        placeholder=""
        class="input input-bordered"
        bind:value={$form.name}
        data-invalid={$errors.name}
      />
      {#if $errors.name}
        <br />
        <span class="invalid">{$errors.name}</span>
      {/if}
    </label>

    {#each $form.reports as _, i}
      <ReportForm superform={pageForm} label={`Report ${i + 1}`} index={i} />
    {/each}

    <button type="button" class="btn w-full" on:click={addReport}
      >Add report</button
    >
    <!-- submit -->
    <button type="submit" class="btn w-full">Submit</button>
  </form>
</div>
tainted
<SuperDebug data={$tainted} />
form
<SuperDebug data={$form} />
