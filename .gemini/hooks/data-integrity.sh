#!/bin/bash
# Data Integrity Hook: Checks for missing assets referenced in src/data.ts

DATA_FILE="src/data.ts"
PUBLIC_DIR="public"

if [ ! -f "$DATA_FILE" ]; then
    echo "❌ Error: $DATA_FILE not found."
    exit 1
fi

# Extract image/video paths from data file
ASSETS=$(grep -oE "['"]images/[^'"]+['"]" "$DATA_FILE" | sed -E "s/['"]//g")

MISSING=0
for ASSET in $ASSETS; do
    if [ ! -f "$PUBLIC_DIR/$ASSET" ]; then
        echo "❌ Missing asset referenced in $DATA_FILE: $PUBLIC_DIR/$ASSET"
        MISSING=$((MISSING + 1))
    fi
done

if [ $MISSING -gt 0 ]; then
    echo "❌ Data integrity check failed: $MISSING missing assets found."
    exit 1
else
    echo "✅ Data integrity check passed."
    exit 0
fi
