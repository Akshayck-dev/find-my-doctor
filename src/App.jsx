import { useMemo, useState } from 'react'
import DoctorCard from './components/DoctorCard.jsx'
import DoctorModal from './components/DoctorModal.jsx'
import {
  doctors,
  enrichedProfiles,
  hospitalContacts,
  hospitals,
  sourceUrls,
} from './data/doctors.js'

export default function App() {
  const [query, setQuery] = useState('')
  const [hospitalFilter, setHospitalFilter] = useState('')
  const [specialtyFilter, setSpecialtyFilter] = useState('')
  const [selected, setSelected] = useState(null)

  const specialties = useMemo(
    () => [...new Set(doctors.map((doctor) => doctor[1]))].sort(),
    [],
  )

  const filteredDoctors = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return doctors
      .map((doctor, index) => ({ doctor, index }))
      .filter(({ doctor }) => {
        const searchable = `${doctor[0]} ${doctor[1]} ${hospitals[doctor[2]]}`.toLowerCase()
        const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery)
        const matchesHospital = !hospitalFilter || String(doctor[2]) === hospitalFilter
        const matchesSpecialty = !specialtyFilter || doctor[1] === specialtyFilter

        return matchesQuery && matchesHospital && matchesSpecialty
      })
  }, [query, hospitalFilter, specialtyFilter])

  const openDoctor = (doctor) => {
    setSelected({
      doctor,
      hospital: hospitals[doctor[2]],
      enriched: enrichedProfiles[doctor[0]],
      contact: hospitalContacts[doctor[2]],
      sourceUrl: sourceUrls[doctor[3]],
    })
  }

  const clearFilters = () => {
    setQuery('')
    setHospitalFilter('')
    setSpecialtyFilter('')
  }

  return (
    <>
      <section className="top">
        <div className="wrap">
          <div className="nav">
            <div className="brand">FindMyDoctor</div>
            <div className="pill hide-m">Kozhikode MVP · Official hospital sources</div>
          </div>

          <div className="hero">
            <small>Verified-source doctor discovery</small>
            <h1>Find the right doctor, faster.</h1>
            <p>
              Search 100 public doctor profiles from leading Kozhikode hospital directories
              by name, specialty and hospital.
            </p>

            <div className="stats">
              <div className="stat"><b>100</b><span>doctor profiles</span></div>
              <div className="stat"><b>3</b><span>hospital directories</span></div>
              <div className="stat"><b>07 Oct</b><span>source checked</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="searchbox">
        <div className="control">
          ⌕
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Doctor, specialty or hospital"
          />
        </div>

        <div className="control">
          <select value={hospitalFilter} onChange={(event) => setHospitalFilter(event.target.value)}>
            <option value="">All hospitals</option>
            {hospitals.map((hospital, index) => (
              <option value={index} key={hospital}>{hospital}</option>
            ))}
          </select>
        </div>

        <div className="control">
          <select value={specialtyFilter} onChange={(event) => setSpecialtyFilter(event.target.value)}>
            <option value="">All specialties</option>
            {specialties.map((specialty) => (
              <option value={specialty} key={specialty}>{specialty}</option>
            ))}
          </select>
        </div>

        <button className="clear" onClick={clearFilters}>Clear</button>
      </section>

      <div className="toolbar">
        <div><b>{filteredDoctors.length} doctors</b> found in Kozhikode</div>
        <div>Source verified ≠ registration verified</div>
      </div>

      <main className="grid">
        {filteredDoctors.length ? (
          filteredDoctors.map(({ doctor, index }) => (
            <DoctorCard
              key={`${doctor[0]}-${index}`}
              doctor={doctor}
              hospital={hospitals[doctor[2]]}
              enriched={enrichedProfiles[doctor[0]]}
              sourceUrl={sourceUrls[doctor[3]]}
              onView={() => openDoctor(doctor)}
            />
          ))
        ) : (
          <div className="empty">
            <h3>No doctors found</h3>
            <div>Try another specialty, hospital or search term.</div>
          </div>
        )}
      </main>

      <div className="note">
        <b>Data rule:</b> “Official source” means the doctor appears on the hospital’s
        public directory. Medical registration verification and doctor-specific ratings
        are not claimed until separately verified.
      </div>

      <DoctorModal selected={selected} onClose={() => setSelected(null)} />
    </>
  )
}
