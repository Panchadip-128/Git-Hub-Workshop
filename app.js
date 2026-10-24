/**
 * NexusAgent Studio 2026 & Git Workshop Lab Controller
 * Panchadip-128 / Git-Hub-Workshop
 */

// Global State
let activeTab = 'orchestrator';
let currentWorkshopModule = 1;

// Swarm Execution State
let isSwarmExecuting = false;

// Simulated Git DAG Tree State
const dagState = {
  branch: 'main',
  head: 'c1',
  commits: [
    { id: 'c1', hash: '8f2a1b9', msg: 'Initialize NexusAgent Studio & 2026 README', branch: 'main', x: 50, y: 150, color: '#6366f1' }
  ],
  branches: {
    'main': 'c1'
  }
};

// Workshop Modules Data for Lab
const workshopModules = [
  {
    num: 1,
    title: "Opening Explanation & The Core Mental Model",
    time: "15 min",
    badge: "Mental Model",
    content: `
      <p style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
        <em>"You edited your assignment, broke something, and wish you could return to yesterday’s working version."</em>
      </p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem; margin-bottom: 1.5rem;">
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 0.85rem; border-radius: var(--radius-md);">
          <strong style="color: var(--neon-cyan);">Git</strong>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.2rem;">Local time-machine tracking file history offline on your laptop.</p>
        </div>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 0.85rem; border-radius: var(--radius-md);">
          <strong style="color: var(--neon-purple);">Repository</strong>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.2rem;">Project directory whose changes Git tracks via the hidden <code>.git</code> folder.</p>
        </div>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 0.85rem; border-radius: var(--radius-md);">
          <strong style="color: #6ee7b7;">Commit</strong>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.2rem;">Saved, cryptographic checkpoint with a descriptive message.</p>
        </div>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 0.85rem; border-radius: var(--radius-md);">
          <strong style="color: #93c5fd;">Branch</strong>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.2rem;">Separate, isolated line of work to safely build new features.</p>
        </div>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 0.85rem; border-radius: var(--radius-md);">
          <strong style="color: #fda4af;">GitHub</strong>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.2rem;">Cloud platform for hosting remote Git repositories and collaborating.</p>
        </div>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 0.85rem; border-radius: var(--radius-md);">
          <strong style="color: #fde68a;">Pull Request</strong>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.2rem;">Proposal to review and merge changes between branches.</p>
        </div>
      </div>
      <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1rem;">
        <div style="font-weight: 700; margin-bottom: 0.5rem; color: var(--neon-cyan);">Workflow Pipeline:</div>
        <div style="font-family: var(--font-mono); font-size: 0.85rem; color: #cbd5e1;">
          Edit files ➔ Inspect (git diff) ➔ Stage (git add) ➔ Commit (git commit) ➔ Push (git push) ➔ Open PR ➔ Merge
        </div>
      </div>
    `
  },
  {
    num: 2,
    title: "Environment Setup & Author Identity",
    time: "15 min",
    badge: "Terminal Config",
    content: `
      <p style="color: var(--text-secondary); margin-bottom: 1rem;">
        Open terminal and verify Git binary version, then configure author signature:
      </p>
      <div style="background: #04070e; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem; font-family: var(--font-mono); font-size: 0.85rem; color: #e2e8f0; margin-bottom: 1rem;">
        <span style="color: #4ade80;">❯</span> git --version<br>
        <span style="color: #4ade80;">❯</span> git config --global user.name "Your Name"<br>
        <span style="color: #4ade80;">❯</span> git config --global user.email "your-email@example.com"
      </div>
      <div style="background: rgba(6, 182, 212, 0.1); border-left: 3px solid var(--neon-cyan); padding: 0.85rem; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; font-size: 0.85rem;">
        <strong>Quick Check Question:</strong> <em>"Does this command create a GitHub account or upload anything?"</em><br>
        <strong>Answer:</strong> No! It only writes to your local <code>~/.gitconfig</code> file.
      </div>
    `
  },
  {
    num: 3,
    title: "Create First Repository & Initial Commit",
    time: "25 min",
    badge: "First Checkpoint",
    content: `
      <div style="background: #04070e; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem; font-family: var(--font-mono); font-size: 0.85rem; color: #e2e8f0; margin-bottom: 1rem;">
        <span style="color: #4ade80;">❯</span> mkdir Git-Hub-Workshop<br>
        <span style="color: #4ade80;">❯</span> cd Git-Hub-Workshop<br>
        <span style="color: #4ade80;">❯</span> git init -b main<br>
        <span style="color: #4ade80;">❯</span> git status<br>
        <span style="color: #4ade80;">❯</span> git add README.md<br>
        <span style="color: #4ade80;">❯</span> git commit -m "Initialize NexusAgent Studio & 2026 README"<br>
        <span style="color: #4ade80;">❯</span> git log --oneline
      </div>
      <p style="font-size: 0.85rem; color: #6ee7b7;">✓ Checkpoint: Ensure every participant sees 1 commit in their git log!</p>
    `
  },
  {
    num: 4,
    title: "Edit, Compare (git diff) & .gitignore",
    time: "20 min",
    badge: "Staging & Diff",
    content: `
      <p style="color: var(--text-secondary); margin-bottom: 0.75rem;">
        Demonstrate unstaged vs staged diffs, and exclude sensitive developer notes via <code>.gitignore</code>:
      </p>
      <div style="background: #04070e; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem; font-family: var(--font-mono); font-size: 0.85rem; color: #e2e8f0; margin-bottom: 1rem;">
        <span style="color: #4ade80;">❯</span> git diff <span style="color: #94a3b8;"># Shows unstaged edits</span><br>
        <span style="color: #4ade80;">❯</span> git add README.md<br>
        <span style="color: #4ade80;">❯</span> git diff --staged <span style="color: #94a3b8;"># Shows staged bundle</span><br>
        <span style="color: #4ade80;">❯</span> echo notes.local.txt &gt;&gt; .gitignore<br>
        <span style="color: #4ade80;">❯</span> git status <span style="color: #67e8f9;"># notes.local.txt is completely hidden!</span>
      </div>
      <div style="background: rgba(245, 158, 11, 0.1); border-left: 3px solid var(--neon-amber); padding: 0.85rem; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; font-size: 0.85rem;">
        <strong>2-Minute Prediction:</strong> <em>"If I edit README again but do not run git add, will the next commit include it?"</em><br>
        <strong>Answer:</strong> <strong>NO!</strong> Commits strictly bundle whatever is in the staging area.
      </div>
    `
  },
  {
    num: 5,
    title: "Publish to GitHub (Remote & Push)",
    time: "20 min",
    badge: "Remote Push",
    content: `
      <div style="background: #04070e; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem; font-family: var(--font-mono); font-size: 0.85rem; color: #e2e8f0; margin-bottom: 1rem;">
        <span style="color: #4ade80;">❯</span> git remote add origin https://github.com/Panchadip-128/Git-Hub-Workshop.git<br>
        <span style="color: #4ade80;">❯</span> git remote -v<br>
        <span style="color: #4ade80;">❯</span> git push -u origin main
      </div>
      <p style="font-size: 0.85rem; color: var(--text-secondary);">
        • <strong>origin:</strong> The nickname for the remote GitHub URL.<br>
        • <strong>-u:</strong> Links your local branch to the remote upstream for easy future pushes.
      </p>
    `
  },
  {
    num: 6,
    title: "Branching & Open a Pull Request",
    time: "25 min",
    badge: "PR Review",
    content: `
      <p style="color: var(--text-secondary); margin-bottom: 0.75rem;">
        Isolate your project proposal in a dedicated feature branch:
      </p>
      <div style="background: #04070e; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem; font-family: var(--font-mono); font-size: 0.85rem; color: #e2e8f0; margin-bottom: 1rem;">
        <span style="color: #4ade80;">❯</span> git switch -c feature/add-project-details<br>
        <span style="color: #4ade80;">❯</span> git add project.md<br>
        <span style="color: #4ade80;">❯</span> git commit -m "Add project proposal for NexusAgent Studio"<br>
        <span style="color: #4ade80;">❯</span> git push -u origin feature/add-project-details
      </div>
      <p style="font-size: 0.85rem; color: var(--neon-cyan);">
        On GitHub: Click "Compare & pull request", review the diff under "Files changed", and submit!
      </p>
    `
  },
  {
    num: 7,
    title: "Merge & Synchronize (git pull)",
    time: "15 min",
    badge: "Sync Cycle",
    content: `
      <p style="color: var(--text-secondary); margin-bottom: 0.75rem;">
        After merging on GitHub, download the remote commits back to your local repository:
      </p>
      <div style="background: #04070e; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem; font-family: var(--font-mono); font-size: 0.85rem; color: #e2e8f0; margin-bottom: 1rem;">
        <span style="color: #4ade80;">❯</span> git switch main<br>
        <span style="color: #4ade80;">❯</span> git pull origin main<br>
        <span style="color: #4ade80;">❯</span> git log --oneline
      </div>
      <p style="font-size: 0.85rem; color: #6ee7b7;">✓ Your local main branch is now fully up to date with the remote repository!</p>
    `
  },
  {
    num: 8,
    title: "Independent Challenge & 5-Question Quiz",
    time: "15 min",
    badge: "Mastery Check",
    content: `
      <div style="background: rgba(168, 85, 247, 0.1); border: 1px solid var(--neon-purple); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1rem;">
        <strong style="color: #d8b4fe;">Solo Student Challenge:</strong>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.35rem;">
          Create a new branch, add <code>learning-goals.md</code> with 3 semester objectives, commit, push, and open a PR!
        </p>
      </div>
      <div style="font-size: 0.9rem; color: var(--text-primary);">
        <strong>Closing 5-Question Comprehension Check:</strong>
        <ol style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.35rem;">
          <li>What is the difference between Git and GitHub?</li>
          <li>What does <code>git status</code> tell you?</li>
          <li>Why do we use <code>git add</code> before <code>git commit</code>?</li>
          <li>What is a branch useful for?</li>
          <li>Why did we run <code>git pull</code> after merging on GitHub?</li>
        </ol>
      </div>
    `
  }
];

