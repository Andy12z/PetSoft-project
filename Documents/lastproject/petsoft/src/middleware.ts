import { auth } from "./lib/auth";

//    return NextResponse.next();
// }
export default auth;
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};





