export const Loading = () => (
  <div className="grid place-content-center justify-center h-96 bg-black/70 rounded-xl">
    <div className="mx-auto mb-2 size-12 text-yellow-400 animate-bounce ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
      >
        <path d="M256 32A224 224 0 0 0 32.1 248.7a2426.8 2426.8 0 0 0 447.8 0c-.3-10.6-1.4-21.2-3.3-31.7H352v-18h32v-16h32v-16h45.6a225.7 225.7 0 0 0-15.8-30H368v-18h48v-14h-18.7V89H368V73h-48V55h34.9A224 224 0 0 0 256 32zm-64.3 64h.3a64 64 0 1 1-.3 0zM32.3 266.7A224 224 0 0 0 256 480c10.6-1.4 16 0 43.8-7v-18h59a231 231 0 0 0 23.5-14H368v-16h-32v-18h85.4c8.5-9.3 16.3-19.4 23.1-30H432v-16h-80v-18h16v-16h48v-16h32v-16h28.5c1.7-9.4 2.7-18.8 3.2-28.3a2440.7 2440.7 0 0 1-447.4 0z" />
      </svg>
    </div>
    <p className="text-yellow-400 tracking-widest text-lg">
      Fetching data from a galaxy far, far away…
    </p>
  </div>
);
