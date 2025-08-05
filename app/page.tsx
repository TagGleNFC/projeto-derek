import Link from "next/link"
import { Play, ShoppingCart, Music, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const featuredBeats = [
    {
      id: 1,
      title: "Dark Trap Vibes",
      genre: "Trap",
      bpm: 140,
      price: "$29.99",
      image: "/placeholder-akdcu.png",
      preview: "/audio/preview1.mp3",
    },
    {
      id: 2,
      title: "Melodic Dreams",
      genre: "R&B",
      bpm: 85,
      price: "$34.99",
      image: "/melodic-rnb-beat-cover.png",
      preview: "/audio/preview2.mp3",
    },
    {
      id: 3,
      title: "Hard Drill Energy",
      genre: "Drill",
      bpm: 150,
      price: "$24.99",
      image: "/drill-beat-cover.png",
      preview: "/audio/preview3.mp3",
    },
    {
      id: 4,
      title: "Chill Lo-Fi Mood",
      genre: "Lo-Fi",
      bpm: 70,
      price: "$19.99",
      image: "/lofi-beat-cover.png",
      preview: "/audio/preview4.mp3",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-purple-900/20 to-black">
        <div className="absolute inset-0 bg-[url('/placeholder-3ezap.png')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            SUA MARCA
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Beats profissionais para elevar sua música ao próximo nível
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
              <Music className="mr-2 h-5 w-5" />
              Explorar Beats
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black px-8 py-3 bg-transparent"
            >
              <Headphones className="mr-2 h-5 w-5" />
              Sobre Mim
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Beats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Beats em Destaque</h2>
            <p className="text-xl text-gray-400">Os melhores beats da nossa coleção</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBeats.map((beat) => (
              <Card
                key={beat.id}
                className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-all duration-300 group"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={beat.image || "/placeholder.svg"}
                      alt={beat.title}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-t-lg">
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                    <Badge className="absolute top-2 right-2 bg-purple-600">{beat.genre}</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{beat.title}</h3>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-400">{beat.bpm} BPM</span>
                      <span className="text-lg font-bold text-purple-400">{beat.price}</span>
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Comprar Agora
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/beats">
              <Button
                size="lg"
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black bg-transparent"
              >
                Ver Todos os Beats
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">500+</div>
              <div className="text-gray-400">Beats Vendidos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">200+</div>
              <div className="text-gray-400">Artistas Satisfeitos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
              <div className="text-gray-400">Gêneros Musicais</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">5</div>
              <div className="text-gray-400">Anos de Experiência</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Pronto para criar sua próxima hit?</h2>
          <p className="text-xl text-gray-400 mb-8">Explore nossa coleção completa de beats profissionais</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/beats">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 px-8 py-3">
                Explorar Catálogo
              </Button>
            </Link>
            <Link href="/sobre">
              <Button
                size="lg"
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black px-8 py-3 bg-transparent"
              >
                Conhecer o Produtor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
