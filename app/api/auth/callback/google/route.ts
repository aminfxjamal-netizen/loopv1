// app/api/auth/callback/google/route.ts
import { NextResponse } from "next/server";
import { createBrowserClient } from "@supabase/ssr";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  
  // 1. Google returns its temporary authorization code here
  const code = searchParams.get("code");
  
  // 2. This grabs the unique user ID we passed from the frontend state parameter
  const userId = searchParams.get("state"); 

  // If something went wrong or the user cancelled, send them back with an error flag
  if (!code || !userId) {
    return NextResponse.redirect(`${origin}/workspace?error=auth_failed`);
  }

  try {
    // Initialize our database connection context
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // =========================================================================
    // NOTE: This is where your official Google token exchange logic executes.
    // After exchanging 'code' for your tokens, you save them securely.
    // =========================================================================

    // 3. Update your user_integrations table to flag that Gmail is now live!
    // This instantly fires the real-time websocket listener on your workspace page.
    const { error: dbError } = await supabase
      .from("user_integrations")
      .upsert({ 
        user_id: userId, 
        active_services: ["Gmail"], // Lights up the Gmail icon instantly
        updated_at: new Date().toISOString()
      }, { onConflict: "user_id" });

    if (dbError) throw dbError;

    // 4. THE REDIRECT: Shoot the user straight back to their dashboard workspace
    return NextResponse.redirect(`${origin}/workspace`);

  } catch (error) {
    console.error("OAuth Callback Internal Pipeline Failure:", error);
    return NextResponse.redirect(`${origin}/workspace?error=database_sync_failure`);
  }
}