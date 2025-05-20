// app/api/delete-image/route.ts
import cloudinary from '@/lib/cloudinary';
import { NextRequest } from 'next/server';


export async function POST(request: NextRequest) {
  try {
    const { public_id } = await request.json();

    if (!public_id || typeof public_id !== 'string') {
      return new Response(JSON.stringify({ error: 'public_id is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result === 'not found') {
      return new Response(
        JSON.stringify({ warning: 'Image not found in Cloudinary', result }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }
  
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}