import React from 'react';

import {
  Chain,
  Chat,
  CompanyIcon,
  Doc,
  Globe,
  ImageGeneration,
  Verified,
} from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';

// Types
interface Feature {
  name: string;
  description: string;
  free: boolean;
  pro: boolean;
  icon: React.ReactNode;
}

interface Plan {
  name: string;
  price: string;
  daily: string;
  badge?: string;
  highlight?: boolean;
  badgeColor?: string;
}

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Icons
const CheckCircle = ({
  size = 24,
  className = '',
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    className={className}
  >
    <circle
      cx='12'
      cy='12'
      r='11'
      stroke='#22C55E'
      strokeWidth='2'
      fill='white'
    />
    <path
      d='M7 12.5L10.5 16L17 9.5'
      stroke='#22C55E'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const XCircle = ({
  size = 24,
  className = '',
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    className={className}
  >
    <circle
      cx='12'
      cy='12'
      r='11'
      stroke='#D1D5DB'
      strokeWidth='2'
      fill='white'
    />
    <path
      d='M9 9L15 15M15 9L9 15'
      stroke='#D1D5DB'
      strokeWidth='2'
      strokeLinecap='round'
    />
  </svg>
);

// Payment Icons Component
const PaymentIcons = () => (
  <div className='flex justify-center space-x-2 flex-wrap mt-2'>
    <img
      src='https://cdn.chatly.imagine.art/chatly-web/images/pro-modal/payment-cards/paypal.svg'
      alt='PayPal'
      className='h-8 w-auto'
    />
    <img
      src='https://cdn.chatly.imagine.art/chatly-web/images/pro-modal/payment-cards/visa.svg'
      alt='Visa'
      className='h-8 w-auto'
    />
    <img
      src='https://cdn.chatly.imagine.art/chatly-web/images/pro-modal/payment-cards/mastercard.svg'
      alt='Mastercard'
      className='h-8 w-auto'
    />
    <img
      src='https://cdn.chatly.imagine.art/chatly-web/images/pro-modal/payment-cards/amex.svg'
      alt='American Express'
      className='h-8 w-auto'
    />
    <img
      src='https://cdn.chatly.imagine.art/chatly-web/images/pro-modal/payment-cards/discover.svg'
      alt='Discover'
      className='h-8 w-auto'
    />
    <img
      src='https://cdn.chatly.imagine.art/chatly-web/images/pro-modal/payment-cards/jcb.svg'
      alt='JCB'
      className='h-8 w-auto'
    />
  </div>
);

// Feature Row Component
const FeatureRow = ({ feature }: { feature: Feature }) => (
  <div className='grid grid-cols-1 sm:grid-cols-12 gap-6 items-center py-3'>
    <div className='col-span-8 flex items-center space-x-4'>
      <div className='flex items-center justify-center'>{feature.icon}</div>
      <div>
        <div className='text-neutral-900 font-semibold text-sm leading-tight tracking-tight'>
          {feature.name}
        </div>
        <div className='text-neutral-400 text-xs leading-relaxed mt-0.5'>
          {feature.description}
        </div>
      </div>
    </div>
    <div className='col-span-2 text-center hidden sm:block'>
      {feature.free ? (
        <CheckCircle size={18} className='mx-auto' />
      ) : (
        <XCircle size={18} className='mx-auto' />
      )}
    </div>
    <div className='col-span-2 text-center hidden sm:block'>
      {feature.pro ? (
        <CheckCircle size={18} className='mx-auto' />
      ) : (
        <XCircle size={18} className='mx-auto' />
      )}
    </div>
  </div>
);

// Plan Card Component
const PlanCard = ({
  plan,
  isSelected,
  onClick,
}: {
  plan: Plan;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <div
    className={`relative flex items-center justify-between px-6 md:px-8 py-5 md:py-6 rounded-2xl transition-all border bg-white cursor-pointer ${
      isSelected
        ? 'border-blue-500 shadow-lg ring-2 ring-blue-100'
        : 'border-neutral-200 hover:border-neutral-300'
    }`}
    onClick={onClick}
  >
    <div className='flex flex-col gap-1'>
      <div className='flex items-center gap-2'>
        <span className='text-sm md:text-base font-semibold text-neutral-900'>
          {plan.name}
        </span>
        {plan.badge && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded ${
              plan.badgeColor === 'bg-yellow-400'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {plan.badge}
          </span>
        )}
      </div>
      <span className='text-xs md:text-sm text-neutral-400'>{plan.price}</span>
    </div>
    <div className='text-right'>
      <span className='text-lg md:text-xl font-bold text-neutral-900'>
        {plan.daily}
      </span>
      <span className='text-xs text-neutral-400 ml-1'>/day</span>
    </div>
  </div>
);

export const PricingModal = ({ isOpen, onClose }: PricingModalProps) => {
  const [selectedPlan, setSelectedPlan] = React.useState(1);

  const features: Feature[] = [
    {
      name: 'Advanced AI Models',
      description:
        'Gemini 2.5 Flash, Grok 3 Mini, OpenAI GPT-4.1, o4-mini(High) and more',
      free: false,
      pro: true,
      icon: <Chain size={24} className='text-neutral-400' />,
    },
    {
      name: 'AI Chat without limits',
      description: 'Unlimited chats with all models',
      free: false,
      pro: true,
      icon: <Chat size={24} className='text-neutral-400' />,
    },
    {
      name: '3600 images with Image Generation',
      description: 'Get more images with image generation',
      free: false,
      pro: true,
      icon: <ImageGeneration size={24} className='text-neutral-400' />,
    },
    {
      name: 'Unlimited access to AI Search Engine',
      description: 'Get unlimited searches with AI Search Engine',
      free: false,
      pro: true,
      icon: <Globe size={24} className='text-neutral-400' />,
    },
    {
      name: 'Chat with PDF, docs, and more',
      description: 'Analyze PDFs, docs, sheets, etc',
      free: false,
      pro: true,
      icon: <Doc size={24} className='text-neutral-400' />,
    },
    {
      name: 'Unlimited file uploads',
      description: 'Upload and process unlimited files',
      free: false,
      pro: true,
      icon: <Chain size={24} className='text-neutral-400' />,
    },
  ];

  const plans: Plan[] = [
    {
      name: 'Pro Monthly',
      price: '20 USD/month',
      daily: '0.67 USD',
      badge: '',
      highlight: false,
    },
    {
      name: 'Pro Quarterly',
      price: '45 USD/quarter',
      daily: '0.5 USD',
      badge: 'Save 25%',
      highlight: true,
      badgeColor: 'bg-red-500',
    },
    {
      name: 'Pro Yearly',
      price: '90 USD/year',
      daily: '0.25 USD',
      badge: 'Save 63%',
      highlight: false,
      badgeColor: 'bg-yellow-400',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='w-full max-w-[900px] md:max-w-[1000px] lg:max-w-[1100px] bg-white/90 text-neutral-900 p-0 max-h-[90vh] md:overflow-hidden overflow-y-auto rounded-2xl shadow-2xl border border-neutral-200 md:rounded-2xl md:shadow-2xl md:border md:max-h-[90vh] h-screen w-screen max-w-none max-h-none rounded-none shadow-none border-none'>
        <div className='flex flex-col-reverse md:flex-row w-full h-full'>
          {/* Left: Features */}
          <div className='w-full md:w-1/2 px-4 md:px-10 py-4 md:py-6 border-b md:border-b-0 md:border-r border-neutral-200 bg-[#F5F5F5] flex flex-col justify-between flex-1'>
            <DialogHeader>
              <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center space-x-2'>
                  <CompanyIcon size={28} className='text-neutral-900' />
                  <span className='text-neutral-900 font-semibold'>Chatro</span>
                </div>
              </div>
            </DialogHeader>

            {/* Features Section - Column headers and feature rows as one unit */}
            <div className='flex-1 mt-10'>
              {/* Features Header - Hidden on mobile */}
              <div className='hidden sm:grid grid-cols-12 gap-4 text-center mb-3 items-center'>
                <div className='col-span-8 flex items-center h-full text-left text-sm font-medium text-neutral-500'>
                  Combined Access to All Features
                </div>
                <div className='col-span-2 text-neutral-500 font-bold text-sm'>
                  Free
                </div>
                <div className='col-span-2 text-neutral-500 font-bold text-sm'>
                  Pro
                </div>
              </div>

              {/* Light Divider */}
              <div className='hidden sm:block h-px bg-neutral-200 mb-2'></div>

              {/* Features List */}
              <div className='space-y-0 divide-y divide-neutral-200'>
                {features.map((feature, idx) => (
                  <FeatureRow key={idx} feature={feature} />
                ))}
              </div>
            </div>

            {/* Mobile Features Summary */}
            <div className='sm:hidden mt-4 p-4 bg-white rounded-lg'>
              <h4 className='font-semibold text-neutral-900 mb-2'>
                Pro Features Include:
              </h4>
              <ul className='text-sm text-neutral-600 space-y-1'>
                {features.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className='flex items-center space-x-2'>
                    <CheckCircle size={16} />
                    <span>{feature.name}</span>
                  </li>
                ))}
                <li className='text-neutral-500 text-xs'>
                  + {features.length - 3} more features
                </li>
              </ul>
            </div>

            <div className='mt-6 text-center'>
              <Button
                variant='link'
                className='text-blue-600 hover:text-blue-500 font-medium'
                onClick={() => {
                  onClose();
                  window.location.href = '/pricing';
                }}
              >
                View all plans to learn more
              </Button>
            </div>
          </div>

          {/* Right: Pricing Plans */}
          <div className='w-full md:w-1/2 bg-white px-4 md:px-12 py-4 md:py-8 flex flex-col items-center justify-between flex-1'>
            <div className='w-full'>
              <h3 className='text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-center text-neutral-900'>
                Upgrade your plan
              </h3>

              <div className='flex flex-col gap-4 md:gap-6'>
                {plans.map((plan, idx) => (
                  <PlanCard
                    key={plan.name}
                    plan={plan}
                    isSelected={idx === selectedPlan}
                    onClick={() => setSelectedPlan(idx)}
                  />
                ))}
              </div>

              <div className='mt-6 md:mt-10'>
                <button className='w-full py-3 md:py-4 rounded-2xl text-base md:text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-400 shadow flex items-center justify-center relative'>
                  Continue
                  <span className='absolute right-4 md:right-6 top-1/2 -translate-y-1/2'>
                    <svg
                      className='w-6 h-6 md:w-7 md:h-7'
                      viewBox='0 0 28 28'
                      fill='none'
                    >
                      <circle cx='14' cy='14' r='14' fill='#38BDF8' />
                      <path
                        d='M10 14h8m0 0-3-3m3 3-3 3'
                        stroke='#fff'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </span>
                </button>
              </div>

              <div className='text-center mt-4 md:mt-8'>
                <div className='text-neutral-400 text-xs md:text-sm mb-2 md:mb-3 flex items-center justify-center space-x-1'>
                  <Verified size={16} className='text-green-500' />
                  <span>Pay Safe and Secure with</span>
                </div>
                <PaymentIcons />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
