import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import './App.css'
import logo from './assets/logo.webp'
import parathaHero from './assets/homepage.webp'
import thaliImage from './assets/dish1.webp'
import snacksImage from './assets/dish2.webp'
import pooriImage from './assets/dish3.webp'
import parathaImage from './assets/dish4.webp'
import lemonImage from './assets/lemonade.webp'
import halwaImage from './assets/halwa.webp'
import khichdiImage from './assets/khichdi.webp'
import maggiImage from './assets/maggi.webp'
import sandwichImage from './assets/sandwich.webp'
import sabziImage from './assets/sabzi.webp'
import dalImage from './assets/dal.webp'
import alooImage from './assets/aloo.webp'
import comboImage from './assets/combo.webp'
import sabudanaImage from './assets/sabudana.webp'
import pakodaImage from './assets/pakoda.webp'
import pohaImage from './assets/poha.webp'

const cravingOptions = [
  { label: 'I need a hug', dish: 'Dal Tadka + Steamed Rice', note: 'the warm one', tone: 'sun' },
  { label: 'Long day. Big appetite.', dish: 'Rajma Chawal + Achaar', note: 'the full reset', tone: 'rose' },
  { label: 'Something light', dish: 'Phulka + Seasonal Sabzi', note: 'the gentle one', tone: 'leaf' },
  { label: 'Chai & a chat', dish: 'Masala Chai + Pakode', note: 'the 5pm feeling', tone: 'blue' },
]

function App() {
  const [page, setPage] = useState<'home' | 'menu' | 'contact'>('home')
  const [craving, setCraving] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  const goTo = (nextPage: 'home' | 'menu' | 'contact') => {
    setPage(nextPage)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    document.body.classList.toggle('menu-is-open', menuOpen)

    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.classList.remove('menu-is-open')
    }
  }, [menuOpen])
const carouselRef = useRef<HTMLDivElement>(null)

const isDragging = useRef(false)
const startX = useRef(0)
const startScrollLeft = useRef(0)
const autoScrollPosition = useRef(0)

useEffect(() => {
  if (page !== 'home') return

  const carousel = carouselRef.current

  if (!carousel) return

  let animationFrame: number
  let lastTime = performance.now()

  const speed = 28
  autoScrollPosition.current = carousel.scrollLeft

  const autoScroll = (time: number) => {
    const deltaTime = time - lastTime
    lastTime = time

    if (!isDragging.current) {
      const maxScroll = carousel.scrollWidth - carousel.clientWidth

      if (maxScroll <= 0) {
        animationFrame = requestAnimationFrame(autoScroll)
        return
      }

      autoScrollPosition.current += (speed * deltaTime) / 1000

      if (autoScrollPosition.current >= maxScroll) {
        autoScrollPosition.current = 0
      } else {
        carousel.scrollLeft = Math.floor(autoScrollPosition.current)
      }
    }

    animationFrame = requestAnimationFrame(autoScroll)
  }

  animationFrame = requestAnimationFrame(autoScroll)

  return () => {
    cancelAnimationFrame(animationFrame)
  }
}, [page])
const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
  const carousel = carouselRef.current

  if (!carousel) return

  isDragging.current = true

  startX.current = e.clientX
  startScrollLeft.current = carousel.scrollLeft
  autoScrollPosition.current = carousel.scrollLeft

  carousel.setPointerCapture(e.pointerId)
  carousel.classList.add('is-dragging')
}

const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
  if (!isDragging.current) return

  const carousel = carouselRef.current

  if (!carousel) return

  e.preventDefault()

  const x = e.clientX
  const walk = (x - startX.current) * 1.5

  carousel.scrollLeft = startScrollLeft.current - walk
  autoScrollPosition.current = carousel.scrollLeft
}

