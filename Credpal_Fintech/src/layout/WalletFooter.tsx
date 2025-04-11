import useResponsive from "../hooks/UseResponsive";

const WalletFooter = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  return (
    <footer className="text-gray-600 body-font border-t border-gray-200">
      <div
        className={`container px-3 py-2 mx-auto flex ${
          isMobile ? "justify-between" : "items-center flex-col md:flex-row"
        }`}
      >
        {/* {logo and content} */}
        <div className={`${isMobile ? "flex flex-col justify-between" : ""}`}>
          <a className="flex title-font font-medium items-center justify-center text-gray-900">
            <div className="p-2 flex items-center gap-1 sm:gap-2">
              <div className="bg-yellow-500 rounded-full h-5 w-5 flex items-center justify-center sm:h-4 sm:w-4">
                <span className="font-bold text-xs sm:text-sm">B</span>
              </div>
              <span className="font-bold text-xs sm:text-sm">BEAM</span>
            </div>
          </a>

          {isMobile && (
            <p className="text-[10px] text-gray-500 mt-1">
              © 2025 credpal —
              <a
                href="https://x.com/LibraryOf_Dre"
                className="text-gray-600 ml-1"
                rel="noopener noreferrer"
                target="_blank"
              >
                @andrew
              </a>
            </p>
          )}
        </div>

        {(isTablet || isDesktop) && (
          <p className="text-xs text-gray-500 mt-1 sm:ml-4 sm:pl-4 sm:border-l sm:border-gray-200 sm:py-1 sm:mt-0 sm:text-sm">
            © 2025 credpal —
            <a
              href="https://x.com/LibraryOf_Dre"
              className="text-gray-600 ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              @andrew
            </a>
          </p>
        )}

        {/* {social icons} */}
        <span className="inline-flex mt-1 justify-center sm:ml-auto sm:mt-0 sm:justify-start">
          <a className="text-gray-500">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
            </svg>
          </a>
          <a className="ml-2 text-gray-500 sm:ml-3">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </a>
          <a className="ml-2 text-gray-500 sm:ml-3">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
            </svg>
          </a>
          <a className="ml-2 text-gray-500 sm:ml-3">
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
              <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
              <circle cx="4" cy="4" r="2" stroke="none"></circle>
            </svg>
          </a>
        </span>
      </div>
    </footer>
  );
};

export default WalletFooter;