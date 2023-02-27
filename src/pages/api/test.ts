import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query as { slug: string };
  const { body } = req;

  res.json({ success: true });
  // try {
  //   const phrase = await phraseResolver(slug)
  //   res.json({ phrase })
  // } catch (e) {
  //   res.status(400).json({ error: (e as Error).message })
  // }
};
