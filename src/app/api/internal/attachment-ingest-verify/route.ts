import { NextResponse } from "next/server";
import { privateHeaders } from "@/lib/api-error";

export const dynamic = "force-dynamic";

// Retired October 2026 one-time diagnostic. Never fetch mail or invoke scanners.
function retired() {
  return NextResponse.json(
    { error: "The temporary attachment verification endpoint has been retired." },
    { status: 410, headers: privateHeaders },
  );
}
export const GET = retired;
export const POST = retired;
