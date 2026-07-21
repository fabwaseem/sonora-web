import { NextResponse } from "next/server"

const RELEASES_API =
  "https://api.github.com/repos/fabwaseem/sonora-releases/releases/latest"

const RELEASES_PAGE =
  "https://github.com/fabwaseem/sonora-releases/releases/latest"

type GithubAsset = {
  name: string
  browser_download_url: string
}

type GithubRelease = {
  assets?: GithubAsset[]
}

export async function GET() {
  try {
    const res = await fetch(RELEASES_API, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "sonora-web",
      },
      next: { revalidate: 300 },
    })

    if (!res.ok) {
      return NextResponse.redirect(RELEASES_PAGE, 302)
    }

    const release = (await res.json()) as GithubRelease
    const installer = release.assets?.find(
      (asset) =>
        asset.name.toLowerCase().endsWith(".exe") &&
        !asset.name.toLowerCase().endsWith(".sig")
    )

    if (!installer?.browser_download_url) {
      return NextResponse.redirect(RELEASES_PAGE, 302)
    }

    return NextResponse.redirect(installer.browser_download_url, 302)
  } catch {
    return NextResponse.redirect(RELEASES_PAGE, 302)
  }
}
