import { forwardRef, ReactNode } from 'react'

type SectionShellProps = {
  children: ReactNode
  className?: string
  as?: 'section' | 'div'
  id?: string
}

export const SectionShell = forwardRef<HTMLElement, SectionShellProps>(
  function SectionShell({ children, className = '', as: Tag = 'section', id }, ref) {
    return (
      <Tag
        ref={ref as React.Ref<HTMLDivElement>}
        id={id}
        className={`section-shell ${className}`}
        style={{
          paddingTop: 'var(--section-pad)',
          paddingBottom: 'var(--section-pad)',
        }}
      >
        {children}
      </Tag>
    )
  }
)
