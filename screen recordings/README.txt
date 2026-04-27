Place your screen recordings (e.g., .mp4 files) in this directory.

This repository is configured to use Git Large File Storage (LFS) for tracking .mp4 files.
Ensure you have Git LFS installed and initialized (`git lfs install`) before adding large video files.

These files are typically not deployed directly to the web server via the standard build process but are kept in the repository for reference or documentation.
If you intend to display videos in the app, it is recommended to host them on a video platform (e.g., YouTube) and embed them, or move optimized versions to the public/ directory if they are small enough.