const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
  isDragging.current = false

  const carousel = carouselRef.current

  if (!carousel) return

  if (carousel.hasPointerCapture(e.pointerId)) {
    carousel.releasePointerCapture(e.pointerId)
  }

  carousel.classList.remove('is-dragging')
}
  return (
    <main className="site-shell">
      <header className="topbar">
        <button
  className="wordmark"
  onClick={() => goTo('home')}
  aria-label="Radhey Ki Rasoi home"
>
  <img
    src={logo}
    alt="Radhey Ki Rasoi"
    className="logo-image"
  />
  
  <span>
    Radhey Ki<br />
    <em>Rasoi</em>
  </span>
</button>
        <nav className={menuOpen ? 'is-open' : ''} aria-label="Main navigation">
          <button className={page === 'home' ? 'active' : ''} onClick={() => goTo('home')}>Home</button>
          <button className={page === 'menu' ? 'active' : ''} onClick={() => goTo('menu')}>Menu</button>
          <button className={page === 'contact' ? 'active' : ''} onClick={() => goTo('contact')}>Contact</button>
        </nav>
        <button
  className="order-link"
  onClick={() => goTo('contact')}
>
  Order Food <span>↗</span>
</button>
        <button
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      {page === 'home' ? (
        <>
        <section className="hero-section" id="home">
          <div className="hero-copy">
            <p className="eyebrow">A cloud kitchen for the homesick <span>✳</span></p>
            <h1>Aaj ghar ki<br /><i>yaad aa rahi hai?</i></h1>
            <p className="hero-sub">Maybe we can help.</p>
            <button className="round-cta" onClick={() => document.getElementById('story-tease')?.scrollIntoView({ behavior: 'smooth' })}>
              <span>Come In</span><b>→</b>
            </button>
          </div>
          <div className="hero-image-wrap">
  <img
    src={parathaHero}
    alt="Fresh homemade paratha served with dahi and achaar"
    className="hero-image"
  />

  <span className="hero-caption">
    Made like home
    <br />
    <small>Noida · Est. 2021</small>
  </span>

  <span className="hero-stamp">
    खाना
    <br />
    <b>WITH</b>
    <br />
    FEELING
  </span>
</div>
        </section>

        <section className="statement-section menu-showcase" id="story-tease">
  <p className="section-kicker">01 / What we cook</p>

  <div className="statement-line">
    <span>Not restaurant food.</span>
    <em>Ghar ka khana.</em>
  </div>

  <p className="statement-note">
    From vrat specials to everyday comfort food.
    <br />
    Something familiar for every kind of hunger.
  </p>

  <div className="menu-carousel-wrapper">
    <div
  className="menu-carousel"
  ref={carouselRef}
  onPointerDown={handlePointerDown}
  onPointerMove={handlePointerMove}
  onPointerUp={handlePointerUp}
  onPointerCancel={handlePointerUp}
>

      <article className="menu-category-card vrat" onClick={() => goTo('menu')}>
        <div className="card-number">01</div>
        <div className="card-icon">🪔</div>
        <p className="card-label">Special</p>
        <h3>Vrat Specials</h3>
        <p className="card-description">
          Comforting fasting favourites made with familiar flavours.
        </p>
        <div className="card-items">
          <span>Kuttu Poori</span>
          <span>Sabudana Khichdi</span>
          <span>Vrat Thali</span>
        </div>
        <div className="card-footer">
          <span>Explore menu</span>
          <span className="arrow">↗</span>
        </div>
      </article>

      <article className="menu-category-card snacks" onClick={() => goTo('menu')}>
        <div className="card-number">02</div>
        <div className="card-icon">🥟</div>
        <p className="card-label">Quick bites</p>
        <h3>Snacks</h3>
        <p className="card-description">
          Little cravings deserve something delicious too.
        </p>
        <div className="card-items">
          <span>Bread Roll</span>
          <span>Aloo Pakoda</span>
          <span>Paneer Bread Roll</span>
        </div>
        <div className="card-footer">
          <span>Explore menu</span>
          <span className="arrow">↗</span>
        </div>
      </article>

      <article className="menu-category-card breakfast" onClick={() => goTo('menu')}>
        <div className="card-number">03</div>
        <div className="card-icon">☀️</div>
        <p className="card-label">Morning comfort</p>
        <h3>Breakfast</h3>
        <p className="card-description">
          Start your day with something simple, warm and familiar.
        </p>
        <div className="card-items">
          <span>Poha</span>
          <span>Upma</span>
          <span>Vermicelli</span>
        </div>
        <div className="card-footer">
          <span>Explore menu</span>
          <span className="arrow">↗</span>
        </div>
      </article>

      <article className="menu-category-card meals" onClick={() => goTo('menu')}>
        <div className="card-number">04</div>
        <div className="card-icon">🍛</div>
        <p className="card-label">The main event</p>
        <h3>Ghar Ka Khana</h3>
        <p className="card-description">
          Proper meals for when you need food that feels like home.
        </p>
        <div className="card-items">
          <span>Dal Tadka Rice</span>
          <span>Poori Sabzi</span>
          <span>Family Combos</span>
        </div>
        <div className="card-footer">
          <span>Explore menu</span>
          <span className="arrow">↗</span>
        </div>
      </article>

      <article className="menu-category-card paratha" onClick={() => goTo('menu')}>
        <div className="card-number">05</div>
        <div className="card-icon">🫓</div>
        <p className="card-label">Fresh from the tawa</p>
        <h3>Parathas & Breads</h3>
        <p className="card-description">
          Warm, filling and made for the perfect comforting bite.
        </p>
        <div className="card-items">
          <span>Aloo Paratha</span>
          <span>Paneer Paratha</span>
          <span>Desi Ghee Paratha</span>
        </div>
        <div className="card-footer">
          <span>Explore menu</span>
          <span className="arrow">↗</span>
        </div>
      </article>

      <article className="menu-category-card healthy" onClick={() => goTo('menu')}>
        <div className="card-number">06</div>
        <div className="card-icon">🌿</div>
        <p className="card-label">Light & wholesome</p>
        <h3>Healthy Meals</h3>
        <p className="card-description">
          Simple food for days when you want something lighter.
        </p>
        <div className="card-items">
          <span>Classic Khichdi</span>
          <span>Vegetable Khichdi</span>
          <span>Garlic Tadka Khichdi</span>
        </div>
        <div className="card-footer">
          <span>Explore menu</span>
          <span className="arrow">↗</span>
        </div>
      </article>

      <article className="menu-category-card sandwiches" onClick={() => goTo('menu')}>
        <div className="card-number">07</div>
        <div className="card-icon">🥪</div>
        <p className="card-label">Quick cravings</p>
        <h3>Sandwiches</h3>
        <p className="card-description">
          Easy, cheesy and perfect when hunger comes quickly.
        </p>
        <div className="card-items">
          <span>Cheesy Veg</span>
          <span>Cheese Corn</span>
          <span>Grilled Paneer</span>
        </div>
        <div className="card-footer">
          <span>Explore menu</span>
          <span className="arrow">↗</span>
        </div>
      </article>

      <article className="menu-category-card pasta" onClick={() => goTo('menu')}>
        <div className="card-number">08</div>
        <div className="card-icon">🍝</div>
        <p className="card-label">Something different</p>
        <h3>Maggi & Pasta</h3>
        <p className="card-description">
          Comfort food for cravings that don't follow any rules.
        </p>
        <div className="card-items">
          <span>Vegetable Maggi</span>
          <span>Cheese Maggi</span>
          <span>White Sauce Pasta</span>
        </div>
        <div className="card-footer">
          <span>Explore menu</span>
          <span className="arrow">↗</span>
        </div>
      </article>

      <article className="menu-category-card beverages" onClick={() => goTo('menu')}>
        <div className="card-number">09</div>
        <div className="card-icon">🥤</div>
        <p className="card-label">Something refreshing</p>
        <h3>Beverages</h3>
        <p className="card-description">
          The perfect refreshment to go with your favourite meal.
        </p>
        <div className="card-items">
          <span>Sweet Lassi</span>
          <span>Nimbu Shikanji</span>
          <span>Mint Chaas</span>
        </div>
        <div className="card-footer">
          <span>Explore menu</span>
          <span className="arrow">↗</span>
        </div>
      </article>

    </div>
  </div>

  <p className="carousel-hint">
    <span>←</span> Drag to explore our kitchen <span>→</span>
  </p>

  <div className="ring ring-one" />
  <div className="ring ring-two" />
</section>

        <section className="recipe-section">
          <div className="recipe-intro"><p className="section-kicker">02 / The everyday special</p><h2>Today’s recipe<br /><i>for a better day.</i></h2></div>
          <div className="recipe-grid">
            <article><span className="recipe-number">01</span><b>Comfort</b><p>A familiar bite that lands softly, right where it should.</p></article>
            <article><span className="recipe-number">02</span><b>Warmth</b><p>Not just temperature. The warmth of being looked after.</p></article>
            <article><span className="recipe-number">03</span><b>Familiar flavours</b><p>Every tadka, every pickle, every little thing in its place.</p></article>
            <article><span className="recipe-number">04</span><b>Made with care</b><p>Slow food, small batches, no shortcuts home wouldn’t take.</p></article>
          </div>
        </section>

        <section className="craving-section">
          <p className="section-kicker">03 / A little intuition</p>
          <h2>What are you<br /><i>craving today?</i></h2>
          <div className="craving-layout">
            <div className="craving-list">{cravingOptions.map((option, index) => <button key={option.label} className={craving === index ? `selected ${option.tone}` : ''} onClick={() => setCraving(index)}><span>0{index + 1}</span>{option.label}<b>↗</b></button>)}</div>
            <div className={`craving-result ${cravingOptions[craving].tone}`}><span className="result-orbit" /><p>Then this is for you.</p><h3>{cravingOptions[craving].dish}</h3><small>{cravingOptions[craving].note} <span>✳</span></small></div>
          </div>
        </section>

        <section className="sensory-section">
          <div className="steam"><i /><i /><i /></div>
          <p className="section-kicker">04 / You already know</p>
          <h2>You can’t smell this<br />website, <i>but you know<br />the feeling.</i></h2>
        </section>

        <section className="gallery-section">
  <div className="gallery-head">
    <p className="section-kicker">05 / From our kitchen</p>
    <p>Real food. Real good days.</p>
  </div>

  <div className="food-gallery">
    <div
      className="gallery-photo photo-one"
      style={{ backgroundImage: `url(${thaliImage})` }}
    />

    <div
      className="gallery-photo photo-two"
      style={{ backgroundImage: `url(${pooriImage})` }}
    />

    <div
      className="gallery-photo photo-three"
      style={{ backgroundImage: `url(${parathaImage})` }}
    />

    <div
      className="gallery-photo photo-four"
      style={{ backgroundImage: `url(${snacksImage})` }}
    />
  </div>
</section>

        <section className="final-cta"><p className="section-kicker">A small question</p><h2>Before you go…<br /><i>Should we pack<br />something for you?</i></h2><div className="order-buttons"><a href="https://www.swiggy.com/city/noida-1/radhey-ki-rasoi-sector-50-rest1204471" target="_blank" rel="noreferrer">Order on Swiggy <span>↗</span></a><a href="https://www.zomato.com/ncr/radhey-ki-rasoi-sector-41-noida/order" target="_blank" rel="noreferrer">Find us on Zomato <span>↗</span></a></div></section>
      </> ) : page === 'menu' ? (
  <MenuPage goHome={() => goTo('home')} />
) : (
  <ContactPage goHome={() => goTo('home')} />
)}

      <footer><span>Radhey Ki Rasoi <i>✳</i></span><span>Ghar se door, ghar jaisa.</span><span>© 2024 / Made with feeling</span></footer>
    </main>
  )
}

