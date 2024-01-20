export default function FollowingPage({
  params,
}: {
  params: { userId: string };
}) {
  return <p>{JSON.stringify(params, null, 2)}</p>;
}
