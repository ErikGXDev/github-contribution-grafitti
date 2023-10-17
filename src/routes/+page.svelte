<script lang="ts">
  import ContributionGrid from "$lib/components/ContributionGrid.svelte";
  import "$lib/app.css";
</script>

<div class="">
  <h1 class="font-bold text-2xl text-center py-4">Github Contribution Grafitti</h1>

  <ContributionGrid />

  <div class="flex justify-center gap-1 mt-16 mb-16 text-center w-full">
    <span>Made by</span>
    <a
      target="_blank"
      class="underline"
      href="https://github.com/ErikGXDev?tab=overview&from=2022-12-01&to=2022-12-31">ErikGXDev</a
    >
  </div>
</div>
