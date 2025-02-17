
export default async function MainPage(props: {
  searchParams: Promise<{ q: string; offset: string }>;
}) {
  return (
    <>
      <div>Welcome to the main page!</div>
    </>
  );
}
