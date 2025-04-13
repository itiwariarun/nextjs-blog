import prisma from "@lib/prisma";

// DELETE /api/post/:id
export default async function handle(req, res) {
  const postId = req.query.id;
  if (req.method === "DELETE") {
    const post = await prisma.post.delete({
      where: { id: postId },
    });
    res.json(post);
  } else if (req.method === "PUT") {
    // Check if the user is authenticated

    const { title, content, email, url, summary, image } = req.body;

    try {
      const post = await prisma.post.update({
        where: { id: postId, inPortfolio: false }, // Ensure id is a number
        data: {
          title: title,
          content: content,
          url: url,
          summary: summary,
          image: image,
          author: { connect: { email: email } },
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to update post" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
