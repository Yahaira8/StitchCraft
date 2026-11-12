---
name: Preview build constraints
description: Environment-specific reasons for explicit Tailwind sources and Next.js development origins.
---

Limit Tailwind's source detection to application directories rather than scanning the entire workspace.

**Why:** Workspace skill directories contain symlinks outside the project root. Automatic scanning caused Turbopack to panic while processing CSS because those paths were outside its configured roots.

**How to apply:** Keep explicit Tailwind source directories when adding components, and include any new application directories deliberately.

Use the exact Replit development hostname for Next.js development-origin authorization.

**Why:** A single-level `*.replit.dev` pattern did not authorize this project's nested development hostname, so the page rendered but live-reload WebSocket requests were blocked.

**How to apply:** Authorize the provided development hostname plus local preview hosts; verify the live-reload connection after changing preview settings.
