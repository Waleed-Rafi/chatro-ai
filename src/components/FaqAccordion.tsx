import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface Faq {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: Faq[];
}

export const FaqAccordion = ({ faqs }: FaqAccordionProps) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div>
      <h3 className='text-lg font-medium text-white text-center mb-2'>
        Frequently Asked Questions
      </h3>
      <p className='text-gray-400 text-center mb-6 text-sm'>
        Discover more information by exploring our FAQ section.
      </p>
      <div className='space-y-3'>
        {faqs.map((faq, index) => (
          <div key={index} className='bg-[#2a2a2a] rounded-lg'>
            <button
              className='w-full p-4 text-left flex items-center justify-between transition-colors rounded-lg'
              onClick={() =>
                setExpandedFaq(expandedFaq === index ? null : index)
              }
            >
              <span className='text-white font-medium text-sm'>
                {faq.question}
              </span>
              {expandedFaq === index ? (
                <ChevronUp
                  className='text-gray-400 flex-shrink-0 ml-2'
                  size={16}
                />
              ) : (
                <ChevronDown
                  className='text-gray-400 flex-shrink-0 ml-2'
                  size={16}
                />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                expandedFaq === index
                  ? 'max-h-40 opacity-100 pointer-events-auto px-4 pb-4'
                  : 'max-h-0 opacity-0 pointer-events-none'
              }`}
            >
              <div className='text-gray-300 text-sm'>{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqAccordion;
