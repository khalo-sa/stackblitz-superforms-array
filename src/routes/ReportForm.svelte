<script lang="ts">
  import type { ReportSchema } from "./schema.js";
  import type { SuperValidated, Infer } from "sveltekit-superforms";
  import { filesProxy, dateProxy } from "sveltekit-superforms";

  export let value: SuperValidated<Infer<ReportSchema>>;
  export let label: string | undefined = undefined;

  const images = filesProxy(value, "images");
  const reportDate = dateProxy(value, "reportDate", { format: "date" });

  //   export let errors: string[] | undefined = undefined;
  //   export let constraints: InputConstraint | undefined = undefined;
</script>

<div class=" border border-solid border-gray-100 p-4 rounded-lg">
  <span class="text-lg font-bold">{label}</span>

  <!-- reportDate -->
  <label class="form-control">
    <div class="label">Report Date:</div>
    <input
      type="date"
      placeholder=""
      class="input input-bordered"
      bind:value={$reportDate}
    />
    {#if $reportDate}
      <br />
      <span class="invalid">{$reportDate}</span>
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
      bind:files={$images}
      class="file-input file-input-bordered"
    />
    <ul class="invalid">
      {#if $images?._errors}
        {#each $images?._errors as error, i}
          {#if error}
            <li>Image {i + 1}: {error}</li>
          {/if}
        {/each}
      {/if}
    </ul>
  </label>
</div>
