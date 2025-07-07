import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import FaqAccordion from '../components/FaqAccordion';
import { ArrowRight } from '../components/icons/ArrowRight';

const Support = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    const stored = localStorage.getItem('sidebarCollapsed');
    return stored === 'true';
  });
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isSidebarCollapsed.toString());
  }, [isSidebarCollapsed]);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: 'What can I use Chatro for?',
      answer:
        'Chatro is an AI-powered chat assistant that can help you with writing, coding, analysis, creative tasks, and much more. You can ask questions, get explanations, brainstorm ideas, or have conversations',
    },
    {
      question: 'What platforms is Chatro available on?',
      answer:
        "Chatro is available as a web application that works on all modern browsers across desktop, tablet, and mobile devices. We're also working on dedicated mobile apps for iOS and Android.",
    },
    {
      question: 'How do I get started with Chatro?',
      answer:
        'Getting started is easy! Simply create an account, choose your preferred AI model, and start chatting. You can ask questions, request help with tasks, or engage in creative conversations right away.',
    },
    {
      question: 'What are the different pricing plans?',
      answer:
        'We offer a free tier with basic features, and premium plans with advanced capabilities like longer conversations, priority support, and access to more powerful AI models. Check our pricing page for details.',
    },
    {
      question: 'Is my personal data safe and secure when using Chatro?',
      answer:
        "Yes, we take data security very seriously. All conversations are encrypted, we don't store personal data unnecessarily, and we follow industry-standard security practices to protect",
    },
    {
      question: 'Can I share my account with others?',
      answer:
        'Each Chatro account is intended for individual use. Sharing accounts may violate our terms of service and could result in reduced performance or account limitations.',
    },
    {
      question: 'How can I contact support?',
      answer:
        'You can reach our support team through the contact form on this page, or email us directly at support@chatro.com. We typically respond within 24 hours.',
    },
    {
      question: 'How can I report a bug to the developer?',
      answer:
        'Please report bugs through our support channels or email bugs@chatro.com with a detailed description of the issue, steps to reproduce it, and any error messages you encountered.',
    },
    {
      question: 'Can I switch between AI models?',
      answer:
        'Yes! Pro subscribers can switch between multiple AI models including OpenAI GPT-4.1, OpenAI o1-mini (Beta), Google Gemini 2.5 Flash, X AI Grok 3 Mini, Deepseek R1, and Anthropic Claude models.',
    },
    {
      question: "What's new in Image Generation?",
      answer:
        'Our Image Generation feature allows you to create high-quality images from text descriptions. Pro users get 240 images per month with advanced customization options and faster generation times.',
    },
    {
      question: 'What file types are supported for upload?',
      answer:
        'Pro users can upload and analyze various file types including PDFs, Word documents, Excel spreadsheets, PowerPoint presentations, text files, images (JPG, PNG, GIF), and more.',
    },
    {
      question: 'How can I cancel my subscription?',
      answer:
        "You can cancel your subscription at any time through your account settings. Your access will continue until the end of your current billing period, and you won't be charged for the next cycle.",
    },
  ];

  const filteredFaqs = faqs.filter(
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
                  className='bg-[#2a2a2a] text-white placeholder-gray-500 pl-12 py-3 md:py-4 text-sm md:text-base outline-none'
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