// ============================================================================
// Initialization
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  renderDagGraph();
});

// ============================================================================
// Navigation Tabs
// ============================================================================

function switchMainTab(tabId) {
  activeTab = tabId;

  // Update nav buttons
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  if (window.event && window.event.target) {
    const clickedBtn = window.event.target.closest('.tab-btn');
    if (clickedBtn) clickedBtn.classList.add('active');
  }

  // Update views
  document.querySelectorAll('.view-section').forEach(view => {
    view.classList.remove('active');
  });

  const activeView = document.getElementById(`view-${tabId}`);
  if (activeView) {
    activeView.classList.add('active');
  }

  if (tabId === 'intelligence') {
    renderDagGraph();
  }
}

// ============================================================================
// View 1: Autonomous Multi-Agent Swarm Execution
// ============================================================================

function setPresetPrompt(promptText) {
  const input = document.getElementById('user-prompt-input');
  if (input) {
    input.value = promptText;
    input.focus();
  }
}

function executeAgentSwarm() {
  const input = document.getElementById('user-prompt-input');
  const query = input ? input.value.trim() : '';
  if (!query) {
    alert('Please enter a prompt or select a preset challenge!');
    return;
  }

  if (isSwarmExecuting) return;
  isSwarmExecuting = true;

  const display = document.getElementById('swarm-simulation-display');
  const agentLabel = document.getElementById('active-agent-label');
  const thinkingBox = document.getElementById('stream-thinking-box');
  const outputContent = document.getElementById('stream-output-content');
  const toolCallsContainer = document.getElementById('stream-tool-calls');
  const timeDisplay = document.getElementById('stream-time');

  if (display) display.classList.add('visible');
  if (outputContent) outputContent.innerHTML = '';
  if (toolCallsContainer) toolCallsContainer.innerHTML = '';

  // Highlight Archon first
  highlightAgentCard('agent-archon');
  if (agentLabel) agentLabel.textContent = '🧠 Archon (System Architect) Analyzing Architecture...';
  if (thinkingBox) {
    thinkingBox.innerHTML = `
      &lt;thinking&gt;<br>
      Decomposing prompt: "${query}"...<br>
      Mapping system invariants, edge database tables, and real-time state synchronizer...<br>
      Selecting WebAssembly micro-runtime for sub-millisecond edge execution.<br>
      &lt;/thinking&gt;
    `;
  }

  let startTime = Date.now();
  const timer = setInterval(() => {
    if (timeDisplay) {
      timeDisplay.textContent = ((Date.now() - startTime) / 1000).toFixed(1) + 's';
    }
  }, 100);

  // Stage 1: Archon Specs
  setTimeout(() => {
    addToolCallPill('ArchitectureDecompose(v2026.4)');
    outputContent.innerHTML = `
      <div style="margin-bottom: 0.75rem;">
        <strong style="color: #a5b4fc;">[Archon Blueprint Approved]:</strong><br>
        Modular Edge Architecture: Zero-copy state machine, WebSockets for sync, and isolated worker sandboxes.
      </div>
    `;

    // Stage 2: Forge Code Generation
    highlightAgentCard('agent-forge');
    if (agentLabel) agentLabel.textContent = '⚡ Forge (Full-Stack Engineer) Synthesizing Code...';
    if (thinkingBox) {
      thinkingBox.innerHTML = `
        &lt;thinking&gt;<br>
        Generating TypeScript types, reactive state hooks, and client-side neural cache...<br>
        Typechecking: zero lint errors, 100% strict null safety.<br>
        &lt;/thinking&gt;
      `;
    }
  }, 1200);

  // Stage 3: Aegis Security Linting
  setTimeout(() => {
    addToolCallPill('TypeScriptCompiler(v5.8)');
    addToolCallPill('WebAssemblyEmit(wasm32)');
    outputContent.innerHTML += `
      <div style="margin-bottom: 0.75rem;">
        <strong style="color: #67e8f9;">[Forge Code Synthesis]:</strong><br>
        Emitted 1,420 lines of reactive TypeScript + WASM binary modules. Interface compiles with 0 errors.
      </div>
    `;

    highlightAgentCard('agent-aegis');
    if (agentLabel) agentLabel.textContent = '🛡️ Aegis (Security Auditor) Running Vulnerability Lint...';
    if (thinkingBox) {
      thinkingBox.innerHTML = `
        &lt;thinking&gt;<br>
        Scanning abstract syntax tree for CVE-2026-4412... Verifying secrets are NOT checked into git...<br>
        Auditing .gitignore patterns and cryptographic memory safety.<br>
        &lt;/thinking&gt;
      `;
    }
  }, 2400);

  // Stage 4: OctoGit Commit & PR Proposal
  setTimeout(() => {
    addToolCallPill('SecurityAudit(Zero-Trust Clean)');
    outputContent.innerHTML += `
      <div style="margin-bottom: 0.75rem;">
        <strong style="color: #fda4af;">[Aegis Audit Passed]:</strong><br>
        0 High CVEs detected. Zero hardcoded secret keys. Memory bounds checked.
      </div>
    `;

    highlightAgentCard('agent-octogit');
    if (agentLabel) agentLabel.textContent = '🐙 OctoGit (Repo Intelligence) Staging & Committing...';
    if (thinkingBox) {
      thinkingBox.innerHTML = `
        &lt;thinking&gt;<br>
        Formatting git diff... Staging verified artifacts into git index...<br>
        Drafting commit message following conventional commits specification.<br>
        &lt;/thinking&gt;
      `;
    }
  }, 3600);

  // Final Completion
  setTimeout(() => {
    clearInterval(timer);
    addToolCallPill('GitCommit(Hash: 7a9e2f1)');
    addToolCallPill('PR_Synthesizer(#2)');

    outputContent.innerHTML += `
      <div style="background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: var(--radius-md); padding: 1rem; margin-top: 1rem;">
        <strong style="color: #6ee7b7;">🎉 Autonomous Multi-Agent Swarm Execution Complete!</strong><br>
        <span style="font-size: 0.85rem; color: #cbd5e1;">
          Project proposal generated and ready for Git branching on <code>feature/add-project-details</code>. Inspect the Student Showcase tab to preview proposal cards!
        </span>
      </div>
    `;

    if (agentLabel) agentLabel.textContent = '✅ All 4 Agents Synchronized & Standby';
    isSwarmExecuting = false;
  }, 4800);
}

