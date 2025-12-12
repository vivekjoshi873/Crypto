import { NextRequest, NextResponse } from "next/server";
import { API_BASE, API_KEY } from "@/lib/constants";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const searchParams = request.nextUrl.searchParams;
  const url = new URL(`${API_BASE}/coins/${id}`);

  // Copy all query parameters
  searchParams.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (API_KEY) {
    headers["x-cg-demo-api-key"] = API_KEY;
  }

  try {
    const res = await fetch(url.toString(), {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch coin details" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
