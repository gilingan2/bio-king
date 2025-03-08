import { getAuthSession } from '@/lib/auth';
import { withRLS } from '@/lib/db';
import { createBioSchema } from '@/validation/bio';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getCurrentEpoch } from '@/lib/utils';

export async function POST(request: NextRequest) {
  const session = await getAuthSession();
  const id = session?.user?.id;
  const { username, title } = createBioSchema.parse(await request.json());
  console.log('ini username', username, title, id);
  try {
    const dbRls = withRLS(id);

    const isBioExists = await dbRls.bioPages.findFirst({
      where: { username, user_id: id },
    });
    console.log('bio exists', isBioExists);
    if (isBioExists) {
      return NextResponse.json(
        {
          status: 'fail',
          message: 'Bio page already exists',
        },
        { status: 400 },
      );
    }
    const currentEpoch = getCurrentEpoch();

    const data = await dbRls.bioPages.create({
      data: {
        username,
        title,
        created_at: currentEpoch,
        updated_at: currentEpoch,
        users: { connect: { id } },
      },
    });
    console.log(data);
    return NextResponse.json(
      {
        status: 'success',
        message: 'User created successfully',
        data,
      },
      { status: 201 },
    );
  } catch (error: any) {
    let res;
    if (error instanceof z.ZodError) {
      res = {
        status: 'fail validation',
        message: error.issues.map((issue) => issue.message).join(', '),
      };
      console.log('error from zod');
      return NextResponse.json(res, { status: 400 });
    }

    res = { status: 500, message: 'Internal Server Error' };
    console.log('error 500', error);
    return NextResponse.json(res, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const session = await getAuthSession();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json(
      { status: 'fail', message: 'Unauthorized' },
      { status: 401 },
    );
  }

  try {
    const dbRls = withRLS(userId);
    const bioPages = await dbRls.bioPages.findMany({
      where: {
        user_id: session.user.id,
      },
      include: {
        _count: {
          select: { links: true },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    if (bioPages.length > 0) {
      return NextResponse.json(
        { status: 'success', data: bioPages },
        { status: 200 },
      );
    } else {
      console.log('No bio pages found');
      return NextResponse.json(
        { status: 'fail', message: 'No bio pages found' },
        { status: 404 },
      );
    }
  } catch (error) {
    console.log('Internal Server Error', error);
    return NextResponse.json(
      { status: 'fail', message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
