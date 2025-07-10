#!/bin/bash

# Pre-command execution hook
# This hook checks if certain commands should be blocked before execution

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RULES_FILE="$SCRIPT_DIR/rules/hook_pre_commands_rules.json"

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "Error: jq is not installed. Please install jq to use this hook."
    exit 1
fi

# Check if rules file exists
if [ ! -f "$RULES_FILE" ]; then
    echo "Error: Rules file not found at $RULES_FILE"
    exit 1
fi

# Get the command from the first argument
COMMAND="$1"

# Check if command should be blocked
BLOCKED_COMMANDS=$(jq -r '.blocked_commands[]' "$RULES_FILE")

for blocked_cmd in $BLOCKED_COMMANDS; do
    if [[ "$COMMAND" == *"$blocked_cmd"* ]]; then
        ERROR_MESSAGE=$(jq -r --arg cmd "$blocked_cmd" '.error_messages[$cmd] // .error_messages.default' "$RULES_FILE")
        echo "Error: $ERROR_MESSAGE"
        exit 1
    fi
done

# Command is allowed
exit 0