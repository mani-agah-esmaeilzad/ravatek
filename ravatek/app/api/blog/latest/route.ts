import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') ?? 'en';
  const take = Math.min(Number(searchParams.get('take') ?? '4'), 12);

  const posts = await prisma.post.findMany({
    where: { language: locale },
    orderBy: { createdAt: 'desc' },
    take
  });

  return NextResponse.json(posts);
}