function highlightAgentCard(cardId) {
  document.querySelectorAll('.agent-card').forEach(c => c.classList.remove('active-agent'));
  const target = document.getElementById(cardId);
  if (target) target.classList.add('active-agent');
}

function addToolCallPill(toolText) {
  const container = document.getElementById('stream-tool-calls');
  if (!container) return;
  const pill = document.createElement('span');
  pill.className = 'tool-call-badge';
  pill.innerHTML = `⚙️ ${toolText}`;
  container.appendChild(pill);
}

// ============================================================================
// View 2: Student Project Proposal Modal & Card Generator
// ============================================================================

function openNewProposalModal() {
  const modal = document.getElementById('proposal-modal');
  if (modal) modal.classList.add('open');
}

function closeNewProposalModal() {
  const modal = document.getElementById('proposal-modal');
  if (modal) modal.classList.remove('open');
}

function submitProjectProposal() {
  const name = document.getElementById('prop-name').value.trim();
  const problem = document.getElementById('prop-problem').value.trim();
  const solution = document.getElementById('prop-solution').value.trim();
  const tagsStr = document.getElementById('prop-tags').value.trim() || '#2026Innovation, #FullStack';

  if (!name || !problem) {
    alert('Please provide a Project Name and Problem Statement!');
    return;
  }

  const grid = document.getElementById('project-bento-grid');
  if (grid) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const tags = tagsStr.split(',').map(t => t.trim().startsWith('#') ? t.trim() : `#${t.trim()}`);
    const tagHtml = tags.map(t => `<span class="tech-tag">${t}</span>`).join(' ');

    card.innerHTML = `
      <div class="project-tag-row">${tagHtml}</div>
      <h3 class="project-title">${name}</h3>
      <p class="project-desc"><strong>Problem:</strong> ${problem}<br><br><strong>Solution:</strong> ${solution || 'Under architectural review.'}</p>
      <div class="project-footer">
        <div class="project-author">
          <span>👤 Panchadip</span> • <span>Live Submission</span>
        </div>
        <span class="project-branch-tag">branch: feature/${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}</span>
      </div>
    `;

    grid.prepend(card);
  }

  closeNewProposalModal();
  alert(`Project "${name}" added to showcase! You can now commit this as project.md on your feature branch.`);
}