function MenuPage({ goHome }: { goHome: () => void }) {
  const menuCategories = [
  {
    id: 'vrat',
    number: '01',
    eyebrow: 'Special days',
    title: 'Vrat Specials',
    description:
      'Fasting favourites made with familiar ingredients, desi ghee and the comfort of home.',
    color: 'dark',
    image: sabudanaImage,
    items: [
      {
        name: 'Kanjak Thali',
        options: [
          'Classic Kanjak Thali',
          'Kanjak Thali with Aloo Sabzi',
          'Pack of 9',
          'Pack of 18',
        ],
      },
      {
        name: 'Vrat Thali',
        options: ['Small', 'Medium', 'Large', 'Extra Large'],
      },
      {
        name: 'Desi Ghee Fried Aloo',
        options: ['Half'],
      },
      {
        name: 'Desi Ghee Kuttu ki Poori',
        options: ['5 Poori', '10 Poori'],
      },
      {
        name: 'Vrat ki Aloo Tamatar Sabji',
      },
      {
        name: 'Kuttu ki Kachori',
        options: ['4 Kachori with Dahi'],
      },
      {
        name: 'Desi Ghee Kuttu ki Aloo Pakoda',
        options: ['12 Pieces'],
      },
      {
        name: 'Samak ke Chawal',
        options: ['Half', 'Full'],
      },
      {
        name: 'Sabudana Khichdi',
      },
      {
        name: 'Sabudana Pakoda',
        options: ['4 Pieces', '8 Pieces', '12 Pieces'],
      },
    ],
  },

  {
    id: 'snacks',
    number: '02',
    eyebrow: 'Little cravings',
    title: 'Snacks & Quick Bites',
    description:
      'Crispy, warm and perfect for chai breaks, evening cravings and everything in between.',
    color: 'terracotta',
    image: pakodaImage,
    items: [
      {
        name: 'Bread Roll',
        options: ['4 Pieces', '8 Pieces'],
      },
      {
        name: 'Paneer Bread Roll',
      },
      {
        name: 'Aloo Pakoda',
        options: ['10 Pieces'],
      },
      {
        name: 'Pyaaz Pakoda',
        options: ['10 Pieces'],
      },
      {
        name: 'Aloo Pyaaz Pakoda',
        options: ['10 Pieces'],
      },
      {
        name: 'Chura Matar',
        options: ['300 ml', '500 ml'],
      },
    ],
  },

  {
    id: 'breakfast',
    number: '03',
    eyebrow: 'Good mornings',
    title: 'Breakfast',
    description:
      'Simple, warm breakfasts that make mornings feel slower and a little more like home.',
    color: 'sun',
    image: pohaImage,
    items: [
      {
        name: 'Vermicelli',
        options: ['450 ml · Serve 1', '750 ml · Serve 2'],
      },
      {
        name: 'Poha',
        options: ['450 ml · Serve 1', '750 ml · Serve 2'],
      },
      {
        name: 'Upma',
        options: ['450 ml · Serve 1', '750 ml · Serve 2'],
      },
      {
        name: 'Aloo Poori',
        options: ['5 Pieces · Serve 1', '10 Pieces · Serve 2'],
      },
      {
        name: 'Aloo Poori with Halwa',
      },
      {
        name: 'Gravy Aloo Sabzi with Poori',
        options: ['5 Poori · Serve 1', '10 Poori · Serve 2'],
      },
      {
        name: 'Aloo Kachori with Gravy Aloo Sabzi',
        options: [
          '4 Kachori + 250 ml Sabzi',
          '6 Kachori + 300 ml Sabzi',
          '8 Kachori + 500 ml Sabzi',
        ],
      },
      {
        name: 'Puri Kachori Combo',
      },
    ],
  },

  {
    id: 'combos',
    number: '04',
    eyebrow: 'The main event',
    title: 'Combos & Complete Meals',
    description:
      'Proper meals for proper hunger. Familiar combinations made to feel complete.',
    color: 'green',
    image: comboImage,
    items: [
      {
        name: 'Family Combo',
      },
      {
        name: 'Aloo Mattar with Paratha',
      },
      {
        name: 'Aloo Mattar with Poori',
      },
      {
        name: 'Aloo Mattar with Kachori',
      },
      {
        name: 'Aloo Mattar with Sattu Paratha',
      },
      {
        name: 'Methi Paratha with Aloo Curry',
      },
      {
        name: 'Poori with Aloo Bhujia',
      },
      {
        name: 'Rice with Dal Fry and Aloo Bhujia',
      },
      {
        name: 'Rice with Plain Dal and Aloo Bhujia',
      },
      {
        name: 'Poori with Aloo Tamatar Sabzi & Boondi Raita',
      },
      {
        name: 'Tawa Roti with Jeera Aloo',
      },
      {
        name: 'Crispy Jeera Aloo with Paratha',
        options: [
          '250 gm + 2 Paratha',
          '300 gm + 4 Paratha',
        ],
      },
      {
        name: 'Paneer Bhurji with Paratha',
        options: [
          '250 gm + 2 Paratha',
          '300 gm + 4 Paratha',
        ],
      },
    ],
  },

  {
    id: 'parathas',
    number: '05',
    eyebrow: 'Fresh from the tawa',
    title: 'Parathas & Tawa Specials',
    description:
      'Golden from the tawa, warm from the inside and best enjoyed without rushing.',
    color: 'orange',
    image: alooImage,
    items: [
      {
        name: 'Aloo Paratha',
        options: ['Without Butter', 'With Butter'],
      },
      {
        name: 'Aloo Pyaz Paratha',
        options: ['Without Butter', 'With Butter'],
      },
      {
        name: 'Mixed Veg Paratha',
        options: ['Without Butter', 'With Butter'],
      },
      {
        name: 'Paneer Paratha',
        options: ['Without Butter', 'With Butter'],
      },
      {
        name: 'Paneer Pyaz Paratha',
        options: ['Without Butter', 'With Butter'],
      },
      {
        name: 'Pyaz Paratha',
        options: ['Without Butter', 'With Butter'],
      },
      {
        name: 'Sattu Paratha',
        options: ['Plain', 'With Pickle', 'With Dahi'],
      },
      {
        name: 'Aloo Methi Paratha with Pickle',
      },
      {
        name: 'Aloo Tawa Roti',
      },
      {
        name: 'Aloo Pyaaz Tawa Roti',
      },
      {
        name: 'Pyaaz Tawa Roti',
      },
      {
        name: 'Plain Paratha',
      },
      {
        name: 'Tawa Roti',
      },
      {
        name: 'Desi Ghee Paratha',
      },
      {
        name: 'Ajwain Paratha with Pickle',
      },
      {
        name: 'Poori',
      },
      {
        name: 'Tikona Paratha',
      },
    ],
  },

  {
    id: 'rice-dal',
    number: '06',
    eyebrow: 'Everyday comfort',
    title: 'Dal, Rice & Ghar Ka Khana',
    description:
      'The kind of everyday food that somehow always tastes like the right decision.',
    color: 'sage',
    image: dalImage,
    items: [
      {
        name: 'Dal Tadka Rice Bowl',
      },
      {
        name: 'Dal Bhat Aloo Bhujia with Chapati',
        options: [
          '250 ml + 2 Chapati',
          '300 ml + 4 Chapati',
          '500 ml + 6 Chapati',
        ],
      },
      {
        name: 'Desi Ghee Dal Tadka',
        options: ['300 ml', '500 ml'],
      },
      {
        name: 'Jeera Rice',
        options: ['300 ml', '500 ml'],
      },
    ],
  },

  {
    id: 'sandwiches',
    number: '07',
    eyebrow: 'Quick cravings',
    title: 'Sandwiches',
    description:
      'Easy, cheesy and satisfying. For hunger that arrives without warning.',
    color: 'cream',
    image: sandwichImage,
    items: [
      {
        name: 'Aloo Masala Sandwich',
      },
      {
        name: 'Cheesy Veg Sandwich',
        options: [
          'Single Layer · 2 Bread Pieces',
          'Double Layer · 3 Bread Pieces',
        ],
      },
      {
        name: 'Cheese Corn Sandwich',
      },
      {
        name: 'Bread Butter Toast',
      },
      {
        name: 'Vegetable Mayonnaise Sandwich',
      },
      {
        name: 'Tomato Onion Sandwich',
      },
      {
        name: 'Cheesy Tomato Onion Sandwich',
      },
      {
        name: 'Grilled Paneer Sandwich',
      },
    ],
  },

  {
    id: 'maggi-pasta',
    number: '08',
    eyebrow: 'No rules here',
    title: 'Maggi & Pasta',
    description:
      'Because some cravings simply refuse to follow the rules of a traditional meal.',
    color: 'blue',
    image: maggiImage,
    items: [
      {
        name: 'Vegetable Maggi',
      },
      {
        name: 'Cheese Maggi',
      },
      {
        name: 'White Sauce Pasta',
      },
      {
        name: 'Vegetable Masala Pasta',
        options: ['Without Cheese', 'With Cheese'],
      },
    ],
  },

  {
    id: 'sabzi',
    number: '09',
    eyebrow: 'From the handi',
    title: 'Sabzi & Main Dishes',
    description:
      'Simple ingredients, familiar spices and flavours that belong on a proper Indian table.',
    color: 'dark',
    image: sabziImage,
    items: [
      {
        name: 'Jeera Aloo',
      },
      {
        name: 'Aloo Bhujia',
        options: ['300 ml', '500 ml'],
      },
      {
        name: 'Aloo Tamatar',
      },
      {
        name: 'Paneer Bhurji',
      },
      {
        name: 'Aloo Matar',
      },
    ],
  },

  {
    id: 'khichdi',
    number: '10',
    eyebrow: 'Light & wholesome',
    title: 'Khichdi & Gentle Meals',
    description:
      'For the days when you want something warm, light and quietly comforting.',
    color: 'mint',
    image: khichdiImage,
    items: [
      {
        name: 'Classic Khichdi',
      },
      {
        name: 'Vegetable Khichdi',
      },
      {
        name: 'Garlic Tadka Khichdi',
      },
    ],
  },

  {
    id: 'sides',
    number: '11',
    eyebrow: 'A little extra',
    title: 'Sides & Sweet Things',
    description:
      'The supporting characters that somehow end up becoming everyone’s favourite part.',
    color: 'terracotta',
    image: halwaImage,
    items: [
      {
        name: 'Suji ka Halwa with Dry Fruits',
        options: ['250 Grams', '500 Grams'],
      },
      {
        name: 'Boondi Raita',
      },
      {
        name: 'Mix Veg Raita',
      },
      {
        name: 'Plain Dahi',
      },
    ],
  },

  {
    id: 'beverages',
    number: '12',
    eyebrow: 'Something to sip',
    title: 'Beverages',
    description:
      'Cool, refreshing and made for slowing down between bites.',
    color: 'sun',
    image: lemonImage,
    items: [
      {
        name: 'Sweet Lassi',
      },
      {
        name: 'Masala Lassi',
      },
      {
        name: 'Nimbu Shikanji',
      },
      {
        name: 'Cold Coffee',
      },
      {
        name: 'Special Mint Chaas',
      },
    ],
  },
]

  const scrollToCategory = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <section className="menu-page">

      {/* HERO */}

      <section className="menu-hero">

        <div className="menu-hero-copy">

          <p className="section-kicker">
            Radhey Ki Rasoi / The Menu
          </p>

          <h1>
            Pull up a chair.
            <br />
            <i>We made plenty.</i>
          </h1>

          <p className="menu-hero-text">
            Every kind of hunger has a place at our table.
            Scroll slowly. Something will find you.
          </p>

          <button
            className="menu-home-button"
            onClick={goHome}
          >
            ← Back home
          </button>

        </div>

        <div className="menu-hero-image">

          <div className="menu-image-main" />

          <div className="menu-image-note">
            <span>आज क्या खाओगे?</span>
            <small>What feels right today?</small>
          </div>

          <div className="menu-image-stamp">
            MADE
            <br />
            WITH
            <br />
            <b>FEELING</b>
          </div>

        </div>

      </section>


      {/* CATEGORY NAVIGATION */}

      <section className="menu-navigation">

        <p className="section-kicker">
          Find your hunger
        </p>

        <div className="menu-nav-list">

          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => scrollToCategory(category.id)}
            >
              <span>{category.number}</span>

              {category.title}

              <b>↘</b>
            </button>
          ))}

        </div>

      </section>


      {/* MENU CATEGORIES */}

      <section className="menu-content">

        {menuCategories.map((category, index) => (

          <article
            id={category.id}
            key={category.id}
            className={`menu-section ${category.color}`}
          >

            <div className="menu-section-number">
              {category.number}
            </div>


            <div className="menu-section-image">

              <img
                src={category.image}
                alt={category.title}
                loading={index > 1 ? 'lazy' : 'eager'}
              />

              <span className="menu-image-circle">
                Radhey Ki Rasoi
              </span>

            </div>


            <div className="menu-section-content">

              <p className="menu-section-eyebrow">
                {category.eyebrow}
              </p>

              <h2>{category.title}</h2>

              <p className="menu-section-description">
                {category.description}
              </p>


              <div className="menu-items">

  {category.items.map((item, itemIndex) => (

    <div
      className="menu-item"
      key={item.name}
    >

      <span className="menu-item-number">
        {String(itemIndex + 1).padStart(2, '0')}
      </span>

      <div className="menu-item-info">

        <h3>{item.name}</h3>

      </div>

      <span className="menu-item-arrow">
        ↗
      </span>

    </div>

  ))}

</div>

            </div>

          </article>

        ))}

      </section>


      {/* FINAL CTA */}

      <section className="menu-final">

        <p className="section-kicker">
          That was the easy part
        </p>

        <h2>
          Now comes the difficult question.
          <br />
          <i>What are you ordering?</i>
        </h2>

        <div className="menu-final-actions">

          <a
            href="https://www.swiggy.com/city/noida-1/radhey-ki-rasoi-sector-50-rest1204471"
            target="_blank"
            rel="noreferrer"
          >
            Order on Swiggy
            <span>↗</span>
          </a>

          <a
            href="https://www.zomato.com/ncr/radhey-ki-rasoi-sector-41-noida/order"
            target="_blank"
            rel="noreferrer"
          >
            Find us on Zomato
            <span>↗</span>
          </a>

        </div>

      </section>

    </section>
  )
}
function ContactPage({
  goHome,
}: {
  goHome: () => void
}) {
  return (
    <section className="contact-page">

      {/* HERO */}

      <section className="contact-hero">

        <div className="contact-hero-copy">

          <p className="section-kicker">
            Radhey Ki Rasoi / Say hello
          </p>

          <h1>
            Got a craving?
            <br />
            <i>We know what to do.</i>
          </h1>

          <p className="contact-hero-text">
            Whether you're planning dinner, ordering for the family,
            or simply craving something that feels like home —
            we're just a message away.
          </p>

          <button
            className="contact-home-button"
            onClick={goHome}
          >
            ← Back home
          </button>

        </div>

        <div className="contact-hero-art">

          <div className="contact-circle contact-circle-one" />
          <div className="contact-circle contact-circle-two" />

          <div className="contact-stamp">
            खाना
            <br />
            <b>WITH</b>
            <br />
            FEELING
          </div>

          <p>
            Ghar se door,
            <br />
            ghar jaisa.
          </p>

        </div>

      </section>


      {/* CONTACT OPTIONS */}

      <section className="contact-options-section">

        <div className="contact-section-heading">

          <p className="section-kicker">
            01 / Pick your way
          </p>

          <h2>
            However you reach us,
            <br />
            <i>we're here.</i>
          </h2>

        </div>


        <div className="contact-options-grid">

          {/* CALL */}

          <a
            href="tel:9868895455"
            className="contact-option call-option"
          >

            <span className="contact-number">01</span>

            <div className="contact-option-main">

              <span className="contact-icon">☎</span>

              <p>Give us a call</p>

              <h3>98688 95455</h3>

              <small>
                Sometimes talking to a real person
                is the easiest way.
              </small>

            </div>

            <span className="contact-arrow">↗</span>

          </a>


          {/* WHATSAPP */}

          <a
            href="https://wa.me/919868895455"
            target="_blank"
            rel="noreferrer"
            className="contact-option whatsapp-option"
          >

            <span className="contact-number">02</span>

            <div className="contact-option-main">

              <span className="contact-icon">✦</span>

              <p>WhatsApp us</p>

              <h3>Say hello 👋</h3>

              <small>
                Tell us what you're craving.
                We'll be happy to help.
              </small>

            </div>

            <span className="contact-arrow">↗</span>

          </a>


          {/* SWIGGY */}

          <a
            href="https://www.swiggy.com/city/noida-1/radhey-ki-rasoi-sector-50-rest1204471"
            target="_blank"
            rel="noreferrer"
            className="contact-option swiggy-option"
          >

            <span className="contact-number">03</span>

            <div className="contact-option-main">

              <span className="contact-icon">✳</span>

              <p>Order online</p>

              <h3>Swiggy</h3>

              <small>
                Your comfort food is waiting.
              </small>

            </div>

            <span className="contact-arrow">↗</span>

          </a>


          {/* ZOMATO */}

          <a
            href="https://www.zomato.com/ncr/radhey-ki-rasoi-sector-41-noida/order"
            target="_blank"
            rel="noreferrer"
            className="contact-option zomato-option"
          >

            <span className="contact-number">04</span>

            <div className="contact-option-main">

              <span className="contact-icon">●</span>

              <p>Find us online</p>

              <h3>Zomato</h3>

              <small>
                Pick your favourites.
                We'll take care of the rest.
              </small>

            </div>

            <span className="contact-arrow">↗</span>

          </a>

        </div>

      </section>


      {/* LITTLE MESSAGE */}

      <section className="contact-message">

        <p className="section-kicker">
          02 / No complicated conversations
        </p>

        <h2>
          Ghar ka khana doesn't need
          <br />
          <i>a complicated conversation.</i>
        </h2>

        <p>
          Pick your favourite way to reach us.
          <br />
          We'll handle the rest.
        </p>

      </section>


      {/* FINAL CTA */}

      <section className="contact-final">

        <p className="section-kicker">
          Before you go
        </p>

        <h2>
          Hungry already?
          <br />
          <i>We understand.</i>
        </h2>

        <a
          href="tel:9868895455"
          className="contact-big-call"
        >
          <span>Call Radhey Ki Rasoi</span>

          <b>98688 95455 ↗</b>
        </a>

      </section>

    </section>
  )
}

export default App
