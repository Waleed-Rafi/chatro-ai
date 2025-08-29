'use client';

import { Check } from 'lucide-react';
import { useState } from 'react';

import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/contexts/SidebarContext';
import { supportFAQs } from '@/data';
import { getClientSubscriptionPlans } from '@/data/pricing';
import { useAuth } from '@/hooks/use-auth';
import { usePayment } from '@/hooks/use-payment';
import { formatStripeAmount } from '@/lib/stripe';

import FaqAccordion from '../../components/FaqAccordion';
import { ArrowRight } from '../../components/icons/ArrowRight';

export default function PricingPage() {
  const { isSidebarCollapsed, setIsSidebarCollapsed } = useSidebar();
  const { createCheckoutSession, isLoading, error, clearError } = usePayment();
  const [selectedPlan, setSelectedPlan] = useState(0);
  const { user } = useAuth(); // Get user info for email

  const handleSubscribe = (planIndex: number) => {
    setSelectedPlan(planIndex);
    const plans = getClientSubscriptionPlans();
    const plan = plans[planIndex];
    createCheckoutSession(plan, user?.email); // Pass user email if available
  };

  return (
    <div className='min-h-screen bg-background text-white flex'>
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onOpenPricing={() => {}}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
        } pt-16 md:pt-0`}
      >
        {/* Header */}
        <div className='flex items-center justify-between p-4'>
          <div className='flex items-center space-x-3'>
            {isSidebarCollapsed && (
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setIsSidebarCollapsed(false)}
                className='text-gray-400 hover:text-white hidden md:flex'
              >
                <ArrowRight size={16} className='text-white' />
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className='flex-1 p-4 md:p-8 overflow-y-auto'>
          {/* Mobile Layout */}
          <div className='md:hidden'>
            {/* Pricing Header */}
            <div className='text-center mb-6'>
              <h2 className='text-xl font-medium text-white mb-2'>
                Pricing Plans
              </h2>
              <p className='text-gray-400 text-sm'>
                Want to get more out of Chatro? Subscribe to one of our
                professional plans.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className='space-y-4 mb-8'>
              {getClientSubscriptionPlans().map((plan, index) => (
                <div
                  key={plan.id}
                  className={`rounded-lg p-4 ${
                    plan.highlight ? 'bg-blue-600 relative' : 'bg-[#2a2a2a]'
                  }`}
                >
                  {plan.highlight && (
                    <div className='absolute -top-2 left-4'>
                      <span className='bg-blue-800 text-white px-3 py-1 rounded text-xs font-medium'>
                        {plan.badge}
                      </span>
                    </div>
                  )}
                  <h3 className='text-white text-lg font-medium mb-2'>
                    {plan.name}
                  </h3>
                  <div className='mb-4'>
                    <span className='text-2xl font-bold text-white'>
                      {formatStripeAmount(plan.price, plan.currency)}
                    </span>
                    <span className='text-gray-400 ml-2 text-sm'>
                      per {plan.interval}
                    </span>
                  </div>
                  <Button
                    className='w-full bg-[#444] hover:bg-[#555] text-white mb-4'
                    onClick={() => handleSubscribe(index)}
                    disabled={isLoading}
                  >
                    {isLoading && index === selectedPlan
                      ? 'Processing...'
                      : 'Subscribe'}
                  </Button>
                  <p className='text-gray-400 text-xs'>
                    {plan.features.slice(0, 2).join(', ')} and more.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className='hidden md:block'>
            {/* Pricing Header */}
            <div className='text-center mb-12'>
              <h1 className='text-4xl font-bold text-white mb-4'>
                Pricing Plans
              </h1>
              <p className='text-xl text-gray-400 max-w-2xl mx-auto'>
                Want to get more out of Chatro? Subscribe to one of our
                professional plans.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className='grid grid-cols-3 gap-8 max-w-6xl mx-auto mb-16'>
              {getClientSubscriptionPlans().map((plan, index) => (
                <div
                  key={plan.id}
                  className={`rounded-2xl p-8 ${
                    plan.highlight
                      ? 'bg-blue-600 relative transform scale-105'
                      : 'bg-[#2a2a2a]'
                  }`}
                >
                  {plan.highlight && (
                    <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                      <span className='bg-blue-800 text-white px-4 py-2 rounded-full text-sm font-medium'>
                        {plan.badge}
                      </span>
                    </div>
                  )}
                  <div className='text-center mb-8'>
                    <h3 className='text-2xl font-bold text-white mb-4'>
                      {plan.name}
                    </h3>
                    <div className='mb-2'>
                      <span className='text-5xl font-bold text-white'>
                        {formatStripeAmount(plan.price, plan.currency)}
                      </span>
                    </div>
                    <p className='text-gray-300'>per {plan.interval}</p>
                    <p className='text-gray-400 text-sm mt-2'>
                      ${plan.dailyPrice.toFixed(2)} per day
                    </p>
                  </div>

                  <div className='space-y-4 mb-8'>
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className='flex items-center space-x-3'
                      >
                        <Check
                          className='text-blue-500 flex-shrink-0'
                          size={20}
                        />
                        <span className='text-gray-300 text-sm'>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className='w-full py-4 rounded-xl text-lg font-semibold bg-[#444] hover:bg-[#555] text-white'
                    onClick={() => handleSubscribe(index)}
                    disabled={isLoading}
                  >
                    {isLoading && index === selectedPlan
                      ? 'Processing...'
                      : 'Subscribe Now'}
                  </Button>
                </div>
              ))}
            </div>

            {/* Error Display */}
            {error && (
              <div className='max-w-2xl mx-auto mb-8 p-4 bg-red-900/20 border border-red-500/30 rounded-lg'>
                <p className='text-red-400 text-center'>{error}</p>
                <button
                  onClick={clearError}
                  className='text-red-300 text-sm underline mt-2 mx-auto block'
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Features Comparison */}
            <div className='max-w-6xl mx-auto mb-16'>
              <h2 className='text-3xl font-bold text-white text-center mb-12'>
                Feature Comparison
              </h2>

              {/* AI Chat Features */}
              <div className='bg-[#2a2a2a] rounded-2xl p-8'>
                <h5 className='text-white font-medium mb-4'>AI Chat</h5>
                <div className='space-y-3'>
                  {getClientSubscriptionPlans()[0].features.map(
                    (feature, index) => (
                      <div
                        key={index}
                        className='grid grid-cols-3 gap-4 md:gap-8 items-center'
                      >
                        <span className='text-gray-300 text-sm'>{feature}</span>
                        <div className='text-center'>
                          <Check className='text-blue-500 mx-auto' size={20} />
                        </div>
                        <div className='text-center'>
                          <Check className='text-blue-500 mx-auto' size={20} />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className='max-w-4xl mx-auto'>
              <h2 className='text-3xl font-bold text-white text-center mb-12'>
                Frequently Asked Questions
              </h2>
              <div className='bg-[#2a2a2a] rounded-2xl p-8'>
                <FaqAccordion faqs={supportFAQs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
