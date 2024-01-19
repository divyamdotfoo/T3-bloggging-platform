interface PageProps {
  params: { postId: string };
}
export default function PostDiscussion({ params }: PageProps) {
  return <p>discussion for {params.postId}</p>;
}
