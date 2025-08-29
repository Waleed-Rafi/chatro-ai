'use client';

import { Home, XCircle } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function PaymentCancelPage() {
  return (
    <div className='min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6'>
      {/* Cancel Card */}
      <div className='max-w-2xl w-full bg-card border border-border rounded-2xl shadow-lg p-8 md:p-12 text-center'>
        {/* Cancel Icon with Better Visual */}
        <div className='mb-8'>
          <div className='mx-auto w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-4 relative'>
            <XCircle className='w-10 h-10 text-red-500' />
            <div className='absolute inset-0 bg-red-500/20 rounded-full animate-pulse'></div>
          </div>
        </div>

        {/* Cancel Message */}
        <div className='mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-foreground mb-4'>
            Payment Cancelled
          </h1>
          <p className='text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto'>
            No worries! Your payment was cancelled and you haven't been charged.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className='bg-muted/50 rounded-xl p-6 mb-8 border border-border'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
            <div className='text-center'>
              <div className='w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2'>
                <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
              </div>
              <p className='text-sm font-medium text-foreground'>
                Unlimited Chats
              </p>
            </div>
            <div className='text-center'>
              <div className='w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2'>
                <div className='w-3 h-3 bg-purple-500 rounded-full'></div>
              </div>
              <p className='text-sm font-medium text-foreground'>Advanced AI</p>
            </div>
            <div className='text-center'>
              <div className='w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2'>
                <div className='w-3 h-3 bg-green-500 rounded-full'></div>
              </div>
              <p className='text-sm font-medium text-foreground'>Image Gen</p>
            </div>
          </div>

          <p className='text-sm text-muted-foreground'>
            Join thousands of users who've upgraded to Pro
          </p>
        </div>

        {/* Action Button - Single Option */}
        <div className='mb-8'>
          <Link href='/'>
            <Button
              variant='outline'
              className='w-full py-6 rounded-xl border-2 hover:bg-muted transition-all duration-200'
            >
              <Home className='w-5 h-5 mr-2' />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Info Badge */}
        <div className='mt-8 pt-6 border-t border-border'>
          <div className='inline-flex items-center space-x-2 bg-blue-500/10 text-blue-600 px-4 py-2 rounded-full text-sm font-medium'>
            <span>You can try again anytime</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='mt-8 text-center'>
        <p className='text-muted-foreground text-sm'>
          Need help?{' '}
          <Link href='/support' className='text-primary hover:underline'>
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
