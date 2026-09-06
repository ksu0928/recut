'use client'

import { useMemo, useState } from 'react'

type Platform = 'YouTube' | 'TikTok' | 'Instagram' | 'X'

const transcript = [
  ['00:00', 'The desk looked fine from a distance, but every day I was fighting the same three problems.'],
  ['00:15', 'Cables were visible from every angle, the monitor was too low, and there was nowhere to put my notes.'],
  ['00:42', 'So I rebuilt the whole setup around one idea: keep the tools close, and everything else out of sight.'],
  ['01:18', 'The biggest change is this under-desk mount. It takes the power brick and the hub completely off the floor.'],
  ['02:07', 'I also switched to a monitor arm with a quick-release plate, which makes the screen feel much lighter.'],
  ['03:14', 'The small things matter too: a shallow tray for daily carry, felt cable ties, and one warm desk lamp.'],
  ['04:28', 'After a week, the difference is less about how the desk looks and more about how quickly I can start.'],
  ['06:51', 'This is the final layout. Nothing here is precious, but everything has a job.'],
]

const outputs: Record<Platform, { title: string; body: string; tags: string[]; limit: number }> = {
  YouTube: {
    title: 'I Rebuilt My Desk Around One Simple Rule',
    body: 'A full look at the desk setup I use every day, including the under-desk mounting system, monitor arm, cable management, and the small details that make starting work feel effortless.\n\n00:00 The problem\n00:15 What was getting in the way\n00:42 The new approach\n01:18 Under-desk mounting\n02:07 Monitor arm\n03:14 Small details\n04:28 After one week\n06:51 Final layout',
    tags: ['desk setup', 'workspace', 'cable management', 'tech review', 'home office'],
    limit: 5000,
  },
  TikTok: {
    title: 'A desk setup that gets out of your way',
    body: 'I rebuilt my desk around one simple rule: keep the tools close, and everything else out of sight. The under-desk mount was the game changer. #desksetup #workspace #cablemanagement #homeoffice',
    tags: ['desksetup', 'workspace', 'homeoffice', 'techsetup'],
    limit: 2200,
  },
  Instagram: {
    title: 'The desk reset I actually kept',
    body: 'Less visual noise, faster starts. I rebuilt my setup around the tools I reach for every day, then hid everything else. The under-desk mount made the biggest difference. #desksetup #workspaceinspo #homeoffice #minimaldesk',
    tags: ['desksetup', 'workspaceinspo', 'homeoffice', 'minimaldesk'],
    limit: 2200,
  },
  X: {
    title: 'The desk reset I actually kept',
    body: 'I rebuilt my desk around one simple rule: keep the tools close, and everything else out of sight. The under-desk mount made the biggest difference.',
    tags: [],
    limit: 280,
  },
}

function Waveform({ active, onSelect }: { active: number; onSelect: (index: number) => void }) {
  const bars = useMemo(() => Array.from({ length: 126 }, (_, index) => 18 + ((index * 37) % 42) + (index % 5) * 8), [])
  return (
    <div className="waveform" role="group" aria-label="Video waveform">
      {bars.map((height, index) => (
        <button key={index} className={`wave-bar ${index < active * 15 ? 'played' : ''} ${index === active * 15 ? 'cursor' : ''}`} style={{ height }} aria-label={`Jump to waveform position ${index + 1}`} onClick={() => onSelect(Math.min(7, Math.floor(index / 15)))} />
      ))}
    </div>
  )
}

