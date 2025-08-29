'use client';

import { ArrowRight, CheckCircle, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

import { Button } from '@/components/ui/button';

function PaymentSuccessContent() {
  return (
    <div className='min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6'>
      {/* Success Card */}
      <div className='max-w-2xl w-full bg-card border border-border rounded-2xl shadow-lg p-8 md:p-12 text-center'>
        {/* Success Icon */}
        <div className='mb-8'>
          <div className='mx-auto w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-4'>
            <CheckCircle className='w-10 h-10 text-green-500' />
          </div>
        </div>

        {/* Success Message */}
        <div className='mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-foreground mb-4'>
            Welcome to Pro!
          </h1>
          <p className='text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto'>
            Your subscription is now active. You have access to all premium
            features.
          </p>
        </div>

        {/* Key Benefits - Simple & Clear */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
          <div className='bg-muted/50 rounded-lg p-4 border border-border'>
            <div className='w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2'>
              <Zap className='w-4 h-4 text-blue-500' />
            </div>
            <p className='text-sm font-medium text-foreground'>
              Unlimited Chats
            </p>
          </div>
          <div className='bg-muted/50 rounded-lg p-4 border border-border'>
            <div className='w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2'>
              <Sparkles className='w-4 h-4 text-purple-500' />
            </div>
            <p className='text-sm font-medium text-foreground'>Advanced AI</p>
          </div>
          <div className='bg-muted/50 rounded-lg p-4 border border-border'>
            <div className='w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mb-2'>
              <CheckCircle className='w-4 h-4 text-green-500' />
            </div>
            <p className='text-sm font-medium text-foreground'>Image Gen</p>
          </div>
        </div>

        {/* Action Button - Single Option */}
        <div className='mb-8'>
          <Link href='/'>
            <Button className='w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200'>
              Start Chatting Now
              <ArrowRight className='w-5 h-5 ml-2' />
            </Button>
          </Link>
        </div>

        {/* Success Badge */}
        <div className='mt-8 pt-6 border-t border-border'>
          <div className='inline-flex items-center space-x-2 bg-green-500/10 text-green-600 px-4 py-2 rounded-full text-sm font-medium'>
            <CheckCircle className='w-4 h-4' />
            <span>Payment Successful</span>
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

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen bg-background text-foreground flex items-center justify-center p-6'>
          <div className='max-w-2xl w-full bg-card border border-border rounded-2xl shadow-lg p-8 md:p-12 text-center'>
            <div className='animate-pulse'>
              <div className='mx-auto w-20 h-20 bg-muted rounded-full mb-4'></div>
              <div className='h-8 bg-muted rounded mb-4'></div>
              <div className='h-6 bg-muted rounded mb-8 max-w-lg mx-auto'></div>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
                {[1, 2, 3].map(i => (
                  <div key={i} className='bg-muted rounded-lg p-4 h-20'></div>
                ))}
              </div>
              <div className='mb-8'>
                <div className='h-14 bg-muted rounded-xl'></div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
