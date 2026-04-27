#!/bin/bash
# Link Checker Hook: Checks for dead external links in src/data.ts

DATA_FILE="src/data.ts"

if [ ! -f "$DATA_FILE" ]; then
    echo "❌ Error: $DATA_FILE not found."
    exit 1
fi

# Extract http/https links from data file
LINKS=$(grep -oE "https?://[^'"]+" "$DATA_FILE")

if [ -z "$LINKS" ]; then
    echo "ℹ️ No external links found in $DATA_FILE."
    exit 0
fi

echo "🔍 Checking external links in $DATA_FILE..."
DEAD_LINKS=0
for LINK in $LINKS; do
    # Only check if curl is available
    if command -v curl &> /dev/null; then
        # Perform a HEAD request with a 3 second timeout
        STATUS=$(curl -o /dev/null -s -w "%{http_code}" --head --max-time 3 "$LINK")
        if [ "$STATUS" -ge 400 ] || [ "$STATUS" -eq 000 ]; then
            echo "⚠️ Potential dead link found: $LINK (Status: $STATUS)"
            DEAD_LINKS=$((DEAD_LINKS + 1))
        fi
    else
        echo "ℹ️ curl not found. Skipping link check."
        break
    fi
done

if [ $DEAD_LINKS -gt 0 ]; then
    echo "⚠️ $DEAD_LINKS potential dead links identified. Please verify them."
fi

echo "✅ Link check completed."
exit 0
