import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Austin Fund';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0D0E0A',
          color: '#EAEAE9',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#6B6D63',
            }}
          />
          <div
            style={{
              fontSize: '100px',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              display: 'flex',
              gap: '24px',
            }}
          >
            <span>Austin</span>
            <span style={{ fontStyle: 'italic', color: '#6B6D63' }}>Fund</span>
          </div>
        </div>
        <div
          style={{
            color: '#6B6D63',
            fontSize: '36px',
            fontWeight: 300,
            letterSpacing: '0.02em',
            maxWidth: '840px',
            textAlign: 'center',
            lineHeight: 1.6,
          }}
        >
          Pre-seed and seed stage investments in University of Austin affiliated founding teams.
        </div>
      </div>
    ),
    { ...size }
  );
}
