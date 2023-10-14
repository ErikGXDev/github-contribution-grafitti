<script lang="ts">
  import { getFormattedDate } from "$lib";

  export let date: Date = new Date();
  export let onClick: Function = () => {};
  export let onHover: Function = () => {};

  export let state: number = 0;

  $: fullDate = getFormattedDate(date);
</script>

<button
  class="w-4 h-4 p-[2px] block"
  data-d={date}
  on:mouseenter={() => {
    onHover(fullDate);
  }}
  on:mousedown={() => {
    onClick(fullDate);
  }}
>
  <div
    class={`l${state} ${
      state > 0 && "sel"
    } rounded-sm border-gh-gray-border w-full h-full relative block`}
    data-d={fullDate}
  />
  <p class="hidden">{date.toString()}</p>
</button>

<style lang="postcss">
  .sel {
    @apply border border-gh-green-4/50;
  }

  .l0 {
    @apply bg-gh-gray-7;
  }
  .l1 {
    @apply bg-gh-green-1 border border-white/20;
  }
  .l2 {
    @apply bg-gh-green-2 border border-white/30;
  }
  .l3 {
    @apply bg-gh-green-3 border border-white/30;
  }
  .l4 {
    @apply bg-gh-green-4 border border-white/30;
  }
</style>
