<!-- YearGrid.svelte -->
<script lang="ts">
  import { generateDateWithWeekday, getFormattedDate } from "$lib";
  import GridCell from "./GridCell.svelte";
  import ScriptGen from "./ScriptGen.svelte";

  let daysOfWeek: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  function getDayOfWeek(date: Date): string {
    const dayIndex: number = date.getDay();
    return daysOfWeek[dayIndex];
  }

  let year = 2023;
  let days: { date: Date; dayOfWeek: string; disabled?: boolean }[] = [];

  function generateGrid() {
    days = [];

    resetGrid();

    let firstDay = new Date(year, 0, 1).getDay();

    new Array(firstDay).fill(null).forEach((_, i) => {
      let d = generateDateWithWeekday(daysOfWeek[i]);
      days.push({
        date: d,
        dayOfWeek: getDayOfWeek(d)
      });
    });

    for (let month: number = 0; month < 12; month++) {
      for (let day: number = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
        days.push({
          date: new Date(year, month, day),
          dayOfWeek: getDayOfWeek(new Date(year, month, day))
        });
      }
    }
  }

  let selectedDate = "";

  let selectedLevelColor = 4;

  let gridData: { [index: string]: number } = {};

  function cellHover(d: string) {
    selectedDate = d;
    if (mousedown) {
      setLevelState(d);
    }
  }

  function setLevelState(d: string) {
    gridData[d] = selectedLevelColor;
    gridData = { ...gridData };
  }

  function setSelectedLevelColor(l: number) {
    selectedLevelColor = l;
  }

  function resetGrid() {
    gridData = {};
    gridData = { ...gridData };
  }

  let mousedown = false;

  let commit = new Array(5).fill(null).map((_, i) => Math.floor(12 * (0.25 * (4 - i))));

  function upgradeCommit() {
    commit = [...commit];
  }

  generateGrid();
</script>

<svelte:body
  on:mousedown={() => {
    mousedown = true;
  }}
  on:mouseup={() => {
    mousedown = false;
  }}
/>

<div class="p-4 rounded-md w-full border border-gh-gray-6">
  <h2 class="text-lg">Configuration</h2>
  <div class="mt-2">
    <p>Set the year you want to draw in:</p>
    <div class="flex gap-2">
      <input class="gray-field mt-2" type="number" bind:value={year} on:input={generateGrid} />
    </div>
  </div>
  <hr />
  <div>
    <p>Set how many commits each green color should generate.</p>
    <p class="w-1/2">
      Experiment around and try to match the colors from your Github contribution table.
    </p>
  </div>

  <div class="flex gap-2 mt-4">
    {#each Array(5) as _, i}
      <div class="w-16">
        <GridCell state={4 - i} />
        {#if i < 4}
          <input
            class="gray-field w-16 mt-2"
            type="number"
            bind:value={commit[i]}
            on:input={upgradeCommit}
          />
        {/if}
      </div>
    {/each}
  </div>
</div>
<div class="p-4 rounded-md w-full border border-gh-gray-6 mt-4">
  <h2 class="text-lg">Drawing Grid</h2>
  <p>Select your color at the bottom left. Drag your mouse over the grid to draw.</p>

  <table class="table-fixed select-none mt-2">
    {#each daysOfWeek as weekday, i}
      <tr>
        <th class="w-12 relative h-[18px]">
          {#if i % 2}
            <span class="absolute left-0 top-0 text-[14px] font-medium">{weekday.slice(0, 3)}</span>
          {/if}
        </th>
        {#each days as day}
          {#if day.dayOfWeek === weekday}
            <td data-d={day.date} id={day.date.toString()}>
              {#if day.date.getFullYear() == 1901}
                <GridCell date={day.date} state={-1} />
              {:else}
                <GridCell
                  date={day.date}
                  onClick={setLevelState}
                  onHover={cellHover}
                  state={gridData[getFormattedDate(day.date)] || 0}
                />
              {/if}</td
            >
          {/if}
        {/each}
      </tr>
    {/each}
  </table>
  <div class="flex justify-between pl-12 mt-2 text-sm">
    <p class="text-gh-gray-4">{selectedDate}</p>
    <div class="flex items-center gap-1">
      <span>Color Selector:</span>
      <div class="flex">
        {#each Array(5) as _, i}
          <div class={`${selectedLevelColor == i && "largecell"}`}>
            <GridCell
              state={i}
              onClick={() => {
                setSelectedLevelColor(i);
              }}
            />
          </div>
        {/each}
      </div>
    </div>
  </div>
  <div class="mt-4 flex gap-2">
    <a
      href="#script"
      class="rounded-md border border-gh-green-4 bg-gh-green-2 hover:bg-gh-green-3 p-1 px-2 cursor-pointer"
      >Generate Script</a
    >
    <button class="gray-field" on:click={resetGrid}>Reset Grid</button>
  </div>
</div>
<div class="p-4 rounded-md w-full border border-gh-gray-6 mt-4 flex gap-4">
  <ScriptGen data={gridData} {commit} />
</div>

<style lang="postcss">
  /* Include your Tailwind CSS classes here */

  .largecell {
    @apply scale-150;
  }

  hr {
    @apply border-t border-t-gh-gray-6 my-4;
  }
</style>