// ============================================================================
// View 3: Workshop Lab Module Switcher
// ============================================================================

function jumpWorkshopModule(moduleNum) {
  currentWorkshopModule = moduleNum;
  const data = workshopModules.find(m => m.num === moduleNum);
  if (!data) return;

  const stage = document.getElementById('module-content-area');
  if (stage) {
    stage.innerHTML = `
      <span class="hero-badge">Module ${data.num} • ${data.time}</span>
      <h2 style="font-size: 1.6rem; font-weight: 800; margin: 0.5rem 0 1rem 0;">${data.title}</h2>
      ${data.content}
    `;
  }
}

// ============================================================================
// View 4: Repo Intelligence & Commit DAG Tree
// ============================================================================

function renderDagGraph() {
  const svg = document.getElementById('live-dag-svg');
  if (!svg) return;

  let html = `
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
      </marker>
    </defs>
  `;

  // Draw lines
  const commits = dagState.commits;
  for (let i = 0; i < commits.length - 1; i++) {
    const c1 = commits[i];
    const c2 = commits[i + 1];
    html += `
      <line x1="${c1.x}" y1="${c1.y}" x2="${c2.x}" y2="${c2.y}" stroke="#475569" stroke-width="3" stroke-dasharray="${c2.branch !== c1.branch ? '4 4' : 'none'}" />
    `;
  }

  // Draw commit nodes
  commits.forEach(c => {
    const isHead = (dagState.head === c.id);
    html += `
      <g transform="translate(${c.x}, ${c.y})">
        ${isHead ? `<circle cx="0" cy="0" r="18" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.7">
          <animate attributeName="r" values="16;22;16" dur="2s" repeatCount="indefinite" />
        </circle>` : ''}
        <circle cx="0" cy="0" r="12" fill="${c.color}" stroke="#0f172a" stroke-width="2" />
        <text x="0" y="4" text-anchor="middle" font-family="'Fira Code', monospace" font-size="8" fill="#ffffff" font-weight="bold">${c.hash.substring(0, 3)}</text>
        <text x="0" y="24" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8.5" fill="#94a3b8">${c.hash}</text>
      </g>
    `;
  });

  const headTag = document.getElementById('dag-head-indicator');
  if (headTag) {
    headTag.textContent = `HEAD -> ${dagState.branch}`;
  }

  svg.innerHTML = html;
}

