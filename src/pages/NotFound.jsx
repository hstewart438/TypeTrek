export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-5">
      <h1>Error 404</h1>
      <p>Page not found</p>
      <p>
        <a href="/home" className="text-blue-400 underline">Go back to home page</a>
      </p>
    </div>
  );
}
