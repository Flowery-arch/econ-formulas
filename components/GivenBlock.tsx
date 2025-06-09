import React from 'react';

interface GivenBlockProps {
  data: { label: string; value: string | number; unit?: string }[];
  title?: string;
}

const GivenBlock: React.FC<GivenBlockProps> = ({ data, title = 'Дано' }) => {
  return (
    <section style={{
      background: 'var(--background-light, #ffffff)',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
    }}>
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        background: 'rgba(0, 0, 0, 0.02)'
      }}>
        <h2 style={{
          fontSize: '15px',
          fontWeight: '500',
          margin: 0,
          color: 'var(--foreground, #333)'
        }}>{title}</h2>
      </div>

      <div style={{
        padding: '12px'
      }}>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          {data.map((item, idx) => (
            <li key={idx} style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '12px',
              padding: '6px 10px',
              background: idx % 2 === 0 ? 'rgba(0, 0, 0, 0.02)' : 'transparent',
              borderRadius: '4px',
              fontSize: '13px',
              alignItems: 'center'
            }}>
              <span style={{
                color: 'var(--foreground, #333)',
                opacity: 0.8,
                minWidth: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'normal'
              }}>{item.label}</span>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                justifyContent: 'flex-end',
                minWidth: '80px',
                textAlign: 'right'
              }}>
                <span style={{
                  fontWeight: '500',
                  color: 'var(--foreground, #333)'
                }}>{item.value}</span>
                {item.unit && (
                  <span style={{
                    color: 'var(--foreground, #333)',
                    opacity: 0.6,
                    fontSize: '12px',
                    whiteSpace: 'nowrap'
                  }}>{item.unit}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default GivenBlock; 