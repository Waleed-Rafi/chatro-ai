'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

import FaqAccordion from '@/components/FaqAccordion';
import { ArrowRight } from '@/components/icons/ArrowRight';
import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSidebar } from '@/contexts/SidebarContext';
import { supportFAQs } from '@/data';

const Support = () => {
  const { isSidebarCollapsed, setIsSidebarCollapsed } = useSidebar();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = supportFAQs.filter(
    faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            {/* this is not vertically centered */}
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
            {/* <h1 className='text-xl font-medium text-white'>Support</h1> */}
          </div>
        </div>

        {/* Content */}
        <div className='flex-1 p-4 md:p-8 overflow-y-auto'>
          <div className='max-w-4xl mx-auto'>
            {/* Header */}
            <div className='text-center mb-8 md:mb-12'>
              <h2 className='text-2xl md:text-3xl font-medium text-white mb-2'>
                How can we help you?
              </h2>
              <p className='text-gray-400 text-sm'>
                Find answers to common questions or contact our support team
              </p>
            </div>

            {/* Search */}
            <div className='mb-8 md:mb-12'>
              <div className='relative max-w-2xl mx-auto'>
                <Search
                  size={20}
                  className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                />
                <Input
                  placeholder='Search for help...'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className='bg-[#2a2a2a] text-white placeholder-gray-500 pl-12 py-3 md:py-4 text-sm md:text-base outline-none chat-input-no-focus'
                />
              </div>
            </div>

            {/* FAQ Section */}
            <div className='mb-8 md:mb-12'>
              <FaqAccordion faqs={filteredFaqs} />
            </div>

            {/* Contact Section */}
            <div className='bg-[#2a2a2a] rounded-lg p-6 md:p-8 text-center'>
              <h3 className='text-xl md:text-2xl font-medium text-white mb-4'>
                Still need help?
              </h3>
              <p className='text-gray-400 mb-6 text-sm md:text-base'>
                Can&apos;t find the answer you&apos;re looking for? Our support
                team is here to help.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3'>
                  Contact Support
                </Button>
                <Button
                  variant='outline'
                  className='text-white border-gray-600 hover:bg-[#333] px-6 py-3'
                >
                  Email Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
