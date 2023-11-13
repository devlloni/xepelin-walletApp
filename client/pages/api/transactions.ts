import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('adsfasdf');
    return res.status(200).json({
        "message": "HOLAAAA"
    });
}
