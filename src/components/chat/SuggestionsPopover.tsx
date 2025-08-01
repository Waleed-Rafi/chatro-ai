import { useEffect, useRef } from 'react';

import { colors, shadows, transitions } from '@/lib/design-system';

interface SuggestionsPopoverProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  onClose: () => void;
  isVisible: boolean;
}

export const SuggestionsPopover = ({
  suggestions,
  onSuggestionClick,
  onClose,
  isVisible,
}: SuggestionsPopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      ref={popoverRef}
      className='absolute top-full left-0 right-0 mt-2 backdrop-blur-xl rounded-2xl z-50 overflow-hidden'
      style={{
        backgroundColor: colors.background.secondary,
        border: `1px solid ${colors.border.primary}`,
        boxShadow: shadows['2xl'],
      }}
    >
      {/* Modern gradient border effect */}
      <div
        className='absolute inset-0 rounded-2xl pointer-events-none'
        style={{
          background: `linear-gradient(to right, ${colors.accent.blue}0d, ${colors.accent.purple}0d, ${colors.accent.pink}0d)`,
        }}
      />

      <div className='relative p-3'>
        {suggestions.map((suggestion, index) => {
          // Split the suggestion to highlight the bold part
          const parts = suggestion.split(/(\b\w+\b)/);

          return (
            <div key={index}>
              <button
                onClick={() => onSuggestionClick(suggestion)}
                className='w-full text-left px-4 py-3 rounded-xl transition-all group'
                style={{
                  color: colors.text.secondary,
                  transition: transitions.normal,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor =
                    colors.interactive.hover;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div className='flex items-center space-x-3'>
                  {/* Modern icon indicator */}
                  <div
                    className='w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity'
                    style={{
                      background: `linear-gradient(to right, ${colors.accent.blue}, ${colors.accent.purple})`,
                      transition: transitions.fast,
                    }}
                  />

                  <span className='text-sm leading-relaxed'>
                    {parts.map((part, partIndex) => {
                      // Check if this part should be bold (usually the last meaningful word)
                      const shouldBeBold = part.match(
                        /^(speech|poem|blog post|professional email|cover letter|story|script|report|logo|social media post|book cover|poster design|product mockup|illustration|banner image|profile picture|code|function|React component|algorithm|unit tests|API endpoint|game|database query|image|photo|text|objects|quality|patterns|composition|article|document|video|meeting|book|research|conversation|advice|relationships|financial planning|health|wellness|study|learning|business strategy|personal development|life coaching|information|data|format|structure|tables|charts|visualization|trends|statistics|outliers|insights|cleaning|ideas|strategies|features|solutions|innovation|planning|content|news|reviews|topic|papers|tutorials|businesses|recipes|travel)$/i
                      );

                      return shouldBeBold ? (
                        <span
                          key={partIndex}
                          className='font-semibold'
                          style={{
                            color: colors.text.primary,
                          }}
                        >
                          {part}
                        </span>
                      ) : (
                        <span key={partIndex}>{part}</span>
                      );
                    })}
                  </span>
                </div>
              </button>

              {index < suggestions.length - 1 && (
                <div
                  className='mx-4 my-1 h-px'
                  style={{
                    background: `linear-gradient(to right, transparent, ${colors.border.secondary}, transparent)`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
