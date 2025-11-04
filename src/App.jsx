import { useState } from 'react'

const artworks = [
  {
    title: 'Starry Night',
    artist: 'Vincent van Gogh',
    description: 'A swirling depiction of the night sky over Saint-Rémy-de-Provence.'
  },
  {
    title: 'The Persistence of Memory',
    artist: 'Salvador Dalí',
    description: 'Iconic melting clocks symbolizing the fluidity of time.'
  },
  {
    title: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    description: "A mysterious portrait often called the 'Mona Lisa of the North'."
  }
]

function Gallery() {
  const [index, setIndex] = useState(0)
  const [showMore, setShowMore] = useState(false)

  const hasNext = index < artworks.length - 1

  function handleNext() {
    setIndex(hasNext ? index + 1 : 0)
  }

  function handleToggleMore() {
    setShowMore(!showMore)
  }

  const art = artworks[index]

  return (
    <div className="card">
      <h2 className="title">{art.title}</h2>
      <p className="muted">by {art.artist}</p>
      {showMore && <p className="details">{art.description}</p>}
      <div className="row">
        <button onClick={handleNext}>Next</button>
        <button onClick={handleToggleMore}>{showMore ? 'Hide' : 'Show'} details</button>
      </div>
      <p className="muted small">
        ({index + 1} of {artworks.length})
      </p>
    </div>
  )
}

function GlobalGallery() {
  // Shared state for a single gallery that intends to keep multiple views in sync (lifted-up idea)
  const [index, setIndex] = useState(0)
  const [showMore, setShowMore] = useState(false)

  const art = artworks[index]

  return (
    <div className="card highlight">
      <h1 className="title">Global Gallery (Shared State)</h1>
      <h2 className="title">{art.title}</h2>
      <p className="muted">by {art.artist}</p>
      {showMore && <p className="details">{art.description}</p>}
      <div className="row">
        <button onClick={() => setIndex((index + 1) % artworks.length)}>Next</button>
        <button onClick={() => setShowMore(!showMore)}>{showMore ? 'Hide' : 'Show'} details</button>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>🎨 React State Practice</h1>
        <p>
          This app demonstrates <code>useState</code>, isolated component state, multiple state variables,
          and the concept of lifting state up.
        </p>
      </header>

      <section>
        <h3>Independent Galleries</h3>
        <p>Each gallery below maintains its own internal state.</p>
        <div className="grid">
          <Gallery />
          <Gallery />
        </div>
      </section>

      <section>
        <h3>Shared State Example</h3>
        <p>The component below uses a single set of state values to control what is displayed.</p>
        <GlobalGallery />
      </section>

      <footer className="muted small">
        <p>React 19 + Vite • Edit <code>src/App.jsx</code> and save to see live updates.</p>
      </footer>
    </div>
  )
}
