const fs = require("fs");
const { execSync } = require("child_process");

const data = [



];

data.forEach((d) => {
  const [a, b] = d.split(";")

  new Array(parseInt(b)).fill(null).forEach((u, i) => {#
    fs.writeFileSync("date.txt", a)
    execSync(`git add date.txt`)
    execSync(`git commit -m "${a} --date "${a}"`)
  } )
})

execSync(`git push`)