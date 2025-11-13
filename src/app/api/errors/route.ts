import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const errorData = await request.json();
    
    console.log('Error received:', {
      id: errorData.id,
      message: errorData.message,
      severity: errorData.severity,
      url: errorData.url,
      timestamp: errorData.timestamp,
      userAgent: errorData.userAgent
    });

    const processedError = {
      ...errorData,
      processed: true,
      receivedAt: new Date().toISOString()
    };

    if (errorData.severity === 'critical') {
      console.log('🚨 CRITICAL ERROR ALERT:', errorData.message);
    }

    return NextResponse.json({ 
      success: true, 
      errorId: errorData.id,
      message: 'Error report received successfully' 
    });

  } catch (error) {
    console.error('Failed to process error report:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process error report' },
      { status: 500 }
    );
  }
}