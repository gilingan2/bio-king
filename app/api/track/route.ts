import { trackPageView } from '@/lib/tracking';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Dapatkan data dari request
    const data = await req.json();

    // Pastikan data memiliki setidaknya pageType
    if (!data.pageType) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 },
      );
    }

    // Jalankan fungsi tracking
    await trackPageView({
      pageType: data.pageType,
      pageId: data.pageId,
      username: data.username,
      shortCode: data.shortCode,
      geoData: data.geoData,
    });

    // Return success response dengan empty JSON untuk meminimalisir payload
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error('Error tracking page view:', error);

    // Return normal response meskipun ada error, jangan tampilkan detail error ke client
    return NextResponse.json({}, { status: 200 });
  }
}
