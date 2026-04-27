#!/bin/bash
# Auto-Version Hook: Updates the LAST_UPDATED constant in src/data.ts

DATA_FILE="src/data.ts"

if [ ! -f "$DATA_FILE" ]; then
    echo "❌ Error: $DATA_FILE not found."
    exit 1
fi

# Get current date in ISO format
DATE=$(date +"%Y-%m-%d")

# Check if LAST_UPDATED needs updating
CURRENT_DATE=$(grep -oE "LAST_UPDATED = '[^']+'" "$DATA_FILE" | cut -d"'" -f2)

if [ "$DATE" != "$CURRENT_DATE" ]; then
    echo "🔄 Updating LAST_UPDATED in $DATA_FILE to $DATE..."
    sed -i '' "s/LAST_UPDATED = '[^']*'/LAST_UPDATED = '$DATE'/g" "$DATA_FILE"
    echo "✅ LAST_UPDATED updated to $DATE."
else
    echo "ℹ️ LAST_UPDATED is already up to date."
fi

exit 0
