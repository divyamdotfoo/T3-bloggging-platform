interface PageProps {
  params: { postId: string };
}
export default function PostPage({ params }: PageProps) {
  return <p>{params.postId}</p>;
}
