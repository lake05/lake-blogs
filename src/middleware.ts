import { NextResponse } from "next/server";

const allowOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://www.yoursite.com"]
    : ["http://localhost:3000"];

export function middleware(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && !allowOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request",
      headers: {
        "content-type": "text/plain",
      },
    });
  }

  console.log("Middleware!");

  console.log(request.method);
  console.log(request.url);

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
