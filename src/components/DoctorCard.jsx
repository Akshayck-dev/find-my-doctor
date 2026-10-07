export default function DoctorCard({ doctor, hospital, enriched, sourceUrl, onView }) {
  const initials = doctor[0]
    .replace(/^Dr\.\s*/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  return (
    <article className="card">
      <div className="head">
        <div className="avatar">{initials}</div>
        <div>
          <div className="name">{doctor[0]}</div>
          <div className="specialty">{doctor[1]}</div>
        </div>
      </div>

      <div className="meta">
        🏥 {hospital}
        <br />
        📍 Kozhikode, Kerala
      </div>

      <div className="badges">
        <span className="badge">✓ Official source</span>
        <span className={enriched ? 'badge rich' : 'badge basic'}>
          {enriched ? 'Detailed profile' : 'Basic official profile'}
        </span>
        <span className="badge pending">Registration pending</span>
        <span className="badge pending">Rating not added</span>
      </div>

      <div className="actions">
        <button className="btn secondary" onClick={onView}>View profile</button>
        <a className="btn primary" target="_blank" rel="noreferrer" href={sourceUrl}>
          Hospital source
        </a>
      </div>
    </article>
  )
}