function dagRunCommand(cmd) {
  const terminal = document.getElementById('dag-terminal-output');
  if (!terminal) return;

  const cmdEl = document.createElement('div');
  cmdEl.style.color = '#4ade80';
  cmdEl.style.marginTop = '0.5rem';
  cmdEl.textContent = `$ ${cmd}`;
  terminal.appendChild(cmdEl);

  const outEl = document.createElement('div');
  outEl.style.color = '#cbd5e1';

  if (cmd.includes('git status')) {
    outEl.innerHTML = `On branch ${dagState.branch}<br>` +
      (dagState.commits.length === 1 ? `Untracked files: README.md, styles.css, app.js<br>` : `working tree clean`);
  } else if (cmd.includes('git diff')) {
    outEl.innerHTML = `<span style="color: #64748b;">diff --git a/README.md b/README.md</span><br>` +
      `<span style="color: #4ade80;">+ - StudySync AI: Decentralized study group matchmaking</span>`;
  } else if (cmd.includes('git commit')) {
    const nextIdx = dagState.commits.length + 1;
    const newHash = Math.random().toString(16).substring(2, 9);
    const prev = dagState.commits[dagState.commits.length - 1];

    let newX = prev.x + 65;
    let newY = (dagState.branch === 'main') ? 150 : 80;
    if (newX > 340) newX = 50 + (nextIdx % 4) * 65;

    const newCommit = {
      id: `c${nextIdx}`,
      hash: newHash,
      msg: `Commit #${nextIdx}`,
      branch: dagState.branch,
      x: newX,
      y: newY,
      color: (dagState.branch === 'main') ? '#10b981' : '#3b82f6'
    };

    dagState.commits.push(newCommit);
    dagState.head = newCommit.id;
    dagState.branches[dagState.branch] = newCommit.id;

    outEl.style.color = '#a78bfa';
    outEl.innerHTML = `[${dagState.branch} ${newHash}] Snapshot recorded successfully!`;
    renderDagGraph();
  } else if (cmd.includes('git switch -c')) {
    dagState.branch = 'feature/add-project-details';
    outEl.style.color = '#38bdf8';
    outEl.innerHTML = `Switched to a new branch 'feature/add-project-details'`;
    renderDagGraph();
  } else if (cmd.includes('git merge')) {
    dagState.branch = 'main';
    const nextIdx = dagState.commits.length + 1;
    const newHash = Math.random().toString(16).substring(2, 9);

    const mergeCommit = {
      id: `c${nextIdx}`,
      hash: newHash,
      msg: `Merge branch feature/add-project-details`,
      branch: 'main',
      x: 310,
      y: 150,
      color: '#a855f7'
    };

    dagState.commits.push(mergeCommit);
    dagState.head = mergeCommit.id;
    dagState.branches['main'] = mergeCommit.id;

    outEl.style.color = '#6ee7b7';
    outEl.innerHTML = `Updating fast-forward... Merged into main.`;
    renderDagGraph();
  }

  terminal.appendChild(outEl);
  terminal.scrollTop = terminal.scrollHeight;
}

function dagResetTree() {
  dagState.branch = 'main';
  dagState.head = 'c1';
  dagState.commits = [
    { id: 'c1', hash: '8f2a1b9', msg: 'Initialize NexusAgent Studio & 2026 README', branch: 'main', x: 50, y: 150, color: '#6366f1' }
  ];
  dagState.branches = { 'main': 'c1' };

  clearDagTerminal();
  const terminal = document.getElementById('dag-terminal-output');
  if (terminal) {
    terminal.innerHTML = '<div style="color: #64748b;">$ git status</div><div style="color: #94a3b8;">Tree reset to initial commit on main.</div>';
  }
  renderDagGraph();
}

function clearDagTerminal() {
  const terminal = document.getElementById('dag-terminal-output');
  if (terminal) terminal.innerHTML = '';
}

// Rescue Drawer Toggle
function toggleRescueDrawer(open) {
  const drawer = document.getElementById('rescue-drawer');
  if (drawer) {
    drawer.style.right = open ? '0' : '-550px';
  }
}
