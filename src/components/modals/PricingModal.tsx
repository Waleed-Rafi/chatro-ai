import { X } from 'lucide-react';

import { Chain } from '@/components/icons/Chain';
import { Chat } from '@/components/icons/Chat';
import { Doc } from '@/components/icons/Doc';
import { Globe } from '@/components/icons/Globe';
import { ImageGeneration } from '@/components/icons/ImageGeneration';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';

// Outlined CheckCircle icon
const CheckCircle = ({ size = 24, className = '' }) => (
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

// Outlined XCircle icon
const XCircle = ({ size = 24, className = '' }) => (
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

// SVGs for payment methods
const PaymentIcons = () => (
  <div className='flex justify-center space-x-2 flex-wrap mt-2'>
    <svg width='32' height='20' viewBox='0 0 32 20' fill='none'>
      <rect width='32' height='20' rx='4' fill='#003087' />
      <text
        x='16'
        y='14'
        textAnchor='middle'
        fill='#fff'
        fontSize='10'
        fontWeight='bold'
      >
        PayPal
      </text>
    </svg>
    <svg width='32' height='20' viewBox='0 0 32 20' fill='none'>
      <rect width='32' height='20' rx='4' fill='#1A1F71' />
      <text
        x='16'
        y='14'
        textAnchor='middle'
        fill='#fff'
        fontSize='10'
        fontWeight='bold'
      >
        VISA
      </text>
    </svg>
    <svg width='32' height='20' viewBox='0 0 32 20' fill='none'>
      <rect width='32' height='20' rx='4' fill='#EB001B' />
      <text
        x='16'
        y='14'
        textAnchor='middle'
        fill='#fff'
        fontSize='10'
        fontWeight='bold'
      >
        MC
      </text>
    </svg>
    <svg width='32' height='20' viewBox='0 0 32 20' fill='none'>
      <rect width='32' height='20' rx='4' fill='#0077A6' />
      <text
        x='16'
        y='14'
        textAnchor='middle'
        fill='#fff'
        fontSize='8'
        fontWeight='bold'
      >
        AMEX
      </text>
    </svg>
    <svg width='32' height='20' viewBox='0 0 32 20' fill='none'>
      <rect width='32' height='20' rx='4' fill='#F79E1B' />
      <text
        x='16'
        y='14'
        textAnchor='middle'
        fill='#fff'
        fontSize='10'
        fontWeight='bold'
      >
        DISC
      </text>
    </svg>
    <svg width='32' height='20' viewBox='0 0 32 20' fill='none'>
      <rect width='32' height='20' rx='4' fill='#009944' />
      <text
        x='16'
        y='14'
        textAnchor='middle'
        fill='#fff'
        fontSize='10'
        fontWeight='bold'
      >
        JCB
      </text>
    </svg>
  </div>
);

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal = ({ isOpen, onClose }: PricingModalProps) => {
  const features = [
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

  const plans = [
    {
      name: 'Pro Monthly',
      price: '20 USD/month',
      daily: '0.67 USD/day',
      badge: '',
      highlight: false,
    },
    {
      name: 'Pro Quarterly',
      price: '45 USD/quarter',
      daily: '0.5 USD/day',
      badge: 'Save 25%',
      highlight: true,
      badgeColor: 'bg-red-500',
    },
    {
      name: 'Pro Yearly',
      price: '90 USD/year',
      daily: '0.25 USD/day',
      badge: 'Save 63%',
      highlight: false,
      badgeColor: 'bg-yellow-400',
    },
  ];

  // For now, default selected plan is Quarterly
  const selectedPlan = 1;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='w-full max-w-[900px] md:max-w-[1000px] lg:max-w-[1100px] bg-white/90 text-neutral-900 p-0 max-h-[90vh] md:overflow-hidden overflow-y-auto rounded-2xl shadow-2xl border border-neutral-200 md:rounded-2xl md:shadow-2xl md:border md:max-h-[90vh] h-screen w-screen max-w-none max-h-none rounded-none shadow-none border-none'>
        <div className='flex flex-col-reverse md:flex-row w-full h-full'>
          {/* Left: Features */}
          <div className='w-full md:w-1/2 px-4 md:px-10 py-4 md:py-6 border-b md:border-b-0 md:border-r border-neutral-200 bg-[#F5F5F5] flex flex-col justify-between flex-1'>
            <DialogHeader className='mb-4'>
              <div className='flex items-center justify-between mb-2'>
                <div className='flex items-center space-x-2'>
                  <div className='w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center'>
                    <span className='text-xs font-bold text-white'>C</span>
                  </div>
                  <span className='text-neutral-900 font-semibold'>Chatro</span>
                </div>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={onClose}
                  className='text-neutral-400 hover:text-neutral-700'
                >
                  <X size={16} />
                </Button>
              </div>
            </DialogHeader>
            <div className='hidden sm:grid grid-cols-12 gap-4 text-center mb-4 items-center'>
              <div className='col-span-8 flex items-center h-full text-left text-xs font-medium text-neutral-400'>
                Combined Access to All Features
              </div>
              <div className='col-span-2 text-neutral-400 font-medium'>
                Free
              </div>
              <div className='col-span-2 text-neutral-400 font-medium'>Pro</div>
            </div>
            <div className='space-y-0 divide-y divide-neutral-200'>
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className='grid grid-cols-1 sm:grid-cols-12 items-center py-3'
                >
                  <div className='col-span-8 flex items-center space-x-4'>
                    <div className='flex items-center justify-center'>
                      {feature.icon}
                    </div>
                    <div>
                      <div className='text-neutral-900 font-bold text-base leading-tight'>
                        {feature.name}
                      </div>
                      <div className='text-neutral-400 text-sm leading-tight'>
                        {feature.description}
                      </div>
                    </div>
                  </div>
                  <div className='col-span-2 text-center hidden sm:block'>
                    <XCircle size={24} className='mx-auto' />
                  </div>
                  <div className='col-span-2 text-center hidden sm:block'>
                    <CheckCircle size={24} className='mx-auto' />
                  </div>
                </div>
              ))}
            </div>
            <div className='mt-6 text-center'>
              <Button
                variant='link'
                className='text-blue-600 hover:text-blue-500 font-medium'
              >
                View all plans to learn more
              </Button>
            </div>
          </div>
          {/* Right: Pricing Plans */}
          <div className='w-full md:w-1/2 bg-white px-4 md:px-10 py-4 md:py-6 flex flex-col items-center justify-between flex-1'>
            <div className='w-full'>
              <h3 className='text-2xl font-bold mb-8 text-center'>
                Upgrade your plan ✨
              </h3>
              <div className='flex flex-col gap-5'>
                {plans.map((plan, idx) => (
                  <div
                    key={plan.name}
                    className={`relative flex items-center justify-between px-6 py-5 rounded-2xl transition-all border bg-white ${idx === selectedPlan ? 'border-blue-500 shadow-lg' : 'border-neutral-200'} ${idx === selectedPlan ? 'ring-2 ring-blue-100' : ''}`}
                  >
                    <div className='flex flex-col gap-1'>
                      <div className='flex items-center gap-2'>
                        <span className='text-base font-semibold text-neutral-900'>
                          {plan.name}
                        </span>
                        {plan.badge && (
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded ${plan.badgeColor === 'bg-yellow-400' ? 'bg-yellow-400/90 text-yellow-900' : 'bg-red-500/90 text-white'}`}
                          >
                            {plan.badge}
                          </span>
                        )}
                      </div>
                      <span className='text-sm text-neutral-400'>
                        {plan.price}
                      </span>
                    </div>
                    <div className='text-right'>
                      <span className='text-xl font-bold text-neutral-900'>
                        {plan.daily}
                      </span>
                      <span className='text-xs text-neutral-400 ml-1'>
                        /day
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className='mt-8'>
                <button className='w-full py-4 rounded-2xl text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-400 shadow flex items-center justify-center relative'>
                  Continue
                  <span className='absolute right-6 top-1/2 -translate-y-1/2'>
                    <svg width='28' height='28' viewBox='0 0 28 28' fill='none'>
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
              <div className='text-center mt-6'>
                <div className='text-neutral-400 text-sm mb-2'>
                  <span role='img' aria-label='lock'>
                    🔒
                  </span>{' '}
                  Pay Safe and Secure with
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
