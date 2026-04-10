'use client';

import { Card } from '@/components/ui/card';

export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      icon: '🎯',
      title: '最先端の情報',
      description: '世界中から集めた最新のニュースや情報をいち早くお届けします。'
    },
    {
      id: 2,
      icon: '📚',
      title: 'ディープな解説',
      description: 'ニュースの背景や深掘り解説で、本当の理解を得られます。'
    },
    {
      id: 3,
      icon: '🎙️',
      title: 'ポッドキャスト',
      description: '移動中でも聴ける、プロの声優による音声コンテンツ。'
    }
  ];

  return (
    <section className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl" style={{ fontFamily: 'var(--font-newsreader)' }}>
            いつでも解約可能！
          </h2>
          <p className="text-sm text-gray-600">※ クレジットカードがあればすぐに始められます</p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {features.map((feature) => (
            <Card key={feature.id} className="border-0 bg-white p-6 shadow-sm hover:shadow-md transition-shadow sm:p-8">
              <div className="mb-4 text-4xl">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-lg font-bold text-gray-900" style={{ fontFamily: 'var(--font-work-sans)' }}>
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
