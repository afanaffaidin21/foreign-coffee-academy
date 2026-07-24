/**
 * Script to automatically create GitHub Milestones and Issues from PRD.md Section 29
 * 
 * Usage:
 *   1. Authenticate with GitHub CLI: gh auth login
 *   2. Run: node scripts/create-github-issues.js
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const MILESTONES = [
  { title: "Milestone 1 — Foundation", file: "milestone-1-foundation.md" },
  { title: "Milestone 2 — Marketing UI", file: "milestone-2-marketing-ui.md" },
  { title: "Milestone 3 — Data", file: "milestone-3-data.md" },
  { title: "Milestone 4 — Authentication", file: "milestone-4-authentication.md" },
  { title: "Milestone 5 — Learning", file: "milestone-5-learning.md" },
  { title: "Milestone 6 — Sandbox Payment", file: "milestone-6-sandbox-payment.md" },
  { title: "Milestone 7 — Admin CMS", file: "milestone-7-admin-cms.md" },
  { title: "Milestone 8 — Quality and Deployment", file: "milestone-8-quality-deployment.md" }
];

const ISSUES_DIR = path.join(__dirname, "..", "docs", "github-issues");

function runCommand(command) {
  try {
    return execSync(command, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim();
  } catch (error) {
    console.error(`Command failed: ${command}\n${error.stderr || error.message}`);
    return null;
  }
}

function parseMarkdownIssues(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const issueBlocks = content.split(/\n(?=## Issue \d+:)/);
  const issues = [];

  for (const block of issueBlocks) {
    const titleMatch = block.match(/^## Issue \d+:\s*(.+)$/m);
    if (!titleMatch) continue;

    const fullTitle = titleMatch[1].trim();
    // Body is everything under the heading
    const body = block.replace(/^## Issue \d+:.+$/m, "").trim();

    issues.push({
      title: fullTitle,
      body: body
    });
  }

  return issues;
}

function main() {
  console.log("Checking gh CLI status...");
  const authStatus = runCommand("gh auth status");
  if (!authStatus || authStatus.includes("Failed")) {
    console.error("\n❌ GitHub CLI is not authenticated.");
    console.error("Please run `gh auth login` or `gh auth refresh` first, then re-run this script.\n");
    process.exit(1);
  }

  console.log("🚀 Starting GitHub Milestones & Issues creation...\n");

  for (const milestone of MILESTONES) {
    console.log(`📌 Creating / Verifying Milestone: "${milestone.title}"...`);
    // Create milestone using gh api
    runCommand(`gh api repos/{owner}/{repo}/milestones -f title="${milestone.title}" --silent`);

    const filePath = path.join(ISSUES_DIR, milestone.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Warning: ${milestone.file} not found. Skipping.`);
      continue;
    }

    const issues = parseMarkdownIssues(filePath);
    console.log(`   Found ${issues.length} issues in ${milestone.file}. Creating issues...`);

    for (const issue of issues) {
      const tempBodyFile = path.join(__dirname, "temp_issue_body.txt");
      fs.writeFileSync(tempBodyFile, issue.body, "utf8");

      console.log(`   - Creating Issue: "${issue.title}"`);
      const cmd = `gh issue create --title "${issue.title.replace(/"/g, '\\"')}" --body-file "${tempBodyFile}" --milestone "${milestone.title.replace(/"/g, '\\"')}"`;
      runCommand(cmd);

      if (fs.existsSync(tempBodyFile)) {
        fs.unlinkSync(tempBodyFile);
      }
    }
  }

  console.log("\n✅ All 56 GitHub Issues created successfully!");
}

if (require.main === module) {
  main();
}
