/** Same-origin route that always redirects to the latest Windows installer. */
export const DOWNLOAD_API = "/api/download"

export function triggerDownload() {
  if (typeof window === "undefined") return
  window.location.assign(DOWNLOAD_API)
}

export const ISSUES_URL =
  "https://github.com/fabwaseem/sonora-releases/issues"

export const RELEASES_URL =
  "https://github.com/fabwaseem/sonora-releases/releases"

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Privacy", href: "#privacy" },
  { label: "FAQ", href: "#faq" },
] as const
