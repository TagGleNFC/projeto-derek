import { Music, Award, Users, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Sobre Mim
              </h1>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Olá! Sou um produtor musical apaixonado por criar beats únicos que elevam a música dos artistas ao
                próximo nível. Com mais de 5 anos de experiência na indústria, já trabalhei com centenas de artistas ao
                redor do mundo.
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Minha jornada começou quando descobri minha paixão pela música eletrônica e hip-hop. Desde então, venho
                aperfeiçoando minha técnica e desenvolvendo um som único que combina elementos modernos com influências
                clássicas.
              </p>
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Entre em Contato
              </Button>
            </div>
            <div className="relative">
              <img src="/music-producer-studio.png" alt="Produtor no estúdio" className="rounded-lg shadow-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="bg-gray-800 border-gray-700 text-center">
              <CardContent className="p-6">
                <Music className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-gray-400">Beats Produzidos</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700 text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">200+</div>
                <div className="text-gray-400">Artistas Atendidos</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700 text-center">
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-gray-400">Gêneros Dominados</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700 text-center">
              <CardContent className="p-6">
                <Clock className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">5+</div>
                <div className="text-gray-400">Anos de Experiência</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Minha História</h2>
          <div className="space-y-8">
            <div className="bg-gray-900/50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">O Início (2019)</h3>
              <p className="text-gray-300 leading-relaxed">
                Tudo começou no meu quarto, com um computador básico e muita determinação. Passei noites inteiras
                aprendendo sobre produção musical, estudando os grandes nomes da indústria e desenvolvendo meu próprio
                estilo.
              </p>
            </div>
            <div className="bg-gray-900/50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">Primeiros Sucessos (2021)</h3>
              <p className="text-gray-300 leading-relaxed">
                Meus primeiros beats começaram a ganhar reconhecimento na comunidade underground. Artistas locais
                começaram a procurar meu trabalho, e percebi que estava no caminho certo.
              </p>
            </div>
            <div className="bg-gray-900/50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">Expansão Global (2023)</h3>
              <p className="text-gray-300 leading-relaxed">
                Com a internet, meu trabalho alcançou artistas ao redor do mundo. Colaborei com talentos de diferentes
                países e culturas, enriquecendo ainda mais meu repertório musical.
              </p>
            </div>
            <div className="bg-gray-900/50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">Hoje (2024)</h3>
              <p className="text-gray-300 leading-relaxed">
                Atualmente, continuo produzindo beats de alta qualidade, sempre buscando inovação e perfeição. Meu
                objetivo é ajudar cada artista a encontrar seu som único e alcançar seus sonhos musicais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Minha Filosofia</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            "Acredito que cada beat tem uma alma própria. Meu trabalho é dar vida a essa alma e conectá-la com o artista
            certo. A música é uma linguagem universal, e eu sou apenas um tradutor apaixonado."
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-4">Qualidade</h3>
              <p className="text-gray-400">Cada beat é cuidadosamente crafted com atenção aos mínimos detalhes</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-4">Originalidade</h3>
              <p className="text-gray-400">Sempre busco criar algo único e inovador para cada projeto</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-purple-400 mb-4">Paixão</h3>
              <p className="text-gray-400">A música é minha vida, e isso se reflete em cada trabalho que entrego</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
