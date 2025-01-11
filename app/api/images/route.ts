import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const subfolder = searchParams.get('subfolder');

  if (!subfolder) {
    return NextResponse.json({ error: 'Subfolder parameter is required' }, { status: 400 });
  }


  const imagesDir = path.join(process.cwd(), 'public/images', subfolder);

  // Vérifiez si le dossier existe
  if (!fs.existsSync(imagesDir)) {
    return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
  }

  const imageFiles = fs.readdirSync(imagesDir).filter(file => {
    return file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.gif');
  }).map((file) => `/images/${subfolder}/` + file);

  return NextResponse.json(imageFiles);
}
