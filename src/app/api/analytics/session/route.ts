import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const sessionData = await request.json();
    
    console.log('Session data received:', {
      sessionId: sessionData.sessionId,
      userId: sessionData.userId,
      duration: new Date(sessionData.lastActivity).getTime() - new Date(sessionData.startTime).getTime(),
      pageViews: sessionData.pages.length,
      errors: sessionData.errors.length,
      userAgent: sessionData.userAgent
    });

    const dropOffAnalysis = sessionData.pages.map((page: any, index: number) => ({
      url: page.url,
      timeOnPage: page.timeOnPage || 0,
      exitType: page.exitType,
      isExit: index === sessionData.pages.length - 1 || page.exitType === 'close'
    }));

    return NextResponse.json({ 
      success: true, 
      sessionId: sessionData.sessionId,
      message: 'Session data processed successfully',
      analysis: dropOffAnalysis
    });

  } catch (error) {
    console.error('Failed to process session data:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process session data' },
      { status: 500 }
    );
  }
}