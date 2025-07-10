#!/bin/bash

# Stop words hook
# This hook checks if the AI's final message contains forbidden words

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RULES_FILE="$SCRIPT_DIR/rules/hook_stop_words_rules.json"

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

# Get the AI message from stdin
AI_MESSAGE=$(cat)

# Check for forbidden words
STOP_WORDS=$(jq -r '.stop_words[]' "$RULES_FILE")

for word in $STOP_WORDS; do
    if [[ "$AI_MESSAGE" == *"$word"* ]]; then
        ERROR_MESSAGE=$(jq -r --arg word "$word" '.error_messages[$word] // .error_messages.default' "$RULES_FILE")
        echo "Error: $ERROR_MESSAGE"
        exit 1
    fi
done

# Message is acceptable
echo "$AI_MESSAGE"
exit 0