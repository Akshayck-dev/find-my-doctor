import { useEffect, useRef } from 'react'

function InfoRow({ label, value }) {
  return (
    <div className="row">
      <label>{label}</label>
      <div>{value}</div>
    </div>
  )
}

export default function DoctorModal({ selected, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (selected && dialog && !dialog.open) dialog.showModal()
    if (!selected && dialog?.open) dialog.close()
  }, [selected])

  if (!selected) return <dialog ref={dialogRef} />

  const { doctor, hospital, enriched, contact, sourceUrl } = selected
  const profileUrl = enriched?.profile || contact.book || sourceUrl

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => event.target === dialogRef.current && onClose()}
    >
      <div className="modal">
        <div className="modaltop">
          <div className="modalhead">
            {enriched?.photo && (
              <img className="modalphoto" src={enriched.photo} alt={doctor[0]} />
            )}
            <div>
              <div className="specialty">{doctor[1]}</div>
              <h2>{doctor[0]}</h2>
            </div>
          </div>
          <button className="close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <InfoRow label="Hospital" value={hospital} />
        <InfoRow label="Designation" value={enriched?.designation || 'Not yet published / verified in the enriched dataset'} />
        <InfoRow label="Qualification" value={enriched?.qualification || 'Not yet published / verified in the enriched dataset'} />
        <InfoRow label="Experience / Schedule" value={enriched?.experience || 'Not yet published / verified in the enriched dataset'} />
        <InfoRow label="Location" value="Kozhikode, Kerala" />
        <InfoRow label="Verification" value="Listed on official hospital directory · Medical registration cross-check pending" />
        <InfoRow label="Rating" value="Not added — no doctor-specific rating claimed" />

        <div className="modalactions">
          <a className="btn primary" href={profileUrl} target="_blank" rel="noreferrer">
            Book / Official profile
          </a>
          <a className="btn secondary" href={`tel:${contact.phone}`}>Call hospital</a>
        </div>

        <div className="modalbuttons">
          <a className="btn secondary" href={contact.map} target="_blank" rel="noreferrer">
            Directions
          </a>
          <a
            className="btn secondary"
            href={`https://www.google.com/search?q=${encodeURIComponent(`${doctor[0]} ${hospital} Kozhikode`)}`}
            target="_blank"
            rel="noreferrer"
          >
            Search doctor
          </a>
        </div>
      </div>
    </dialog>
  )
}
