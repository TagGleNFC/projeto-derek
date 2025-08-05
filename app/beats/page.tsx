"use client"

import { useState } from "react"
import { Play, ShoppingCart, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BeatsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const beats = [
    {
      id: 1,
      title: "Dark Trap Vibes",
      genre: "Trap",
      bpm: 140,
      price: "$29.99",
      image: "/placeholder-akdcu.png",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Melodic Dreams",
      genre: "R&B",
      bpm: 85,
      price: "$34.99",
      image: "/melodic-rnb-beat-cover.png",
      date: "2024-01-14",
    },
    {
      id: 3,
      title: "Hard Drill Energy",
      genre: "Drill",
      bpm: 150,
      price: "$24.99",
      image: "/drill-beat-cover.png",
      date: "2024-01-13",
    },
    {
      id: 4,
      title: "Chill Lo-Fi Mood",
      genre: "Lo-Fi",
      bpm: 70,
      price: "$19.99",
      image: "/lofi-beat-cover.png",
      date: "2024-01-12",
    },
    {
      id: 5,
      title: "Boom Bap Classic",
      genre: "Hip-Hop",
      bpm: 90,
      price: "$27.99",
      image: "/boom-bap-beat-cover.png",
      date: "2024-01-11",
    },
    {
      id: 6,
      title: "Future Bass Drop",
      genre: "Electronic",
      bpm: 128,
      price: "$32.99",
      image: "/future-bass-beat-cover.png",
      date: "2024-01-10",
    },
    {
      id: 7,
      title: "Smooth Jazz Fusion",
      genre: "Jazz",
      bpm: 95,
      price: "$39.99",
      image: "/jazz-fusion-beat-cover.png",
      date: "2024-01-09",
    },
    {
      id: 8,
      title: "Reggaeton Fire",
      genre: "Reggaeton",
      bpm: 95,
      price: "$26.99",
      image: "/reggaeton-beat-cover.png",
      date: "2024-01-08",
    },
  ]

  const genres = ["all", "Trap", "R&B", "Drill", "Lo-Fi", "Hip-Hop", "Electronic", "Jazz", "Reggaeton"]

  const filteredBeats = beats.filter((beat) => {
    const matchesSearch =
      beat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beat.genre.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === "all" || beat.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  const handlePurchase = (beatTitle: string) => {
    // Redirect to external platform (Kirvano, Shopify, etc.)
    window.open(`https://kirvano.com/checkout?beat=${encodeURIComponent(beatTitle)}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Catálogo de Beats
          </h1>
          <p className="text-xl text-gray-400">Encontre o beat perfeito para sua música</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar beats..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white w-full sm:w-64"
              />
            </div>
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="bg-gray-900 border-gray-700 text-white w-full sm:w-40">
                <SelectValue placeholder="Gênero" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre} className="text-white hover:bg-gray-800">
                    {genre === "all" ? "Todos" : genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="bg-gray-900 border-gray-700 text-white w-full md:w-40">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="newest" className="text-white hover:bg-gray-800">
                Mais Recentes
              </SelectItem>
              <SelectItem value="price-low" className="text-white hover:bg-gray-800">
                Menor Preço
              </SelectItem>
              <SelectItem value="price-high" className="text-white hover:bg-gray-800">
                Maior Preço
              </SelectItem>
              <SelectItem value="bpm-low" className="text-white hover:bg-gray-800">
                BPM Baixo
              </SelectItem>
              <SelectItem value="bpm-high" className="text-white hover:bg-gray-800">
                BPM Alto
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Mostrando {filteredBeats.length} de {beats.length} beats
          </p>
        </div>

        {/* Beats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBeats.map((beat) => (
            <Card
              key={beat.id}
              className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-all duration-300 group"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={beat.image || "/placeholder.svg"}
                    alt={beat.title}
                    className="w-full h-48 object-cover rounded-t-lg"
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
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => handlePurchase(beat.title)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Comprar Agora
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBeats.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">Nenhum beat encontrado com os filtros selecionados.</p>
          </div>
        )}
      </div>
    </div>
  )
}
