interface NumberTileProps {
  value: number
}

export default function NumberTile({ value }: NumberTileProps) {
  return (
    <div
      className="relative flex items-center justify-center rounded-xl select-none"
      style={{
        width: 'var(--tile-w)',
        height: 'var(--tile-h)',
        background: 'linear-gradient(160deg, #1e1c2e 0%, #131122 100%)',
        border: '1.5px solid rgba(255,255,255,0.13)',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.07), 0 6px 18px rgba(0,0,0,0.65), 0 2px 4px rgba(0,0,0,0.4)',
      }}
    >
      {/* top-left corner pip */}
      <span
        className="absolute top-1.5 left-2 font-bold leading-none"
        style={{ fontSize: '0.55rem', color: 'rgba(240,240,240,0.45)' }}
      >
        {value}
      </span>

      {/* centre number */}
      <span
        className="font-bold leading-none"
        style={{ fontSize: 'var(--tile-center-fs)', color: '#f0f0f0' }}
      >
        {value}
      </span>

      {/* bottom-right corner pip (rotated) */}
      <span
        className="absolute bottom-1.5 right-2 font-bold leading-none rotate-180"
        style={{ fontSize: '0.55rem', color: 'rgba(240,240,240,0.45)' }}
      >
        {value}
      </span>
    </div>
  )
}
