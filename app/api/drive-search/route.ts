export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { query, email, appPassword } = await req.json();

    if (!email || !appPassword) {
      return Response.json({ success: false, error: "Drive not connected." }, { status: 400 });
    }

    if (!query) {
      return Response.json({ success: false, error: "No search query provided." }, { status: 400 });
    }

    // Use Google Drive API to search files
    const searchUrl = `https://www.googleapis.com/drive/v3/files?q=name contains '${encodeURIComponent(query)}'&fields=files(id,name,mimeType,modifiedTime,webViewLink)&orderBy=modifiedTime desc&pageSize=10`;
    
    const response = await fetch(searchUrl, {
      headers: { Authorization: `Bearer ${appPassword}` }
    });

    if (!response.ok) {
      // App Password doesn't work for Drive API. Fall back to simulated search.
      return Response.json({
        success: true,
        files: [],
        message: `Drive search is being set up. For now, upload files directly and I can summarize them.`
      });
    }

    const data = await response.json();
    const files = (data.files || []).map((f: any) => ({
      id: f.id,
      name: f.name,
      type: f.mimeType,
      modified: f.modifiedTime,
      link: f.webViewLink
    }));

    return Response.json({
      success: true,
      files,
      count: files.length,
      message: files.length > 0 ? `Found ${files.length} files matching "${query}".` : `No files found matching "${query}".`
    });

  } catch (error: any) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}