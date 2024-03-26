<script lang="ts">
  import SuperDebug, {
    superForm,
    dateProxy,
    filesProxy,
  } from "sveltekit-superforms";
  import { zod } from "sveltekit-superforms/adapters";
  import { reportSchema, schema } from "./schema.js";

  import ReportForm from "./ReportForm.svelte";

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
</script>

tainted
<SuperDebug data={$tainted} />
form
<SuperDebug data={$form} />

<div class="flex flex-col items-center m-2">
  {#if $message}<h4>"{$message}"</h4>{/if}

  <form
    method="POST"
    enctype="multipart/form-data"
    use:enhance
    class="space-y-8 w-full max-w-md"
  >
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
