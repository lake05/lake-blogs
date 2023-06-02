import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const name = searchParams.get("name");
  const instrument = searchParams.get("instrument");

  const obj = Object.fromEntries(searchParams.entries());

  // return NextResponse.json({ name, instrument });
  return NextResponse.json(obj);
}
