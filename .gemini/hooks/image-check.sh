#!/bin/bash
# Image Optimization Hook: Warns about large images in public/images/

MAX_SIZE_KB=500
IMAGE_DIR="public/images"

if [ ! -d "$IMAGE_DIR" ]; then
    echo "ℹ️ No image directory found at $IMAGE_DIR. Skipping."
    exit 0
fi

LARGE_IMAGES=$(find "$IMAGE_DIR" -type f \( -iname "*.jpg" -o -iname "*.png" -o -iname "*.webp" \) -size +${MAX_SIZE_KB}k)

if [ -n "$LARGE_IMAGES" ]; then
    echo "⚠️ Warning: The following images exceed ${MAX_SIZE_KB}KB and may impact load times:"
    echo "$LARGE_IMAGES"
    echo "💡 Consider compressing them before committing."
    # We don't exit with error, just warn
fi

echo "✅ Image size check completed."
exit 0
