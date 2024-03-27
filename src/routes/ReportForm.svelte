<script lang="ts">
  import type { schema } from "./schema.js";
  import type { Infer, SuperForm } from "sveltekit-superforms";
  import { dateProxy, filesFieldProxy } from "sveltekit-superforms";

  export let superform: SuperForm<Infer<typeof schema>>;
  export let label: string;
  export let index: number;

  const reportDate = dateProxy(superform, `reports[${index}].reportDate`, {
    format: "date",
  });

  const { errors } = superform;

  const { values: images, valueErrors: imagesErrors } = filesFieldProxy(
    superform,
    `reports[${index}].images`
  );
</script>

<div class=" border border-solid border-gray-100 p-4 rounded-lg">
  <span class="text-lg font-bold">{label}</span>

  <!-- reportDate -->
  <label class="form-control">
    <div class="label">Report Date:</div>
    <input
      type="date"
      name={`reports[${index}].reportDate`}
      placeholder=""
      class="input input-bordered"
      bind:value={$reportDate}
    />
    {#if $errors.reports?.[index]?.reportDate}
      <br />
      <span class="invalid">{$errors.reports?.[index]?.reportDate}</span>
    {/if}
  </label>

  <!-- images -->
  <label class="form-control">
    <div class="label">Upload images:</div>
    <input
      type="file"
      multiple
      name={`reports[${index}].images`}
      accept="image/png, image/jpeg"
      bind:files={$images}
      class="file-input file-input-bordered"
    />
    <ul class="invalid">
      {#each $imagesErrors as error, i}
        {#if error}
          <li>Image {i + 1}: {error}</li>
        {/if}
      {/each}
    </ul>
  </label>
</div>
