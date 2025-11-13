export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-[55vw] mx-auto">
      {children}
    </div>
  );
}