export default function ChatbotLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div
        className="bg-ramanujam bg-no-repeat bg-cover  bg-fixed
      h-screen  gap-16  font-[family-name:var(--font-geist-sans)] relative overflow-y-auto"
      >
        <div className="bg-black w-full h-full opacity-90 p-8 pb-20 sm:px-20">
          <div className="h-[100px] w-full text-white flex justify-center items-center flex-col gap-4">
            <div className="text-center">
              <p className="intro-text text-4xl">Langify</p>
              <p className="bold text-xl mt-4 mb-4">Langify simplifies multilingual text and document translation.</p>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}