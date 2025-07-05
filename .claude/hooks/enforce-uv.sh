#!/bin/bash

# Claude Code Hook - Enforce UV
# This hook runs before Bash tool execution

echo "Hook: Bash tool execution detected"
echo "Current working directory: $(pwd)"
echo "Tool arguments: $@"

# Allow execution to continue
exit 0