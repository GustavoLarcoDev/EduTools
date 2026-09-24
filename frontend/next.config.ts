import type { NextConfig } from "next";

/**
 * Two build modes:
 *  - API mode (default): regular Next.js app talking to the Django REST API
 *    at NEXT_PUBLIC_API_URL. Nothing below changes its behaviour.
 *  - Demo mode (NEXT_PUBLIC_DEMO=true): fully static export for GitHub Pages,
 *    served from NEXT_PUBLIC_BASE_PATH (e.g. /EduTools) with bundled sample data.
 */
const isDemo = process.env.NEXT_PUBLIC_DEMO === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = isDemo
  ? {
      output: "export",
      basePath: basePath || undefined,
      assetPrefix: basePath ? `${basePath}/` : undefined,
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
