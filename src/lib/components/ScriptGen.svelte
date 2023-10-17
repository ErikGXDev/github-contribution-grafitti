<script lang="ts">
  export let data: { [index: string]: number };
  export let commit: number[];

  $: scriptData = Object.entries(data)
    .filter((el) => {
      const [k, v] = el;

      return v != 0;
    })
    .map((el, i) => {
      const [k, v] = el;
      console.log(k, v, commit);
      let adjusted = commit[commit.length - v - 1];
      console.log(adjusted);
      return "'" + k + ":" + adjusted + "',";
    })
    .join("\n");

  $: scriptText = `const fs = require("fs");
const { execSync } = require("child_process");

const data = [

    ${scriptData}

];

data.forEach((d) => {
  const [a, b] = d.split(":")

  new Array(parseInt(b)).fill(null).forEach((u, i) => {
    fs.writeFileSync("date.txt", a+b+i)
    execSync(\`git add date.txt\`)
    execSync(\`git commit -m "\${a}" --date "\${a}"\`)
  } )
})

execSync("git push")`;

  let dlink: HTMLAnchorElement;
  let ddlink = "";
  function download(e: Event) {
    ddlink = "data:text/plain;charset=utf-8," + encodeURIComponent(scriptText);
  }
</script>

<div class="w-full">
  <textarea value={scriptText} id="script" class="gray-field w-full" rows={10} />
  <a
    bind:this={dlink}
    on:click={download}
    href={ddlink}
    download="script.js"
    class="gray-field text-sm mt-2 block w-fit">Download Script</a
  >
</div>

<div class="w-full">
  <h2 class="text-lg">How to use</h2>
  <ol class="list-decimal ml-4">
    <li>Finish drawing your grid</li>
    <li>Download or copy your script</li>
    <li>Create a new repository locally ("git init")</li>
    <li>Move or paste the script in the directory of the repository</li>
    <li>Run the script using "node script.js"</li>
  </ol>
</div>
