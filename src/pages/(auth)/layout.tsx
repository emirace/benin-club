export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="h-24 bg-black w-full" />
      <section className="flex  mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center  w-full my-10 md:my-20">
        {children}
      </section>
    </div>
  );
}
