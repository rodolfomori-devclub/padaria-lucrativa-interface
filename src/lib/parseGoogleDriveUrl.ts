/**
 * Extracts the Google Drive file ID from various URL formats.
 * Supports:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/file/d/FILE_ID/preview
 */
export function extractGoogleDriveFileId(url: string): string | null {
  try {
    // Format: /file/d/FILE_ID/view or /file/d/FILE_ID/preview
    const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch) return fileMatch[1];

    // Format: ?id=FILE_ID or &id=FILE_ID
    const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idMatch) return idMatch[1];

    return null;
  } catch {
    return null;
  }
}

/**
 * Builds the Google Drive embed URL for video preview.
 * @param fileId - Google Drive file ID
 */
export function buildGoogleDriveEmbedUrl(fileId: string): string {
  const base = `https://drive.google.com/file/d/${fileId}/preview`;
  return base;
}
