// Publish the site: stamps a fresh version on CSS/JS links (so browsers drop old cached
// styles), then commits and pushes. GitHub Pages updates about a minute later.
// Usage: npm run publish -- "What changed"
import fs from "node:fs";
import { execSync } from "node:child_process";
const v = new Date().toISOString().replace(/\D/g, "").slice(0, 12);
for (const f of fs.readdirSync(".").filter((f) => f.endsWith(".html"))) {
  const s = fs.readFileSync(f, "utf8")
    .replace(/(href="css\/site\.css)(\?v=\d+)?"/, `$1?v=${v}"`)
    .replace(/(src="js\/site\.js)(\?v=\d+)?"/, `$1?v=${v}"`);
  fs.writeFileSync(f, s);
}
const css = "css/site.css";
fs.writeFileSync(css, fs.readFileSync(css, "utf8").replace(/url\("\.\/(tokens|base)\.css(\?v=\d+)?"\)/g, `url("./$1.css?v=${v}")`));
const msg = process.argv.slice(2).join(" ") || "Update site";
const run = (c) => execSync(c, { stdio: "inherit" });
run("git add -A");
run(`git commit -m ${JSON.stringify(msg)}`);
run("git push");
console.log(`\nPushed. Live in about a minute: https://booniraj-prog.github.io/botsweb-website/`);
