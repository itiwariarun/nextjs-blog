import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, content, email, url, summary, image } = req.body;

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      url: url,
      summary: summary,
      image: image,

      author: { connect: { email: email } },
    },
  });

  res.json(result);
}
