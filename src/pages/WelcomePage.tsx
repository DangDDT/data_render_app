import { HamburgerPng } from "@assets";

const WelcomePage: React.FC = () => {
  return (
    <section className="flex h-screen items-center bg-gray-50 p-16 dark:bg-gray-700">
      <div className="container flex flex-col items-center ">
        <div className="flex max-w-md flex-col gap-6 text-center">
          <img
            src={HamburgerPng}
            alt="Hamburger"
            className="mx-auto h-64 w-64"
          />
          <h2 className="text-6xl font-extrabold text-gray-600 dark:text-gray-100">
            <span className="sr-only">Error</span>Welcome To Dang's Template
          </h2>
          <p className="text-xl md:text-xl dark:text-gray-300">
            This is a simple template for React with TypeScript, Tailwind CSS,
            and Vite.
          </p>
          <a
            href="https://github.com/DangDDT"
            className="rounded bg-purple-600 px-8 py-4 text-xl font-semibold text-gray-50 hover:text-gray-200"
          >
            Go to my GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default WelcomePage;
