<script lang="ts">
  export let data: { [index: string]: number };
  export let commit: number;

  $: scriptData = Object.entries(data)
    .filter((el) => {
      const [k, v] = el;

      return v != 0;
    })
    .map((el) => {
      const [k, v] = el;
      console.log(k, v, commit);
      let adjusted = Number(commit) * (0.25 * Number(v));
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
</script>

<div class="w-full">
  <p class="mb-2">script.js</p>
  <textarea value={scriptText} class="gray-field w-full" rows={10} />
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
