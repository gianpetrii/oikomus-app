import Hero from '@/components/Hero'
import NavigationCards from '@/components/NavigationCards'
import InfoCards from '@/components/InfoCards'
import PropertyListings from '@/components/PropertyListings'


export default function Home() {
  return (
    <main>
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <NavigationCards />
        <InfoCards />
        <PropertyListings />
      </div>
    </main>
  )
}

