'use client';

export default function BrandSection() {
  return (
    <section className="bg-gray-100 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center">
          <h2
            className="text-5xl font-bold text-gray-300 sm:text-6xl md:text-7xl text-center"
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            JOURNALISM
          </h2>
          <p className="mt-4 text-center text-sm text-gray-500 max-w-md">
            確かな情報と深い思考をあなたのもとへ
          </p>
        </div>
      </div>
    </section>
  );
}
