'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PricingSectionProps {
  selectedPlan: 'monthly' | 'yearly';
  onSelectPlan: (plan: 'monthly' | 'yearly') => void;
}

export default function PricingSection({ selectedPlan, onSelectPlan }: PricingSectionProps) {
  const plans = [
    {
      id: 'monthly',
      name: '月間プラン',
      price: '980',
      currency: '円',
      frequency: '/月',
      features: [
        'すべての記事が読み放題',
        'ニュースレター配信',
        'ポッドキャスト聴き放題',
        'スペシャルコンテンツ'
      ],
      highlighted: false,
      buttonText: '今すぐ登録'
    },
    {
      id: 'yearly',
      name: '年間プラン',
      price: '9,800',
      currency: '円',
      frequency: '/年',
      badge: '20%OFF',
      features: [
        'すべての記事が読み放題',
        'ニュースレター配信',
        'ポッドキャスト聴き放題',
        'スペシャルコンテンツ'
      ],
      highlighted: true,
      buttonText: '今すぐ登録'
    }
  ];

  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-newsreader)' }}>
            世界のミタケを、もっと深く
          </h1>
          <p className="text-sm text-gray-600 sm:text-base">
            『 いち早く情報を手に入れたいあなたへ 』
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => onSelectPlan(plan.id as 'monthly' | 'yearly')}
              className={`relative cursor-pointer transition-all duration-300 ${
                selectedPlan === plan.id ? 'transform scale-105' : ''
              }`}
            >
              <Card
                className={`overflow-hidden border-2 transition-all duration-300 ${
                  plan.highlighted
                    ? 'border-amber-500 bg-gradient-to-br from-blue-950 to-blue-900'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="p-6 sm:p-8">
                  {/* Plan Header */}
                  <div className="mb-6">
                    {plan.badge && (
                      <Badge className="mb-3 bg-amber-400 text-gray-900">
                        {plan.badge}
                      </Badge>
                    )}
                    <h2 className={`text-xl font-bold mb-2 ${
                      plan.highlighted ? 'text-white' : 'text-gray-900'
                    }`}>
                      {plan.name}
                    </h2>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl font-bold sm:text-5xl ${
                        plan.highlighted ? 'text-white' : 'text-gray-900'
                      }`}>
                        {plan.price}
                      </span>
                      <span className={`text-sm ${
                        plan.highlighted ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {plan.currency}
                      </span>
                    </div>
                    <p className={`mt-1 text-sm ${
                      plan.highlighted ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {plan.frequency}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-8 space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className={`mt-0.5 flex-shrink-0 text-lg ${
                          plan.highlighted ? 'text-amber-400' : 'text-amber-500'
                        }`}>
                          ✓
                        </span>
                        <span className={`text-sm ${
                          plan.highlighted ? 'text-gray-200' : 'text-gray-700'
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <Button
                    className={`w-full py-2 font-semibold transition-all duration-300 sm:py-3 ${
                      plan.highlighted
                        ? 'bg-amber-400 text-gray-900 hover:bg-amber-500'
                        : 'border-2 border-gray-900 bg-white text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
