export default function UserPage({ params }: { params: { userId: string } }) {
  return <p>post page for {params.userId}</p>;
}