export default function Page() {
  const [activeLine, setActiveLine] = useState(2)
  const [platform, setPlatform] = useState<Platform>('YouTube')
  const [copyLabel, setCopyLabel] = useState('Copy all')
  const [regenerating, setRegenerating] = useState(false)
  const [text, setText] = useState(outputs.YouTube.body)
  const current = outputs[platform]

  function selectPlatform(next: Platform) {
    setPlatform(next)
    setText(outputs[next].body)
    setCopyLabel('Copy all')
  }

  function regenerate() {
    setRegenerating(true)
    window.setTimeout(() => setRegenerating(false), 850)
  }

  async function copyAll() {
    await navigator.clipboard?.writeText(`${current.title}\n\n${text}`)
    setCopyLabel('Copied')
    window.setTimeout(() => setCopyLabel('Copy all'), 1600)
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Recut home">Recut<span>.</span></a>
        <div className="project-actions">
          <span className="project-name">desk-setup-final.mp4</span>
          <button className="upload-button" type="button"><span className="upload-icon">+</span> Upload video</button>
        </div>
      </header>

      <section className="timeline-zone" id="top" aria-labelledby="video-title">
        <div className="timeline-heading">
          <div>
            <p className="eyebrow">Source video · 08:42</p>
            <h1 id="video-title">The desk setup I wish I built sooner</h1>
          </div>
          <button className="quiet-button" type="button">Original video <span aria-hidden="true">↗</span></button>
        </div>
        <div className="waveform-wrap">
          <Waveform active={activeLine} onSelect={setActiveLine} />
          <div className="time-labels"><span>00:00</span><span>02:10</span><span>04:20</span><span>06:30</span><span>08:42</span></div>
        </div>
      </section>

      <section className="workspace" aria-label="Transcript and generated content">
        <aside className="transcript-panel">
          <div className="panel-heading"><div><p className="eyebrow">Transcript</p><h2>8 moments</h2></div><span className="duration">08:42</span></div>
          <div className="transcript-list">
            {transcript.map(([time, line], index) => (
              <button key={time} className={`transcript-line ${activeLine === index ? 'selected' : ''}`} onClick={() => setActiveLine(index)} type="button">
                <span className="timecode">{time}</span><span>{line}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="output-panel">
          <div className="output-topline"><div><p className="eyebrow dark-eyebrow">Generated for</p><h2>{platform} copy</h2></div><span className="ready-status"><span className="status-dot" /> Ready to publish</span></div>
          <div className="tabs" role="tablist" aria-label="Platform outputs">
            {(['YouTube', 'TikTok', 'Instagram', 'X'] as Platform[]).map((item) => <button key={item} role="tab" aria-selected={platform === item} className={`tab ${platform === item ? 'active' : ''}`} onClick={() => selectPlatform(item)} type="button">{item}</button>)}
          </div>
          <div className={`editor-fields ${regenerating ? 'is-regenerating' : ''}`}>
            <label className="field-label">{platform === 'YouTube' ? 'Description' : 'Caption'} <span className="count">{text.length} / {current.limit}</span>
              <textarea value={text} onChange={(event) => setText(event.target.value)} maxLength={current.limit} rows={platform === 'YouTube' ? 11 : 8} />
            </label>
            {platform === 'YouTube' && <label className="field-label">Title <span className="count">{current.title.length} / 100</span><input defaultValue={current.title} maxLength={100} /></label>}
            <div className="tag-section"><span className="field-label static-label">{platform === 'X' ? 'Post details' : 'Tags'} <span className="count">{platform === 'X' ? 'under limit' : `${current.tags.length} selected`}</span></span><div className="chips">{current.tags.length ? current.tags.map((tag) => <span className="chip" key={tag}>#{tag}</span>) : <span className="x-note">Plain-language post · no hashtags added</span>}</div></div>
          </div>
          <div className="output-actions"><button className="regenerate" type="button" onClick={regenerate} disabled={regenerating}>{regenerating ? 'Regenerating…' : 'Regenerate'}</button><button className="copy-button" type="button" onClick={copyAll}>{copyLabel}</button></div>
        </section>
      </section>
      <footer className="footer-note"><span>Draft saved just now</span><span>Press <kbd>⌘</kbd> <kbd>↵</kbd> to copy</span></footer>
    </main>
  )
}
