
'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

const Privacy = () => {
  const router = useRouter();

  return (
    <div className='min-h-screen bg-background text-foreground'>
      {/* Header */}
      <div className='border-b border-border/20 bg-card'>
        <div className='max-w-4xl mx-auto px-6 py-4'>
          <div className='flex items-center space-x-4'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => router.back()}
              className='text-muted-foreground hover:text-foreground'
            >
              <ArrowLeft size={20} className='mr-2' />
              Back
            </Button>
            <h1 className='text-2xl font-bold'>Privacy Policy</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='max-w-4xl mx-auto px-6 py-8'>
        <div className='prose prose-gray dark:prose-invert max-w-none'>
          <div className='mb-8'>
            <p className='text-lg text-muted-foreground mb-6'>
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <section className='mb-8'>
            <h2 className='text-xl font-semibold mb-4'>1. Information We Collect</h2>
            <p className='mb-4'>
              When you use Chatro, we may collect the following types of information:
            </p>
            <ul className='list-disc pl-6 mb-4 space-y-2'>
              <li>Account information (email address, username)</li>
              <li>Chat conversations and messages</li>
              <li>Usage data and analytics</li>
              <li>Device information and IP address</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-xl font-semibold mb-4'>2. How We Use Your Information</h2>
            <p className='mb-4'>
              We use your information to:
            </p>
            <ul className='list-disc pl-6 mb-4 space-y-2'>
              <li>Provide and improve our AI chat services</li>
              <li>Personalize your experience</li>
              <li>Respond to your inquiries and provide support</li>
              <li>Analyze usage patterns to enhance our platform</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-xl font-semibold mb-4'>3. Information Sharing</h2>
            <p className='mb-4'>
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className='list-disc pl-6 mb-4 space-y-2'>
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-xl font-semibold mb-4'>4. Data Security</h2>
            <p className='mb-4'>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-xl font-semibold mb-4'>5. Your Rights</h2>
            <p className='mb-4'>
              You have the right to:
            </p>
            <ul className='list-disc pl-6 mb-4 space-y-2'>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
              <li>Opt-out of certain communications</li>
            </ul>
          </section>

          <section className='mb-8'>
            <h2 className='text-xl font-semibold mb-4'>6. Cookies and Tracking</h2>
            <p className='mb-4'>
              We use cookies and similar technologies to enhance your experience and analyze usage patterns. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-xl font-semibold mb-4'>7. Changes to This Policy</h2>
            <p className='mb-4'>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='text-xl font-semibold mb-4'>8. Contact Us</h2>
            <p className='mb-4'>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className='bg-muted p-4 rounded-lg'>
              <p>Email: privacy@chatro.com</p>
              <p>Address: [Your Company Address]</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
